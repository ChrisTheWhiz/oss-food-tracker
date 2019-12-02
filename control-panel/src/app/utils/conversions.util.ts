import {DomSanitizer} from '@angular/platform-browser';
import {Injectable} from '@angular/core';
import {UNIT} from '../../../../shared_code/shared-enums';


@Injectable({
	providedIn: 'root'
})
export class ConversionsUtil {
	constructor(private sanitizer: DomSanitizer) {
	}

	convertMongoBase64toHTMLBase64(mongooseString: string) {
		mongooseString = mongooseString.replace('dataimage/jpegbase64', 'data:image/jpeg;base64,');
		return this.sanitizer.bypassSecurityTrustUrl(mongooseString);
	}

	convertQuantityToGrams(quantity: number, unit: UNIT) {
		let resultQuantity: number;
		switch (unit) {
			case UNIT.cup:
				// TODO
				resultQuantity = quantity;
				break;
			case UNIT.gram:
				resultQuantity = quantity;
				break;
			case UNIT.mL:
				// TODO
				resultQuantity = quantity;
				break;
			case UNIT.ounce:
				resultQuantity = quantity * 28.34;
				break;
			case UNIT.piece:
				// TODO
				resultQuantity = quantity;
				break;
			case UNIT.serving:
				// TODO
				resultQuantity = quantity;
				break;
			default:
				throw new Error('unknown Unit used');
		}
		return resultQuantity;
	}
}
