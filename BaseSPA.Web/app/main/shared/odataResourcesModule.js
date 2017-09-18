(function(window, angular) {
  'use-strict';
  angular.module('odataResourcesModule', ['ui.router', 'ODataResources'])
    
    .factory('odataGenericResource', function ($odataresource, $http) {

      function odataGenericResource(serviceRootUrl, resourcePath, key) {
        this.serviceRootUrl = serviceRootUrl;
        this.resourcePath = resourcePath;
        this.key = key;

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
          callback.call(this, new this._odataResource());
        } else {
          this.getOdataResource().get(id, function (data) {
            data._originalResource = angular.copy(data);
            callback.call(this, data);
          },
            callbackErr);
        }
      }

      odataGenericResource.prototype.save = function (resource, callback, callbackErr) {
        if (!resource._originalResource) {
          resource.$save(function (data) {
              data._originalResource = angular.copy(data);
              callback.call(this, data);
            },
          callbackErr);
        } else {
          var object = new this._odataResource();
          object[this.key] = resource[this.key];

          var isChanged = false;
          for (var propertyName in resource)
          {
            if (propertyName !== '_originalResource' && resource._originalResource[propertyName] !== resource[propertyName]) {
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