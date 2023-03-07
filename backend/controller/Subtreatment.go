package controller

import (
	"net/http"
	"time"

	// "crypto/aes"
	// "crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"fmt"

	// "io"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team03/backend/entity"

	"net/smtp"
)

type SubTreatmentPayload struct {
	Master_Key string

	Treatment_ID      uint
	Patient_ID    uint 
	Diagnosis_results string
	Method_treatment  string
	Appointment_time  time.Time
	Encryptionselect  bool
}

// POST /users
func CreateSubTreatment(c *gin.Context) {
	var Patient entity.User
	var User entity.User
	var Treatment entity.Treatment
	var payload SubTreatmentPayload

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณากรอกข้อมูลให้ถูกต้อง"})
		return
	}
	fmt.Println("is playlode", payload.Master_Key)

	if tx := entity.DB().Where("id = ?", payload.Treatment_ID).First(&Treatment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Treatment  not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", Treatment.Doctor_ID).First(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dovtor not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.Patient_ID).First(&Patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Patient not found"})
		return
	}

	if Treatment.Encription_Key == "" {
		fmt.Println(payload.Encryptionselect,"TEST")
		// fmt.Println("!@#@!#!@#!@#!@#!@#!@#!@")
		if payload.Encryptionselect == true {
			bytes := make([]byte, 32) ////generate a random 32 byte key for AES-256
			if _, err := rand.Read(bytes); err != nil {
				panic(err.Error())
			}
			key := hex.EncodeToString(bytes)

			from := "b6202286@g.sut.ac.th"
			password := "bjsvplnrqjycniqw"
			// fmt.Println(User.Email)
			fmt.Println(Patient.Email,"ASDFASDF")
			to := []string{
				Patient.Email,
			}

			smtpHost := "smtp.gmail.com"
			smtpPort := "587"

			message := []byte("Patient Key is " + key)

			// Authentication.
			auth := smtp.PlainAuth("", from, password, smtpHost)

			// Sending email.
			err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
			if err != nil {
				fmt.Println(err)
				return
			}
			fmt.Println("Email Sent Successfully!")

			encrypted_Diagnosis, err := encrypt(payload.Diagnosis_results, key)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			encrypted_Method_treatment, err := encrypt(payload.Method_treatment, key)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			encryptedKey, err := encrypt(key, payload.Master_Key)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Incorrect Master Key"})
				return
			}

			if err :=
				entity.DB().Table("treatments").Where("id = ?", Treatment.ID).Update("encription_key", encryptedKey).Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			mr := entity.SubTreatment{
				Diagnosis_results: encrypted_Diagnosis,
				Method_treatment:  encrypted_Method_treatment,
				Appointment:       payload.Appointment_time,
				Selected_encryp:   payload.Encryptionselect,
				Treatment_ID:      int(Treatment.ID),
			}

			// 12: บันทึก
			if err := entity.DB().Create(&mr).Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"data": mr})

		} else {
			mr := entity.SubTreatment{
				Diagnosis_results: payload.Diagnosis_results,
				Method_treatment:  payload.Method_treatment,
				Appointment:       payload.Appointment_time,
				Treatment_ID:      int(Treatment.ID),
				Selected_encryp:   payload.Encryptionselect,
			}
			// 12: บันทึก
			if err := entity.DB().Create(&mr).Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"data": mr})
		}
	} else {
		if payload.Encryptionselect == true {
			key, err := decrypt(Treatment.Encription_Key, payload.Master_Key, c)
			if err != nil {
				c.JSON(http.StatusBadRequest, err.Error())
				return
			}
			encrypted_Diagnosis, err := encrypt(payload.Diagnosis_results, key)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			encrypted_Method_treatment, err := encrypt(payload.Method_treatment, key)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			mr := entity.SubTreatment{
				Diagnosis_results: encrypted_Diagnosis,
				Method_treatment:  encrypted_Method_treatment,
				Appointment:       payload.Appointment_time,
				Selected_encryp:   true,
				Treatment_ID:      int(Treatment.ID),
			}

			// 12: บันทึก
			if err := entity.DB().Create(&mr).Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"data": mr})

		} else {
			mr := entity.SubTreatment{
				Diagnosis_results: payload.Diagnosis_results,
				Method_treatment:  payload.Method_treatment,
				Appointment:       payload.Appointment_time,
				Treatment_ID:      int(Treatment.ID),
				Selected_encryp:   false,
			}
			// 12: บันทึก
			if err := entity.DB().Create(&mr).Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"data": mr})

		}
	}

}

func DecryptionSubTreatment(c *gin.Context) {

	var Treatment entity.Treatment
	TreatmentID := c.Param("TreatmentID")
	var Data Payload

	if err := c.ShouldBindJSON(&Data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", TreatmentID).First(&Treatment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}
	fmt.Println(Data.Decryption)

	c.JSON(http.StatusOK, gin.H{"data": "data"})

}

// func ListTreatmentUser(c *gin.Context) {
// 	var TreatmentUser []*entity.Treatment
// 	if err :=
// 	entity.DB().Raw("SELECT * FROM treatments").Find(&TreatmentUser).Error; err != nil {
// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 	return
// }
// c.JSON(http.StatusOK, gin.H{"data": TreatmentUser})
// }

func ListTreatmentUser(c *gin.Context) {
	var Treatmentuser []struct {
		ID      uint   `json:"id"`
		Patient string `json:"name"`
		Patient_ID int `json:"patient_id"`
	}
	if err := entity.DB().Table("treatments").Select("id,patient,patient_id").Find(&Treatmentuser).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Notfound Treatment_user"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Treatmentuser})
}

// func ListSubTreatmentByID(c *gin.Context) {
// 	TreatmentID := c.Param("TreatmentID")

// 	var Treatment []*entity.Treatment
// 	if err :=
// 		entity.DB().Raw("SELECT * FROM treatments WHERE id = ?", TreatmentID).Find(&Treatment).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": Treatment})

// }
