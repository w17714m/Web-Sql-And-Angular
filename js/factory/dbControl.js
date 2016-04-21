myApp.factory('dbControl', function($webSql,$q) {


    return {
        getInstanceDB: function()
        {
            db = $webSql.openDatabase('learn_1.0.7', '1.0', 'db for learn', 4 * 1024 * 1024);

            db.createTable('TBL_ASIGNATURA', {
                "ID":{
                    "type": "INTEGER",
                    "null": "NOT NULL", // default is "NULL" (if not defined)
                    "primary": true, // primary
                    "auto_increment": true // auto increment
                },
                "ASIG_NOMBRE":{
                    "type": "TEXT",
                    "null": "NOT NULL"
                },
                "ASIG_TIPO":{
                    "type": "INTEGER",
                    "null": "NOT NULL"
                },
                "ASIG_NOTA": {
                    "type": "REAL"
                },
                "ASIG_ESTADO": {
                    "type": "INTEGER"
                }
            });

            db.createTable('TBL_PRUEBA', {
                "ID":{
                    "type": "INTEGER",
                    "null": "NOT NULL", // default is "NULL" (if not defined)
                    "primary": true, // primary
                    "auto_increment": true // auto increment
                },
                "PRU_ASIGNATURA":{
                    "type": "INTEGER",
                    "null": "NOT NULL"
                },
                "PRU_DESCRIPCION":{
                    "type": "TEXT",
                    "null": "NOT NULL"
                },
                "PRU_BIEN":{
                    "type": "INTEGER"
                },
                "PRU_MAL":{
                    "type": "INTEGER"
                },
                "PRU_TOTAL":{
                    "type": "INTEGER"
                },
                "PRU_ESTADO": {
                    "type": "INTEGER"//TIENE QUE SE 0 O 1
                }
            });


            db.createTable('TBL_PREGUNTAS', {
                "ID":{
                    "type": "INTEGER",
                    "null": "NOT NULL", // default is "NULL" (if not defined)
                    "primary": true, // primary
                    "auto_increment": true // auto increment
                },
                "PRE_PRUEBA":{
                    "type": "INTEGER",
                    "null": "NOT NULL"
                },
                "PRE_DESCRIPCION":{
                    "type": "TEXT",
                    "null": "NOT NULL"
                },
                "PRE_BIEN":{
                    "type": "INTEGER"
                },
                "PRE_MAL":{
                    "type": "INTEGER"
                },
                "PRE_TOTAL":{
                    "type": "INTEGER"
                },
                "PRE_ESTADO": {
                    "type": "INTEGER"//TIENE QUE SE 0 O 1
                }
            });


            db.createTable('TBL_RESPUESTA', {
                "ID":{
                    "type": "INTEGER",
                    "null": "NOT NULL", // default is "NULL" (if not defined)
                    "primary": true, // primary
                    "auto_increment": true // auto increment
                },
                "RES_DESCRIPCION":{
                    "type": "TEXT",
                    "null": "NOT NULL"
                },
                "RES_PREGUNTA":{
                    "type": "INTEGER"
                },
                "ESCORRECTA":{
                    "type": "INTEGER",
                    "null": "NOT NULL"
                }
            });

            return db;
        },
        insertAsignatura: function(a)
        {
            db.insert('TBL_ASIGNATURA',
            {
                "ASIG_NOMBRE": a.strDescripcion,
                "ASIG_TIPO": a.numTipoAsig,
                "ASIG_ESTADO": a.bolStado
            }).then(function(results) {

                    return results;
            });
        },
        selectAsignatura: function()
        {
            var defered = $q.defer();
            var promise = defered.promise;
            var t = [];
            db.select("TBL_ASIGNATURA", {
                "ID":'IS NOT NULL'
            }).then(function(results) {

                for(i=0; i < results.rows.length; i++){
                    t.push(results.rows.item(i));
                }
                if(results.rows.length>0)
                {
                    defered.resolve(t);
                }
                else
                {
                    defered.reject('No hay registros en asignaturas');
                }

            })
            return promise;
        },
        selectAsignaturaAcademica: function()
        {
            var defered = $q.defer();
            var promise = defered.promise;
            var t = [];
            db.select("TBL_ASIGNATURA", {
                "ASIG_TIPO":'1'
            }).then(function(results) {

                for(i=0; i < results.rows.length; i++){
                    t.push(results.rows.item(i));
                }
                if(results.rows.length>0)
                {
                    defered.resolve(t);
                }
                else
                {
                    defered.reject('No hay registros en asignaturas');
                }

            })
            return promise;
        },
        selectAsignaturaList: function()
        {
            var defered = $q.defer();
            var promise = defered.promise;
            var t = [];
            db.select("TBL_ASIGNATURA", {
                "ID":'IS NOT NULL'
            }).then(function(results) {

                for(i=0; i < results.rows.length; i++){

                    t.push({id:results.rows.item(i).ID,descripcion:results.rows.item(i).ASIG_NOMBRE});
                }
                if(results.rows.length>0)
                {
                    defered.resolve(t);
                }
                else
                {
                    defered.reject('No hay registros en asignaturas');
                }

            })
            return promise;
        },
        updateAsignatura: function(a)
        {
           return db.update("TBL_ASIGNATURA", a, {
                "ID":  a.ID
            });
        },
        insertPrueba:function(a)
        {
            var t = {PRU_DESCRIPCION: a.PRU_DESCRIPCION, PRU_ASIGNATURA: a.PRU_ASIGNATURA, PRU_ESTADO: a.PRU_ESTADO};
                          db.insert('TBL_PRUEBA',
                a).then
                    (function(results) {


                    return results;
                });
        },
        selectPrueba: function()
        {
            var defered = $q.defer();
            var promise = defered.promise;
            var t = [];
            db.select("TBL_PRUEBA", {
                "ID":'IS NOT NULL'
            }).then(function(results) {

                var tp = results.rows;

                for(i=0; i < results.rows.length; i++){
//                    t.push(results.rows[i]);
                    t.push({
                    ID:results.rows.item(i).ID,
                    PRU_ASIGNATURA:results.rows.item(i).PRU_ASIGNATURA,
                    PRU_BIEN:results.rows.item(i).PRU_BIEN,
                    PRU_DESCRIPCION:results.rows.item(i).PRU_DESCRIPCION,
                    PRU_ESTADO:results.rows.item(i).PRU_ESTADO,
                    PRU_MAL:results.rows.item(i).PRU_MAL,
                    PRU_TOTAL:results.rows.item(i).PRU_TOTAL
                    });
                }

                if(results.rows.length>0)
                {


                    defered.resolve(t);
                }
                else
                {
                    defered.reject('La consulta no tiene registros');
                }

            })
            return promise;
        },
        selectPruebaFiltro: function(a)
        {
            var defered = $q.defer();
            var promise = defered.promise;
            var t = [];
            db.select("TBL_PRUEBA", {
                "PRU_ASIGNATURA":a
            }).then(function(results) {

                var tp = results.rows;

                for(i=0; i < results.rows.length; i++){
//                    t.push(results.rows[i]);
                    t.push({
                    ID:results.rows.item(i).ID,
                    PRU_ASIGNATURA:results.rows.item(i).PRU_ASIGNATURA,
                    PRU_BIEN:results.rows.item(i).PRU_BIEN,
                    PRU_DESCRIPCION:results.rows.item(i).PRU_DESCRIPCION,
                    PRU_ESTADO:results.rows.item(i).PRU_ESTADO,
                    PRU_MAL:results.rows.item(i).PRU_MAL,
                    PRU_TOTAL:results.rows.item(i).PRU_TOTAL
                    });
                }

                if(results.rows.length>0)
                {


                    defered.resolve(t);
                }
                else
                {
                    defered.reject('La consulta no tiene registros');
                }

            })
            return promise;
        }
        ,
        updatePrueba: function(a){
            return db.update("TBL_PRUEBA", a, {
                "ID":  a.ID
            });
        }
        ,
        insertPregunta:function(a)
        {
            db.insert('TBL_PREGUNTAS',
                a).then
            (function(results) {

                return results;
            });
        },
        selectPreguntas: function()
        {
            var defered = $q.defer();
            var promise = defered.promise;
            var t = [];
            db.select("TBL_PREGUNTAS", {
                "ID":'IS NOT NULL'
            }).then(function(results) {

                var tp = results.rows;

                for(i=0; i < results.rows.length; i++){
                    t.push(results.rows[i]);
                }

                if(results.rows.length>0)
                {
                    defered.resolve(t);
                }
                else
                {
                    defered.reject('La consulta no tiene registros');
                }

            })
            return promise;
        },
        updatePregunta: function(a){
            return db.update("TBL_PREGUNTAS", a, {
                "ID":  a.ID
            });
        },
        agregarRespuesta: function(a)
        {
            db.insert('TBL_RESPUESTA',
                a).then
            (function(results) {
                return results;
            });
        },
        selectRespuesta: function(a)
        {
            var defered = $q.defer();
            var promise = defered.promise;
            var t = [];
            db.select("TBL_RESPUESTA", {
                "RES_PREGUNTA":a
            }).then(function(results) {
                console.log('Ingreso');
                for(i=0; i < results.rows.length; i++){
                    t.push(results.rows[i]);
                }

                if(results.rows.length>0)
                {
                    defered.resolve(t);
                }
                else
                {
                    defered.reject('La consulta no tiene registros');
                }

            })
            return promise
        }
        };

    });