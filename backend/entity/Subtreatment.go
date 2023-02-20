package entity

import (
	"time"

)

type SubTreatment struct {
	Model 

	//
	Treatment_ID int `json:"treatment_id"`
	Patient_ID      int       `json:"patient_id"`
	Patient    string         `gorm:"references:id" json:"patient"`
	Diagnosis_results string  `json:"diagnosis_results"`
	Method_treatment string   `json:"method_treatment"`
	Appointment    time.Time  `json:"appointment"`

	Doctor_ID  int  		`json:"doctor_ID"`
	Doctor   string  		`gorm:"references:id" json:"doctor"`
	Encription_Key string  	`json:"encription_Key"`
}