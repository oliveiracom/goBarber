import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
    id: string,
    provider: string,
    date: Date
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
    const {provider,date} = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findDuplicatedTime = appointments.findIndex(appointment => isEqual(parsedDate, appointment.date));

    if (findDuplicatedTime) {
        return response.status(400).json({message: 'Hour block already booked'})
    }

    const appointment = {
        id: uuid(),
        provider,
        date: parsedDate
    }

    appointments.push(appointment);

    return response.json(appointment);
} )