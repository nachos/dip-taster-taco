'use strict';

angular.module('dip-tasterApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'Main'
      });
  });
