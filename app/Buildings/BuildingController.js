buildingModule.controller('BuildingController', ['globalFactory', '$timeout', function(globalFactory, $timeout){
  var self = this;
    self.message = "";
    self.class = "alert-success";
    self.display = false;
    
    globalFactory.getBuildings().success(function(data){
        self.buildings = data.success.result;
    });
    
    self.selectedBuildingName = "";
    self.selectedBuildingNumber = 0;
    
    self.setBuilding = function(id, name) {
        self.selectedBuildingName = name;
        self.selectedBuildingNumber = id;
    };
    
    self.updateBuilding = function() {
        globalFactory.updateBuilding(self.selectedBuildingNumber, self.selectedBuildingName).success(function(data){
            if(data.success) {
                angular.forEach(self.buildings, function(value, key) {
                    if(value.buildingID == self.selectedBuildingNumber) {
                        value.buildingName = self.selectedBuildingName;
                    }
                });
                
                self.message = data.success.message;
                self.class = "alert-success";
                self.display = true;
                $timeout(function(){
                    self.display = false;
                },10000);
            }
            else {
                self.message = data.error.msg;
                self.class = "alert-danger";
                self.display = true;
                $timeout(function(){
                    self.display = false;
                },10000);
            }
        });
    };
}]);
