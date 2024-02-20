import { Todo } from '../types'
const figlet = require("figlet");
const commander = require('../commands');
const { BANNER_TEXT } = require('../printer');
const dotenv = require('dotenv');
dotenv.config();

const { todos, oddTodos, evenTodos } = require('./testData')

const getTodoResponse = (todos: Todo[], id: number) => Promise.resolve({
	json: () => Promise.resolve(todos[id - 1])
})

const todoFetchMock = (todos: Todo[]) => {
	const fetchSpy = jest.spyOn(global, 'fetch');
	const promises = todos.map(todo => getTodoResponse(todos, todo.id))
	fetchSpy.mockImplementation((url) => {
		if (typeof url === 'string') {
			const urlArr = url.split('/');
			const todoId = parseInt(urlArr[urlArr.length - 1], 10);
			return Promise.resolve(promises[todoId - 1]) as Promise<Response>;
		}
		return Promise.reject(`Invalid URL ${url}`);
	});
	return [fetchSpy, promises];
}

describe('Todos Cli', () => {
	test('shows default tool options if binary is run without any arguments', async () => {
		const program = commander.setupCommander();
		program.parse([
			"node",
			"todos-cli",
		]);
		const opts = program.opts();
		expect(opts).toEqual({});
	});

	test('shows default tool options if binary is run with wrong arguments', async () => {
		const program = commander.setupCommander();
		program.parse([
			"node",
			"todos-cli",
			"wrong-argument",
		]);
		const opts = program.opts();
		expect(opts).toEqual({});
	});

	test('shows default tool options for -h help option', async () => {
		let errorCaught: Error = new Error();
		const program = commander.setupCommander();
		program.exitOverride();
		try {
			program.parse([
				"node",
				"todos-cli",
				"-h",
			]);
		} catch (error) {
			errorCaught = error as Error;
		}
		expect(errorCaught.message).toContain('Help');
	});

	test('shows unknown option error for invalid options', async () => {
		let errorCaught: Error = new Error();
		const program = commander.setupCommander();
		program.exitOverride();
		try {
			program.parse([
				"node",
				"todos-cli",
				"-some-wrong-option"
			]);
		} catch (error) {
			errorCaught = error as Error;
		}
		expect(errorCaught.message).toMatch(/unknown option/);
	});

	test('shows 20 todos for option -gt', async () => {
		const [fetchSpy] = todoFetchMock(todos);
		const program = commander.setupCommander();
		program.parse([
			"node",
			"todos-cli",
			"-gt"
		]);
		const opts = program.opts();
		expect(Object.keys(opts).length).toBe(1);
		expect(opts.getTodos).toBe(true);
		expect(program.args).toEqual([]);
		expect(fetchSpy).toHaveBeenCalledTimes(todos.length);
	});

	test('shows 20 odd todos for option -gto', async () => {
		const [fetchSpy] = todoFetchMock(oddTodos);
		const program = commander.setupCommander();
		program.parse([
			"node",
			"todos-cli",
			"-gto"
		]);
		const opts = program.opts();
		expect(Object.keys(opts).length).toBe(1);
		expect(opts.getTodosOdd).toBe(true);
		expect(program.args).toEqual([]);
		expect(fetchSpy).toHaveBeenCalledTimes(oddTodos.length);
	});

	test('shows 20 even todos for option -gte', async () => {
		const [fetchSpy] = todoFetchMock(evenTodos);
		const program = commander.setupCommander();
		program.parse([
			"node",
			"todos-cli",
			"-gte"
		]);
		const opts = program.opts();
		expect(Object.keys(opts).length).toBe(1);
		expect(opts.getTodosEven).toBe(true);
		expect(program.args).toEqual([]);
		expect(fetchSpy).toHaveBeenCalledTimes(evenTodos.length);
	});
});
