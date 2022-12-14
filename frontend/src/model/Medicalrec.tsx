export interface MedicalRecordInterface {
    ID: number,
    Hospital_Number : string, 
	Personal_ID : string 

	Patient_Name: string
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

  
  }
  