import {Router} from 'express';
import {getUserMealsHistory, getUserPersonalMeals} from '../controllers/userMeals';


const router = Router();

router.get('/meals', getUserPersonalMeals);

router.get('/history', getUserMealsHistory);

export {router as DashboardRoutes};
