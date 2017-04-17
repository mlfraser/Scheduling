roomModule.controller('RoomController', ['globalFactory','$state','$timeout', function(globalFactory, $state, $timeout){
    var self = this;
    
    self.message = "";
    self.alertClass = "alert-success";
    self.display = false;
    
    globalFactory.getSemester().success(function(data){
        self.semester = data.success.result[0].semester;
        self.year = data.success.result[0].year;
        self.semesters = data.success.result;
        globalFactory.getRooms(self.semester, self.year).success(function(data){
            self.uiConfig = data.success.result;
             angular.forEach(self.uiConfig, function(value, key) {
                  value.eventClick = function(calEvent, jsEvent, view) {
                                            globalFactory.editSection(calEvent.sectionID);
                                            $state.transitionTo("update-section");
                                        };
                 value.eventResize = function(event, delta, revertFunc, jsEvent, ui, view ) {
                        var startTime = event._start._d.toUTCString().substr(17, 5);
                      var endTime = event._end._d.toUTCString().substr(17, 5);
                      globalFactory.updateSectionTime(event.sectionID, startTime, endTime).success(function(data){
                          if(data.success) {
                              self.message = data.success.message;
                             self.alertClass = "alert-success";
                             self.display = true;
                          }
                          else {
                              self.message = data.error.msg;
                             self.alertClass = "alert-danger";
                             self.display = true;
                          }
                          $timeout(function(){
                            self.display = false;
                         },10000);
                      });
                  };
                  value.eventDrop = function( event, delta, revertFunc, jsEvent, ui, view ) {
                      var startTime = event._start._d.toUTCString().substr(17, 5);
                      var endTime = event._end._d.toUTCString().substr(17, 5);
                      globalFactory.updateSectionTime(event.sectionID, startTime, endTime).success(function(data){
                          if(data.success) {
                              self.message = data.success.message;
                             self.alertClass = "alert-success";
                             self.display = true;
                          }
                          else {
                              self.message = data.error.msg;
                             self.alertClass = "alert-danger";
                             self.display = true;
                          }
                          $timeout(function(){
                            self.display = false;
                         },10000);
                      });
                  };
              
            });
        });
    });
    
}]);
