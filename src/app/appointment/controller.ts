import { Appointment } from "../../domain/appointment";
import { Logger } from "../../ports/logger";

import { CreateAppointmentCommand } from "../../commands/CreateAppointmentCommand";
import { GetAppointmentCommand } from "../../commands/GetAppointmentCommand";
import { Request, Response, Router } from "express";
import { route } from "../../infra/express";
import { AppointmentRepository } from "../../ports/repositories/appointment";
import { GetParams, ListQuery } from "./definition";
import { ListAppointmentCommand } from "../../commands/ListAppointmentsCommand";
import { CompleteAppointmentCommand } from "../../commands/CompleteAppointmentCommand";
import { DeleteAppointmentCommand } from "../../commands/DeleteAppointmentCommand";

// post "/appointment"
// get "/appointment/45234623476236471276376123"
// put "/appointment/45234623476236471276376123" - {}
// delete "/appointment/45234623476236471276376123"
// get "/appointment"

export class AppointmentController {
	router: Router

	constructor(
		private readonly nodeCliOutput: Logger,
		private readonly appointmentRepository: AppointmentRepository
	) 
	{
		this.router = Router({ mergeParams: true });

		this.router.post("/", route(this.handleCreate));
		this.router.get("/:id", route(this.handleGet));
		this.router.get("/", route(this.handleList));
		this.router.delete("/:id", route(this.handleDelete));
		this.router.put("/:id", route(this.handleUpdate));
	}

	process() {
		return this.router;
	}

	handleCreate = async (_req: Request, res: Response): Promise<Appointment> => {
		const appointment = await new CreateAppointmentCommand(
			this.appointmentRepository
		).execute();

		const record = Appointment.toRecord(appointment);

		this.nodeCliOutput.print(`[${record.id}] has been created`);

		res.status(201);

		return appointment;
	}

	handleGet = async (req: Request<GetParams>): Promise<Appointment> => {
		const { id } = req.params;
		console.log(id);
		this.nodeCliOutput.print(`[${id}] has been found`);
		const appointment = await new GetAppointmentCommand(this.appointmentRepository).execute({
			id,
		});

		const record = Appointment.toRecord(appointment);

		this.nodeCliOutput.print(`[${record.id}] has been found`);

		return appointment;
	}

	handleList = async (req: Request<unknown, unknown, unknown, ListQuery>): Promise<Appointment[]> => {
		const { completed, limit } = req.query;

		const appointments = await new ListAppointmentCommand(this.appointmentRepository).execute({ completed, limit});

		this.nodeCliOutput.print(`[${appointments.length} records] has been found`);

		return appointments;
	} 

	handleUpdate = async (req: Request<GetParams>): Promise<Appointment> => {
		const { id } = req.params;

		const appointment = await new CompleteAppointmentCommand(this.appointmentRepository).execute({id});

		this.nodeCliOutput.print(`[${id} has been updated`);

		return appointment;
	}

	handleDelete = async (req: Request<GetParams>): Promise<void> => {
		const { id } = req.params;

		await new DeleteAppointmentCommand(this.appointmentRepository).execute({ id });

		this.nodeCliOutput.print(`[${id}] has been deleted`);
	} 
}
