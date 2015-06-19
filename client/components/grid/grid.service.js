'use strict';

angular.module('dip-tasterApp')
  .service('grid', function() {
    var self = this;

    this.settings = {
      columns: 50,
      pushing: false,
      swapping: true,
      floating: false,
      maxRows: 30,
      minSizeX: 5,
      minSizeY: 5,
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false,
        handles: ['n', 'e', 's', 'w', 'se', 'sw']
      }
    };

    this.editMode = false;

    this.toggleEditMode = function(){
      self.editMode = !self.editMode;
      self.settings.resizable.enabled = self.settings.draggable.enabled = self.editMode;
    };
  });
