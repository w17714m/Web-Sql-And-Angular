myApp.factory('dbControl', function($webSql,$q) {


    return {
        getInstanceDB: function()
        {
            db = $webSql.openDatabase('learn_1.0.0', '1.0', 'db for learn', 4 * 1024 * 1024);

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
                    "type": "TEXT",
                    "null": "NOT NULL"
                },
                "PRU_MAL":{
                    "type": "TEXT",
                    "null": "NOT NULL"
                },
                "PRU_TOTAL":{
                    "type": "TEXT",
                    "null": "NOT NULL"
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
                    "type": "TEXT",
                    "null": "NOT NULL"
                },
                "PRE_MAL":{
                    "type": "TEXT",
                    "null": "NOT NULL"
                },
                "PRE_TOTAL":{
                    "type": "TEXT",
                    "null": "NOT NULL"
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
                console.log(results.insertId);
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
                    defered.reject(err);
                }

            })
            return promise;
        },
        updateAsignatura: function(a)
        {
           return db.update("TBL_ASIGNATURA", a, {
                "ID":  a.ID
            });
        }

        };

    });