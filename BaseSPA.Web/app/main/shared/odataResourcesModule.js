(function(window, angular) {
  'use-strict';
  angular.module('odataResourcesModule', ['ui.router', 'cb.x2js', 'ODataResources'])
    
    .factory('odataGenericResource', function ($odataresource, $http, odataMetadataService) {

      function odataGenericResource(serviceRootUrl, resourcePath, key) {
        this.serviceRootUrl = serviceRootUrl;
        this.resourcePath = resourcePath;
        this.key = key;
        this.metadataService = odataMetadataService(serviceRootUrl);
        this._originalResource = null;

        this._odataResource = $odataresource(serviceRootUrl + '/' + resourcePath, {}, {}, {
          odatakey: key,
          isodatav4: true
        });

        angular.extend(this._odataResource.prototype, {
          '$patch': function (callback, callbackErr) {
            var req = {
              method: 'PATCH',
              url: serviceRootUrl + '/' + resourcePath + '(' + this.Id + ')',
              data: this
            };

            return $http(req).then(function(result) {
              callback.call(this, result);
            }, function(error) {
              callbackErr(this, error);
            });
          } 
        });
      }

      odataGenericResource.prototype.getOdataResource = function () {
        return this._odataResource.odata();
      }

      odataGenericResource.prototype.get = function (id, callback, callbackErr) {
        if (id === '') {
          this._originalResource = null;
          callback.call(this, new this._odataResource());
        } else {
          var self = this;
          this.getOdataResource().get(id, function (data) {
            self._originalResource = angular.copy(data);
            callback.call(this, data);
          },
            callbackErr);
        }
      }

      odataGenericResource.prototype.save = function (resource, callback, callbackErr) {
        if (!this._originalResource) {
          var self = this;
          resource.$save(function (data) {
              self._originalResource = angular.copy(data);
              callback.call(this, data);
            },
          callbackErr);
        } else {
          var object = new this._odataResource();
          object[this.key] = resource[this.key];

          var isChanged = false;
          for (var propertyName in resource)
          {
            if (this._originalResource[propertyName] !== resource[propertyName]) {
              object[propertyName] = resource[propertyName];
              isChanged = true;
            }
          };

          var self = this;
          if (isChanged) {
            object.$patch(function() {
              self.get(resource[self.key], callback, callbackErr);
            }, callbackErr);
          } else {
            callback.call(this, resource);
          }

        }
      }

      odataGenericResource.prototype.delete = function (resource, callback, callbackErr) {
        resource.$delete(callback, callbackErr);
      }

      return odataGenericResource;
    });
})(window, window.angular);