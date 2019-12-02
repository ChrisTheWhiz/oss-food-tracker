import {Response, Request, NextFunction} from 'express';
import {MealModel} from '../models/meal';
import {IUserModel, UserModel} from '../models/user';
import mongoose from 'mongoose';
import {User, Meal} from '../../../shared_code/shared-interfaces';


export function getUserPersonalMeals(req: Request, res: Response, next: NextFunction) {
	const user = req.user as User;
	const meals = user.foodData.personalMeals;
	res.json(meals);
}

export function getUserMealsHistory(req: Request, res: Response, next: NextFunction) {
	const user = req.user as User;
	const mealHistory = user.foodData.diaryHistory;
	res.json(mealHistory);
}

export function addToDiary(req: Request, res: Response, next: NextFunction) {
	const user = new UserModel(req.user);
	const newMeals = req.body.meals;
	const resMessages: any[] = [];
	let resStatus = 'success';
	newMeals.forEach((meal: any) => {
		try {
			const pendingMeal = new MealModel(meal);
			user.foodData.diaryHistory.push(meal);
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
	const user = req.user as User;
	const meal: Meal = req.body.meal;
	UserModel.findOneAndUpdate({username: user.username}, {
		$push: {
			'foodData.personalMeals': meal
		}
	})
		.then((resp) => {
			res.send(resp);
		});
}
