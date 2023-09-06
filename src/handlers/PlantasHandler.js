import Planta from '../model/Planta.js';
import {
	findAll,
	findById,
	create,
	removeById,
	updateById,
} from '../repository/PlantaRepository.js';
import { once } from 'node:events';

export const PlantasGetHandler = async (request, response) => {
	const result = await findAll();

	return response.end(JSON.stringify(result));
};

export const PlantasGetByIdHandler = async (request, response) => {
	const { id } = request.params;

	const result = await findById(id);

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

export const PlantasPutHandler = async (request, response) => {
	const { id } = request.params;

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
		id,
		nome,
		outrosnomes,
		familia,
		origem,
		partesusadas,
		caracteristicas,
		usos,
	});
	
	const result = await updateById(planta);
	
	return response.end(JSON.stringify(result));
};

export const PlantasDeleteHandler = async (request, response) => {
	const { id } = request.params;

	const result = await removeById(id);

	return response.end(JSON.stringify(result));
};
