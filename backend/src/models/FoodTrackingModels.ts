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

export class SubstanceNutrition {
	constructor(
		public referenceQuantity?: number,
		public referenceUnit?: UNIT
	) {
	}
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

export class IngredientModel {
	public name!: string;
	public photo!: string;
	public nutrition!: NutritionalData;

}
