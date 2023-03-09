package entity

import (
	// "time"

)

type SubTreatment struct {
	Model 
	Treatment_ID int `json:"treatment_id"`
	Diagnosis_results string  `json:"diagnosis_results"`
	Method_treatment string   `json:"method_treatment"`
	Note    string `json:"note"`
	Appointment    string `json:"appointment"`
	Selected_encryp  bool
}