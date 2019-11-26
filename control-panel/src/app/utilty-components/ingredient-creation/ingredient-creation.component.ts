import {Component, OnInit} from '@angular/core';
import {ImageService} from '../../services/image.service';
import {Ng2ImgMaxService} from 'ng2-img-max';
import {DomSanitizer} from '@angular/platform-browser';
import {IngredientsService} from '../../services/ingredients.service';


@Component({
	selector: 'app-ingredient-creation',
	templateUrl: './ingredient-creation.component.html',
	styleUrls: ['./ingredient-creation.component.scss']
})
export class IngredientCreationComponent implements OnInit {
	base64img: string | ArrayBuffer;
	message: 'uninitiliazezd';
	consideredIngredients: any[];
	consideredDisplayedColumns = ['fdcId', 'description', 'score'];
	previewedIngredient: any;
	previewedDisplayedColumns = ['name', 'amount', 'unitName'];
	ingredientsAreLoading = true;
	nutritionIsLoading = false;
	ingredientAdditionisLoading = false;

	ngOnInit() {
		this.submitForm('');
	}

	constructor(private imageService: ImageService, private ng2ImgMax: Ng2ImgMaxService, private sanitizer: DomSanitizer, private ingredientsService: IngredientsService) {
	}

	onImageChange(event) {
		// console.log('image event triggered!');
		const image = event.target.files[0];
		const reader: FileReader = new FileReader();
		this.ng2ImgMax.resizeImage(image, 2000, 100).subscribe(
			result => {
				reader.readAsDataURL(result);
				// @ts-ignore
				reader.onload = () => {
					if (reader.result) {
						this.base64img = reader.result;
					} else {
						throw new Error('Reading new ingredient image failed in ingredient-creation.components.ts');
					}
					this.imageService.uploadImage(this.base64img)
					.subscribe((next) => {
						this.message = next;
					});
				};

			},
			error => {
				console.log('😢 Oh no!', error);
			}
		);
	}

	submitForm(description: string) {
		this.consideredIngredients = [];
		this.previewedIngredient = null;
		this.ingredientsAreLoading = true;
		this.ingredientsService.findIngredientsInFdc(description)
		.subscribe((response) => {
			if (response.length === 0) {
				this.consideredIngredients = [{
					fdcId: '',
					score: '',
					description: 'No ingredients match your query ☹'
				}];
			} else {
				this.consideredIngredients = response;
				// console.log(this.consideredIngredients);
			}
			this.ingredientsAreLoading = false;
		});
	}

	selectIngredientForPreview(fdcId: string) {
		this.previewedIngredient = undefined;
		this.nutritionIsLoading = true;
		this.ingredientsService.getFdcIngredient(fdcId)
		.subscribe((response) => {
			this.previewedIngredient = response;
			this.nutritionIsLoading = false;
		});
	}

	addIngredientToLocal(fdcId: string, image?: string | ArrayBuffer) {
		this.ingredientAdditionisLoading = true;
		this.ingredientsService.addFdcIngredientToLocal(fdcId, image)
		.subscribe((response) => {
			this.message = response;
			if (!response.error) {
				this.previewedIngredient = undefined;
			}
			this.ingredientAdditionisLoading = false;
		});
	}
}
