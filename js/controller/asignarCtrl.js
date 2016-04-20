
myApp.controller('asignarCtrl', ['$scope','consultaFactory','cfpLoadingBar', '$rootScope','tipoAprendizaje','dbControl',
    function($scope,consultaFactory,cfpLoadingBar,$rootScope,tipoAprendizaje,dbControl) {
    dbControl.getInstanceDB();
    $rootScope.tipoAprendizaje = tipoAprendizaje;

        $scope.edit = {};

    consultaFactory.animateLetter('#a');


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
    };

        $scope.insertarAsignatura = function(a){
            cfpLoadingBar.start();
            dbControl.insertAsignatura(a);
            cfpLoadingBar.complete();
        };


        $scope.asignaturas=function() {
            cfpLoadingBar.start();
            return dbControl.selectAsignatura().then(
                function (data) {
                    cfpLoadingBar.complete();
                    console.log(data);
                    $scope.asignatura = data;
                },
                function (error) {
                    cfpLoadingBar.complete();
                    console.log('ERRRORRRORORORO', error);

                }
            );
        };

        $scope.tipoAsignatura = function(id){
            return $rootScope.tipoAprendizaje[id-1].descripcion;
        };


        $scope.actualizarAsignatura = function(a,b)
        {
            a.ASIG_ESTADO===true?1:0;
            delete a['$$hashKey'];
            console.log(a);
            console.log('resultado',dbControl.updateAsignatura(a));
            $scope.edit[b] = -1;
            $scope.asignaturas();
        };


        $scope.asignaturas();


}]);