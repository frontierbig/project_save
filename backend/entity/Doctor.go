package entity
import (
	"gorm.io/gorm"
)

type Doctor struct {
	gorm.Model
	Name     				string
	img		 				string
	specialtybranch			 string
	certificate     		 string
	postgraduateeducation   	string
	Tel 						string
	mail 						string

}
