import { configDotenv } from "dotenv";
import { expand } from "dotenv-expand";

let dotenvResult;
console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
	case 'TEST':
		dotenvResult = configDotenv({ path: '.env.test' });
		expand(dotenvResult)
		break;
	case 'HOM':
		dotenvResult = configDotenv({ path: '.env.hom' });
		expand(dotenvResult)
		break;
	case 'PROD':
		dotenvResult = configDotenv({ path: '.env.prod' });
		expand(dotenvResult)
		break;
	default:
		dotenvResult = configDotenv({ path: '.env.dev' });
		expand(dotenvResult)
		break;
}

if (dotenvResult.error) {
	signale.error('Configuração de variáveis de ambiente inválidas');
}

export const Environment = {
    ENV: process.env.NODE_ENV,
	PORT: process.env.PORT || 3000,
	HOSTNAME: process.env.HOSTNAME || 'http://localhost',
    BASE_URL: process.env.BASE_URL,
	DATABASES: {
		PLANTS_STORAGE : {
			CONNECTION_STRING: process.env.PLANTS_CNST || ''
		}	
	}
}