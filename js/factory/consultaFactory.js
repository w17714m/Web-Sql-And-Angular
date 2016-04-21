myApp.factory('consultaFactory', function(audioConfig,$http,$rootScope) {
    return {
        getimage: function(image)
        {
            return $http.get('http://api.riffsy.com/v1/search?tag=' + image + '&limit=1').then(function(data)
            {
               return data.data.results[0].media[0].gif.url;
            },function(error){
                return 'img/lupa.jpg';
            })
        },
        getSound:function(text)
        {
            var audio = new Audio('https://api.voicerss.org/?key=7ca26786842a48849174e28e6ff1ab56&src=' + text + '&hl='+audioConfig.idioma+'&r='+audioConfig.velocidad+'&c=MP3');
            return audio;
        },
        animateLetter: function(a)
        {
            var res = (typeof a ==='undefined')?'#animateLetter':a;


            $(a).textillate({
                // the default selector to use when detecting multiple texts to animate
                selector: '.texts',

                // enable looping
                loop: false,

                // sets the minimum display time for each text before it is replaced
                minDisplayTime: 2000,

                // sets the initial delay before starting the animation
                // (note that depending on the in effect you may need to manually apply
                // visibility: hidden to the element before running this plugin)
                initialDelay: 0,

                // set whether or not to automatically start animating
                autoStart: true,

                // custom set of 'in' effects. This effects whether or not the
                // character is shown/hidden before or after an animation
                inEffects: [],

                // custom set of 'out' effects
                outEffects: [ 'rotateInDownLeft' ],

                // in animation settings
                in: {
                    // set the effect name
                    effect: 'rotateInDownLeft',

                    // set the delay factor applied to each consecutive character
                    delayScale: 1.5,

                    // set the delay between each character
                    delay: 80,

                    // set to true to animate all the characters at the same time
                    sync: false,

                    // randomize the character sequence
                    // (note that shuffle doesn't make sense with sync = true)
                    shuffle: true,

                    // reverse the character sequence
                    // (note that reverse doesn't make sense with sync = true)
                    reverse: false,

                    // callback that executes once the animation has finished
                    callback: function () {}
                },

                // out animation settings.
                out: {
                    effect: 'fadeOutLeft',
                    delayScale: 1.5,
                    delay: 50,
                    sync: false,
                    shuffle: true,
                    reverse: false,
                    callback: function () {}
                },

                // callback that executes once textillate has finished
                callback: function () {},

                // set the type of token to animate (available types: 'char' and 'word')
                type: 'char'
            });

        },
        showModal: function(a)
        {
            $rootScope.mensaje = a;
            $('#mensajeModal').modal({backdrop: 'static', keyboard: false});
        },
        hideModal: function(){
            $rootScope.mensaje = '';
            $('#mensajeModal').modal('hide');
        }
    };
});