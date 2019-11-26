import * as bcrypt from 'bcryptjs';
import {Request, Response} from 'express';
import {sign} from 'jsonwebtoken';
import {databaseConfig} from '../../../shared_code/network';
import {UserModel} from '../models/userModel';


export const registrationHandler = (req: Request, res: Response) => {
	const {name, email, password, password2, username} = req.body;
	const errors: Array<{ msg: string }> = [];
	// Check required fields
	if (!name || !email || !password || !password2) {
		errors.push({msg: 'Please fill in all fields!'});
	}
	// Check passwords match
	if (password !== password2) {
		errors.push({msg: 'Passwords do not match!'});
	}
	// Check pass length
	if (password.length < 6) {
		errors.push({msg: 'Password should be at least 6 characters'});
	}
	if (errors.length > 0) {
		res.send({
			status: 'user_error',
			message: errors
		});
	} else {
		// Validation passed
		UserModel.findOne({email})
		.then((user) => {
			if (user) {
				// UserModel exists
				errors.push({msg: 'User is already registered!'});
				res.send({
					status: 'error',
					message: errors
				});
			} else {
				const newUser = new UserModel({
					name,
					email,
					password,
					username
				});
				// Hash password
				bcrypt.genSalt(10, (err: Error, salt) => {
					if (err) {
						throw err;
					}
					bcrypt.hash(newUser.password, salt)
					.then((hash) => {
						newUser.password = hash;
						newUser.save()
						// it's not actually shadowed because the path where we declare a user variable and it exists ends the function
						// tslint:disable-next-line:no-shadowed-variable
						.then((user) => {
							const token = sign(user.toObject(), databaseConfig.secret, {expiresIn: 60480});
							res.send({
								status: 'success',
								token: 'JWT ' + token,
								user
							});
						})
						.catch((e: Error) => {
							console.log(e);
							res.send(e);
						});
					})
					.catch((e: Error) => {
						console.log(e);
					});
				});
			}
		})
		.catch((e: Error) => {
			console.log(e);
		});
	}
};

export const loginHandler = (req: Request, res: Response) => {
	const {usernameOrEmail, password} = req.body;
	UserModel.findOne({username: usernameOrEmail}).lean()
	.then((user) => {
		if (!user) {
			res.send({
				status: 'error',
				message: 'user not found'
			});
		} else {
			bcrypt.compare(password, user.password)
			.then((isMatch) => {
				if (!isMatch) {
					res.send({
						status: 'error',
						message: 'wrong password'
					});
				} else {
					const token = sign(user, databaseConfig.secret, {expiresIn: 60480});
					// console.log(user);
					res.send({
						status: 'success',
						token: 'JWT ' + token,
						user
					});
				}
			})
			.catch((e: Error) => {
				console.log(e);
			});
		}
	})
	.catch((e: Error) => {
		console.log(e);
	});
};



