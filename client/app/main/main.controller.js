'use strict';

angular.module('dip-tasterApp')
  .controller('Main', function ($scope, $timeout, grid, dragndrop, iframeHandler, $mdBottomSheet) {
    $scope.grid = grid;
    $scope.iframeHandler = iframeHandler;
    $scope.dragndrop = dragndrop;

    $scope.showGridBottomSheet = function($event) {
      $mdBottomSheet.show({
        parent: angular.element(document.getElementById('main')),
        templateUrl: 'app/about/about.html',
        controller: 'About',
        targetEvent: $event
      })
    };
  });
