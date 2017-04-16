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
                
                
                
                var startTime = scope.course.StartTime;
                var endTime = scope.course.EndTime;
                
                var hours = Number(startTime.match(/^(\d+)/)[1]);
                var minutes = Number(startTime.match(/:(\d+)/)[1]);
                var AMPM = startTime.match(/\s(.*)$/)[1];
                if(AMPM == "pm" && hours<12) hours = hours+12;
                if(AMPM == "am" && hours==12) hours = hours-12;
                var sHours = hours.toString();
                var sMinutes = minutes.toString();
                if(hours<10) sHours = "0" + sHours;
                if(minutes<10) sMinutes = "0" + sMinutes;
                startTime = sHours + ":" + sMinutes;
                
                hours = Number(endTime.match(/^(\d+)/)[1]);
                minutes = Number(endTime.match(/:(\d+)/)[1]);
                AMPM = endTime.match(/\s(.*)$/)[1];
                if(AMPM == "pm" && hours<12) hours = hours+12;
                if(AMPM == "am" && hours==12) hours = hours-12;
                sHours = hours.toString();
                sMinutes = minutes.toString();
                if(hours<10) sHours = "0" + sHours;
                if(minutes<10) sMinutes = "0" + sMinutes;
                endTime = sHours + ":" + sMinutes;
                
                var diff = Math.abs(new Date('2011/10/09 ' + endTime) - new Date('2011/10/09 ' + startTime));
                
                
                
                scope.time = Math.floor((diff/1000)/60) * 2;
                
                if((Math.floor(scope.time / 70) + 1) > 12 || (Math.floor(scope.time / 70) + 1) < 1) {
                    scope.classSize = "col-sm-12";
                }
                else {
                    scope.classSize = "col-sm-" + (Math.floor(scope.time / 70) + 1);
                }
                
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