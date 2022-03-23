import { Person } from './person.interface';
import { Image } from './image.interface';
export interface DiagnosticResponse{
    id:                    number;
    date:                  Date;
    eps:                   string;
    antecedent:            string;
    reasonForConsultation: string;
    physicalExam:          string;
    observations:          string;
    patient:               Person;
    specialist:            Person;
    images:                Image[];
}
