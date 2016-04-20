myApp.controller('mainController', ['$scope','consultaFactory','cfpLoadingBar','$rootScope','tipoAprendizaje','dbControl',
    function($scope,consultaFactory,cfpLoadingBar,$rootScope,tipoAprendizaje,dbControl){
   console.log(dbControl.getInstanceDB());
    $rootScope.tipoAprendizaje = tipoAprendizaje;
    $scope.prueba = function(parametro)
    {
        cfpLoadingBar.start();
        var t = consultaFactory.getSound(parametro);
        consultaFactory.getimage(parametro).then(
            function(data)
            {
                cfpLoadingBar.complete();
                t.play();
                $scope.imagen = data;
            },
            function(error)
            {
                cfpLoadingBar.complete();
                $scope.imagen = error;
                t.play();
            }
        );
    }
   consultaFactory.animateLetter('#b');
    consultaFactory.animateLetter('#animateLetter');
}]);