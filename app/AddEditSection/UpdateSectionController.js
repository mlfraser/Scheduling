updateSectionModule.controller('UpdateSectionController', ['globalFactory', '$timeout', function(globalFactory, $timeout){
  var self = this;
    
    
    var result = globalFactory.getSection();
    if(result == false) {
            self.isMonday = false;
            self.isTuesday = false;
            self.isWednesday = false;
            self.isThursday = false;
            self.isFriday = false;
            self.isLab = false;
            self.isOnline = false;
            self.pageTitle = "Add New";
        }
    else {
        result.success(function(data){
            self.pageTitle = "Update";
            result = data.success.result;
            self.sectionID = result.sectionID;
            self.sectionName = result.sectionName;
            self.sectionTitle = result.sectionTitle;
            self.year = parseInt(result.year);
            self.selectedCourse = result.courseID;
            self.selectedRoom = result.roomID;
            self.selectedSemester = result.semesterID;
            self.selectedStartTime = result.startTimeID;
            self.selectedEndTime = result.endTimeID;
            self.crn = parseInt(result.crn);
            self.typeID = !!parseInt(result.typeID) - 1;
            self.isLab = !!parseInt(result.isLab);
            self.credits = parseInt(result.credits);
            if(result.days.toString().indexOf("M") > -1) {
                self.isMonday = true;
            }
            if(result.days.toString().indexOf("T") > -1) {
                self.isTuesday = true;
            }
            if(result.days.toString().indexOf("W") > -1) {
                self.isWednesday = true;
            }
            if(result.days.toString().indexOf("H") > -1) {
                self.isThursday = true;
            }
            if(result.days.toString().indexOf("F") > -1) {
                self.isFriday = true;
            }
            self.selectedInstructor = result.instructors
        });
    }
    
    self.message = "";
    self.class = "alert-success";
    self.display = false;
   


    
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
        if(self.sectionID != null) params.sectionID = self.sectionID;
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
            if(data.success) {
                self.message = data.success.message;
                 self.alertClass = "alert-success";
                 self.display = true;

                 $timeout(function(){
                    self.display = false;
                 },10000);
                
            }
            else {
                 self.message = data.error.msg;
                 self.alertClass = "alert-danger";
                 self.display = true;

                 $timeout(function(){
                    self.display = false;
                 },10000);
            }
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
