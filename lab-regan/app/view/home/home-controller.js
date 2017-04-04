'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController];

function HomeController($log, $rootScope, galleryService) {
  $log.debug('HomeController');

  this.galleries = [];

  this.fetchGalleries = function() {
    galleryService.fetchGalleries()
    .then( galleries => {
      this.galleries = galleries;
      this.currentGallery = galleries[0];
    });
  };

  this.galleryDeleteDone = function(gallery){
    if(this.currentGallery._id === gallery._id){
      this.currentGallery = null;
    }
  };

  this.fetchGalleries();

//TODO: shouldn't this be causing the gallery thumbnail container to show once a gallery item gets generated/displayed onto the page? How can I make this happen?
  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });


};
