import { isUndefined } from "lodash";
import { Appointment, AppointmentId } from "../../domain/appointment";
import { NotFoundError } from "../../domain/error";
import { AppointmentRepository, FindManyFilter } from "../../ports/repositories/appointment";

type Store = Map<AppointmentId, Appointment>;

export class InMemoryAppointmentRepository implements AppointmentRepository {
	store: Store;
	
	constructor() {
		this.store = new Map();
	}
	
	async save(appointment: Appointment): Promise<Appointment> {
		this.store.set(appointment.id, appointment);

		return appointment;
	}

	async findOne(id: string): Promise<Appointment | undefined> {
		const appointment = this.store.get(id);
		
		if (!appointment) {
			return undefined;
		}

		return appointment;
	}

	async findMany({ completed, limit }: FindManyFilter): Promise<Appointment[]> {
		let appointments = Array.from(this.store.values());

		if (!isUndefined(completed)) {
			appointments = appointments.filter(record => record.completed === completed);
		}

		if (!isUndefined(limit) && isFinite(limit)) {
			appointments = appointments.slice(0, limit);
		}

		return appointments;
	}

	async update(appointment: Appointment): Promise<Appointment> {
		if (!this.store.has(appointment.id)) {
			throw new NotFoundError();
		}

		this.store.set(appointment.id, appointment);

		return appointment;
	}
	
	async remove(id: string): Promise<void> {
		if (!this.store.has(id)) {
			throw new NotFoundError();
		}

		this.store.delete(id);
	}
}