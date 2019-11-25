import approvalObj from './approvalObj';

const approvedList: any = [];
approvalObj.forEach((item: any) => {
	approvedList.push(item.id);
});

export function getNutrientsFromFdcResponse(foodNutrients: []): any {
	const nutrientField: any[] = [];
	foodNutrients.forEach((nut: any) => {
		if (approvedList.indexOf(nut.nutrient.id) !== -1) {
			nutrientField.push({
				id: nut.nutrient.id,
				name: nut.nutrient.name,
				unitName: nut.nutrient.unitName,
				amount: nut.amount
			});
		}
	});
	return nutrientField;
}

