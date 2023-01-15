package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string
	Email    string
	Password string
	Tel      string
	Gender   string
	Key   string

	Brithday time.Time
	RoleID *uint
	Role   Role

	




}   

type Role struct {
	gorm.Model
	Name string
	User []User `gorm:"foreignKey:RoleID"`

}
