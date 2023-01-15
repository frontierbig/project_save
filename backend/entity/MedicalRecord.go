package entity

import (
	"time"

	"gorm.io/gorm"
)

type MedicalRecord struct {
	gorm.Model

	Hospital_Number string `gorm:"uniqueIndex"`
	Personal_ID     string `gorm:"uniqueIndex"`

	Patient_ID      int
	Patient    User  `gorm:"references:id"`
	Patient_Age     int
	Patient_gender  string
	Patient_dob     time.Time
	Patient_address string
	Patient_phone   string

	//Parent
	Both_parent bool
	Guardian bool
	Mother_only bool
	Father_only bool

	Parent_Name    string
	Parent_address string
	Parent_phone   string

	Medical_history     string
	Current_medications string

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
}
