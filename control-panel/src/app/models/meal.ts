import {SubstanceNutrition, Ingredient} from '../../../../shared_code/shared-interfaces';

export interface PersonalMeal {
	description: string;
	favourite: boolean;
	quantity: SubstanceNutrition;
	kind: string;
	picture?: string | ArrayBuffer;
	ingredients: Ingredient[];
}
