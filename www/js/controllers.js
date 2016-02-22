angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $state, $ionicPopup) {
    $scope.logout = function () {
        $state.go("login");
    }
    $scope.opdPatient = function () {
        $state.go("register");
    }
    $scope.admitPatient = function () {
        $state.go("register");
    }
})

.controller('RegisterCtrl', function ($scope, $state, $ionicPopup) {
    $scope.takePicture = function () {
        navigator.camera.getPicture(function (imageURI) {
            // imageURI is the URL of the image that we can use for
            // an <img> element or backgroundImage.
        }, function (err) {
// Ruh-roh, something bad happened
        }, cameraOptions);
    }
})


.controller('LoginCtrl', function ($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {
        username: '',
        password: ''
    };
    $scope.login = function () {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
            $state.go('dashboard');
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
});
