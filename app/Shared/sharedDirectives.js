shared.directive('navbar', ['$window', function($window) {
  return {
    replace: true,
    scope: {},
    templateUrl: 'app/Shared/navbar.html',
    link: function(scope, element, attrs) {
        if($window.innerWidth < 1000) {
            $('body').addClass('nav-sm');
            $('body').removeClass('nav-md');
        }
        else {
            $('body').addClass('nav-md');
            $('body').removeClass('nav-sm');
        }
      angular.element($window).bind('resize', function () {
          if($window.innerWidth < 1000) {
            $('body').addClass('nav-sm');
            $('body').removeClass('nav-md');
        }
        else {
            $('body').addClass('nav-md');
            $('body').removeClass('nav-sm');
        }
    });
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

shared.directive('alert', [function() {
  return {
    replace: true,
    scope: {
        message: '=',
        display: '=',
        alertClass: '='
    },
    templateUrl: 'app/Shared/alert.html',
    link: function(scope, element, attrs) {
        
        
        
    }
  }
}]);