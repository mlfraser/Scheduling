courseModule.controller('CourseController', ['globalFactory', function(globalFactory){
  var self = this;
    globalFactory.getSemester().success(function(data){
        self.semester = data.success.result[0].semester;
        self.year = data.success.result[0].year;
        self.semesters = data.success.result;
        //get instructors
        globalFactory.getCourses(self.semester, self.year).success(function(data){
            self.days = data.success.result;
        });
    });
}]);
