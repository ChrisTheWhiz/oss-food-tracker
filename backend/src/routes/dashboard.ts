import {Router} from 'express';
import {addToDiary, createNewMeal, getUserMealsHistory, getUserPersonalMeals} from '../controllers/food';


const router = Router();

router.get('/meals', getUserPersonalMeals);

router.get('/history', getUserMealsHistory);

router.post('/meals', addToDiary);

router.post('/meal', createNewMeal);

export {router as DashboardRoutes};
