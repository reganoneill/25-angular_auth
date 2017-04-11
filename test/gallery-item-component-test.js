


//workin



'use strict';

describe('Gallery Item Component', function(){
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
        _id: '9999',
        name: "test gallery name",
        desc: "test gallery description"
      }
    };

    let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
    expect(galleryItemCtrl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(galleryItemCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);
    this.$rootScope.$apply();
  });

  describe('galleryItemCtrl.deleteGallery', () => {
    it('should make a valid DELETE request', () => {
      let url = "http://localhost:8000/api/gallery/9999";
      let headers = {
        "Authorization": "Bearer test toker-e-no",
        "Accept": "application/json, text/plain, */*"
      };

      this.$httpBackend.expectDELETE(url, headers).respond(204);

      let mockBindings = {
        gallery: {
          _id: '9999',
          name: 'yarr name',
          desc: 'yarr desc'
        }
      };

      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
      this.$componentController('galleryItem', null, mockBindings);
      galleryItemCtrl.gallery.name = 'updated name';
      galleryItemCtrl.gallery.desc = 'updated description';
      galleryItemCtrl.deleteGallery();
      expect(galleryItemCtrl.gallery.name).toEqual('updated name');
      expect(galleryItemCtrl.gallery.desc).toEqual('updated description');


      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
