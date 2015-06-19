'use strict';
angular.module('dip-tasterApp', ['ngMaterial', 'ui.router', 'gridster', 'iframeWrapper'])
  .config(function ($mdThemingProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');

    $mdThemingProvider.theme('default')
      .primaryPalette('orange');
  });

