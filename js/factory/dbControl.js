myApp.factory('dbControl', function($webSql,$q) {


    return {
        getInstanceDB: function()
        {
            db = $webSql.openDatabase('learn_1.0.11', '1.0', 'db for learn', 4 * 1024 * 1024);

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
        selectPreguntasFiltro: function(a)
        {
            var defered = $q.defer();
            var promise = defered.promise;
            var t = [];

            /*var sql = "SELECT P.ID AS IDPREGUNTA,R.ID AS IDRESPUESTA,* FROM TBL_PREGUNTAS  P INNER JOIN " +
                " TBL_RESPUESTA R ON R.RES_PREGUNTA = P.ID WHERE P.PRE_PRUEBA = " + a;*/
            var sql = "SELECT * FROM TBL_PREGUNTAS WHERE PRE_PRUEBA = " + a

            db.sql(sql).then(function(results) {
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
        },
        selectBienPrueba:function(a)
        {
            var defered = $q.defer();
            var promise = defered.promise;
            var t = [];
            db.select("TBL_PRUEBA", {
                "ID":a
            }).then(function(results) {

                var tp = results.rows;

                for(i=0; i < results.rows.length; i++){
                    t.push(results.rows[i].PRU_BIEN);
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
        selectMalPrueba:function(a)
        {
            var defered = $q.defer();
            var promise = defered.promise;
            var t = [];
            db.select("TBL_PRUEBA", {
                "ID":a
            }).then(function(results) {

                for(i=0; i < results.rows.length; i++){
                    t.push(results.rows[i].PRU_MAL);
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
        selectBienPregunta:function(a)
        {
            var defered = $q.defer();
            var promise = defered.promise;
            var t = [];

            db.select("TBL_PREGUNTAS", {
                "ID":a
            }).then(function(results) {
                var tp = results.rows;
                for(i=0; i < results.rows.length; i++){
                    t.push(results.rows[i].PRE_BIEN);
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
        selectMalPregunta:function(a)
        {
            var defered = $q.defer();
            var promise = defered.promise;
            var t = [];
            db.select("TBL_PREGUNTAS", {
                "ID":a
            }).then(function(results) {

                for(i=0; i < results.rows.length; i++){
                    t.push(results.rows[i].PRE_MAL);
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
        updatePruebaNota: function(a,b,c){
            if(a===true)
            {
                return db.update("TBL_PRUEBA", {"PRU_BIEN":c}, {
                    "ID":  b
                });
            }else
            {
                return db.update("TBL_PRUEBA", {"PRU_MAL":c}, {
                    "ID":  b
                });
            }

        },
        updatePreguntaNota: function(a,b,c){
            if(a===true)
            {
                return db.update("TBL_PREGUNTAS", {"PRE_BIEN":c}, {
                    "ID":  b
                });
            }else
            {
                return db.update("TBL_PREGUNTAS", {"PRE_MAL":c}, {
                    "ID":  b
                });
            }

        },
        updateAsignaturaNota: function(a){
            var sql = "UPDATE TBL_ASIGNATURA " +
            " SET ASIG_NOTA = (SELECT ROUND((SUM(PRU_BIEN)*1.0)/((SUM(PRU_BIEN) + SUM(PRU_MAL)))*100.0,2) AS RESULT FROM TBL_PRUEBA WHERE PRU_ASIGNATURA = " + a +")"
            " WHERE ID = " + a + ";";

            return db.sql(sql);
        },
        updateTotalPrueba: function()
        {
            db.sql("UPDATE TBL_PREGUNTAS SET PRE_TOTAL =  PRE_BIEN +  PRE_MAL;");
            return db.sql("UPDATE TBL_PRUEBA SET PRU_TOTAL =  PRU_BIEN +  PRU_MAL;");
        }
        };

    });