myApp.controller('testAsigCtrl',function($scope,cfpLoadingBar,dbControl,consultaFactory,$timeout,$rootScope)
{
    dbControl.getInstanceDB();
    $rootScope.t = {};
    $rootScope.t.resultado = {};
    $scope.opt=-1;
    var asignaturas=function() {
        cfpLoadingBar.start();
        return dbControl.selectAsignaturaAcademica().then(
            function (data) {
                cfpLoadingBar.complete();

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
                    console.log('selectAsignaturaAcademica',data);
                },function(error)
                {
                    $scope.pruebas = {};
                    consultaFactory.showModal('No hay pruebas para la selección');
                });

        }catch (e)
        {
            consultaFactory.showModal('No hay pruebas para la selección');
        }

    };


    $scope.selectAsignaturaAcademicaRefuerzo = function(a)
    {

        try{
            dbControl.selectPruebaRefuerzo().then(
                function(data)
                {
                    console.log('selectPruebaRefuerzo',data);
                    $scope.refuerzo = data;

                },function(error)
                {
                    console.log('selectPruebaRefuerzo',error);
                    //$scope.pruebas = {};
                    //consultaFactory.showModal('No hay pruebas para la selección');
                });

        }catch (e)
        {
            consultaFactory.showModal('No hay pruebas para la selección');
        }

    };

    $scope.selectAsignaturaAcademicaRefuerzo();

    $scope.selectRespuesta = function(a)
    {
        dbControl.selectRespuesta(a).then(
            function(data)
            {
                $scope.Respuesta = data;
            },function(error)
            {
                console.log('Se generó un error en la consulta',error);
            });
    };
    $scope.indicator = 0;
    $scope.pendientesEnviar = [];
    $scope.nextPreguntas = function()
    {
        if($scope.indicator<$scope.preguntasjs.length)
        {
            $scope.preguntaActual = $scope.preguntasjs[$scope.indicator];
            $scope.indicator=$scope.indicator+1;
            $scope.porcentaje = (($scope.indicator/$scope.preguntasjs.length)*100).toFixed(0);

            $scope.porcentaje = ($scope.porcentaje==='100'?98:$scope.porcentaje);

            $scope.selectRespuesta($scope.preguntaActual.ID);
        }else
        {
            $scope.porcentaje = 100;
            $scope.indicator=0;
            $scope.opt = 2;

            resultados();
        }
    };
    $scope.enviarRespuesta = function(x)
    {
        x.IDPRUEBA = $scope.preguntaActual.PRE_PRUEBA;
        x.PRE_DESCRIPCION = $scope.preguntaActual.PRE_DESCRIPCION;
        x.IDASIGNATURA = $scope.preguntaActual.PRU_ASIGNATURA;
        if(x.ESCORRECTA===1)
        {
            actualizarPregunta(true, x.RES_PREGUNTA);
            actualizarPrueba(true, x.IDPRUEBA);
        }else
        {
            actualizarPregunta(false, x.RES_PREGUNTA);
            actualizarPrueba(false, x.IDPRUEBA);
        }



       $scope.pendientesEnviar.push(x);
        $timeout(function(){
            console.log('$scope.asignaturaElegida',$scope.asignaturaElegida);
            actualizarAsignatura($scope.asignaturaElegida);
            actualizarTotalPrueba();
            $scope.t.resp = {};
            $scope.nextPreguntas();
        },400);


    }
    $scope.iniciarPrueba = function(x,a)
    {
        $scope.asignaturaElegida = x;

        if(a===false){
            dbControl.selectPreguntasRefuerzo(x).then(
                function(data)
                {
                    $scope.preguntasjs = data;
                    $scope.nextPreguntas();
                },
                function(error)
                {

                });
        }else{
            dbControl.selectPreguntasFiltro(x).then(
                function(data)
                {
                    $scope.preguntasjs = data;
                    $scope.nextPreguntas();
                },
                function(error)
                {

                }
            );
        }








        $scope.opt=1;
    }
    $scope.guardarRespuestas = function()
    {
        angular.forEach($scope.pendientesEnviar,
            function(a,b)
            {

            });
    }
    var actualizarPrueba = function(a,x)
    {


        if(a===true)
        {
            dbControl.selectBienPrueba(x).then(
                function(data)
                {

                    if(data===null)
                    {

                        dbControl.updatePruebaNota(true,x,1);
                    }else
                    {
                        dbControl.updatePruebaNota(true,x,Number(data)+1);
                    }
                },
                function(error)
                {
                        console.log('data actualizar prueba Bien Error',error);
                        dbControl.updatePruebaNota(true,x,1);
                }
            );
        }else
        {
            dbControl.selectMalPrueba(x).then
            (
                function(data)
                {

                    if(data===null)
                    {
                        dbControl.updatePruebaNota(false,x,1);
                    }else
                    {
                        dbControl.updatePruebaNota(false,x,Number(data)+1);
                    }
                },
                function(error)
                {


                    dbControl.updatePruebaNota(false,x,1);
                }
            )
        }
    }
    var actualizarPregunta = function(a,x)
    {
        if(a===true)
        {
            dbControl.selectBienPregunta(x)
                .then(
                function(data)
                {

                    if(data===null)
                    {
                        dbControl.updatePreguntaNota(true,x,1);
                    }else
                    {
                        dbControl.updatePreguntaNota(true,x,Number(data)+1);
                    }

                },
                function(error)
                {
                    dbControl.updatePreguntaNota(true,x,1);
                }
            );
        }else
        {
            dbControl.selectMalPregunta(x).then
            (
                function(data){
                    if(data===null)
                    {
                        dbControl.updatePreguntaNota(false,x,1);
                    }else
                    {
                        dbControl.updatePreguntaNota(false,x,Number(data)+1);
                    }
                },
                function(error)
                {
                    dbControl.updatePreguntaNota(false,x,1);
                }
            );
        }
    }
    var actualizarAsignatura = function(a)
    {
            dbControl.updateAsignaturaNota(a).then(
                function(data)
                {
                    console.log('Actualizó correctamente',data);
                },
                function(error)
                {
                    console.log('Se generó un error',error);
                }
            );
    };
    var actualizarTotalPrueba = function()
    {

        dbControl.updateTotalPrueba().then(
            function(data){
                console.log("OK",data);
            },
            function(error){console.log("ERROR",error)});
    }

    var resultados = function()
    {
        $scope.bien = 0;
        $scope.mal = 0;
        angular.forEach($scope.pendientesEnviar,function(a,b)
        {
            console.log(a,b);

                if(a.ESCORRECTA===1)
                {
                    $scope.bien = $scope.bien + 1;
                }else
                {
                    $scope.mal = $scope.mal + 1;
                }

        });
    }


    $scope.iniciar = function()
    {
        $scope.opt=-1;
        $scope.indicator = 0;
        $scope.pendientesEnviar = [];
    }

});