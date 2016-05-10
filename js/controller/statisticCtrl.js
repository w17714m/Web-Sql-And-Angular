myApp.controller('statisticCtrl',function($scope,cfpLoadingBar,dbControl,consultaFactory,$timeout,$rootScope,$routeParams)
{

    dbControl.getInstanceDB();

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    //$scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    $scope.dataAsig = [];

    $scope.asignaturasLabels = [];


    $scope.series = ['Bien', 'Mal'];


        $scope.resumenAsignaturas = function()
        {


            dbControl.resumenAsignatura().then(function(data){

                $scope.resAsigNota = data;


                //console.log('data',data);
               var bien  = [];
               var mal  = [];
               var nota  = [];
                angular.forEach(data,function(a,b)
                {
                    var cont = 0;
                  /*angular.forEach(a,function(x,y)
                  {
                    console.log('x',x);
                    console.log('y',y);
                  });*/


                    console.log('a',a);
                    console.log('b',b);
                    $scope.asignaturasLabels.push(a.ASIG_NOMBRE);

                    bien.push(a.BIEN);
                    mal.push(a.MAL);
                    nota.push(a.NOTA);


                });

                //$scope.dataAsig.push([bien,mal,nota]);

                $scope.dataAsig.push(bien);
                $scope.dataAsig.push(mal);
                $scope.dataAsig.push(nota);

                    //console.log($scope.asignaturasLabels);
                    console.log($scope.dataAsig);
                    //console.log($scope.series);

                    //console.log('resumen',data);
            },function(error)
            {
                console.log('resumen error',error);
            })


        }

    $scope.resumenAsignaturas();
});
