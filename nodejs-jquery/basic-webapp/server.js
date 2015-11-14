var express = require('express'),
    serveStatic = require('serve-static'),
    path = require('path'),
    passport = require('passport'),
    SsqSignonStrategy = require('passport-ssqsignon').Strategy,
    port = 9901,
    ssqSignonConfig = require('./config.js').ssqSignon,
    app = express();

passport.use(new SsqSignonStrategy(ssqSignonConfig.moduleName, scopeAsObject));

app.get('/cat', passport.authenticate('ssqsignon', { session: false }), function (req, res) {
    if (req.user.scope.cat) {
        res.json({ message: 'Hello, I am the cat!' });
    } else {
        res.status(403).send('insufficient_permissions');
    }
});

app.get('/dog', passport.authenticate('ssqsignon', { session: false }), function (req, res) {
    if (req.user.scope.dog) {
        res.json({ message: 'Hello, I am the dog!' });
    } else {
        res.status(403).send('insufficient_permissions');
    }
});


app.use('/app.js', serveStatic(path.join(__dirname, 'client', 'app.js')));
app.use('/authenticator.js', serveStatic(path.join(__dirname, 'client', 'authenticator.js')));
app.use('/config.js', serveStatic(path.join(__dirname, 'client', 'config.js')));
app.use('/cat.jpg', serveStatic(path.join(__dirname, 'client', 'cat.jpg')));
app.use('/dog.jpg', serveStatic(path.join(__dirname, 'client', 'dog.jpg')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

function scopeAsObject(scopeStr) {
    return scopeStr.split(' ').reduce(function(result, s) { result[s] = true; return result; }, {});
}

app.listen(port);
console.log([ 'web app listening on port', port.toString() ].join(' '));
