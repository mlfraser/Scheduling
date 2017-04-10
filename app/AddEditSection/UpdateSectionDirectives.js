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
          
          scope.reset = function() {
            scope.buildingNumber = "";
            scope.roomNumber = "";
            scope.capacity = "";
          };
            scope.addRoom = function(){
                 globalFactory.addRoom(scope.roomNumber, scope.buildingNumber, scope.capacity).success(function(data){
                    if(data.success) {
                        var room = new Object();
                        room.buildingID = scope.buildingNumber
                        room.buildingName = data.success.result.buildingName;
                        room.capacity = scope.capacity;
                        room.roomID = data.success.result.roomID;
                        room.roomNumber = scope.roomNumber;
                        
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