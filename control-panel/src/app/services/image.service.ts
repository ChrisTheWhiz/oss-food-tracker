import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ImageService {

	constructor(private http: HttpClient) {
	}


	public uploadImage(image: string | ArrayBuffer): Observable<any> {
		return this.http.post('/api/image-upload', {
			payload: image
		});
	}
}
