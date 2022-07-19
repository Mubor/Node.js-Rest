export class DomainError extends Error {
	name = "DomainError";
}

export class NotFoundError extends DomainError {
	constructor() {
		super("Not Found");
	}
}
