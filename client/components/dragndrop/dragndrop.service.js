'use strict';

angular.module('dip-tasterApp')
  .service('dragndrop', function($timeout, iframeHandler) {
    var Packages = require('nachos-packages');
    var fs = require('fs');
    var path = require('path');
    var jf = require('jsonfile');

    var packages = new Packages();
    var self = this;
    // prevent default behavior from changing page on dropped file
    window.ondragover = function (e) {
      e.preventDefault();

      return false
    };
    window.ondragenter = function (e) {
      $timeout(function () {
        self.drag = true;
      });
      return false
    };

    window.ondragleave = function (e) {
      $timeout(function () {
        self.drag = false;
      });
      return false
    };

    window.ondrop = function (e) {
      $timeout(function () {
        self.drag = false;
      });
      e.preventDefault();
      return false
    };

    var holder = document.getElementById('holder');
    holder.ondragover = function () {
      this.className = 'hover';
      $timeout(function () {
        self.drag = true;
      });
      return false;
    };
    holder.ondragleave = function () {
      this.className = '';
      $timeout(function () {
        self.drag = false;
      });
      return false;
    };
    holder.ondrop = function (e) {
      e.preventDefault();

      if (e.dataTransfer.files.length === 1) {
        var item = {
          path: e.dataTransfer.files[0].path
        };

        var configPath = path.join(item.path, 'nachos.json');

        fs.exists(configPath, function (exists) {
          if (!exists) {
            return console.log('no nachos.json');
          }

          jf.readFile(configPath, function (err, config) {
            item.main = path.join(item.path, config.main);
            item.name = config.name;

            iframeHandler.linkIframe(item);
          });
        });
      }
      return false;
    };
  });
