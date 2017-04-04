'use strict';

describe('Auth Service', function(){
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, authService, $window, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('authService.getToken', () => {
    it('should return a token', () => {
      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'test toker-e-no');
      this.authService.getToken()
      .then( token => {
        expect(token).toEqual('test toker-e-no');
      })
      .catch( err => {
        expect(err).toEqual(null);
      });
      //this should be at the bottom of *most* test files
      this.$rootScope.$apply();
    });
  });
});
