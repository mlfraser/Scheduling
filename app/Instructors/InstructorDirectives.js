instructorModule.directive('instructorList',[function(){
  return {
    transclude: true,
    replace: true,
    scope: {
        instructors: '='
    },
    templateUrl: 'app/Instructors/instructorList.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                
               
            }
        }
    }
  }
}]);

instructorModule.directive('instructorItem',[function(){
  return {
    transclude: true,
    replace: true,
    scope: {
        instructor: '='
    },
    templateUrl: 'app/Instructors/instructorItem.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.instructorName = scope.instructor.InstructorName
                scope.courses = scope.instructor.Courses;
                
                }
            }
        }
    }
}]);

instructorModule.directive('courseList',[function(){
  return {
    transclude: true,
    scope: {
        courses: '='
    },
    templateUrl: 'app/Instructors/courseList.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                
            }
        }
    }
  }
}]);

instructorModule.directive('courseItem',[function(){
  return {
    replace:true,
    scope: {
        course: '='
    },
    templateUrl: 'app/Instructors/courseItem.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.courseTitle = scope.course.CourseTitle;
                scope.sectionName = scope.course.SectionName;
                scope.startTime = scope.course.StartTime;
                scope.endTime = scope.course.EndTime;
                scope.credits = scope.course.Credits;
                scope.isLab = scope.course.IsLab;
                scope.courseID = scope.course.CourseID;
                scope.sectionID = scope.course.SectionID;
                scope.days = scope.course.Days;
            }
        }
    }
  }
}]);

instructorModule.directive('semesterList',[function(){
  return {
    transclude: true,
    replace: true,
    scope: {
        semesters: '='
    },
    templateUrl: 'app/Instructors/semesterList.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.selectedSemester = 0;
               
            }
        }
    }
  }
}]);

instructorModule.directive('semesterItem',['globalFactory', function(globalFactory){
  return {
    transclude: true,
    replace: true,
    scope: {
        semester: '=',
        selectedSemester: '='
    },
    templateUrl: 'app/Instructors/semesterItem.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.semesterTime = scope.semester.semester;
                scope.year = scope.semester.year;
                scope.i = scope.semester.i;
                
                scope.changeSemester = function(i) {
                    scope.selectedSemester = i;
                    globalFactory.getInstructors(scope.semesterTime, scope.year).success(function(data){
                        scope.$parent.$parent.$parent.instructorCtrl.instructors = data.success.result;
                    });
                };
                }
            }
        }
    }
}]);