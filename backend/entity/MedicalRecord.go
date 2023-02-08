package entity

import (
	"time"

	"gorm.io/gorm"
)

type Model struct {
	ID        uint `gorm:"primarykey" json:"id"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}


type MedicalRecord struct {
	Model 

	Hospital_Number string `gorm:"uniqueIndex" json:"hospital_number"`
	Personal_ID     string `gorm:"uniqueIndex" json:"personal_id"`

	Patient_ID      int      `json:"patient_id"`
	Patient    string          `gorm:"references:id" json:"patient"`
	Patient_Age     int      `json:"patient_age"`
	Patient_gender  string      `json:"patient_gender"`
	Patient_dob     time.Time   `json:"patient_dob"`
	Patient_address string   `json:"patient_address"`
	Patient_phone   string   `json:"patient_phone"`

	//Parent
	Both_parent bool
	Guardian bool
	Mother_only bool
	Father_only bool

	Parent_Name    string			`json:"parent_name"`
	Parent_address string		`json:"parent_address"`
	Parent_phone   string		`json:"parent_phone"`

	Medical_history     string		`json:"medical_history"`
	Current_medications string		`json:"current_medications"`

	//chronic or Recurring conditionss
	Asthma bool
	Heart_disease bool
	Bleeding_Disorders bool
	Urinary_Infection bool
	Convulsions bool
	Vision_Contacts bool
	Diabetes bool
	Teeth_dentures bool
	Ear_Infection bool
	Menstrual_problems bool
	Emotional bool
	Fainting  bool
	Hypertension bool

	//Allergies

	Animals bool
	Plants bool
	Food bool
	Pollen bool
	Hay_Fever bool
	Insect_Stings bool
	Medicine_drugs bool

	Secret_Data string

	Master_Key string
}
