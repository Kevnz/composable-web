path = require('path')
express = require('express')  
url = require('url')
app = module.exports = express()
Y = require('yui').use('base', 'substitute')
port = process.env.PORT or 3000
mongoURL = process.env.MONGOLAB_URI or "teched"
db = require('mongojs').connect(mongoURL, ['scores']);
scores = db.collection('scores')

console.log('start app called')
app.configure(->
    app.set 'views', __dirname + '/views'
    app.set 'view engine', 'jade'
    app.set 'view options', { pretty: true } 
    app.use(express.static(__dirname + '/public'))
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use express.cookieParser 'secret sauce' 
)

app.configure('development', ->
    console.log 'development'
    app.use(app.router)
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
)

app.configure('production', ->
    console.log 'production'
    app.use(app.router)
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
)




#app.helpers require './views/helpers'

app.get '/', (req, res, next )->
    res.render 'index'

app.get '/mixins', (req, res, next) ->
    res.render 'mixin'

app.get '/models', (req, res, next) ->
    res.render 'models' 

app.get '/scores', (req, res, next) ->
    scores.find (err, docs) ->
        res.send docs
app.post '/scores', (req, res, next) ->
    { name, score,created, id } = req.body 
    doc = { name, score, created, id }
    scores.save doc, (err) ->
        res.send { result : true, message : 'Score Saved'}

#if(!module.parent)
app.listen(port)
console.log('Express server listening on port %d', port)
