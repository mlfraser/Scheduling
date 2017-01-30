instructorHistoryModule.controller('InstructorHistoryController', ['globalFactory', function(globalFactory){
  var self = this;
    self.instructorID = globalFactory.getInstructorHistoryID();
    globalFactory.getInstructorHistory(self.instructorID).success(function(data){
        self.instructor = data.success.result;
    });
}]);
