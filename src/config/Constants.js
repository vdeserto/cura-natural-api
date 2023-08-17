import { configDotenv } from "dotenv";


let dotenvResult;
console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
	case 'TEST':
		dotenvResult = configDotenv({ path: '.env.test' });
		break;
	case 'HOM':
		dotenvResult = configDotenv({ path: '.env.hom' });
		break;
	case 'PROD':
		dotenvResult = configDotenv({ path: '.env.prod' });
		break;
	default:
		dotenvResult = configDotenv({ path: '.env.dev' });
		break;
}

if (dotenvResult.error) {
	signale.error('Configuração de variáveis de ambiente inválidas');
}

export default {
    ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	HOSTNAME: process.env.HOSTNAME || 'http://localhost:3000/',
	DATABASES: {
		PLANTS_STORAGE : {
			CONNECTION_STRING: process.env.PLANTS_CNST || ''
		}	
	}
}