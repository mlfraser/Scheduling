labModule.directive('labSemesterList',[function(){
  return {
    transclude: true,
    replace: true,
    scope: {
        semesters: '='
    },
    templateUrl: 'app/Labs/semesterList.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.selectedSemester = 0;
               
            }
        }
    }
  }
}]);

labModule.directive('labSemesterItem',['globalFactory', function(globalFactory){
  return {
    replace: true,
    scope: {
        semester: '=',
        selectedSemester: '='
    },
    templateUrl: 'app/Labs/semesterItem.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                scope.semesterTime = scope.semester.semester;
                scope.year = scope.semester.year;
                scope.i = scope.semester.i;
                
                scope.changeSemester = function(i) {
                    scope.selectedSemester = i;
                    globalFactory.getLabs(scope.semesterTime, scope.year).success(function(data){
                        scope.$parent.$parent.$parent.labCtrl.uiConfig = data.success.result;
                    });
                };
                }
            }
        }
    }
}]);