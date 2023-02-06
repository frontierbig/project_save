export interface MedicalRecordInterface {
    ID: number,
    Hospital_Number : string, 
	Personal_ID : string 

	Patient_ID: number
	Patient_Age : number
	Patient_gender : string
	Patient_dob : Date
	Patient_address :string
	Patient_phone :string
	

	
	//Parent 
	Both_parent : boolean
	Guardian : boolean
	Mother_only : boolean
	Father_only : boolean

	Parent_Name :string
	Parent_address: string
	Parent_phone :string

	Medical_history :string
	Current_medications: string

	//chronic or Recurring conditionss
	Asthma : boolean
	Heart_disease : boolean
	Bleeding_Disorders : boolean
	Urinary_Infection : boolean
	Convulsions : boolean
	Vision_Contacts : boolean
	Diabetes : boolean
	Teeth_dentures : boolean
	Ear_Infection : boolean
	Menstrual_problems : boolean
	Emotional : boolean
	Fainting  : boolean
	Hypertension : boolean

	//Allergies

	Animals : boolean
	Plants : boolean
	Food : boolean
	Pollen : boolean
	Hay_Fever : boolean
	Insect_Stings : boolean
	Medicine_drugs : boolean


	Secret_Data: string

	Master_Key :string

  
  }
  

  export interface MedicalRecordInterface2 {
    id: number,
    hospital_number : string, 
	personal_id : string 
	patient_id: number
	patient_age : number
	patient_gender : string
	patient_dob : Date
	patient_address :string
	patient_phone :string

  
  }
  