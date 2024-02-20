import { TodosType } from './types';
const dotenv = require('dotenv');
dotenv.config();

const TOTAL_TODOS = 20;

const TODOS_TYPE = {
	ALL: 0,
	ODD: 1,
	EVEN: 2
}

const getTodo = async (todoId: number) => {
	try {
		const res = await fetch(`${process.env.TODOS_SERVER_URL}/todos/${todoId}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

const getTodos = async (todosType: TodosType) => {
	let start = 1;
	let end = TOTAL_TODOS;
	let incr = 1;
	switch (todosType) {
		case TODOS_TYPE.ODD:
			end = TOTAL_TODOS * 2;  // todo index starts from 1
			incr = 2;
			break;
		case TODOS_TYPE.EVEN:
			start = 2
			end = TOTAL_TODOS * 2;  // todo index starts from 1
			incr = 2;
			break;
		case TODOS_TYPE.ALL:
		default:
			break;
	}

	try {
		const promises = [];
		for (let i = start; i <= end; i += incr) {
			promises.push(getTodo(i));
		}
		const todos = await Promise.all(promises);
		return todos;
	} catch (error) {
		console.error(error);
		return [];
	}
}

module.exports = {
	getTodos,
	TODOS_TYPE
}