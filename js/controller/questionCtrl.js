
myApp.controller('questionCtrl', ['$scope','consultaFactory','cfpLoadingBar','$rootScope','tipoAprendizaje','dbControl','$timeout',
    function($scope,consultaFactory,cfpLoadingBar,$rootScope,tipoAprendizaje,dbControl,$timeout) {

        $scope.edit = [];
        $scope.edit2 = [];
        $scope.Respuesta = [];
        $rootScope.tipoAprendizaje = tipoAprendizaje;
        dbControl.getInstanceDB();
        $scope.pregunta = function()
        {
            dbControl.selectPreguntas().then(
                function(data)
                {
                    $scope.preguntas = data;

                },function(error)
                {

                });
        }
        $scope.pregunta();
        $scope.insertarPregunta = function(f)
        {
            f.PRE_ESTADO= f.PRE_ESTADO ===true?1:0;
            dbControl.insertPregunta(f);
            consultaFactory.showModal('Se completo el proceso satisfactoriamente.');
        }
        var buscarPruebas = function()
        {
            dbControl.selectPrueba().then(
                function(data)
                {
                    $scope.pruebas = data;


                },function(error)
                {

                });
        };
        buscarPruebas();
        $scope.actualizarPregunta = function(z,x)
        {
            z.PRE_ESTADO=z.PRE_ESTADO===true?1:0;
            delete z['$$hashKey'];
            console.log('actualizacion prueba',dbControl.updatePregunta(z));
            $scope.edit[x] = -1;
            consultaFactory.showModal('Se completo el proceso satisfactoriamente.');
            $scope.pregunta();
        }

        /*Manejo formulario preguntas*/
        $scope.agregarPreguntas = function(a,b)
        {
            $scope.id = a;
            $scope.index = b;
            $('#myModal').modal({backdrop: 'static', keyboard: false});
        }
        $scope.guardarRespuesta = function(a)
        {
            a.RES_PREGUNTA =$scope.id;
            a.ESCORRECTA = a.ESCORRECTA === true?1:0;
            dbControl.agregarRespuesta(a);
            $timeout(function()
            {
                a.ESCORRECTA = true;
                a.RES_DESCRIPCION = '';
                $('#myModal').modal('hide');
                consultaFactory.showModal('Se completo el proceso satisfactoriamente.');
            },
            1000);

        }
        $scope.selectRespuesta = function(a,c)
        {
            dbControl.selectRespuesta(a).then(
                function(data)
                {
                    $scope.Respuesta[c] = data;
                },function(error)
                {
                    console.log('Se generó un error en la consulta',error);
                });
        }

    }]);