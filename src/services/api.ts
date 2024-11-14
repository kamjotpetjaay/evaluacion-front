import axios from 'axios';

const API_URL = 'http://localhost:8080'; // URL base para la API en donde está el back de evaluación

export const login = (usuario: string, password: string) => axios.post(`${API_URL}/auth/login`, {usuario, password});
export const getEmpleados = () => axios.get(`${API_URL}/empleados`);
export const fetchSalarios = () => axios.get(`${API_URL}/salarios`);