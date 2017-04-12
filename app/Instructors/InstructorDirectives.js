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

instructorModule.directive('instructorItem',['globalFactory', function(globalFactory){
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
                scope.instructorID = scope.instructor.InstructorID;
                scope.getInstructor = function(id, name) {
                    globalFactory.setInstructorHistoryID(id,name);
                };
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

instructorModule.directive('courseItem',['globalFactory', function(globalFactory){
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
                scope.getCourse = function(id) {
                    globalFactory.setCourseHistoryID(id).success(function(data){
                        
                    });
                };
                
                
                
                startTime = scope.course.StartTime;
                endTime = scope.course.EndTime;
                scope.time = ((parseInt(endTime.substring(0,2)) * 60 + parseInt(endTime.substring(3,5))) - (parseInt(startTime.substring(0,2)) * 60 + parseInt(startTime.substring(3,5)))) * 2;
                
                
                scope.Color = {
                    'background-color' : '#' + scope.course.Hex,
                    'width' : scope.time + 20,
                    'height' : '100px'
                };
                scope.getCourse = function(id) {
                    globalFactory.setCourseHistoryID(id);
                
                }
                
                scope.editSection = function() {
                    globalFactory.editSection(scope.sectionID);
                }
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