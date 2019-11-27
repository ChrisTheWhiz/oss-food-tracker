import {Response, Request, NextFunction} from 'express';
import {PersonalMealModel} from '../models/mealRecipeModel';
import {IUserModel, UserModel} from '../models/userModel';
import mongoose from 'mongoose';


export function getUserPersonalMeals(req: Request, res: Response, next: NextFunction) {
	// res.send({
	// 	status: 'success',
	// 	message: 'You are authenticated and have access to your meals', // TODO a real function
	// 	user: req.user
	// });
	// const user = new UserModel(req.user);

	// TODO fix this
	// @ts-ignore
	res.send(req.user!.foodData!.mealHistory);
}

export function getUserMealsHistory(req: Request, res: Response, next: NextFunction) {

}

export function addMealInstances(req: Request, res: Response, next: NextFunction) {
	console.log(req.body);
	const user = new UserModel(req.user);
	const newMeals = req.body.meals;
	const resMessages: any[] = [];
	let resStatus = 'success';
	newMeals.forEach((meal: any) => {
		try {
			const pendingMeal = new PersonalMealModel(meal);
			user.foodData.mealHistory.push(meal);
			pendingMeal.save()
			.then(() => { // TODO send list of meals to client for double-check
			})
			.catch((e) => {
				throw e;
			});
		} catch (e) {
			resStatus = 'error';
			resMessages.push({
				message: `Adding meal: ${meal.description} failed`,
				error: e
			});
		}
		res.send({
			resStatus,
			resMessages
		});
	});
}

export function createNewMeal(req: Request, res: Response, next: NextFunction) {
	const user = req.user as IUserModel;
	const meals = req.body.meals;
	const a = UserModel.findOneAndUpdate({username: user.username}, {
			$push: {
				'foodData.personalMeals': meals[0]
		}
	})
	.then((resp) => {
		// console.log(resp);
		res.send(resp);
	});
}
