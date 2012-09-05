YUI().use('model','model-sync-rest', 'model-sync-offline','event-base',  'node-base', function(Y){

    var saveScore = function(e){
        var name = Y.one('#name');
        var score = Y.one('#score');
        var submit = !Y.one('#submit').get('checked'); 
    }
    var init = function(){
        Y.one('#saveScore').on('click', saveScore);
    }

    Y.on('domready', init);
});