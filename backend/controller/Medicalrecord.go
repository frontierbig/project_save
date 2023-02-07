package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team03/backend/entity"

	// "net/smtp"
	

	// "crypto/aes"
	// "crypto/cipher"
	"crypto/rand"
	// "encoding/hex"
	"fmt"
	// "io"

	// "log"
	// "os"
)



func ListUser(c *gin.Context) {
	var User []*entity.User
	if err :=
		entity.DB().Preload("Role").Raw("SELECT * FROM users WHERE role_id = 1").Find(&User).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": User})
}





// POST /users
func CreateMedicalRecord(c *gin.Context) {

	var MedicalRecord entity.MedicalRecord
	var User    entity.User
	
	

	if err := c.ShouldBindJSON(&MedicalRecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?",MedicalRecord.Patient_ID).First(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	



	bytes := make([]byte, 32) ////generate a random 32 byte key for AES-256
	if _, err := rand.Read(bytes); err != nil {
		panic(err.Error())
	}

	// key := hex.EncodeToString(bytes) 



	//  // Sender data.
	//  from := "big16635@gmail.com"
	//  password := "vcxvgglchwchhzcj"
   
	//  // Receiver email address.
	//  to := []string{
	//    User.Email,
	//  }
   
	//  // smtp server configuration.
	//  smtpHost := "smtp.gmail.com"
	//  smtpPort := "587"
   
   
	//  // Message.
	//  message := []byte("Patient Key is "+key)
	 
	//  // Authentication.
	//  auth := smtp.PlainAuth("", from, password, smtpHost)
	 
	//  // Sending email.
	//  err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	//  if err != nil {
	//    fmt.Println(err)
	//    return
	//  }
	//  fmt.Println("Email Sent Successfully!")

	

	// encrypted ,err := encrypt(MedicalRecord.Secret_Data, key)
	//  if err != nil{
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	//  }
	// encryptedKey ,err:= encrypt(key,MedicalRecord.Master_Key)
	// if err != nil{
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	//  }


	//ลองถอดรหัส 

	// patientkeytest, err := decrypt("d5dd99f8ed05be83c3212b6756caeac9e7c1b8df9d44a7f8cf1c403125894fd751a3ecce6caacdd12c56ae470a7be218c10e83cb30ec342d6478da5ff9c56df1fd2fc61c09d9894cd8da206abeb268ae532ad0e994627d36e4e28eab", "692546ad410fd46d09be787077942d972d6173d0ce50559df470adc016d4c7fa", c)
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, err.Error())
	// 	return
	// }
	// // patientkeytest := decrypted("d5dd99f8ed05be83c3212b6756caeac9e7c1b8df9d44a7f8cf1c403125894fd751a3ecce6caacdd12c56ae470a7be218c10e83cb30ec342d6478da5ff9c56df1fd2fc61c09d9894cd8da206abeb268ae532ad0e994627d36e4e28eab",
	// // "692546ad410fd46d09be787077942d972d6173d0ce50559df470adc016d4c7fa")

	//  fmt.Println(patientkeytest)
	
		
	

	// f, err := os.Create("KeypatientEncrype.txt")

	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer f.Close()
	// n, err := fmt.Fprintln(f, encryptedKey)

	// if err != nil {

	// 	log.Fatal(err)
	// }
	// if err != nil {

	// 	log.Fatal(err)
	// }

	// fmt.Println(n, "bytes written")
	// fmt.Println("done")

	



	// fmt.Printf("encrypted : %s\n", encrypted)

	mr := entity.MedicalRecord{
		Hospital_Number:     MedicalRecord.Hospital_Number,
		Personal_ID:         MedicalRecord.Personal_ID,
		Patient:    User,
		Patient_Age:         MedicalRecord.Patient_Age,
		Patient_gender:      MedicalRecord.Patient_gender,
		Patient_dob:         MedicalRecord.Patient_dob,
		Patient_address:     MedicalRecord.Patient_address,
		Patient_phone:       MedicalRecord.Patient_phone,

		Both_parent :MedicalRecord.Both_parent,
		Guardian : MedicalRecord.Guardian,
		Mother_only : MedicalRecord.Mother_only,
		Father_only : MedicalRecord.Father_only,


		Parent_Name:         MedicalRecord.Parent_Name,
		Parent_address:      MedicalRecord.Parent_address,
		Parent_phone:        MedicalRecord.Parent_phone,
		Medical_history:     MedicalRecord.Medical_history,
		Current_medications: MedicalRecord.Current_medications,

		Asthma:        MedicalRecord.Asthma,
		Heart_disease: MedicalRecord.Heart_disease,
		Bleeding_Disorders :MedicalRecord.Bleeding_Disorders,
		Urinary_Infection :MedicalRecord.Urinary_Infection,
		Convulsions :MedicalRecord.Convulsions,
		Vision_Contacts :MedicalRecord.Vision_Contacts,
		Diabetes :MedicalRecord.Diabetes,
		Teeth_dentures :MedicalRecord.Teeth_dentures,
		Ear_Infection :MedicalRecord.Ear_Infection,
		Menstrual_problems :MedicalRecord.Menstrual_problems,
		Emotional :MedicalRecord.Emotional,
		Fainting  :MedicalRecord.Fainting,
		Hypertension :MedicalRecord.Hypertension,


		Animals :MedicalRecord.Animals,
		Plants :MedicalRecord.Plants,
		Food :MedicalRecord.Food,
		Pollen :MedicalRecord.Pollen,
		Hay_Fever :MedicalRecord.Hay_Fever,
		Insect_Stings :MedicalRecord.Insect_Stings,
		Medicine_drugs :MedicalRecord.Medicine_drugs,


		// Secret_Data : MedicalRecord.Secret_Data,
		// Secret_Data: encrypted,
		
	}

	// 12: บันทึก
	if err := entity.DB().Create(&mr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mr})
}


// type Payload struct {
// 	Decryption string `json:"decryption"`
// }



////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


func DecryptionMedicalRecord(c *gin.Context) {

	var MedicalRecord entity.MedicalRecord
	MedrecID := c.Param("MedrecID")

	var Data Payload

	if err := c.ShouldBindJSON(&Data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", MedrecID).First(&MedicalRecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}
	fmt.Println(Data.Decryption)
	fmt.Println(MedicalRecord.Secret_Data)

	decrypted, err := decrypt(MedicalRecord.Secret_Data, Data.Decryption, c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": decrypted})

}



func ListMedicalRecord(c *gin.Context) {
	var MedicalRecord []*entity.MedicalRecord
	if err :=
		entity.DB().Table("medical_records").Find(&MedicalRecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": MedicalRecord})

}

func ListMedicalRecord2(c *gin.Context) {
	var MedicalRecord []entity.MedicalRecord
	if err := entity.DB().Preload("medical_records").Preload("users").Raw("SELECT * FROM medical_records ORDER BY id desc").Find(&MedicalRecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": MedicalRecord})
}


func ListMedicalRecordByID(c *gin.Context) {

	Medrecid := c.Param("MedrecID")

	var MedicalRecord []*entity.MedicalRecord

	if err :=
		entity.DB().Raw("SELECT * FROM medical_records WHERE id = ?", Medrecid).Find(&MedicalRecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": MedicalRecord})

}

// func encrypt(stringToEncrypt string, keyString string) (encryptedString string) {

// 	//Since the key is in string, we need to convert decode it to bytes
// 	key, _ := hex.DecodeString(keyString)
// 	plaintext := []byte(stringToEncrypt)

	

// 	//Create a new Cipher Block from the key
// 	block, err := aes.NewCipher(key)
// 	if err != nil {
// 		panic(err.Error())
// 	}

// 	//Create a new GCM - https://en.wikipedia.org/wiki/Galois/Counter_Mode
// 	//https://golang.org/pkg/crypto/cipher/#NewGCM
// 	aesGCM, err := cipher.NewGCM(block)
// 	if err != nil {
// 		panic(err.Error())
// 	}

// 	//Create a nonce. Nonce should be from GCM
// 	nonce := make([]byte, aesGCM.NonceSize())
// 	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
// 		panic(err.Error())
// 	}

// 	//Encrypt the data using aesGCM.Seal
// 	//Since we don't want to save the nonce somewhere else in this case, we add it as a prefix to the encrypted data. The first nonce argument in Seal is the prefix.
// 	ciphertext := aesGCM.Seal(nonce, nonce, plaintext, nil)
// 	return fmt.Sprintf("%x", ciphertext)
// }

// func decrypt(encryptedString string, keyString string, c *gin.Context) (decryptedString string, err error) {

// 	key, _ := hex.DecodeString(keyString)
// 	enc, _ := hex.DecodeString(encryptedString)

// 	//Create a new Cipher Block from the key
// 	block, err := aes.NewCipher(key)
// 	if err != nil {
// 		//panic(err.Error())
// 		return "", err
// 	}

// 	//Create a new GCM
// 	aesGCM, err := cipher.NewGCM(block)
// 	if err != nil {
// 		return "", err
// 	}

// 	//Get the nonce size
// 	nonceSize := aesGCM.NonceSize()

// 	//Extract the nonce from the encrypted data
// 	nonce, ciphertext := enc[:nonceSize], enc[nonceSize:]

// 	//Decrypt the data
// 	plaintext, err := aesGCM.Open(nil, nonce, ciphertext, nil)
// 	if err != nil {
// 		return "", err
// 	}
// 	println(plaintext)
// 	return fmt.Sprintf("%s", plaintext), nil
// }


