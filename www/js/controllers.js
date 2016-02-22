angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $state, $ionicPopup) {
    $scope.logout = function () {
        $state.go("login");
    }
    $scope.listPatient = function () {
        $state.go("patientlist");
    }
})

.controller('RegisterCtrl', function ($scope, $state, $ionicPopup, $firebaseArray, $cordovaCamera) {
    $scope.data = {
        firstname: '',
        lastname: '',
        age: '',
        mobilenumber: '',
        address: '',
        email: '',
        imageurl: "../images/default.png"
    };

    $scope.takePicture = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 150,
            targetHeight: 150,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function (imageData) {
            console.log(imageData);
            $scope.data.imageurl = "data:image/gif;base64," + imageData;
        }, function (error) {
            console.error(error);
        });
    }
    $scope.addPatient = function () {
        $scope.data.id = new Date().getUTCMilliseconds();
        if (localStorage.getItem("patients")) {
            var patients = JSON.parse(localStorage.getItem("patients"));
            patients.push($scope.data);
            localStorage.setItem("patients", JSON.stringify(patients));
        } else {
            localStorage.setItem("patients", JSON.stringify([$scope.data]));
        }
    }
})


.controller('PatientListCtrl', function ($scope, LoginService, $ionicPopup, $state) {
    $scope.showReorder = false;
    $scope.showDelete = false;
    $scope.patients = [];
    if (localStorage.getItem("patients")) {
        $scope.patients = JSON.parse(localStorage.getItem("patients"));
    }
    console.log("$scope.patients..." + JSON.stringify($scope.patients));
    $scope.addPatient = function () {
        $state.go("register");
    }
    $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.patients.splice(fromIndex, 1);
        $scope.patients.splice(toIndex, 0, item);
    }
    $scope.onItemDelete = function (item) {
        var index;
        for (var i = 0; i < $scope.patients.length; i++) {
            if ($scope.patients[i].id == item.id) {
                index = i;
            }
        }
        $scope.patients.splice(index, 1);
    }
    $scope.doRefresh = function () {
        if (localStorage.getItem("patients")) {
            $scope.patients = JSON.parse(localStorage.getItem("patients"));
            $scope.$broadcast('scroll.refreshComplete');
        } else {
            $scope.$broadcast('scroll.refreshComplete');
        }
    }
    $scope.toggleStar = function (item) {
        item.star = !item.star;
    }
})

.controller('LoginCtrl', function ($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {
        username: '',
        password: ''
    };
    $scope.login = function () {
        $scope.data.username = "user";
        $scope.data.password = "1234";
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
