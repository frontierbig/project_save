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

  export interface TreatmentshowInterface {
    id: number,
    patient_ID: number,
    patient: string, 
    // diagnosis_results: string,
    // method_treatment: string,
    // appointment: Date,
    // doctor_ID  :number,
    doctor :string,
    // encription_Key: string ,
  }

  export interface SubTreatmentshowInterface {
    // id: number,
    // patient_ID: number,
    // patient: string, 
    diagnosis_results: string,
    method_treatment: string,
    appointment: Date,
    // doctor_ID  :number,
    // doctor :string,
    // encription_Key: string ,
  }



  export interface resprondecrytion{
    Diagnosis_results: string,
    Method_treatment: string,
  }

  export interface Treatmentuserinterface{
    id : number,
    name : string,
    patient_id :number,

  }

  export  interface SubTreatmentInterface {
    id :number ,
    Treatment_ID :number
    Diagnosis_results :string
    Method_treatment  :string
    Appointment   : Date
    Selected_encryp  :boolean
  }
  