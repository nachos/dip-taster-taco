'use strict';

angular.module('dip-tasterApp')
  .service('iframeHandler', function($timeout) {
    var self = this;

    this.linkIframe = function (item) {
      self.loaded = false;
      var nachosApi = require('nachos-api');
      var api = {};
      api.getSettings = function (cb) {
        nachosApi.settings(item.name).get(function (err, config) {
          cb(err, config);
        });
      };

      api.saveSettings = function (config, cb) {
        nachosApi.settings(item.name).save(config, function (err) {
          cb(err);
        })
      };

      item.content = getIframeContent(item);

      $timeout(function () {
        self.item = item;
        self.loaded = true;
      });
    };

    function getIframeContent(dip) {
      var nachosApi = require('nachos-api');

      var api = {
        global: function (globalDefaults) {
          var settings = nachosApi.settings(dip.name, {
            globalDefaults: globalDefaults
          });

          return {
            get: function (callback) {
              settings.get(callback);
            },
            save: function (config, callback) {
              settings.save(config, callback);
            },
            onChange: function (callback) {
              settings.onChange(callback);
            }
          };
        },
        instance: function (instanceDefaults) {
          var instance = nachosApi.settings(dip.name).instance(dip.id, {
            instanceDefaults: instanceDefaults
          });

          return {
            get: function (callback) {
              //instance.get(callback);
              callback(instanceDefaults);
            },
            save: function (config, callback) {
              //instance.save(config, callback);
            },
            onChange: function (callback) {
              //instance.onChange(callback);
            }
          };
        }
      };

      // TODO: Remove later after nachos-api is published
      api.system = nachosApi.system;

      return {
        require: require('relative-require')(dip.main),
        dipApi: api
      };
    }
  });
