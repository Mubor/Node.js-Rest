import { Appointment } from "../domain/appointment";
import { NotFoundError } from "../domain/error";
import { AppointmentRepository } from "../ports/repositories/appointment";

type CompleteAppointmentCommandParams = {
    id: string;
};

export class CompleteAppointmentCommand {
	constructor(private readonly appointmentRepository: AppointmentRepository) {}

	async execute({ id }: CompleteAppointmentCommandParams): Promise<Appointment> {
		const appointment = await this.appointmentRepository.findOne(id);
		if (!appointment) {
			throw new NotFoundError();
		}
		
		const record = Appointment.toRecord(appointment);
		record.completed = true;
		record.updated_at = new Date().toISOString();

		return await this.appointmentRepository.update(appointment);
	}

}