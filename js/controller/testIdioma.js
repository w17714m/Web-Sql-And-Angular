myApp.controller('testIdiomaCtrl',function($scope,cfpLoadingBar,dbControl,consultaFactory,$timeout,$rootScope)
{
    dbControl.getInstanceDB();
    $rootScope.t = {};
    $rootScope.a={};
    $rootScope.t.resultado = {};
    $scope.opt=-1;


    $scope.startDictation = function() {
        if (window.hasOwnProperty('webkitSpeechRecognition')) {
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US";
            //recognition.lang = "es-Es";
            recognition.start();
             recognition.onresult = function(e) {
                console.log(e.results[0][0].transcript);
                 var temp = e.results[0][0].transcript;

                 $timeout(function(){$rootScope.a.resp=temp},400);
                 //$rootScope.a.resp = e.results[0][0].transcript;
                recognition.stop();
            };

            recognition.onerror = function(e) {
                recognition.stop();
            }

        }
    }





    var asignaturas=function() {
        cfpLoadingBar.start();
        return dbControl.selectAsignaturaIdioma().then(
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

    $scope.datosMulti = function(parametro)
    {
        cfpLoadingBar.start();
        var t = consultaFactory.getSound(parametro);
        consultaFactory.getimage(parametro).then(
            function(data)
            {
                cfpLoadingBar.complete();
                //t.play();
                $scope.imagen = data;
            },
            function(error)
            {
                cfpLoadingBar.complete();
                $scope.imagen = error;
                //t.play();
            }
        );
    }


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
                    $scope.pruebas = {};
                    consultaFactory.showModal('No hay pruebas para la selección');
                });

        }catch (e)
        {
            consultaFactory.showModal('No hay pruebas para la selección');
        }

    };
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
            $scope.datosMulti($scope.preguntaActual.PRE_DESCRIPCION);
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
    $scope.enviarRespuesta = function(x,y)
    {

        // Pendiente crear el modo de estudio
        x.IDPRUEBA = $scope.preguntaActual.PRE_PRUEBA;
        x.IDASIGNATURA = $scope.preguntaActual.PRU_ASIGNATURA;
        //if(x.RES_DESCRIPCION ===y){x.ESCORRECTA=1;}else{x.ESCORRECTA=0;}
        try{
            if($scope.preguntaActual.PRE_DESCRIPCION.trim().toUpperCase() === y.trim().toUpperCase() ){x.ESCORRECTA=1;}else{x.ESCORRECTA=0;}
        }catch(e){ESCORRECTA=0;}

        $scope.a.resp = '';
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
            actualizarAsignatura($scope.asignaturaElegida);
            actualizarTotalPrueba();
            $scope.t.resp = {};
            $scope.nextPreguntas();
        },400);


    }
    $scope.iniciarPrueba = function(x)
    {
        $scope.asignaturaElegida = x;
        dbControl.selectPreguntasFiltro(x).then(
            function(data)
            {
                $scope.preguntasjs = data;

                $scope.nextPreguntas();
                /*
                 $scope.preguntasjs = JSLINQ($scope.preguntasRespuestas).
                 Distinct(function (item) {
                 console.log('recorrido',item);
                 return item.PRE_PRUEBA;
                 });
                 $scope.respuestasjs = JSLINQ($scope.preguntasRespuestas).
                 Select(function (item) {
                 var resultado = {respuesta:item.RES_DESCRIPCION}
                 return resultado;
                 }).Where(function(item){ return item.ID === 1; })
                 ;

                 console.log('preguntas',$scope.preguntasjs);
                 console.log('respuestas',$scope.respuestasjs);
                 */
            },
            function(error)
            {

            }
        );

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
        $scope.pendientesEnviar = [];
    }


});