shared.factory('globalFactory', ['$http', function($http) {
    var service = {};
    
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
    
    return service;
}]);