roomModule.controller('RoomController', ['globalFactory', function(globalFactory){
    var self = this;
    
    self.editSection = function() {
        
    }
    
    globalFactory.getSemester().success(function(data){
        self.semester = data.success.result[0].semester;
        self.year = data.success.result[0].year;
        self.semesters = data.success.result;
        globalFactory.getRooms(self.semester, self.year).success(function(data){
            self.uiConfig = data.success.result;
            //self.uiConfig.calendar.dayClick = self.editSection;
        });
    });
    
}]);
