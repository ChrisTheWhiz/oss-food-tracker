import {UNIT, IngredientModel} from '../models/FoodTrackingModels';


export interface IIngredientsContainer {
	[key: number]: IngredientModel;
}

export const placeholderIngredients: IIngredientsContainer = {
	1: {
		name: 'Carrot',
		photo: 'fake/path/to/photo.jpg',
		nutrition: {
			macros: {
				protein: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				carb: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				fat: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				}
			}
		}
	},
	2: {
		name: 'Onion',
		photo: 'fake/path/to/photo.jpg',
		nutrition: {
			macros: {
				protein: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				carb: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				fat: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				}
			}
		}
	},
	3: {
		name: 'Potato',
		photo: 'fake/path/to/photo.jpg',
		nutrition: {
			macros: {
				protein: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				carb: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				fat: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				}
			}
		}
	},
	4: {
		name: 'Tomato',
		photo: 'fake/path/to/photo.jpg',
		nutrition: {
			macros: {
				protein: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				carb: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				fat: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				}
			}
		}
	},
	5: {
		name: 'Ground beef',
		photo: 'fake/path/to/photo.jpg',
		nutrition: {
			macros: {
				protein: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				carb: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				fat: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				}
			}
		}
	},
	6: {
		name: 'Scallion',
		photo: 'fake/path/to/photo.jpg',
		nutrition: {
			macros: {
				protein: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				carb: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				fat: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				}
			}
		}
	},
	7: {
		name: 'Parsley',
		photo: 'fake/path/to/photo.jpg',
		nutrition: {
			macros: {
				protein: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				carb: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				},
				fat: {
					referenceQuantity: 100,
					referenceUnit: UNIT.gram
				}
			}
		}
	}
};
