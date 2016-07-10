
var app = angular.module("schedulingApp", []);
app.controller('ctrl', function($scope){
    $scope.instructors = [];
    $scope.rooms = [];
    $scope.labs = [];
    $scope.sections = [];
    $scope.loadingBarValue = 0; //Loading bar percent
    $scope.loadingBarWidth = {"width" : "0%"};
    $scope.disableImportantButton = false; //disable import button on settings page
    $scope.year = new Date().getFullYear();
    
    $scope.successfulImports = [];
    $scope.failedImports = [];
    $scope.existingImports = [];

    $scope.newSchedule = function() {
        $scope.disableImportantButton = true;
        //UPLOAD FILE
        
        
        //GET FILE && PARSE
        $.ajax({
           type: "GET",
           url: "/TempFileStorage/ECE Schedule of Classes Spring 2016.csv",
           dataType: "text",
           success: function(data) {
               if(checkSchedule(data)) parseSchedule(data, $scope.year);
               
           }
        });
        
        //DELETE FILE
        $scope.disableImportantButton = false;
    };
    
    checkSchedule = function(allText) {
        var allLines = allText.split(/\r\n|\n/);
        if(allLines[0] != "CRN,Subj,Crse,Sec,Cmp,Cred,Title,Days,Time,Cap,Act,Rem,Instructor,Date (MM/DD),Location,Fee") {
            return confirm("Please confirm the format of your file. \n"
                            + "The columns of the file need to be in this order:\n"
                            + "CRN, Subject, Course, Section, Campus, Credit Number, Title, Days, Time, Room Cap, Active Seats, Remaining Seats, Instructor, Date, Location, Fee\n \n"
                            + "Click 'OK' if the file is in this format\n"
                            + "Click 'Cancel' if the file needs to be corrected");
        }
        else return true;
    };
    
    addResponseToList = function(newItem) {
        if(newItem.status == "Successful") $scope.successfulImports.add(newItem);
        else if(newItem.status == "Failed") $scope.failedImports.add(newItem);
        else $scope.existingImports.add(newItem);
    };
    
    parseSchedule = function(allText, year) {
        $('#newScheduleProgress').html("0%").css("width","0%");
        var allLines = allText.split(/\r\n|\n/);
        var headers = allLines[0].split(',');
        var lines = [];
        
        var i = 1;
        (function loop() {
            var importStatus = {
                index : i,
                instructor: data[12],
                courseNum : "EE" + data[2],
                courseName : data[6],
                status : "Success",         //either success, exists, failed
                errors: []                  //will have understandable errors for what failed
            };
            
            
            var data = allLines[i].split(',');
            
            //data[2]: course number
            //data[6]: course name
            var courseID = getCourseID(data[2], data[6]);
            
            //data[4]: isOnCampus, typeID
            var typeID = data[4] == "1" ? 1 : 2;
            
            //data[5]: credits
            var credits = data[5];
            
            //data[13]: date
            var semesterID = getSemesterID(data[13]);
            
            
            //data[8]: times
            var startTimeID = getStartTime(data[8]);
            var endTimeID = getEndTime(data[8]);
            
            
            //data[9]: room size
            //data[14]: building and room
            var roomID = getRoomID(data[14], data[9]);
    
            
            
            //data[0]: CRN
            //data[3]: section
            var sectionID = addSection(data[0], data[3], courseID, startTimeID, endTimeID, roomID, typeID, credits, semesterID, year);
    
            
            //data[7]: days
            addDaysToSection(sectionID, data[7]);
            
            //data[12]: Proffessor name
            addProfToSection(sectionID, data[12]);
            
            //Add status of import to appropriate list
            addResponseToList(importStatus);
            
            i++;
            $('#newScheduleProgress').html(((i / 20) * 100) + "%");
            $('#newScheduleProgress').css("width",((i / 20) * 100) + "%");
            
            //update loading bar
            if(i < 20){
                setTimeout(loop, 0);
            }
        })();
        // $scope.loadingBarValue = 100;
        // $scope.loadingBarWidth = {"width" : "100%"};
        $('#newScheduleProgress').html("100%");
        $('#newScheduleProgress').css("width","100%");
    }
    
    getCourseID = function(courseID, courseName) {
        var response = {
            status: "Successful",
            value: courseID,
            error: null
        }
        request = $.ajax({
    			url: "/settings/getCourseID.php",
    			type: "post",
    			async: false,
    			data: {
    				courseID: JSON.stringify(courseID),
    				courseName : JSON.stringify(courseName)
    			},
        		success: function() {
        		    
        		},
        		error: function() {
        		    response.status = "Failed";
    		        response.error = "Failed to access the database.";
        		}
    		});
    		return courseID;
    }
    
    getStartTime = function(time) {
        var response = {
            status: "Successful",
            value: 0,
            error: null
        };
        request = $.ajax({
			url: "/settings/getTime.php",
			type: "post",
			async: false,
			data: {
				time: JSON.stringify(time.substring(0,8))
			},
    		success: function(startTimeID) {
    		    response.value = startTimeID;
    		},
    		error: function() {
    		    response.status = "Failed";
		        response.error = "Failed to access the database.";
    		}
		});
		return startTimeID;
    };
    
    getEndTime = function(time) {
        var response = {
            status: "Successful",
            value: 0,
            error: null
        };
        request = $.ajax({
			url: "/settings/getTime.php",
			type: "post",
			async: false,
			data: {
				time: JSON.stringify(time.substring(9,17))
			},
			success: function(endTimeID) {
			    response.value = endTimeID;
			},
    		error: function() {
    		    response.status = "Failed";
		        response.error = "Failed to access the database.";
    		}
		});
		return endTimeID;
    }
    
    getRoomID = function(room, size) {
        var response = {
            status: "Successful",
            value: 0,
            error: null
        }
        request = $.ajax({
			url: "/settings/getRoomID.php",
			type: "post",
			async: false,
			data: {
				building: JSON.stringify(room.substring(0,2)),
				room: JSON.stringify(room.substring(3,7)),
				roomSize: JSON.stringify(size)
			},
		success: function(roomID) {
		    response.value = roomID;
		},
		error: function() {
		    response.status = "Failed";
		    response.error = "Failed to access the database.";
		}
		});
		return roomID;
    }
    
    getSemesterID = function(dates) {
        /*
            Determines the semester and track by manipulating the dates
            Spring Semester: January - April/May (February/March for split semester date)
            Summer Semester: May/August (July? for split date)
            Fall Semester: August/September to December (October for split date)
        */
        var response = {
            status: "Successful",
            value: 0,
            error: null
        }
        var semester = "";
        
        var startMonth = parseInt(dates.substring(0,2));
        var endMonth = parseInt(dates.substring(6,8));
        var startDay = parseInt(dates.substring(3,5));
        var endDay = parseInt(dates.substring(9,11));
        
        //calculate week difference between dates: will tell if track A/B/Full
        var difference = ((endMonth * 30 + endDay) - (startMonth * 30 + startDay)) / 7;
        
        if(startMonth <= 3) {
            semester = "Spring";
            if(difference > 8) {
                semester += "";
            }
            else if(startMonth == 1) {
                semester += " A";
            }
            else {
                semester += " B";
            }
        }
        else if(endMonth > 10) {
            semester = "Fall";
            if(difference > 8) {
                semester += "";
            }
            else if(endMonth == 12) {
                semester += " B";
            }
            else {
                semester += " A";
            }
        }
        else {
            semester = "Summer";
            if(difference > 8) {
                semester += "";
            }
            else if(endMonth == 8) {
                semester += " B";
            }
            else {
                semester += " A";
            }
        }
        
        request = $.ajax({
    		url: "/settings/getSemesterID.php",
    		type: "post",
    		async: false,
    		data: {
    			semester: JSON.stringify(semester)
    		},
    		success: function(semesterID) {
    		    response.value = semesterID;
    		},
    		error: function() {
    		    response.status = "Failed";
    		    response.error = "Failed to access the database.";
    		}
    	});
    	return semesterID;
    }
    
    addSection = function(crn, sectionName, courseID, startTimeID, endTimeID, roomID, typeID, credits, semesterID, year) {
        var response = {
            status: "Successful",
            value: 0,
            error: null
        }
        request = $.ajax({
    		url: "/settings/addSection.php",
    		type: "post",
    		async: false,
    		data: {
    			crn: JSON.stringify(crn),
    			sectionName: JSON.stringify(sectionName),
    			courseID: JSON.stringify(courseID),
    			startTimeID: JSON.stringify(startTimeID),
    			endTimeID: JSON.stringify(endTimeID),
    			roomID: JSON.stringify(roomID),
    			typeID: JSON.stringify(typeID),
    			credits: JSON.stringify(credits),
    			semesterID: JSON.stringify(semesterID),
    			year: JSON.stringify(year)
    		},
    		success: function(response) {
    		    sectionID =  response;
    		},
    		error: function() {
    		    response.status = "Failed";
    		    response.error = "Failed to access the database.";
    		}
    	});
    	return sectionID;
    }
    
    addProfToSection = function(sectionID, profName) {
        var response = {
            status: "Successful",
            value: 0,
            error: null
        }
        var namesWithoutQuotes = profName.replace("\"", "");
        var namesList = namesWithoutQuotes.split(" , ");
        
        request = $.ajax({
    		url: "/settings/addProfToSection.php",
    		type: "post",
    		async: false,
    		data: {
    			sectionID: JSON.stringify(sectionID),
    			profName: JSON.stringify(namesList)
    		},
    		success: function(response) {
    		    
    		},
    		error: function() {
    		    response.status = "Failed";
    		    response.error = "Failed to access the database.";
    		}
    	});
    }
    
    addDaysToSection = function(sectionID, days){
        var response = {
            status: "Successful",
            value: 0,
            error: null
        }
        request = $.ajax({
    		url: "/settings/addDaysToSection.php",
    		type: "post",
    		async: false,
    		data: {
    			sectionID: JSON.stringify(sectionID),
    			days: JSON.stringify(days)
    		},
    		success: function(response) {
    		    
    		},
    		error: function() {
    		    response.status = "Failed";
    		    response.error = "Failed to access the database.";
    		}
    	});
    }

    
});

function changeTab(tab) {
    $('li').removeClass('active');
    if(tab == 0) $('#instructorTab').addClass('active');
    else if(tab == 1) $('#labTab').addClass('active');
    else if(tab == 2) $('#classTab').addClass('active');
    else if(tab == 3) $('#roomTab').addClass('active');
    else if(tab == 4) $('#settingsTab').addClass('active');
}


