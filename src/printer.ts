import { Colors, Todo } from './types';
const readline = require('readline')
const figlet = require("figlet");
const chalk = require('chalk');
const stripAnsi = require('strip-ansi');

const MAX_ID_CHARS = 4;
const MAX_TITLE_CHARS = 81;
const MAX_COMPLETED_CHARS = 11;
const MAX_VERTICAL_LINE_CHARS = 4;
const MAX_CHARS_IN_A_LINE = MAX_ID_CHARS + MAX_TITLE_CHARS + MAX_COMPLETED_CHARS + MAX_VERTICAL_LINE_CHARS;
export const BANNER_TEXT = 'My Todos !';

const blueText = (text: string) => chalk.blueBright(text);
const yellowText = (text: string) => chalk.yellowBright(text);
const redText = (text: string) => chalk.redBright(text);
const greenText = (text: string) => chalk.greenBright(text);

export const COLORS = {
	BLUE: 0,
	YELLOW: 1,
	RED: 2,
	GREEN: 3,
}

const COLORS_CB = {
	[COLORS.BLUE]: blueText,
	[COLORS.YELLOW]: yellowText,
	[COLORS.RED]: redText,
	[COLORS.GREEN]: greenText,
}

const printTopBanner = () => {
	console.log(`${figlet.textSync(BANNER_TEXT)}\n`);
}

const printToolOptions = (program: any) => {
	program.outputHelp();
	console.log('\n');
}

const addRepeatedChars = (times: number, char: string = ' ') => {
	if (times > 0) {
		return char.repeat(times);
	}
	return char;
}

const addSpaceIfNeeded = (num: number) => {
	return num > 9 ? num.toString() : (' ' + num);
}

const printLine = () => {
	print(`${addRepeatedChars(MAX_CHARS_IN_A_LINE, '-')}\n`, COLORS.YELLOW);
}

const printTodosHeader = () => {
	printLine();
	// Total chars should sum to MAX_CHARS_IN_A_LINE
	const id = ' Id ';
	const titleText = ' Title ';
	const titleSpaces = MAX_TITLE_CHARS - titleText.length;
	// Centering the title text
	const title = `${addRepeatedChars(Math.ceil(titleSpaces / 2))}${titleText}${addRepeatedChars(Math.floor(titleSpaces / 2))}`;
	const completed = ' Completed ';
	print(`|${id}|${title}|${completed}|\n`, COLORS.YELLOW);
	printLine();
}

const printTodosFooter = () => {
	printLine();
}

const printTodo = (todo: Todo) => {
	if (!todo || !todo.title || !todo.id) {
		return;
	}
	const colorFunc = todo.completed ? greenText : redText;
	const id = ` ${addSpaceIfNeeded(todo.id)} `;
	const title = ` ${blueText(todo.title)} `;
	const extraSpaces = addRepeatedChars(MAX_TITLE_CHARS - stripAnsi(title).length);
	const completedText = ` ${colorFunc(String(todo.completed))} `;
	const completed = `${completedText}${addRepeatedChars(MAX_COMPLETED_CHARS - stripAnsi(completedText).length)}`;
	console.log(`|${id}|${title}${extraSpaces}|${completed}|`);
}

const print = (text: string, color: Colors) => {
	if (color in COLORS_CB) {
		console.log(COLORS_CB[color](text));
	}
}

const clearLastPrintedLine = () => {
	readline.moveCursor(process.stdout, 0, -1) // up one line
	readline.clearLine(process.stdout, 1) // from cursor to end
}

module.exports = {
	printTopBanner,
	printToolOptions,
	printTodo,
	printTodosHeader,
	printTodosFooter,
	print,
	clearLastPrintedLine,
	BANNER_TEXT,
	COLORS,
}