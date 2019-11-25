import * as fs from 'fs';
import sharp from 'sharp';


export function resizeImage(path: string, width = 500, height = 300) {
	let transform = sharp();

	transform = transform.resize(width, height, {withoutEnlargement: true});

	const readStream = fs.createReadStream(path);
	const writeStream = fs.createWriteStream(path + '-out');
	readStream.pipe(transform).pipe(writeStream);
}

resizeImage('aaa');
