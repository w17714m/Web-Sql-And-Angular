
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
                consultaFactory.showModal('Se completo el proceso satisfactoriamente.');
            },
            function(error)
            {
                cfpLoadingBar.complete();
                consultaFactory.showModal('Se generó un error vuelvalo a intentar');
                $scope.imagen = error;
            }
        );
    };

        $scope.insertarAsignatura = function(a){
            cfpLoadingBar.start();
            dbControl.insertAsignatura(a);
            cfpLoadingBar.complete();
            consultaFactory.showModal('Se completo el proceso satisfactoriamente.');
        };


        $scope.asignaturas=function() {
            cfpLoadingBar.start();
            return dbControl.selectAsignatura().then(
                function (data) {
                    cfpLoadingBar.complete();
                    console.log(data);
                    $scope.asignatura = data;
                    //consultaFactory.showModal('Se completo el proceso satisfactoriamente.');
                },
                function (error) {
                    cfpLoadingBar.complete();
                    console.log('ERRRORRRORORORO', error);
                    //consultaFactory.showModal('Se generó un error vuelvalo  intentar.');
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
            consultaFactory.showModal('Se completo el proceso satisfactoriamente.');
            $scope.asignaturas();
        };


        $scope.asignaturas();


}]);