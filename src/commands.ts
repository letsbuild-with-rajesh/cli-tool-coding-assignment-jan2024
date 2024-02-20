import { CliOptions, Todo } from './types';
const { Command } = require('commander');
const { getTodos, TODOS_TYPE } = require('./todos');
const {
	print,
	printTodo,
	printTodosHeader,
	printTodosFooter,
	printTopBanner,
	clearLastPrintedLine,
	COLORS,
} = require('./printer')

const setupCommander = () => {
	const program = new Command();
	// Heading
	printTopBanner();

	program
		.version("1.0.0", "-v, --version", 'Outputs the current version')
		.description("Cli tool to view todos.")
		.option("-gt, --get-todos", "Get todos (Max default: 20)")
		.option("-gto, --get-todos-odd", "Get todos at odd numbered indices (Max default: 20)")
		.option("-gte, --get-todos-even", "Get todos at even numbered indices (Max default: 20)")
		// Add more options here
		.helpOption('-h, --help', 'Display help for tool')
		.action(async (options: CliOptions) => {
			let todos = [];
			if (Object.keys(options).length !== 0) {
				print("Fetching todos now... Please wait", COLORS.YELLOW);
				if (options.getTodos) {
					todos = await getTodos(TODOS_TYPE.ALL);
				} else if (options.getTodosOdd) {
					todos = await getTodos(TODOS_TYPE.ODD);
				} else if (options.getTodosEven) {
					todos = await getTodos(TODOS_TYPE.EVEN);
				} // Handle more options here

				if (todos.length === 0) {
					clearLastPrintedLine();
					print("No todos found!", COLORS.RED);
				} else {
					clearLastPrintedLine();
					printTodosHeader();
					todos.forEach((todo: Todo) => printTodo(todo));
					printTodosFooter();
				}
			}
		});
	return program;
}

module.exports = {
	setupCommander
}