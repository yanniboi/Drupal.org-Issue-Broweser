var module = angular.module('yanniboi.utils', []);

/**
 * Cache Service
 *
 * Handles storing and recalling information in the Cache.
 */
module.factory('CacheService', function($cacheFactory) {
  var CacheService = $cacheFactory('CacheService');

  return {
    getVar: function(key) {
      var envVar = CacheService.get(key);

      if (envVar) {
        return envVar;
      }

      var localVar = localStorage.getItem(key);
      if (localVar) {
        this.setVar(key, JSON.parse(localVar));
        return JSON.parse(localVar);
      }

      return null;
    },
    setVar: function(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
      CacheService.put(key, value);
    },
    clearVar: function(key) {
      CacheService.put(key, '');
    }
  };
});

/**
 * Utils Factory
 *
 * Helpful functions to clean up code.
 */
module.factory('Utils', function($rootScope, $ionicLoading, $timeout) {
  return {
    notifyShow: function(text) {
      $rootScope.notifier = $ionicLoading.show({
        content: text ? text : 'Loading..',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    },
    notifyHide: function() {
      $ionicLoading.hide();
    },
    notify: function() {
      this.notifyShow('temp');
      $timeout(this.notifyHide,3000);
    },
    generateRandomString: function (length) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    serialize: function (obj, prefix) {
      var str = [];
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
          str.push(typeof v == "object" ?
            this.serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
      }
      return str.join("&");
    },
    parseQueryString: function(queryString) {
      var qs = decodeURIComponent(queryString),
        obj = {},
        params = qs.split('&');
      params.forEach(function (param) {
        var splitter = param.split('=');
        obj[splitter[0]] = splitter[1];
      });
      return obj;
    }
  };
});