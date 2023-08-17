import Planta from '../../model/Planta.js';
import { findAll, findById, create } from '../../repository/PlantaRepository.js';
import { once } from 'node:events'

export const PlantasGetHandler = async (request, response) => {
	const result = await findAll();

	console.log({ result });
	return response.end(JSON.stringify(result));
};

export const PlantasGetByIdHandler = async (request, response) => {
	let id = 1;
	// console.log({data: request.data})
	// const data = JSON.parse(await once(request, 'data'));
	const result = await findById(id);

	// console.log( result );
	return response.end(JSON.stringify(result));
};

export const PlantasPostHandler = async (request, response) => {
	const {
		nome,
		outrosnomes,
		familia,
		origem,
		partesusadas,
		caracteristicas,
		usos,
	} = JSON.parse(await once(request, 'data'));

	const planta = new Planta({
		nome,
		outrosnomes,
		familia,
		origem,
		partesusadas,
		caracteristicas,
		usos,
	});

	const result = await create(planta);

	return response.end(JSON.stringify(result));
};
