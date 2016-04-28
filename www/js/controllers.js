angular.module('Controllers', [])

.controller('AppCtrl', function($scope) {

})

.controller('MainCtrl', function($scope, $cordovaCamera, CloudinaryService) {

  $scope.picture = "img/ionic.png";
  $scope.hide = false;
  $scope.takePicture = function() {
    var options = {
      // quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      // allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      // targetWidth: 300,
      // targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.picture = "data:image/jpeg;base64," + imageData;
      $scope.hide = true;
    }, function(err) {
      // error
    });
  };

  $scope.uploadPicture = function() {
    CloudinaryService.uploadImage($scope.picture).then(
      function(result) {
        $scope.success = 'result: '+JSON.stringify(result);
        var url = result.secure_url || '';
        var urlSmall;

        if(result && result.eager[0]) urlSmall = result.eager[0].secure_url || '';

        // Do something with the results here.

        $cordovaCamera.cleanup();
      },
      function(err) {
        $scope.error = 'error: '+JSON.stringify(err);
        // Do something with the error here
        $cordovaCamera.cleanup();
      });
    };




})
