labModule.controller('LabController', ['globalFactory','$state', function(globalFactory, $state){
    var self = this;
    
    globalFactory.getSemester().success(function(data){
        self.semester = data.success.result[0].semester;
        self.year = data.success.result[0].year;
        self.semesters = data.success.result;
        globalFactory.getLabs(self.semester, self.year).success(function(data){
            self.uiConfig = data.success.result;
            
            angular.forEach(self.uiConfig, function(value, key) {
                  value.eventClick = function(calEvent, jsEvent, view) {
                                            globalFactory.editSection(calEvent.sectionID);
                                            $state.transitionTo("update-section");
                                        }
              
            });
        });
    });
    
    
}]);
