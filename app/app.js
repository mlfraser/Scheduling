var shared = angular.module('shared',                       ['ui.router', 'ngAnimate',  'ngTouch', 'ui.bootstrap']);
var homeModule = angular.module('homeModule',               ['shared']);
var labModule = angular.module('labModule',                 ['shared']);
var instructorModule = angular.module('instructorModule',   ['shared']);
var roomModule = angular.module('roomModule',               ['shared']);
var courseModule = angular.module('courseModule',           ['shared']);

var app = angular.module('blue', ['shared', 'labModule', 'instructorModule', 'roomModule', 'courseModule', 'homeModule']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: false, // Will introduce the '#/' into route but will allow for each page to reload without server side configurations
      requireBase: false //must specify no <base> tag in index.html
    });

    $urlRouterProvider.otherwise("/");

    $stateProvider.state('home', {
        url: "/",
        templateUrl: "app/Home/home.html",
        controller: "HomeController",
        controllerAs: "homeCtrl"
    }).state('labs', {
        url: "/labs",
        templateUrl: "app/Labs/lab.html",
        controller: "TeamController",
        controllerAs: "teamCtrl"
    }).state('instructors', {
        url: "/instructors",
        templateUrl: "app/Instructors/instructor.html",
        controller: "InstructorController",
        controllerAs: "instructorCtrl"
    }).state('rooms', {
        url: "/rooms",
        templateUrl: "app/Rooms/room.html",
        controller: "RoomController",
        controllerAs: "roomCtrl"
    }).state('courses', {
        url: "/courses",
        templateUrl: "app/Courses/course.html",
        controller: "CourseController",
        controllerAs: "courseCtrl"
    });
}]);