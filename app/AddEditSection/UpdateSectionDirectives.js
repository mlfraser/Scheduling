courseModule.directive('addCourse', ['globalFactory', '$timeout', function(globalFactory, $timeout) {
  return {
    replace: true,
    scope: {
        selectedCourse: '=',
        courses: '=',
        message: '=',
        display: '=',
        alertClass: '='
    },
    templateUrl: 'app/AddEditSection/addCourse.html',
    compile: function() {
      return {
        pre: function(scope, elem, attrs) {
          
          scope.reset = function() {
            scope.title = "";
            scope.courseID = "";
          };
            scope.addCourse = function(){
                 globalFactory.addCourse(scope.courseID, scope.title).success(function(data){
                    if(data.success) {
                        var course = new Object();
                        course.courseID = scope.courseID;
                        course.title = scope.title;
                        scope.courses.push(course);
                        scope.selectedCourse = scope.courseID.toString();
                        
                        scope.message = data.success.message;
                        scope.display = true;
                        scope.alertClass = "alert-success";
                        $timeout(function(){
                            scope.display = false;
                        },10000);
                        
                    }
                     else if(data.error.code == 1) {
                         scope.selectedCourse = scope.courseID.toString();
                         
                         scope.message = data.error.msg;
                         scope.alertClass = "alert-danger";
                         scope.display = true;
                         
                         $timeout(function(){
                            scope.display = false;
                        },10000);
                     }
                     else {
                         scope.message = data.error.msg;
                         scope.alertClass = "alert-danger";
                         scope.display = true;
                         
                         $timeout(function(){
                            scope.display = false;
                        },10000);
                     }
                });
        
            };
          
        }
      }
    }
  }
}]);


courseModule.directive('addStartTime', ['globalFactory', '$timeout', function(globalFactory, $timeout) {
  return {
    replace: true,
    scope: {
        selectedTime: '=',
        startTimes: '=',
        message: '=',
        display: '=',
        alertClass: '='
    },
    templateUrl: 'app/AddEditSection/addStartTime.html',
    compile: function() {
      return {
        pre: function(scope, elem, attrs) {
          
          scope.reset = function() {
            scope.startTime = "";
          };
            scope.addStartTime = function(){
                 globalFactory.addTime(scope.startTime).success(function(data){
                    if(data.success) {
                        var startTime = new Object();
                        startTime.timeID = data.success.result;
                        startTime.timeStartEnd = scope.startTime;
                        scope.startTimes.push(startTime);
                        
                        scope.selectedTime = startTime.timeID.toString();
                        
                        scope.message = data.success.message;
                        scope.display = true;
                        scope.alertClass = "alert-success";
                        $timeout(function(){
                            scope.display = false;
                        },10000);
                        
                    }
                     else if(data.error.code > 0) {
                         scope.selectedTime = data.error.code.toString();
                         
                         scope.message = data.error.msg;
                         scope.alertClass = "alert-danger";
                         scope.display = true;
                         
                         $timeout(function(){
                            scope.display = false;
                        },10000);
                     }
                     else {
                         scope.message = data.error.msg;
                         scope.alertClass = "alert-danger";
                         scope.display = true;
                         
                         $timeout(function(){
                            scope.display = false;
                        },10000);
                     }
                });
        
            };
          
        }
      }
    }
  }
}]);


courseModule.directive('addEndTime', ['globalFactory', '$timeout', function(globalFactory, $timeout) {
  return {
    replace: true,
    scope: {
        selectedTime: '=',
        endTimes: '=',
        message: '=',
        display: '=',
        alertClass: '='
    },
    templateUrl: 'app/AddEditSection/addEndTime.html',
    compile: function() {
      return {
        pre: function(scope, elem, attrs) {
          
          scope.reset = function() {
            scope.endTime = "";
          };
            scope.addEndTime = function(){
                 globalFactory.addTime(scope.endTime).success(function(data){
                    if(data.success) {
                        var endTime = new Object();
                        endTime.timeID = data.success.result;
                        endTime.timeStartEnd = scope.endTime;
                        scope.endTimes.push(endTime);
                        scope.selectedTime = endTime.timeID.toString();
                        
                        scope.message = data.success.message;
                        scope.display = true;
                        scope.alertClass = "alert-success";
                        $timeout(function(){
                            scope.display = false;
                        },10000);
                        
                    }
                     else if(data.error.code > 0) {
                         scope.selectedTime = data.error.code.toString();
                         
                         scope.message = data.error.msg;
                         scope.alertClass = "alert-danger";
                         scope.display = true;
                         
                         $timeout(function(){
                            scope.display = false;
                        },10000);
                     }
                     else {
                         scope.message = data.error.msg;
                         scope.alertClass = "alert-danger";
                         scope.display = true;
                         
                         $timeout(function(){
                            scope.display = false;
                        },10000);
                     }
                });
        
            };
          
        }
      }
    }
  }
}]);

courseModule.directive('addInstructor', ['globalFactory', '$timeout', function(globalFactory, $timeout) {
  return {
    replace: true,
    scope: {
        selectedInstructor: '=',
        instructors: '=',
        message: '=',
        display: '=',
        alertClass: '='
    },
    templateUrl: 'app/AddEditSection/addInstructor.html',
    compile: function() {
      return {
        pre: function(scope, elem, attrs) {
          
          scope.reset = function() {
            scope.endTime = "";
          };
            scope.addInstructor = function(){
                 globalFactory.addInstructor(scope.instructorName).success(function(data){
                    if(data.success) {
                        var instructor = new Object();
                        instructor.instructorID = data.success.result;
                        instructor.name = scope.instructorName;
                        scope.instructors.push(instructor);
                        
                        scope.selectedInstructor = [];
                        scope.selectedInstructor.push(instructor.instructorID.toString());
                        
                        scope.message = data.success.message;
                        scope.display = true;
                        scope.alertClass = "alert-success";
                        $timeout(function(){
                            scope.display = false;
                        },10000);
                        
                    }
                     else if(data.error.code > 0) {
                         scope.selectedInstructor = [];
                        scope.selectedInstructor.push(data.error.code.toString());
                         
                         scope.message = data.error.msg;
                         scope.alertClass = "alert-danger";
                         scope.display = true;
                         
                         $timeout(function(){
                            scope.display = false;
                        },10000);
                     }
                     else {
                         scope.message = data.error.msg;
                         scope.alertClass = "alert-danger";
                         scope.display = true;
                         
                         $timeout(function(){
                            scope.display = false;
                        },10000);
                     }
                });
        
            };
          
        }
      }
    }
  }
}]);


courseModule.directive('addRoom', ['globalFactory', '$timeout', function(globalFactory, $timeout) {
  return {
    replace: true,
    scope: {
        selectedRoom: '=',
        rooms: '=',
        message: '=',
        display: '=',
        alertClass: '='
    },
    templateUrl: 'app/AddEditSection/addRoom.html',
    compile: function() {
      return {
        pre: function(scope, elem, attrs) {
          scope.isLab = false;
          scope.reset = function() {
            scope.buildingNumber = "";
            scope.roomNumber = "";
            scope.capacity = "";
            scope.isLab = false;
          };
            scope.addRoom = function(){
                 globalFactory.addRoom(scope.roomNumber, scope.buildingNumber, scope.capacity, scope.isLab).success(function(data){
                    if(data.success) {
                        var room = new Object();
                        room.buildingID = scope.buildingNumber
                        room.buildingName = data.success.result.buildingName;
                        room.capacity = scope.capacity;
                        room.roomID = data.success.result.roomID;
                        room.roomNumber = scope.roomNumber;
                        room.isLab = scope.isLab;
                        
                        scope.rooms.push(room);
                        
                        scope.selectedRoom = data.success.result.roomID.toString();
                        
                        scope.message = data.success.message;
                        scope.display = true;
                        scope.alertClass = "alert-success";
                        $timeout(function(){
                            scope.display = false;
                        },10000);
                        
                    }
                     else if(data.error.code > 0) {
                         scope.selectedRoom = data.error.code.toString();
                         
                         scope.message = data.error.msg;
                         scope.alertClass = "alert-danger";
                         scope.display = true;
                         
                         $timeout(function(){
                            scope.display = false;
                        },10000);
                     }
                     else {
                         scope.message = data.error.msg;
                         scope.alertClass = "alert-danger";
                         scope.display = true;
                         
                         $timeout(function(){
                            scope.display = false;
                        },10000);
                     }
                });
        
            };
          
        }
      }
    }
  }
}]);


courseModule.directive('deleteSection', ['globalFactory', '$timeout', function(globalFactory, $timeout) {
  return {
    replace: true,
    scope: {
        parentScope: '=',
        message: '=',
        display: '=',
        alertClass: '='
    },
    templateUrl: 'app/AddEditSection/deleteSection.html',
    compile: function() {
      return {
        pre: function(scope, elem, attrs) {

            scope.delete = function(){
                globalFactory.deleteSection(scope.parentScope.sectionID).success(function(data){
                    if(data.success) {
                        
                        scope.parentScope.pageTitle = "Add New";
                        scope.parentScope.isUpdate = false;
                        scope.parentScope.sectionID = null;
                        scope.parentScope.sectionName = "";
                        scope.parentScope.sectionTitle = "";
                        scope.parentScope.year = "";
                        scope.parentScope.selectedCourse = 0;
                        scope.parentScope.selectedRoom = 0;
                        scope.parentScope.selectedSemester = 0;
                        scope.parentScope.selectedStartTime = 0;
                        scope.parentScope.selectedEndTime = 0;
                        scope.parentScope.crn = "";
                        scope.parentScope.isOnline = false;
                        scope.parentScope.isLab = false;
                        scope.parentScope.credits = "";
                        scope.parentScope.isMonday = false;

                        scope.parentScope.isTuesday = false;

                        scope.parentScope.isWednesday = false;

                        scope.parentScope.isThursday = false;

                        scope.parentScope.isFriday = false;

                        scope.parentScope.selectedInstructor = [];
                        
                        scope.message = data.success.message;
                        scope.display = true;
                        scope.alertClass = "alert-success";
                        $timeout(function(){
                            scope.display = false;
                        },10000);
                        
                    }
                     else {
                         scope.message = data.error.msg;
                         scope.alertClass = "alert-danger";
                         scope.display = true;
                         
                         $timeout(function(){
                            scope.display = false;
                        },10000);
                     }
                });
                };
        
            }
          
        }
      }
    }
  }]);