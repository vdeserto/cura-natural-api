import { Methods } from './constants/Methods.js';
import { Routes } from './constants/Routes.js';
import { LoginPostHandler } from './index.js';
import { PlantasGetHandler, PlantasGetByIdHandler, PlantasPostHandler } from './handlers/get/Plantas.js';
import { ValidateHeaders } from './handlers/post/Auth.js'

export const router = [
	{
		method: Methods.POST,
		path: Routes.AUTH,
		handler: ( request, response ) => ValidateHeaders(request, response),
		NEED_AUTH: true
	},
	{
		method: Methods.POST,
		path: Routes.LOGIN,
		handler: ( request, response ) => LoginPostHandler(request, response),
		NEED_AUTH: false
	},
	{
		method: Methods.GET,
		path: Routes.PLANTAS,
		handler: ( request, response ) => PlantasGetHandler(request, response),
		NEED_AUTH: true
	},
	{
		method: Methods.GET,
		path: `${Routes.PLANTAS}/2`,
		handler: ( request, response ) => PlantasGetByIdHandler(request, response),
		NEED_AUTH: true
	},
	{
		method: Methods.POST,
		path: Routes.PLANTAS,
		handler: ( request, response ) => PlantasPostHandler(request, response),
		NEED_AUTH: true
	},
	// {
	// 	method: Methods.PUT,
	// 	path: Routes.PLANTAS,
	// 	handler: ({ request, response }) =>
	// 		PlantasPutHandler(request, response),
	// },
	// {
	// 	method: Methods.DELETE,
	// 	path: Routes.PLANTAS,
	// 	handler: ({ request, response }) =>
	// 		PlantasDeleteHandler(request, response),
	// },
	// {
	// 	method: Methods.GET,
	// 	path: Routes.DOENCAS,
	// 	handler: ({ request, response }) =>
	// 		DoencasGetHandler(request, response),
	// },
	// {
	// 	method: Methods.POST,
	// 	path: Routes.DOENCAS,
	// 	handler: ({ request, response }) =>
	// 		DoencasPostHandler(request, response),
	// },
	// {
	// 	method: Methods.PUT,
	// 	path: Routes.DOENCAS,
	// 	handler: ({ request, response }) =>
	// 		DoencasPutHandler(request, response),
	// },
	// {
	// 	method: Methods.DELETE,
	// 	path: Routes.DOENCAS,
	// 	handler: ({ request, response }) =>
	// 		DoencasDeleteHandler(request, response),
	// },
	// {
	// 	method: Methods.GET,
	// 	path: Routes.EFEITO_TERAPEUTICO,
	// 	handler: ({ request, response }) =>
	// 		EfeitoTerapeuticoGetHandler(request, response),
	// },
	// {
	// 	method: Methods.POST,
	// 	path: Routes.EFEITO_TERAPEUTICO,
	// 	handler: ({ request, response }) =>
	// 		EfeitoTerapeuticoPostHandler(request, response),
	// },
	// {
	// 	method: Methods.PUT,
	// 	path: Routes.EFEITO_TERAPEUTICO,
	// 	handler: ({ request, response }) =>
	// 		EfeitoTerapeuticoPutHandler(request, response),
	// },
	// {
	// 	method: Methods.DELETE,
	// 	path: Routes.EFEITO_TERAPEUTICO,
	// 	handler: ({ request, response }) =>
	// 		EfeitoTerapeuticoDeleteHandler(request, response),
	// },
	// {
	// 	method: Methods.GET,
	// 	path: Routes.RESTRICAO,
	// 	handler: ({ request, response }) =>
	// 		RestricaoGetHandler(request, response),
	// },
	// {
	// 	method: Methods.POST,
	// 	path: Routes.RESTRICAO,
	// 	handler: ({ request, response }) =>
	// 		RestricaoPostHandler(request, response),
	// },
	// {
	// 	method: Methods.PUT,
	// 	path: Routes.RESTRICAO,
	// 	handler: ({ request, response }) =>
	// 		RestricaoPutHandler(request, response),
	// },
	// {
	// 	method: Methods.DELETE,
	// 	path: Routes.RESTRICAO,
	// 	handler: ({ request, response }) =>
	// 		RestricaoDeleteHandler(request, response),
	// },
];
