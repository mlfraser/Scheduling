courseModule.directive('day',[function(){
  return {
    transclude: true,
    replace: true,
    scope: {
        dow: '@',
        times: '='
    },
    templateUrl: 'app/Courses/day.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.dow = scope.dow;
                scope.times = scope.times;
            }
        }
    }
  }
}]);

courseModule.directive('timeList',[function(){
  return {
    transclude: true,
    replace: true,
    scope: {
        times: '='
    },
    templateUrl: 'app/Courses/timeList.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.times = scope.times;
            }
        }
    }
  }
}]);

courseModule.directive('timeItem',[function(){
  return {
    transclude: true,
    replace: true,
    scope: {
        time: '='
    },
    templateUrl: 'app/Courses/timeItem.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.timeDur = scope.time.StartTime + " - " + scope.time.EndTime;
                scope.courses = scope.time.Courses;
            }
        }
    }
  }
}]);

courseModule.directive('cItem',[function(){
  return {
    replace: true,
    scope: {
        course: '='
    },
    templateUrl: 'app/Courses/courseItem.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.CourseID = scope.course.CourseID;
                scope.RoomNumber = scope.course.RoomNumber;
                scope.BuildingName = scope.course.BuldingName;
                scope.Instructors = scope.course.Instructors;
            }
        }
    }
  }
}]);








courseModule.directive('courseSemesterList',[function(){
  return {
    transclude: true,
    replace: true,
    scope: {
        semesters: '='
    },
    templateUrl: 'app/Courses/semesterList.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.selectedSemester = 0;
               
            }
        }
    }
  }
}]);

courseModule.directive('courseSemesterItem',['globalFactory', function(globalFactory){
  return {
    replace: true,
    scope: {
        semester: '=',
        selectedSemester: '='
    },
    templateUrl: 'app/Courses/semesterItem.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.semesterTime = scope.semester.semester;
                scope.year = scope.semester.year;
                scope.i = scope.semester.i;
                
                scope.changeSemester = function(i) {
                    scope.selectedSemester = i;
                    globalFactory.getCourses(scope.semesterTime, scope.year).success(function(data){
                        scope.$parent.$parent.$parent.courseCtrl.days = data.success.result;
                    });
                };
                }
            }
        }
    }
}]);