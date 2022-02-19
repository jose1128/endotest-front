import { Gender } from './gender.interface';
import { PersonType } from './persontype.interface';
export interface Person{
    id: Number;
    name: String;
    address: String;
    documentNumber: String;
    gender: Gender;
    documentType: DocumentType;
    personType: PersonType;
}