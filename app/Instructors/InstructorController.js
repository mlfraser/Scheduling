instructorModule.controller('InstructorController', ['globalFactory', function(globalFactory){
  var self = this;
    //get the current semester and year to start
    globalFactory.getSemester().success(function(data){
        self.semester = data.success.result[0].semester;
        self.year = data.success.result[0].year;
        self.semesters = data.success.result;
        //get instructors
        globalFactory.getInstructors(self.semester, self.year).success(function(data){
            self.instructors = data.success.result;
        });
    });
    
}]);
