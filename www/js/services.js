angular.module('Services', [])

.factory('CloudinaryService', function($q, $ionicLoading, $cordovaFileTransfer, $ionicPlatform) {
  return {
    uploadImage: function(imageURI) {

      var deferred = $q.defer();

      var uploadOptions = {
        params : {
          'upload_preset': "YOUR_IMAGE_UPLOAD_PRESET",
        }
      };

      $cordovaFileTransfer
        // Your Cloudinary URL will go here
        //Ex : https://api.cloudinary.com/v1_1/EXAMPLE/image/upload
        .upload("YOUR_IMAGE_UPLOAD_LINK", imageURI, uploadOptions)

        .then(function(result) {

          // Let the user know the upload is completed
          $ionicLoading.show({template : 'Upload Completed', duration: 1000});

          // Result has a "response" property that is escaped
          // FYI: The result will also have URLs for any new images generated with
          // eager transformations
          var response = JSON.parse(decodeURIComponent(result.response));
          deferred.resolve(response);

        }, function(err) {

          $ionicLoading.show({template : 'Upload Failed', duration: 3000});
          deferred.reject(err);

        }, function (progress) {

          $ionicLoading.show({template : 'Uploading Photo'});

        });

        return deferred.promise;
      }
    }
});
