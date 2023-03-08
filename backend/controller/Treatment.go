package controller

import (
	"net/http"
	// "time"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team03/backend/entity"

	"net/smtp"
)

type TreatmentPayload struct {
	Master_Key string
	Patient_ID uint
	Doctor_ID  uint
	//Suntreatment
	Treatment_ID      uint
	Diagnosis_results string
	Method_treatment  string
	Note   string
	Appointment_time  time.Time
	Encryptionselect  bool
}

// POST /users
func CreateTreatment(c *gin.Context) {
	var Patient entity.User
	var User entity.User
	var payload TreatmentPayload

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณากรอกข้อมูลให้ถูกต้อง"})
		return
	}
	fmt.Println("is playlode", payload.Master_Key)
	if tx := entity.DB().Where("id = ?", payload.Patient_ID).First(&Patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Patient not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.Doctor_ID).First(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Doctor not found"})
		return
	}

	if payload.Encryptionselect == true {
		bytes := make([]byte, 32) ////generate a random 32 byte key for AES-256
		if _, err := rand.Read(bytes); err != nil {
			panic(err.Error())
		}
		key := hex.EncodeToString(bytes)
		// Sender data.
		from := "b6202286@g.sut.ac.th"
		password := "bjsvplnrqjycniqw"
		fmt.Println(User.Email)
		fmt.Println(Patient.Email)
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

		encrypted_Note, err := encrypt(payload.Note, key)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		encryptedKey, err := encrypt(key, payload.Master_Key)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Incorrect Master Key"})
			return
		}

		mr := entity.Treatment{
			Patient_ID:     int(Patient.ID),
			Patient:        Patient.Name,
			Encription_Key: encryptedKey,
			Doctor_ID:      int(User.ID),
			Doctor:         User.Name,
		}

		// 12: บันทึก
		if err := entity.DB().Create(&mr).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// c.JSON(http.StatusOK, gin.H{"data": mr})

		addsub := entity.SubTreatment{
			Diagnosis_results: encrypted_Diagnosis,
			Method_treatment:  encrypted_Method_treatment,
			Note: encrypted_Note, 
			Appointment:       payload.Appointment_time,
			Selected_encryp:   payload.Encryptionselect,
			Treatment_ID:      int(mr.ID),
		}
		if err := entity.DB().Create(&addsub).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": mr})
		// c.JSON(http.StatusOK, gin.H{"data": addsub})

	} else {

		mr := entity.Treatment{
			Patient_ID:     int(Patient.ID),
			Patient:        Patient.Name,
			Doctor_ID:      int(User.ID),
			Encription_Key: "",
			Doctor:         User.Name,
		}

		// 12: บันทึก
		if err := entity.DB().Create(&mr).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// c.JSON(http.StatusOK, gin.H{"data": mr})

		addsub := entity.SubTreatment{
			Diagnosis_results: payload.Diagnosis_results,
			Method_treatment:  payload.Method_treatment,
			Note: payload.Note,
			Appointment:       payload.Appointment_time,
			Selected_encryp:   payload.Encryptionselect,
			Treatment_ID:      int(mr.ID),
		}
		if err := entity.DB().Create(&addsub).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": mr})

	}

}

type Payload struct {
	Decryption string `json:"decryption"` // ต้องสร้างฟิลมารับ Decrypt tion อยู่หน้า medrecshow
}

type Datadecryptreturn struct {
	Diagnosis       string `json:"diagnosis"`
	Methodtreatment string `json:"methodtreatment"`
}



func ListTreatment(c *gin.Context) {
	var Treatment []*entity.Treatment
	if err :=
		entity.DB().Table("treatments").Find(&Treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Treatment})

}

func ListTreatmentByIDBypatient(c *gin.Context) {

	TreatmentID := c.Param("TreatmentID")

	var MedicalRecord []*entity.MedicalRecord

	if err :=
		entity.DB().Raw("SELECT * FROM treatments WHERE patient_id = ?", TreatmentID).Find(&MedicalRecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": MedicalRecord})

}

func ListTreatmentByID(c *gin.Context) {
	TreatmentID := c.Param("TreatmentID")
	var SubTreatment []*entity.SubTreatment
	var Treatment *entity.Treatment

	// var Treatmentrespon []struct {
	// 	Treatment    *entity.Treatment    `json:"treatment"`
	// 	SubTreatment []*entity.SubTreatment `json:"sub_treatment"`
	// }

	if err :=
		entity.DB().Raw("SELECT * FROM treatments WHERE id = ?", TreatmentID).Scan(&Treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err :=
		entity.DB().Raw("SELECT * FROM sub_treatments WHERE treatment_id = ?",
			TreatmentID).Find(&SubTreatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}


	// Create a new instance of the Treatmentrespon struct
	response := struct {
		Treatment    *entity.Treatment    `json:"treatment"`
		SubTreatment []*entity.SubTreatment `json:"sub_treatment"`
	}{
		Treatment:    Treatment,
		SubTreatment: SubTreatment,
	}

	// Append the response to the slice of Treatmentrespon
	// Treatmentrespon = append(Treatmentrespon, response)

	// Return the JSON response
	c.JSON(http.StatusOK, gin.H{"data": response})
}







func encrypt(stringToEncrypt string, keyString string) (encryptedString string, err error) {

	//Since the key is in string, we need to convert decode it to bytes
	key, _ := hex.DecodeString(keyString)
	plaintext := []byte(stringToEncrypt)

	//Create a new Cipher Block from the key
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err

	}

	//Create a new GCM - https://en.wikipedia.org/wiki/Galois/Counter_Mode
	//https://golang.org/pkg/crypto/cipher/#NewGCM
	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return "", err

	}

	//Create a nonce. Nonce should be from GCM
	nonce := make([]byte, aesGCM.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		return "", err
	}

	//Encrypt the data using aesGCM.Seal
	//Since we don't want to save the nonce somewhere else in this case, we add it as a prefix to the encrypted data. The first nonce argument in Seal is the prefix.
	ciphertext := aesGCM.Seal(nonce, nonce, plaintext, nil)
	return fmt.Sprintf("%x", ciphertext), nil
}

func decrypt(encryptedString string, keyString string, c *gin.Context) (decryptedString string, err error) {

	key, _ := hex.DecodeString(keyString)
	enc, _ := hex.DecodeString(encryptedString)

	//Create a new Cipher Block from the key
	block, err := aes.NewCipher(key)
	if err != nil {
		//panic(err.Error())
		return "", err
	}

	//Create a new GCM
	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	//Get the nonce size
	nonceSize := aesGCM.NonceSize()

	//Extract the nonce from the encrypted data
	nonce, ciphertext := enc[:nonceSize], enc[nonceSize:]

	//Decrypt the data
	plaintext, err := aesGCM.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", err
	}
	println(plaintext)
	return fmt.Sprintf("%s", plaintext), nil
}

type Payloaddecryp struct {
	Master_Key string `json:"master_key"`
	Role       string `json:"role"`
}

func DecrypListTreatmentByID(c *gin.Context) {
	TreatmentID := c.Param("TreatmentID")
	var SubTreatment []*entity.SubTreatment
	var Treatment *entity.Treatment
	var Payloaddecryp Payloaddecryp

	var Treatmentrespon struct {
		Treatment    *entity.Treatment    `json:"treatment"`
		SubTreatment []*entity.SubTreatment `json:"sub_treatment"`
	}

	if err := c.ShouldBindJSON(&Payloaddecryp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err :=
		entity.DB().Raw("SELECT * FROM treatments WHERE id = ?", TreatmentID).Scan(&Treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err :=
		entity.DB().Raw("SELECT * FROM sub_treatments WHERE treatment_id = ?",
			TreatmentID).Find(&SubTreatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//ถ้าเป็นหมอ ให้เอา key ใน  database มา decryption ก่อน			
	if Payloaddecryp.Role == "patient" {
		fmt.Println("patient")
		var SubTreatmentRespon []*entity.SubTreatment
		for _, item := range SubTreatment {
			if item.Selected_encryp == true {
				
				Diagnosis_results, err := decrypt(item.Diagnosis_results, Payloaddecryp.Master_Key, c)
				if err != nil {
					c.JSON(http.StatusBadRequest, err.Error())
					return
				}
				item.Diagnosis_results = Diagnosis_results

				Method_treatment, err := decrypt(item.Method_treatment, Payloaddecryp.Master_Key, c)
				if err != nil {
					c.JSON(http.StatusBadRequest, err.Error())
					return
				}
				item.Method_treatment = Method_treatment

				Note, err := decrypt(item.Note, Payloaddecryp.Master_Key, c)
				if err != nil {
					c.JSON(http.StatusBadRequest, err.Error())
					return
				}
				item.Note = Note

				SubTreatmentRespon = append(SubTreatmentRespon, item)
			} else {
				SubTreatmentRespon = append(SubTreatmentRespon, item)
			}
		
			
		}

		Treatmentrespon = struct{
			Treatment    *entity.Treatment    `json:"treatment"`
			SubTreatment []*entity.SubTreatment `json:"sub_treatment"`
		}{
			Treatment: Treatment,
			SubTreatment: SubTreatmentRespon,
		}

		// Treatmentrespon = append(Treatmentrespon, response)
		// // Return the JSON response
		
	}else if (Payloaddecryp.Role == "doctor"){

		fmt.Println("doctor")
		var SubTreatmentRespon []*entity.SubTreatment
		Decrypkey_patient, err := decrypt(Treatment.Encription_Key, Payloaddecryp.Master_Key, c)
				if err != nil {
					c.JSON(http.StatusBadRequest, err.Error())
					return
				}
		for _, item := range SubTreatment {
			if item.Selected_encryp == true {				
				Diagnosis_results, err := decrypt(item.Diagnosis_results, Decrypkey_patient, c)
				if err != nil {
					c.JSON(http.StatusBadRequest, err.Error())
					return
				}
				item.Diagnosis_results = Diagnosis_results

				Method_treatment, err := decrypt(item.Method_treatment, Decrypkey_patient, c)
				if err != nil {
					c.JSON(http.StatusBadRequest, err.Error())
					return
				}
				item.Method_treatment = Method_treatment

				Note, err := decrypt(item.Note, Decrypkey_patient, c)
				if err != nil {
					c.JSON(http.StatusBadRequest, err.Error())
					return
				}
				item.Note = Note

				SubTreatmentRespon = append(SubTreatmentRespon, item)
			} else {
				SubTreatmentRespon = append(SubTreatmentRespon, item)
			}
		
			
		}

		Treatmentrespon = struct{
			Treatment    *entity.Treatment    `json:"treatment"`
			SubTreatment []*entity.SubTreatment `json:"sub_treatment"`
		}{
			Treatment: Treatment,
			SubTreatment: SubTreatmentRespon,
		}

		
	}
	c.JSON(http.StatusOK, gin.H{"data": Treatmentrespon})
}
