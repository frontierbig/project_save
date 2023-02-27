package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string
	Email    string `gorm:"unique"`
	Password string
	Tel      string
	Gender   string
	// Key   string

	Brithday time.Time
	RoleID *uint
	Role   Role
	MedicalRecord []MedicalRecord `gorm:"foreignKey:Patient_ID"`
	Treatment   []Treatment `gorm:"foreignKey:Patient_ID"`

}   

type Role struct {
	gorm.Model
	Name string
	User []User `gorm:"foreignKey:RoleID"`

}
