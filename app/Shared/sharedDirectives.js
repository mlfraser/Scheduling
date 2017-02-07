shared.directive('navbar', [function() {
  return {
    replace: true,
    scope: {},
    templateUrl: 'app/Shared/navbar.html',
    link: function(scope, element, attrs) {
      
    }
  }
}]);


shared.directive('colorLegend', ['globalFactory', function(globalFactory) {
  return {
    replace: true,
    scope: {},
    templateUrl: 'app/Shared/colorLegend.html',
    link: function(scope, element, attrs) {
      globalFactory.getColors().success(function(data){
            scope.colors = data.success.result;
        });
        
    }
  }
}]);

