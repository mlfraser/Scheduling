var shared = angular.module('shared',                                   ['ui.router', 'ngAnimate',  'ngTouch', 'ui.bootstrap']);
var homeModule = angular.module('homeModule',                           ['shared']);
var labModule = angular.module('labModule',                             ['shared', 'ui.calendar']);
var instructorModule = angular.module('instructorModule',               ['shared']);
var roomModule = angular.module('roomModule',                           ['shared', 'ui.calendar']);
var courseModule = angular.module('courseModule',                       ['shared']);
var courseHistoryModule = angular.module('courseHistoryModule',         ['shared']);
var instructorHistoryModule = angular.module('instructorHistoryModule', ['shared']);
var sectionHistoryModule = angular.module('sectionHistoryModule',       ['shared', 'datatables']);

var updateSectionModule = angular.module('updateSectionModule',         ['shared']);
var importModule = angular.module('importModule',                       ['shared', 'ngFileUpload']);
var buildingModule = angular.module('buildingModule',                   ['shared']); 

var app = angular.module('app', ['shared', 'labModule', 'instructorModule', 'roomModule', 'courseModule', 'homeModule', 'courseHistoryModule', 'instructorHistoryModule', 'importModule', 'updateSectionModule', 'buildingModule', 'sectionHistoryModule']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: false, // Will introduce the '#/' into route but will allow for each page to reload without server side configurations
      requireBase: false //must specify no <base> tag in index.html
    });

    $urlRouterProvider.otherwise("/updateSection");

    $stateProvider.state('labs', {
        url: "/labs",
        templateUrl: "app/Labs/lab.html",
        controller: "LabController",
        controllerAs: "labCtrl"
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
    }).state('course-history', {
        url: "/courseHistory",
        templateUrl: "app/CourseHistory/courseHistory.html",
        controller: "CourseHistoryController",
        controllerAs: "courseHistoryCtrl"
    }).state('instructor-history', {
        url: "/instructorHistory",
        templateUrl: "app/InstructorHistory/instructorHistory.html",
        controller: "InstructorHistoryController",
        controllerAs: "instructorHistoryCtrl"
    }).state('section-history', {
        url: "/sectionHistory",
        templateUrl: "app/SectionHistory/sectionHistory.html",
        controller: "SectionHistoryController",
        controllerAs: "sectionHistoryCtrl"
    }).state('import', {
        url: "/import",
        templateUrl: "app/Import/import.html",
        controller: "ImportController",
        controllerAs: "importCtrl"
    }).state('buildings', {
        url: "/buildings",
        templateUrl: "app/Buildings/buildings.html",
        controller: "BuildingController",
        controllerAs: "buildingCtrl"
    }).state('update-section', {
        url: "/updateSection",
        templateUrl: "app/AddEditSection/section.html",
        controller: "UpdateSectionController",
        controllerAs: "updateSectionCtrl"
    });
}]);
