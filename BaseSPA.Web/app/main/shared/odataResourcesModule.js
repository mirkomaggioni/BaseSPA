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
          '$patch': function() {
            var req = {
              method: 'PATCH',
              url: serviceRootUrl + '/' + resourcePath + '(' + this.Id + ')',
              data: this
            };

            return $http(req);
          }
        });
      }

      odataGenericResource.prototype.getOdataResource = function () {
        return this._odataResource.odata();
      }

      odataGenericResource.prototype.create = function () {
        return new this._odataResource();
      }

      return odataGenericResource;
    });
})(window, window.angular);