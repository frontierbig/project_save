package entity

import (
	"time"

	"gorm.io/gorm"
)

type Treatment struct {
	gorm.Model

	Patient_ID      int
	Patient    User  `gorm:"references:id"`
	Diagnosis_results string
	Method_treatment string
	Appointment    time.Time

	Doctor_ID  int
	Doctor   User  `gorm:"references:id"`
	Encription_Key string 
	
	
}
