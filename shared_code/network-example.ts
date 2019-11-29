import {config} from 'dotenv';
const result = config({
	path: '../shared_code/.env'
});
if (result.error) {
	console.log(result.error);
}
const environment = process.env.ENV;


export let networkConfig: any;
export let databaseConfig: any;

if (environment === 'development') {
	networkConfig = {
		port: '#port', // choose desired port for the backend
		usdaKey: 'insert USDA key here', // you can obtain a key from https://fdc.nal.usda.gov/api-key-signup.html
		backendUrl: 'insert your backend server url' // most likely 'http://localhost
	};

	databaseConfig = {
		url: 'insert mongo url here', // you can set up Mongo Atlas, or host your own database
		secret: 'choose your secret' // used for generating the user password hashes
	};
} else if (environment === 'production') {
	throw new Error('Production environment not set!');
} else {
	throw new Error('Unexpected ENV: ' + environment);
}
