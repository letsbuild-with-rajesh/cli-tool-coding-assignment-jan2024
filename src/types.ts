export enum TodosType {
	ALL = 0,
	ODD,
	Left,
}

export enum Colors {
	BLUE = 0,
	YELLOW,
	RED,
	GREEN,
}

export type CliOptions = {
	getTodos: boolean,
	getTodosOdd: boolean,
	getTodosEven: boolean,
}

export type Todo = {
	id: number,
	title: string,
	completed: boolean,
}