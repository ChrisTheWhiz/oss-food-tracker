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
	_id?: Types.ObjectId;
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
		},
		{
			id: number,
			name: string,
			unitName: UNIT,
			amount: number
		},
		{
			id: number,
			name: string,
			unitName: UNIT,
			amount: number
		},
		{
			id: number,
			name: string,
			unitName: UNIT,
			amount: number
		}];
}

export interface MealInstance {
	ingredient: Ingredient;
	quantity: number; // always in grams
}

export interface Meal {
	_id?: Types.ObjectId;
	description: string;
	image?: string | ArrayBuffer;
	kind: FOOD_KIND;

	ingredients: MealInstance[];
}

export interface FoodInstance {
	_id?: Types.ObjectId;
	foodType: 'Ingredient' | 'Meal';
	quantity: number;
	timeOfConsumption: Date;
	mealTime: string;
	food: Types.ObjectId;
	image?: string | ArrayBuffer;
}

export interface User {
	_id?: Types.ObjectId;
	username: string;
	name: string;
	email: string;
	password: string;
	accountCreated: Date;
	mealTimes: string[];
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
