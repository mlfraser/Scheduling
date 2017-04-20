importModule.controller('ImportController', ['globalFactory', '$timeout', function(globalFactory, $timeout){
  var self = this;
    
    self.message = "";
    self.alertClass = "alert-success";
    self.display = false;
    
    globalFactory.getDataForSections().success(function(data){
        self.semesters = data.success.result.Semesters;
    });
    
    self.import = function() {
        var file = self.files[0];   
        var reader = new FileReader();

        reader.onloadend = function(evt){
            var rows = evt.target.result.split('\n');
            var obj = [];
            var first = true;
            var result = true;
            var message = "";
            var stop = false;
            var i = 2;
            self.output = new Object();
            self.output.success = [];
            self.output.alreadyExists = [];
            self.output.error = [];
            
            
            angular.forEach(rows,function(val){
                if(!stop) {
                    if(first) {
                        var o = val.split(';');
                        first = false;
                        if(o[1] != "CRN") {
                            result = false;
                            message = "the second column of the file needs to be the course CRN";
                            stop = true;
                        }
                        if(o[2] != "Subj") {
                            result = false;
                            message = "the third column of the file needs to be the course Subject (Ex: EE)";
                            stop = true;
                        }
                        if(o[3] != "Crse") {
                            result = false;
                            message = "the fourth column of the file needs to be the course Section";
                            stop = true;
                        }
                        if(o[4] != "Sec") {
                            result = false;
                            message = "the fifth column of the file needs to be the course subject";
                            stop = true;
                        }
                        if(o[5] != "Cmp") {
                            result = false;
                            message = "the sixth column of the file needs to be the course campus";
                            stop = true;
                        }
                        if(o[6] != "Cred") {
                            result = false;
                            message = "the seventh column of the file needs to be the number of credits";
                            stop = true;
                        }
                        if(o[7] != "Title") {
                            result = false;
                            message = "the eighth column of the file needs to be the course title";
                            stop = true;
                        }
                        if(o[8] != "Days") {
                            result = false;
                            message = "the ninth column of the file needs to be the days the course attends";
                            stop = true;
                        }
                        if(o[9] != "Time") {
                            result = false;
                            message = "the tenth column of the file needs to be the time of the course";
                            stop = true;
                        }
                        if(o[10] != "Cap") {
                            result = false;
                            message = "the eleventh column of the file needs to be the capacity of the room the course is in";
                            stop = true;
                        }
                        if(o[13] != "Instructor") {
                            result = false;
                            message = "the fourteenth column of the file needs to be the course instructor(s)";
                            stop = true;
                        }
                        if(o[15] != "Location") {
                            result = false;
                            message = "the sixteenth column of the file needs to be the course location";
                            stop = true;
                        }
                    }
                    else {
                        var o = val.split(';');
                        addCourse(o, self.year, self.selectedSemester, i);
                        i++;
                    }
                }
            });
            
            self.message = message == "" ? "Sections were successfully added" : message;
            self.class = result ? "alert-success" : "alert-danger";
            self.display = true;
            $timeout(function(){
                    self.display = false;
                 },10000);
        };

        var blob = file.slice(0, file.size - 1);
        reader.readAsText(blob);
        
        var addCourse = function(courseData, year, semester, index) {
            if(courseData[2] != "EE") {
                var result = new Object();
                result.index = index;
                result.crn = courseData[1];
                result.error = "This course is not in the EE department";
                self.output.error.push(result);
            }
            var params = new Object();
            params.crn = courseData[1];
            params.courseID = courseData[3];
            params.sectionName = courseData[4];
            params.typeID = courseData[5] == "1" ? 1 : 2;
            params.credits = parseInt(courseData[6]);
            params.courseTitle = courseData[7];
            params.days = courseData[8];
            params.startTime = courseData[9].substr(0,8);
            params.endTime = courseData[9].substr(9,8);
            params.capacity = parseInt(courseData[10].substr(1, courseData[10].length - 1));
            params.profName = courseData[13].split(',');
            params.room = courseData[15].substr(3,4);
            params.building = courseData[15].substr(0,2);
            params.year = self.year;
            params.semesterID = self.selectedSemester;
            params.isLab = courseData[4].indexOf("L") >= 0 ? 1 : 0;
            
            globalFactory.addSection(params).success(function(data){
                if(data.success) {
                    var result = Object();
                    result.index = index;
                    result.course = "EE" + params.courseID;
                    result.crn = params.crn;
                    self.output.success.push(result);

                }
                else if(data.error.code == 1){
                    var result = Object();
                    result.index = index;
                    result.course = "EE" + params.courseID;
                    result.crn = params.crn;
                     self.output.alreadyExists.push(result);
                }
                else {
                    var result = Object();
                    result.index = index;
                    result.course = "EE" + params.courseID;
                    result.crn = params.crn;
                    self.output.error.push(result); 
                }
            });
        }
    }
}]);
