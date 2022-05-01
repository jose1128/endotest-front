import { Person } from './response/person.response.interface';
import { Image } from './image.interface';
import { ExamTypeResponse } from './response/examtype.response.interface';
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
    examType:              ExamTypeResponse;
    images:                Image[];
}
