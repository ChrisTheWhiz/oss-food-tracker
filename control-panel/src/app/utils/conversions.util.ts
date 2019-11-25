import {DomSanitizer} from '@angular/platform-browser';
import {Injectable} from '@angular/core';


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
}
