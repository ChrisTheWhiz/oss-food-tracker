// after 1st revision
export enum UNIT {
	mL = 'mL',
	gram = 'gram',
	cup = 'cup',
	ounce = 'ounce',
	serving = 'serving',
	piece = 'piece'
}

export enum SUBSTANCE {
	PROTEIN = 'PROTEIN',
	CARBOHYDRATES = 'CARBOHYDRATES',
	FATs = 'FATs',
	VITAMIN_A = 'VITAMIN_A',
	IRON = 'IRON',
	MAGNESIUM = 'MAGNESIUM',
	ETC = 'ETC'
}

export enum TABLE_MODES {
	recent = 'recent',
	favourites = 'favourites',
	all = 'all',
	meals = 'meals',
	recipes = 'recipes',
}

export interface SubstanceNutrition {
	referenceQuantity?: number;
	referenceUnit?: UNIT | string;
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

export interface ActualFood {
	foodName: string;
	quantity: SubstanceNutrition;
	mealType: string;
	foodPicture?: string | ArrayBuffer;
}


// after 2nd revision

export enum INGREDIENT_SOURCES {
	SURVEY,
	USER
}

export interface IngNutrition {
	id: number;
	name: string;
	unitName: string;
	amount: number;
}

export interface Ingredient {
	description: string;
	source: INGREDIENT_SOURCES;
	nutrition: IngNutrition[];
	image: string | ArrayBuffer;
}


// placeholders
export const PLACEHOLDER_BASKET = [
	{
		foodName: 'Tomato',
		mealType: 'breakfast',
		quantity: {
			referenceUnit: UNIT[UNIT.gram],
			referenceQuantity: 50
		},
	},
	{
		foodName: 'Onion',
		mealType: 'breakfast',
		quantity: {
			referenceUnit: UNIT[UNIT.ounce],
			referenceQuantity: 130
		},
	},
	{
		foodName: 'Potato',
		mealType: 'breakfast',
		quantity: {
			referenceUnit: UNIT[UNIT.serving],
			referenceQuantity: 3
		},
	},
	{
		foodName: 'Carrot',
		mealType: 'breakfast',
		quantity: {
			referenceUnit: UNIT[UNIT.ounce],
			referenceQuantity: 6
		},
	}
];
