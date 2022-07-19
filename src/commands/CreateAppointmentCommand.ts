import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../ports/repositories/appointment";

export class CreateAppointmentCommand {
	constructor(private readonly appointmentRepository: AppointmentRepository) {}

	async execute(): Promise<Appointment> {
		const appointment = Appointment.create();

		return this.appointmentRepository.save(appointment);
	}
}
