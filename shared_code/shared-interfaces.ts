import {INGREDIENT_SOURCES, FOOD_KIND, UNIT} from './shared-enums';
import {Types} from 'mongoose';

export interface SubstanceNutrition {
	referenceQuantity: number;
	referenceUnit: UNIT | string;
}

export interface NutritionalData {
	macros: {
		protein: SubstanceNutrition;
		carb: SubstanceNutrition;
		fat: SubstanceNutrition;
	};
	metals?: {
		iron?: SubstanceNutrition;
		magnesium?: SubstanceNutrition;
	};
	vitamin?: {
		vitaminA?: SubstanceNutrition;
		vitaminB?: SubstanceNutrition;
	};
}

export interface Ingredient {
	description: string;
	image?: string | ArrayBuffer;
	kind: FOOD_KIND.INGREDIENT;

	source: INGREDIENT_SOURCES;
	fdcId: string;
	nutrition: [{
		id: number,
		name: string,
		unitName: UNIT,
		amount: number
	}];
}
export interface Meal {
	description: string;
	image?: string | ArrayBuffer;
	kind: FOOD_KIND;

	ingredients: [{
		ingredient: Types.ObjectId[],
		quantity: number	// always in grams
	}];
}

export interface FoodInstance {
	foodType: 'Ingredient' | 'Meal';
	quantity: number;
	timeOfConsumption: Date
	meal: Ingredient | Meal
}

export interface User {
	username: string;
	name: string;
	email: string;
	password: string;
	accountCreated: Date;
	jwt?: string; // for client purposes
	foodData: {
		// These are subdocuments
		personalMeals: Meal[],
		diaryHistory: FoodInstance[],

		// These are references
		recentMeals: Types.ObjectId[],
		favouriteMeals: Types.ObjectId[],
		recentIngredients: Types.ObjectId[]
		favouriteIngredients: Types.ObjectId[]
	}
}
