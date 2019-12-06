import express = require('express');
import mongoose from 'mongoose';
import passport from 'passport';

import {databaseConfig, networkConfig} from '../../shared_code/network';
import {passportJwtConfig} from './config/passport';
import {DashboardRoutes} from './routes/dashboard';
import {FdcRoutes} from './routes/ingredient';
import {UserRoutes} from './routes/user';

// Passport config
// passportLocalConfig(passport);

// Connect to mongoose
mongoose.connect(databaseConfig.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
.then(() => {
	console.log('Connected to mongodb database');
})
.catch((e: Error) => {
	console.log(e);
});

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/* this is just for debugging */
// app.use((req, res, next) => {
// 	console.log(req.headers);
// 	next();
// });

app.use(passport.initialize());
app.use(passport.session());
passportJwtConfig(passport);

app.use('/users', UserRoutes);
app.use('/api', passport.authenticate('jwt', {session: false}), FdcRoutes);
app.use('/dashboard', passport.authenticate('jwt', {session: false}), DashboardRoutes);
app.get('', (req, res) => {
	res.send('Express is now working!');
});

app.listen(networkConfig.port, () => {
	console.log('App listening on port ' + networkConfig.port);
});
