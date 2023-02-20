package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("project.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(&MedicalRecord{}, &Doctor{}, &User{}, &Treatment{})

	db = database

	Role1 := Role{
		Name: "patient",
	}
	db.Model(&Role{}).Create(&Role1)

	Role2 := Role{
		Name: "doctor",
	}
	db.Model(&Role{}).Create(&Role2)

	Role3 := Role{
		Name: "admin",
	}
	db.Model(&Role{}).Create(&Role3)

	//setup User ----------------------------------------------------------------------
	PasswordUser1, err := bcrypt.GenerateFromPassword([]byte("123"), 14)

	User1 := User{
		Name:     "patient",
		Password: string(PasswordUser1),
		Email:    "big166351@gmail.com",
		Tel:      "082-XXXXXXX",
		Gender:   "Male",
		Brithday: time.Now().AddDate(-21, -8, 2),
		Role:     Role1,
	}

	db.Model(&User{}).Create(&User1)

	PasswordUser2, err := bcrypt.GenerateFromPassword([]byte("123"), 14)

	User2 := User{
		Name:     "Dr.McFakey",
		Password: string(PasswordUser2),
		Email:    "doctor@gmail.com",
		Tel:      "097-XXXXXXX",
		Gender:   "Male",
		Brithday: time.Now().AddDate(-21, -5, 6),
		Role:     Role2,
	}

	db.Model(&User{}).Create(&User2)

	PasswordUser3, err := bcrypt.GenerateFromPassword([]byte("123"), 14)
	User3 := User{
		Name:     "patient2",
		Password: string(PasswordUser3),
		Email:    "big_20995@hotmail.com",
		Tel:      "045-XXXXXXX",
		Gender:   "Female",
		Brithday: time.Now().AddDate(-21, -11, 5),
		Role:     Role1,
		// Key:      "692546ad410fd46d09be787077942d972d6173d0ce50559df470adc016d4c7fa",
	}
	db.Model(&User{}).Create(&User3)

	Doctor1 := Doctor{
		Name:                  "Tony Tony Chopper",
		img:                   "ASDASD",
		specialtybranch:       "TESTDATA",
		certificate:           "SUT",
		postgraduateeducation: "CU",
		Tel:                   "08513544444",

		mail: "095443943",
	}
	db.Model(&Doctor{}).Create(&Doctor1)

	Doctor2 := Doctor{
		Name:                  "Number2",
		img:                   "ASDASD",
		specialtybranch:       "TESTDATA",
		certificate:           "SUT",
		postgraduateeducation: "CU",
		Tel:                   "08513544444",
		mail:                  "095443943",
	}
	db.Model(&Doctor{}).Create(&Doctor2)

	Doctor3 := Doctor{
		Name:                  "Number3",
		img:                   "ASDASD",
		specialtybranch:       "TESTDATA",
		certificate:           "SUT",
		postgraduateeducation: "CU",
		Tel:                   "08513544444",
		mail:                  "095443943",
	}
	db.Model(&Doctor{}).Create(&Doctor3)

	Doctor4 := Doctor{
		Name:                  "Number3",
		img:                   "ASDASD",
		specialtybranch:       "TESTDATA",
		certificate:           "SUT",
		postgraduateeducation: "CU",
		Tel:                   "08513544444",
		mail:                  "095443943",
	}
	db.Model(&Doctor{}).Create(&Doctor4)

}
