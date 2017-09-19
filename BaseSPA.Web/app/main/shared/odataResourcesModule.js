(function(window, angular) {
  'use-strict';
  angular.module('odataResourcesModule', ['ui.router', 'ODataResources'])

    .factory('odataResource', function ($odataresource, $http, $q) {

      function odataResource(serviceRootUrl, resourcePath, key) {
        this.serviceRootUrl = serviceRootUrl;
        this.resourcePath = resourcePath;
        this.key = key;

        this._odataResource = $odataresource(serviceRootUrl + '/' + resourcePath, {}, {}, {
          odatakey: key,
          isodatav4: true
        });

        angular.extend(this._odataResource.prototype, {
          '$patch': function () {
            var defer = $q.defer();

            var req = {
              method: 'PATCH',
              url: serviceRootUrl + '/' + resourcePath + '(' + this.Id + ')',
              data: this
            };

            $http(req).then(function (data) {
              defer.resolve(data);
            }, function (error) {
              defer.reject(error);
            });

            return defer.promise;
          }
        });
      }

      odataResource.prototype.getResource = function () {
        return this._odataResource.odata();
      }

      odataResource.prototype.new = function () {
        return new this._odataResource();
      }

      odataResource.prototype.get = function (id) {
        var defer = $q.defer();

        this._odataResource.odata().get(id, function (data) {
          data._originalResource = angular.copy(data);
          defer.resolve(data);
        }, function (error) {
          defer.reject(error);
        });

        return defer.promise;
      }

      odataResource.prototype.add = function (resource) {
        var defer = $q.defer();

        resource.$save(function (data) {
          data._originalResource = angular.copy(data);
          defer.resolve(data);
        }, function (error) {
          defer.reject(error);
          });

        return defer.promise;
      }

      odataResource.prototype.update = function (resource) {
        var defer = $q.defer();

        var self = this;
        resource.$patch().then(function () {
          self.get(resource[self.key]).then(function (data) {
            defer.resolve(data);
          });
        }, function (error) {
          defer.reject(error);
        });

        return defer.promise;
      }

      odataResource.prototype.delete = function (resource) {
        var defer = $q.defer();

        resource.$delete(function (data) {
          defer.resolve(data);
        }, function (error) {
          defer.reject(error);
        });

        return defer.promise;
      }

      odataResource.prototype.resource = function () {
        return this._odataResource;
      }

      return odataResource;
    })

    .factory('odataGenericResource', function ($q, odataResource) {

      function odataGenericResource(serviceRootUrl, resourcePath, key) {
        this.odataResource = new odataResource(serviceRootUrl, resourcePath, key);
      }

      var isEntityProperty = function (propertyName) {
        return (propertyName !== '$promise' && propertyName !== '_originalResource');
      }

      odataGenericResource.prototype.getOdataResource = function() {
        return this.odataResource.getResource();
      }

      odataGenericResource.prototype.get = function (id) {
        if (id === '') {
          var defer = $q.defer();
          defer.resolve(this.odataResource.new());

          return defer.promise;
        } else {
          return this.odataResource.get(id);
        }
      }

      odataGenericResource.prototype.save = function(resource) {
        if (!resource._originalResource) {
          return this.odataResource.add(resource);
        } else if (this.isChanged(resource)) {
          var object = this.getObjectToUpdate(resource);
          return this.odataResource.update(object);
        } else {
          var defer = $q.defer();
          defer.resolve(resource);

          return defer.promise;
        }
      }

      odataGenericResource.prototype.delete = function (resource) {
        return this.odataResource.delete(resource);
      }

      odataGenericResource.prototype.isChanged = function (resource) {
        var isChanged = false;
        for (var propertyName in resource) {
          if (isEntityProperty(propertyName) && resource._originalResource[propertyName] !== resource[propertyName]) {
            isChanged = true;
          }
        }

        return isChanged;
      }

      odataGenericResource.prototype.getObjectToUpdate = function (resource) {
        var object = this.odataResource.new();
        object[this.odataResource.key] = resource[this.odataResource.key];

        for (var propertyName in resource) {
          if (isEntityProperty(propertyName) && resource._originalResource[propertyName] !== resource[propertyName]) {
            object[propertyName] = resource[propertyName];
          }
        }

        return object;
      }

      odataGenericResource.prototype.restore = function (resource) {
        for (var propertyName in resource) {
          if (isEntityProperty(propertyName) && resource._originalResource[propertyName] !== resource[propertyName]) {
            resource[propertyName] = resource._originalResource[propertyName];
          }
        }

        return resource;
      }

      return odataGenericResource;
    });
})(window, window.angular);