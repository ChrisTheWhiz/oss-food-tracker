import {Router} from 'express';
import {
	fdcGetIngredient,
	fdcGetIngredientLocalAddIngredient,
	fdcIngredientSearch,
	localGetIngredient,
	localGetIngredients
} from '../controllers/ingredient';


const router = Router();

// Handle Registration
router.get('/fdc/ingredient/find', fdcIngredientSearch);

router.get('/fdc/ingredient/:fdcId', fdcGetIngredient);

router.post('/fdc/addIng/:id', fdcGetIngredientLocalAddIngredient);

router.get('/ingredients', localGetIngredients);

router.get('/ingredient', localGetIngredient);

export {router as FdcRoutes};
