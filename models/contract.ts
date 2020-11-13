interface Parameter {
	name: string;
	type: string;
}

interface Function {
	name: string;
	parameters: Parameter[];
}

interface Event {
	name: string;
	parameters: Parameter[];
}

interface Header {
	version: number;
	events: Event[];
	functions: Function[];
}

export interface Contract {
	header: Header;
	code: string;
}
