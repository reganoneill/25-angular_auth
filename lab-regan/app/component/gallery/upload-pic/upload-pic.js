'use strict';

require('./_upload-pic.scss');

module.exports = {
  template: require('./upload-pic.html'),
  controller: ['$log', 'picService', UploadPicController],
  controllerAs: 'uploadPicCtrl',
  bindings: {
    gallery: '<'
  }
};

function UploadPicController($log, picService){
  $log.debug('UploadPicController');

  this.pic = {};
  this.accOpen = false;
  this.uploadPic = function(){
    this.accOpen = false;
    picService.uploadGalleryPic(this.gallery, this.pic)
    .then( (returnobj) => {
      this.pic.name = null;
      this.pic.desc = null;
      this.pic.file = null;
    });
  };
};
