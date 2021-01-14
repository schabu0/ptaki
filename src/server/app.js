import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import settings from 'settings';

mongoose.connect(settings.MONGO_URI);

const app = module.exports = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

require('./api/birds');

app.get('*', (req, res) => res.sendFile(`${settings.APP_ROOT}/public/index.html`));

app.listen(settings.APP_PORT, () => console.log(`App listening on port ${settings.APP_PORT}!`));
