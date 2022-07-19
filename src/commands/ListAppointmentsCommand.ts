import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../ports/repositories/appointment";

type ListAppointmentCommandParams = {
	completed?: boolean;
	limit?: number;
};

export class ListAppointmentCommand {
	constructor(private readonly appointmentRepository: AppointmentRepository) {}

	async execute({ completed, limit }: ListAppointmentCommandParams): Promise<Appointment[]> {
		return await this.appointmentRepository.findMany({ completed, limit });
	}
}
