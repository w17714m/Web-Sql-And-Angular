
myApp.controller('testCtrl', ['$scope','consultaFactory','cfpLoadingBar', '$rootScope','tipoAprendizaje','dbControl',
    function($scope,consultaFactory,cfpLoadingBar,$rootScope,tipoAprendizaje,dbControl) {
    $scope.edit = [];
    $rootScope.tipoAprendizaje = tipoAprendizaje;
    dbControl.getInstanceDB();



        var asignaturas=function() {
            cfpLoadingBar.start();
            return dbControl.selectAsignaturaList().then(
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
    asignaturas();
        

    $scope.insertarPrueba = function(f)
    {
        f.PRU_ESTADO = f.PRU_ESTADO===true?1:0;
        dbControl.insertPrueba(f);
    }


    var buscarPruebas = function()
    {
        dbControl.selectPrueba().then(
        function(data)
        {
           $scope.pruebas = data;
            console.log('$scope.pruebas',data);
        },function(error)
        {
            console.log('Error',error)
        });
    };

        buscarPruebas();

        $scope.actualizarPrueba = function(z,x)
        {
            console.log(z.PRU_ESTADO);

            z.PRU_ESTADO=z.PRU_ESTADO===true?1:0;
            delete z['$$hashKey'];
            console.log(z);
            console.log('actualizacion prueba',dbControl.updatePrueba(z));
            $scope.edit[x] = -1;
            buscarPruebas();
        }







    }]);