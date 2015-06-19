'use strict';

angular.module('dip-tasterApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell', {
        abstract: true,
        controller: 'Shell',
        templateUrl: 'app/shell/shell.html'
      });
  });
