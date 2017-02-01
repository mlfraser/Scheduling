courseModule.controller('CourseController', ['globalFactory', function(globalFactory){
  var self = this;
    globalFactory.getSemester().success(function(data){
        self.semester = data.success.result[0].semester;
        self.year = data.success.result[0].year;
        self.isLab = 0;
        self.semesters = data.success.result;
        //get instructors
        globalFactory.getCourses(self.semester, self.year, self.isLab).success(function(data){
            self.days = data.success.result;
        });
    });
    
    self.setIsLab = function(isLab){
        self.isLab = isLab;
        globalFactory.getCourses(self.semester, self.year, isLab).success(function(data){
            self.days = data.success.result;
        });
    };
}]);
