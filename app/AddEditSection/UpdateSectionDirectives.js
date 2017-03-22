courseModule.directive('newCourseModal',['globalFactory', function(globalFactory){
  return {
    replace: true,
    scope: {
    },
    templateUrl: 'app/AddEditSection/courseModal.html',
    compile: function() {
        return {
            pre: function(scope, element, attrs) {
                    scope.ok = function () {
                      scope.close();
                    };

                    scope.cancel = function () {
                      scope.dismiss();
                    };
                }
            }
        }
    }
}]);