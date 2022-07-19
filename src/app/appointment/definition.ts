import { AppointmentId } from "../../domain/appointment"

export type GetParams = {
	id: AppointmentId
} 

export type ListQuery = {
	completed?: boolean;
	limit?: number;
}