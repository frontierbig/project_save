package entity

import (
	"time"

)

type Treatment struct {
	Model 

	Patient_ID      int      `json:"patient_id"`
	Patient    string          `gorm:"references:id" json:"patient"`
	Diagnosis_results string  `json:"diagnosis_results"`
	Method_treatment string   `json:"method_treatment"`
	Appointment    time.Time   `json:"appointment"`

	Doctor_ID  int  `json:"doctor_ID"`
	Doctor   User  `gorm:"references:id"`
	Encription_Key string  `json:"encription_Key"`
	
	
}
