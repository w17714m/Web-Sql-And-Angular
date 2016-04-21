myApp.controller('testAsigCtrl',function($scope,cfpLoadingBar,dbControl,consultaFactory )
{
    dbControl.getInstanceDB();
    var asignaturas=function() {
        cfpLoadingBar.start();
        return dbControl.selectAsignaturaAcademica().then(
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

    asignaturas();

    $scope.selectAsignaturaAcademica = function(a)
    {

        try{
            dbControl.selectPruebaFiltro(a).then(
                function(data)
                {
                    $scope.pruebas=data;
                },function(error)
                {
                    console.log('INGRESO2');
                    $scope.pruebas = {};
                    consultaFactory.showModal('No hay pruebas para la selección');
                });

        }catch (e)
        {
            consultaFactory.showModal('No hay pruebas para la selección');
        }

    };


    $scope.iniciarPrueba = function(x)
    {
        console.log(x);
        $scope.opt=1;
    }


});