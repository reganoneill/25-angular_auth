'use strict';

describe('Edit Gallery Component', function(){
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
  });

  it('should contain proper component bindings', () => {
    let mockBindings = {
      gallery: {
        name: "test gallery name",
        desc: "test gallery description"
      }
    };

    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
    expect(editGalleryCtrl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(editGalleryCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);
    this.$rootScope.$apply();
  });

  describe('editGalleryCtrl.updateGallery', () => {
    it('should make a valid PUT request', () => {
      let url = "http://localhost:8000/api/gallery/9999";
      let headers = {
        "Accept": "application/json",
        "Authorization": "Bearer test toker-e-no",
        "Content-Type": "application/json"
      };

      this.$httpBackend.expectPUT(url, {
        _id: '9999',
        name: 'updated name',
        desc: 'updated description'
      }, headers).respond(200);

      let mockBindings = {
        gallery: {
          _id: '9999',
          name: 'yarr name',
          desc: 'yarr desc'
        }
      };

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
      this.$componentController('editGallery', null, mockBindings);
      editGalleryCtrl.gallery.name = 'updated name';
      editGalleryCtrl.gallery.desc = 'updated description';
      editGalleryCtrl.updateGallery();
      expect(editGalleryCtrl.gallery.name).toEqual('updated name');
      expect(editGalleryCtrl.gallery.desc).toEqual('updated description');


      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
