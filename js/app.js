    'use strict';

    var db;

    var myApp = angular.module('APP',
        [
            'ngRoute',
            'angular-loading-bar',
            'cfp.loadingBar',
            'ngAnimate',
            'angular-websql',
            'chart.js'
        ]
    );

    myApp.constant("audioConfig", {
        "velocidad": "-5",
        "idioma": "en-us"
    });

    myApp.constant("tipoAprendizaje", [
    {
        "id": "1",
        "descripcion": "Academico"
    },
    {
        "id": "2",
        "descripcion": "Idioma"
    }
    ]);


myApp.config(function ($httpProvider,$routeProvider, $locationProvider,cfpLoadingBarProvider) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.spinnerTemplate = '<div class="overlay"><div><img width="180" height="100" src="img/loadinfo.net.gif"/></div></div>';

    $routeProvider
        .when('/', {
            templateUrl: 'template/main.html',
            controller: 'mainController',
            resolve: {
                delay: function($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }
        })
        .when('/asigAdd', {
            templateUrl: 'template/asigAdd.html',
            controller: 'asignarCtrl',
            resolve: {
                delay: function($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }
        })
        .when('/asigView', {
            templateUrl: 'template/asigView.html',
            controller: 'asignarCtrl',
            resolve: {
                delay: function($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }
        })
        .when('/testAdd', {
            templateUrl: 'template/testAdd.html',
            controller: 'testCtrl',
            resolve: {
                delay: function($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }
        })
        .when('/testView', {
            templateUrl: 'template/testView.html',
            controller: 'testCtrl',
            resolve: {
                delay: function($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }
        })
        .when('/questionAdd', {
            templateUrl: 'template/questionAdd.html',
            controller: 'questionCtrl',
            resolve: {
                delay: function($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }
        })
        .when('/questionView', {
            templateUrl: 'template/questionView.html',
            controller: 'questionCtrl',
            resolve: {
                delay: function($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }
        })
        .otherwise({
        redirectTo: '/'
    });

    // configure html5 to get links working on jsfiddle
   // $locationProvider.html5Mode(true);
});



