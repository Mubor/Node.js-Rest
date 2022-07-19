import { Appointment } from "../domain/appointment";
import { NotFoundError } from "../domain/error";
import { AppointmentRepository } from "../ports/repositories/appointment";

type GetAppointmentCommandParams = {
	id: string;
};

export class GetAppointmentCommand {
	constructor(private readonly appointmentRepository: AppointmentRepository) {}

	async execute({ id }: GetAppointmentCommandParams): Promise<Appointment> {
		const appointment = await this.appointmentRepository.findOne(id);

		if (!appointment) {
			throw new NotFoundError();
		}

		return appointment;
	}
}
