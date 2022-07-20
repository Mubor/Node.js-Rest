import { NotFoundError } from "../domain/error";
import { AppointmentRepository } from "../ports/repositories/appointment";

type DeleteAppointmentCommandParams = {
	id: string;
};

export class DeleteAppointmentCommand {
	constructor(private readonly appointmentRepository: AppointmentRepository) {}

	async execute({ id }: DeleteAppointmentCommandParams): Promise<void> {
		const appointment = await this.appointmentRepository.findOne(id);

		if (!appointment) {
			throw new NotFoundError();
		}

        await this.appointmentRepository.remove(id);
	}
}

