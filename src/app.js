
const path = require('path');
const express = require('express');
const hbs = require('hbs');
//const { runInNewContext } = require('vm');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const dirPublic     = path.join(__dirname, '../public');
const dirViews      = path.join(__dirname, '../templates/views');
const dirPartials   = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials);

// Setup static directory to werve
app.use(express.static(dirPublic));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather or Not!",
        name: 'JediSQL',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page!",
        name: 'JediSQL',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help! Page",
        help: "I can't help you - I can't even help myself!",
        name: 'JediSQL',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) return res.send({error: 'You must provide an address.'})
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) return res.send({error});
        forecast(longitude, latitude, (error, forecast) => {
            if(error) return res.send({error});
            res.send({
                forecast,
                location,
                address: req.query.address,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) return res.send({error: 'You must provide a search term'})
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'For "Oh, Fore"',
        error: "Help article not found.",
        name: 'JediSQL',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'For "Oh, Fore"',
        error: "Page not found.",
        name: 'JediSQL',
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});
