roomModule.directive('roomSemesterList',[function(){
  return {
    transclude: true,
    replace: true,
    scope: {
        semesters: '='
    },
    templateUrl: 'app/Rooms/semesterList.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.selectedSemester = 0;
               
            }
        }
    }
  }
}]);

roomModule.directive('roomSemesterItem',['globalFactory', function(globalFactory){
  return {
    replace: true,
    scope: {
        semester: '=',
        selectedSemester: '='
    },
    templateUrl: 'app/Rooms/semesterItem.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.semesterTime = scope.semester.semester;
                scope.year = scope.semester.year;
                scope.i = scope.semester.i;
                
                scope.changeSemester = function(i) {
                    scope.selectedSemester = i;
                    globalFactory.getRooms(scope.semesterTime, scope.year).success(function(data){
                        scope.$parent.$parent.$parent.roomCtrl.uiConfig = data.success.result;
                    });
                };
                }
            }
        }
    }
}]);