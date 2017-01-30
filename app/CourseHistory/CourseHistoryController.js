courseHistoryModule.controller('CourseHistoryController', ['globalFactory', function(globalFactory){
  var self = this;
    self.courseID = globalFactory.getCourseHistoryID();
    globalFactory.getCourseHistory(self.courseID).success(function(data){
        self.course = data.success.result;
    });
}]);
