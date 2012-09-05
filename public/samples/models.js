YUI().use('model', 'model-list', 'model-sync-rest', 'offline-sync',
    'event',  'node', 'transition', 'handlebars', function(Y){

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
        var newScore = new Y.Score({id: created.getTime()});
        newScore.setAttrs({name: name, score:score, created: created});

        newScore.save()

        loadScores(submit);
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

    var loadScores = function(online){
        Y.ScoresList = Y.Base.create('scoresList', Y.ModelList, [online ? Y.ModelSync.REST : Y.ModelSync.Offline], {
            model: Y.Score,
            comparator: function (model) {
                return model.get('score');
            }
        });
        var scores = new Y.ScoresList();
        scores.load();
        var source   = Y.one('#scores-template').getHTML(),
        template = Y.Handlebars.compile(source),
        html;
        console.log(scores.toJSON());
        console.log(source);
        html = template({scores : scores.toJSON()});
        Y.one('#scoreboard').append(html);



    }
    var init = function(){
        Y.one('#details').hide();
        Y.one('#generateScore').on('click', generateScore);
        Y.one('#saveScore').on('click', saveScore);
    }

    Y.on('domready', init);
});