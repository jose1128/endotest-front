import { Gender } from "../gender.interface";
import { PersonType } from "../persontype.interface";
import { EpsResponse } from "./eps.response.interface";

export interface Person{
    id: Number;
    name: String;
    address: String;
    dateOfBirth: String;
    documentNumber: String;
    gender: Gender;
    documentType: DocumentType;
    personType: PersonType;
    eps: EpsResponse
}