instructorHistoryModule.controller('InstructorHistoryController', ['globalFactory', function(globalFactory){
  var self = this;
    self.instructorID = globalFactory.getInstructorHistoryID();
    self.instructorName = globalFactory.getInstructorHistoryName();
    globalFactory.getInstructorHistory(self.instructorID).success(function(data){
        self.instructor = data.success.result;
    });
}]);
