export interface TreatmentInterface {
    ID: number,
    
    Patient_ID: number,
    Name : string, 
    Diagnosis_results: string,
    Method_treatment: string,
    Appointment: Date,


    Doctor_ID  :number,
    Encription_Key: string ,


  
  }
  
  export interface TreatmentInterface2 {
    id: number,
    
    patient_ID: number,
    patient: string, 
    diagnosis_results: string,
    method_treatment: string,
    appointment: Date,
    doctor_ID  :number,
    doctor :string,
    encription_Key: string ,
  
  }

  export interface resprondecrytion{
    diagnosis_results: string,
    method_treatment: string,
  }
  
  