import {PassportStatic} from 'passport';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';

import {UserModel} from '../models/user';
import {databaseConfig} from '../../../shared_code/network';


export const passportJwtConfig = (passport: PassportStatic) => {
	passport.use(new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
		secretOrKey: databaseConfig.secret
	}, (jwtPayload, done) => {
		UserModel.findOne({email: jwtPayload.email}, (err, user) => {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}));

};
