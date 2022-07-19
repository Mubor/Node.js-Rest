export interface Logger {
	print(message: string): void;
	alert(message: string, type?: string): void;
}
