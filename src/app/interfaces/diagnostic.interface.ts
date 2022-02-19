export interface Diagnostic{
    eps: string;
    antecedent: string;
    reasonForConsultation: string;
    physicalExam : string;
    observations: string;
    idPatient: string;
    idSpecialist: string;
    filesToUpload: File[];
}