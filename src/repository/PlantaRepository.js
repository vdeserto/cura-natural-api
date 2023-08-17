import { Connect } from './Connection.js';
import format from 'pg-format';

export const findAll = async () => {
	try {
		const connection = await Connect();
		try {
			const query = format('SELECT * FROM plantas');
			const { rows, rowCount } = await connection.query(query);

			if (rowCount === 0) {
				return [];
			}

			return rows;
		} catch (error) {
			console.error(
				`Erro ao executar query no método PlantaRepository.findAll() ::: ${error}`
			);
		}
	} catch (error) {
		console.error(`Erro na conexão ao banco de dados ::: ${error}`);
	}
};

export const findById = async (id) => {
	try {
		const connection = await Connect();
		try {
			const query = format('SELECT * FROM plantas WHERE id = %L', [id]);
			const { rows, rowCount } = await connection.query(query);
			if (rowCount === 0) {
				throw new Error('Falha ao encontrar este registro por id');
			}

			return Object.assign({}, ...rows);
		} catch (error) {
			console.error(
				`Erro ao executar query no método PlantaRepository.findById() ::: ${error}`
			);
		}
	} catch (error) {
		console.error(`Erro na conexão ao banco de dados ::: ${error}`);
	}
};

export const create = async (planta) => {
	try {
		const {
			id,
			nome,
			outrosnomes,
			familia,
			origem,
			partesusadas,
			caracteristicas,
			usos,
		} = planta;

		const connection = await Connect();
		try {
			const query = format('INSERT INTO plantas (id, nome, outrosnomes, familia, origem, partesusadas, caracteristicas, usos) VALUES (%L, %L, %L, %L, %L, %L, %L, %L) RETURNING *', [...planta])
			
			const { rows, rowCount } = await connection.query(query);

			if (rowCount === 0) {
				throw new Error('Erro ao tentar inserir este registro');
			}

			return Object.assign({}, ...rows);
		} catch (error) {
			console.error(
				`Erro ao executar query no método PlantaRepository.create() ::: ${error}`
			);
		}
	} catch (error) {
		console.error(`Erro na conexão ao banco de dados ::: ${error}`);
	}

	
};

export const removeById = async (planta) => {
	try {
		const {
			id,
			nome,
			outrosnomes,
			familia,
			origem,
			partesusadas,
			caracteristicas,
			usos,
		} = planta;

		const connection = await Connect();
		try {
			const query = {
				text: 'INSERT INTO plantas (id, nome, outrosnomes, familia, origem, partesusadas, caracteristicas, usos) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
				values: [
					id,
					nome,
					outrosnomes,
					familia,
					origem,
					partesusadas,
					caracteristicas,
					usos,
				]
			};
			const { rows, rowCount } = await connection.query(query);

			if (rowCount === 0) {
				throw new Error('Erro ao tentar inserir este registro');
			}

			return Object.assign({}, ...rows);
		} catch (error) {
			console.error(
				`Erro ao executar query no método PlantaRepository.create() ::: ${error}`
			);
		}
	} catch (error) {
		console.error(`Erro na conexão ao banco de dados ::: ${error}`);
	}

	
};