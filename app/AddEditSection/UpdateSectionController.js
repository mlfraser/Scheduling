updateSectionModule.controller('UpdateSectionController', ['globalFactory', function(globalFactory){
  var self = this;
    self.isMonday = false;
    self.isTuesday = false;
    self.isWednesday = false;
    self.isThursday = false;
    self.isFriday = false;
    self.isLab = false;
    self.isOnline = false;
    
   


    
    globalFactory.getDataForSections().success(function(data){
        self.courses = data.success.result.Courses;
        self.times = data.success.result.Times;
        self.semesters = data.success.result.Semesters;
        self.rooms = data.success.result.Rooms;
        self.instructors = data.success.result.Instructors;
        self.days = data.success.result.Days;
    });
    
    self.addSection = function() {
        var params = new Object();
        params.sectionName = self.sectionName;
        params.sectionTitle = self.sectionTitle;
        params.year = self.year;
        params.courseID = self.selectedCourse;
        params.roomID = self.selectedRoom;
        params.semesterID = self.selectedSemester;
        params.startTimeID = self.selectedStartTime;
        params.endTimeID = self.selectedEndTime;
        params.crn = self.crn;
        params.typeID = self.isOnline + 1;
        params.credits = self.credits;
        params.isLab = self.isLab + 0;
        params.days = "";
        if(self.isMonday) {
            params.days += 'M';
        }
        if(self.isTuesday) {
            params.days += 'T';
        }
        if(self.isWednesday) {
            params.days += 'W';
        }
        if(self.isThursday) {
            params.days += 'R';
        }
        if(self.isFriday) {
            params.days += 'F';
        }
        
        params.profName = self.selectedInstructor;
        
        
        globalFactory.addSection(params).success(function(data){
            
        });
        
        
        
    };
    
    self.addDay = function(letter) {
        if(letter == 'M'){
            self.isMonday = !self.isMonday;
        }
        else if(letter == 'T'){
            self.isTuesday = !self.isTuesday;
        }
        else if (letter == 'W'){
            self.isWednesday = !self.isWednesday;
        }
        else if (letter == 'R'){
            self.isThursday = !self.isThursday;
        }
        else if (letter == 'F'){
            self.isFriday = !self.isFriday;
        }
    };
}]);
