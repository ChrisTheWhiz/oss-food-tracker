import {Response, Request, NextFunction} from 'express';


export function getUserPersonalMeals(req: Request, res: Response, next: NextFunction) {
	// console.log('req received!');
	res.send({
		status: 'success',
		message: 'You are authenticated and have access to your meals'
	});
}

export function getUserMealsHistory(req: Request, res: Response, next: NextFunction) {
}
