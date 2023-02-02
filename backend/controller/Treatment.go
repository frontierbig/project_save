package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team03/backend/entity"

	// "net/smtp"

	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"

	// "log"
	// "os"
)

// POST /users
func CreateTreatment(c *gin.Context) {

	var Treatment entity.Treatment
	var User entity.User

	if err := c.ShouldBindJSON(&Treatment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Treatment.Patient_ID).First(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	//เช็คก่อนว่า User มีกุญแจหรือยัง ถ้ามีแล้ว ให้ใช้อันนั้น ถ้าไม่มีให้ สร้างใหม่แล้ว Update ให้  user คนนั้น
	bytes := make([]byte, 32) ////generate a random 32 byte key for AES-256
	if _, err := rand.Read(bytes); err != nil {
		panic(err.Error())
	}

	key := hex.EncodeToString(bytes)

	// // Sender data.
	// from := "big16635@gmail.com"
	// password := "vcxvgglchwchhzcj"

	// // Receiver email address.
	// to := []string{
	// 	User.Email,
	// }

	// // smtp server configuration.
	// smtpHost := "smtp.gmail.com"
	// smtpPort := "587"

	// // Message.
	// message := []byte("Patient Key is " + key)

	// // Authentication.
	// auth := smtp.PlainAuth("", from, password, smtpHost)

	// // Sending email.
	// err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	// if err != nil {
	// 	fmt.Println(err)
	// 	return
	// }
	// fmt.Println("Email Sent Successfully!")

	encrypted_Diagnosis,err := encrypt(Treatment.Diagnosis_results, key)

	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	 }

	
	encrypted_Method_treatment,err := encrypt(Treatment.Method_treatment, key)
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	 }

	encryptedKey,err := encrypt("ASDFDASFSDAFSDA",Treatment.Master_Key)
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": "WORNFASD"})
		return
	 }

	//ลองถอดรหัส

	// patientkeytest, err := decrypt("d5dd99f8ed05be83c3212b6756caeac9e7c1b8df9d44a7f8cf1c403125894fd751a3ecce6caacdd12c56ae470a7be218c10e83cb30ec342d6478da5ff9c56df1fd2fc61c09d9894cd8da206abeb268ae532ad0e994627d36e4e28eab", "692546ad410fd46d09be787077942d972d6173d0ce50559df470adc016d4c7fa", c)
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, err.Error())
	// 	return
	// }
	// // patientkeytest := decrypted("d5dd99f8ed05be83c3212b6756caeac9e7c1b8df9d44a7f8cf1c403125894fd751a3ecce6caacdd12c56ae470a7be218c10e83cb30ec342d6478da5ff9c56df1fd2fc61c09d9894cd8da206abeb268ae532ad0e994627d36e4e28eab",
	// // "692546ad410fd46d09be787077942d972d6173d0ce50559df470adc016d4c7fa")

	//  fmt.Println(patientkeytest)







    // เชียน Key ไว้ใน Base
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

	// fmt.Printf("encrypted : %s\n", encrypted_Diagnosis)

	mr := entity.Treatment{

		Patient: User,
		// Diagnosis_results:         Treatment.Diagnosis_results,
		Diagnosis_results: encrypted_Diagnosis,
		Method_treatment:  encrypted_Method_treatment,
		Appointment:       Treatment.Appointment,
		Master_Key: encryptedKey,

		// Secret_Data : Treatment.Secret_Data,

	}

	// 12: บันทึก
	if err := entity.DB().Create(&mr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mr})
}

type Payload struct {
	Decryption string `json:"decryption"` // ต้องสร้างฟิลมารับ Decrypt tion อยู่หน้า medrecshow
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

type Datadecryptreturn struct {
	Diagnosis       string `json:"diagnosis"`
	Methodtreatment string `json:"methodtreatment"`
}

func DecryptionTreatment(c *gin.Context) {

	var Treatment entity.Treatment
	MedrecID := c.Param("MedrecID")
	var Data Payload

	if err := c.ShouldBindJSON(&Data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", MedrecID).First(&Treatment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}
	fmt.Println(Data.Decryption)
	fmt.Println(Treatment.Diagnosis_results)
	fmt.Println(Treatment.Method_treatment)

	decrypted, err := decrypt(Treatment.Diagnosis_results, Data.Decryption, c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	decrypted2, err := decrypt(Treatment.Method_treatment, Data.Decryption, c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	data := Datadecryptreturn{Diagnosis: decrypted, Methodtreatment: decrypted2}

	c.JSON(http.StatusOK, gin.H{"data": data})

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

func ListTreatmentByID(c *gin.Context) {

	Medrecid := c.Param("MedrecID")

	var Treatment []*entity.Treatment

	if err :=
		entity.DB().Raw("SELECT * FROM treatments WHERE id = ?", Medrecid).Find(&Treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Treatment})

}

func encrypt(stringToEncrypt string, keyString string) (encryptedString string,err error) {

	//Since the key is in string, we need to convert decode it to bytes
	key, _ := hex.DecodeString(keyString)
	plaintext := []byte(stringToEncrypt)

	//Create a new Cipher Block from the key
	block, err := aes.NewCipher(key)
	if err != nil {
		return "",err

	}

	//Create a new GCM - https://en.wikipedia.org/wiki/Galois/Counter_Mode
	//https://golang.org/pkg/crypto/cipher/#NewGCM
	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return "",err

	}


	//Create a nonce. Nonce should be from GCM
	nonce := make([]byte, aesGCM.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		return "",err
	}

	//Encrypt the data using aesGCM.Seal
	//Since we don't want to save the nonce somewhere else in this case, we add it as a prefix to the encrypted data. The first nonce argument in Seal is the prefix.
	ciphertext := aesGCM.Seal(nonce, nonce, plaintext, nil)
	return fmt.Sprintf("%x", ciphertext),nil
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
