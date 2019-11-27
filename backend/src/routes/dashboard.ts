import {Router} from 'express';
import {addMealInstances, createNewMeal, getUserMealsHistory, getUserPersonalMeals} from '../controllers/userMeals';


const router = Router();

router.get('/meals', getUserPersonalMeals);

router.get('/history', getUserMealsHistory);

router.post('/meals', addMealInstances);

router.post('/meal', createNewMeal);

export {router as DashboardRoutes};
