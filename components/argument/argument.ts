type Primitive =
	| "uint8"
	| "uint16"
	| "uint32"
	| "uint64"
	| "int8"
	| "int16"
	| "int32"
	| "int64"
	| "float32"
	| "float64"
	| "address"
	| "lparray";

export interface Argument {
	type: Primitive;
	name: string;
	value: string;
}
