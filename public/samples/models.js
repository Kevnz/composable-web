YUI().use('model','model-sync-rest', 'offline-sync',
    'event',  'node', 'transition',  function(Y){

    var saveScore = function(e){
        e.preventDefault();
        Y.log(Y.one('#submit').get('checked'));
        var name = Y.one('#name').get('value');
        var score = Y.one('#score').get('value');
        var submit = Y.one('#submit').get('checked'); 
        var submethod = submit ? Y.ModelSync.REST : Y.ModelSync.Offline;
        Y.log(submethod)
        Y.Score = Y.Base.create('user', Y.Model, [submit ? Y.ModelSync.REST : Y.ModelSync.Offline ], { 
            root: '/scores'
        });
        var created = new Date();
        var newScore = new Y.Score();
        newScore.setAttrs({name: name, score:score, created: created});

        newScore.save()
    }
    var generateScore = function (e){
        e.preventDefault();
        var score = Math.floor(Math.random()*1001)
        for (var i = 0; i < 10; i++) {
            score = score + Math.floor(Math.random()*1001)     
        };
        Y.one('#score').set('value', score)
        Y.one('#play').hide(true,  function() {
            Y.one('#details').show(true);
        });
    }
    var init = function(){
        Y.one('#details').hide();
        Y.one('#generateScore').on('click', generateScore);
        Y.one('#saveScore').on('click', saveScore);
    }

    Y.on('domready', init);
});