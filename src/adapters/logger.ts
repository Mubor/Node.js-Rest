import { Logger } from "../ports/logger";

export class CLIOutput implements Logger {
	print(message: string): void {
		console.log(">>>", message);
	}
	alert(message: string, type = "InternalError"): void {
		console.log(">>>", `[${type}]`, message);
	}
}
