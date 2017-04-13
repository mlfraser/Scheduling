sectionHistoryModule.controller('SectionHistoryController', ['globalFactory', function(globalFactory){
    var self = this;
  globalFactory.getSectionHistory().success(function(data){
        self.course = data.success.result;
    });
    
    self.getCourse = function(id) {
        globalFactory.setCourseHistoryID(id);
    };
    self.getInstructor = function(id, name) {
        globalFactory.setInstructorHistoryID(id,name);
    };
    self.editSection = function(id) {
        globalFactory.editSection(id);
    }
}]);
