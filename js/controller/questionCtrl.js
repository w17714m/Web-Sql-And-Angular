
myApp.controller('questionCtrl', ['$scope','consultaFactory','cfpLoadingBar','$rootScope','tipoAprendizaje',
    function($scope,consultaFactory,cfpLoadingBar,$rootScope,tipoAprendizaje) {
    $rootScope.tipoAprendizaje = tipoAprendizaje;
    $scope.prueba = function(parametro)
    {
        cfpLoadingBar.start();
        consultaFactory.getSound(parametro);
        consultaFactory.getimage(parametro).then(
            function(data)
            {
                cfpLoadingBar.complete();
                $scope.imagen = data;
            },
            function(error)
            {
                cfpLoadingBar.complete();
                $scope.imagen = error;
            }
        );



    }




}]);