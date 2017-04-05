'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService){
  $log.debug('picService');

  let service = {};

  service.uploadGalleryPic = function(galleryData, picData){
    $log.debug('service.uploadGalleryPic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file
        }
      });
    })
    .then( res => {
      galleryData.pics.unshift(res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deletePic = function(galleryData, picID){
    $log.debug('galleryService.deletePic');
    console.log(galleryData.pics, 'WOW THERE IS THE pic array!');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picID}`;
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      return $http.delete(url, config);
    })
    .then( res => {
      for(let i = 0; i < galleryData.pics.length; i++){
        let current = galleryData.pics[i];
        if(current._id === picID){
          galleryData.pics.splice(i, 1);
          break;
        };
      };
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
};
