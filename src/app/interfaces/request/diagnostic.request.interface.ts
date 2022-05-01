export interface Diagnostic{
    antecedent: string;
    reasonForConsultation: string;
    physicalExam : string;
    observations: string;
    idPatient: string;
    idSpecialist: string;
    idExamType: string;
    filesToUpload: File[];
}