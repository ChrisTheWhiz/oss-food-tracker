import {Router} from 'express';
import {loginHandler, registrationHandler} from '../controllers/user';
import {getUserMealsHistory, getUserPersonalMeals} from '../controllers/userMeals';


const router = Router();
// Handle Registration
router.post('/register', registrationHandler);
// Handle login
router.post('/login', loginHandler);


export {router as UserRoutes};

