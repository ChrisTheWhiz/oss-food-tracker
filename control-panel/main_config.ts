import {networkConfig} from '../shared_code/network';

const proxyJson = {
	'/api': {
		target: `${networkConfig.backendUrl}:${networkConfig.port}`,
		secure: false
	},
	'/users': {
		target: `${networkConfig.backendUrl}:${networkConfig.port}`,
		secure: false
	},
	'/dashboard': {
		target: `${networkConfig.backendUrl}:${networkConfig.port}`,
		secure: false
	}
};

import {writeFile} from 'fs';

writeFile('proxy.json', JSON.stringify(proxyJson), () => {
	console.log('Finished proxy.json bootstrapping');
});
