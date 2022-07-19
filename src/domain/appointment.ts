export type AppointmentId = string;

type AppointmentRecord = {
	id: AppointmentId;
	completed: boolean;
	created_at: string;
	updated_at?: string;
};

export class Appointment {
	private record: AppointmentRecord;

	constructor(record: AppointmentRecord) {
		this.record = record;
	}

	get id() {
		return this.record.id;
	}

	get completed() {
		return this.record.completed;
	}

	get created_at() {
		return this.record.created_at;
	}

	get updated_at() {
		return this.record.updated_at;
	}

	static toRecord(appointment: Appointment): AppointmentRecord {
		return appointment.record;
	}

	static create() {
		const now = new Date();

		return new Appointment({
			id: Appointment.generateId(now),
			completed: false,
			created_at: now.toISOString(),
		});
	}

	private static generateId(now: Date): string {
		return `AP-${now.getHours()}/${now.getMinutes()}/${now.getSeconds()}/${now.getMilliseconds()}`;
	}
}
