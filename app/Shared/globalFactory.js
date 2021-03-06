shared.factory('globalFactory', ['$http', function($http) {
    var service = {};
    var courseHistoryID = 0;
    var instructorHistoryID = 0;
    var instructorHistoryName = "";
    var sectionID = 0;
    var isUpdate = false;
    
    service.getSemester = function() {
        return $http({
           url: 'app/Shared/GetSemester.php',
            method: 'GET'
        });
    };
    
    service.getInstructors = function(semester, year) {
        return $http({
           url: 'app/Instructors/GetInstructors.php',
            method: 'GET',
            params: {
                semester: semester,
                year: year
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.updateBuilding = function(id, name) {
        return $http({
           url: 'app/Buildings/UpdateBuilding.php',
            method: 'GET',
            params: {
                buildingID: id,
                buildingName: name
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.getRooms = function(semester, year) {
        return $http({
           url: 'app/Rooms/GetRooms.php',
            method: 'GET',
            params: {
                semester: semester,
                year: year
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.getLabs = function(semester, year) {
        return $http({
           url: 'app/Labs/GetLabs.php',
            method: 'GET',
            params: {
                semester: semester,
                year: year
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };

    service.getCourses = function(semester, year, isLab) {
        return $http({
           url: 'app/Courses/GetCourses.php',
            method: 'GET',
            params: {
                semester: semester,
                year: year,
                isLab: isLab
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.getCourseHistory = function(courseID) {
        return $http({
           url: 'app/CourseHistory/GetCourseHistory.php',
            method: 'GET',
            params: {
                courseID: courseID
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.deleteSection = function(sectionID) {
        return $http({
           url: 'app/AddEditSection/DeleteSection.php',
            method: 'GET',
            params: {
                sectionID: sectionID
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.getSectionHistory = function() {
        return $http({
           url: 'app/SectionHistory/GetSectionHistory.php',
            method: 'GET',
            params: {
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };

     service.getInstructorHistory = function(instructorID) {
        return $http({
           url: 'app/InstructorHistory/GetInstructorHistory.php',
            method: 'GET',
            params: {
                instructorID: instructorID
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.getColors = function() {
        return $http({
           url: 'app/Shared/GetColors.php',
            method: 'GET',
            params: {
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.getDataForSections = function() {
        return $http({
           url: 'app/AddEditSection/GetCourseOptions.php',
            method: 'GET',
            params: {
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.getBuildings = function() {
        return $http({
           url: 'app/Buildings/GetBuildings.php',
            method: 'GET',
            params: {
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    
    service.addSection = function(params) {
        return $http({
           url: 'app/Import/AddNewSection.php',
            method: 'GET',
            params: params,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.addCourse = function(courseID, title) {
        return $http({
            url: 'app/AddEditSection/AddCourse.php',
            method: 'GET',
            params: {
                courseID : courseID,
                title : title
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.addTime = function(time) {
        return $http({
            url: 'app/AddEditSection/AddTime.php',
            method: 'GET',
            params: {
                time : time
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.addInstructor = function(instructor) {
        return $http({
            url: 'app/AddEditSection/AddInstructor.php',
            method: 'GET',
            params: {
                instructor : instructor
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.addRoom = function(roomNumber, buildingNumber, capacity, isLab) {
        return $http({
            url: 'app/AddEditSection/AddRoom.php',
            method: 'GET',
            params: {
                roomNumber: roomNumber,
                buildingNumber: buildingNumber,
                capacity: capacity,
                isLab: isLab
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    service.updateSectionTime = function(sectionID, startTime, endTime) {
        return $http({
            url: 'app/Shared/UpdateSectionTime.php',
            method: 'GET',
            params: {
                sectionID: sectionID,
                startTime: startTime,
                endTime: endTime
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    //get/set for editing section information
    service.editSection = function(id) {
        sectionID = id;
        isUpdate = true;
    }
    service.getSection = function() {
        isUpdate = false;
        var x = sectionID;
        sectionID = 0;
        if(x != 0) { 
            return $http({
                url: 'app/Shared/GetSectionInfo.php',
                method: 'GET',
                params: {
                    sectionID: x
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }
        else {
            return false;
        }
    }
    
    //Get/Set for course history ID data passing
    service.getCourseHistoryID = function() {
        return courseHistoryID;
    };
    service.setCourseHistoryID = function(id) {
        courseHistoryID = id;
    };
    
    //Get/Set for instructor ID data passing
    service.getInstructorHistoryID = function() {
        return instructorHistoryID;
    };
    service.setInstructorHistoryID = function(id, instructorName) {
        instructorHistoryID = id;
        instructorHistoryName = instructorName;
    };
    service.getInstructorHistoryName = function() {
        return instructorHistoryName;
    };
    
    return service;
}]);