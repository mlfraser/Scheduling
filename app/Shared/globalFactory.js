shared.factory('globalFactory', ['$http', function($http) {
    var service = {};
    var courseHistoryID = 0;
    var instructorHistoryID = 0;
    var instructorHistoryName = "";
    
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
    
    service.addRoom = function(roomNumber, buildingNumber, capacity) {
        return $http({
            url: 'app/AddEditSection/AddRoom.php',
            method: 'GET',
            params: {
                roomNumber: roomNumber,
                buildingNumber: buildingNumber,
                capacity: capacity
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };
    
    
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