package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut64/team03/backend/controller"
	"github.com/sut64/team03/backend/entity"
	"github.com/sut64/team03/backend/middlewares"

	MedicalRecord "github.com/sut64/team03/backend/controller"
	Treatment   "github.com/sut64/team03/backend/controller"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())
	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			protected.GET("api/ListDoctor", controller.ListDoctor)
			protected.GET("api/ListUser", controller.ListUser)



			protected.POST("/api/CreateMedicalRecord", MedicalRecord.CreateMedicalRecord)
			protected.POST("/api/CreateTreatment", Treatment.CreateTreatment)




			protected.GET("/api/ListMedicalRecord", MedicalRecord.ListMedicalRecord)
			// protected.GET("/api/DecryptionMedicalRecord", MedicalRecord.DecryptionMedicalRecord)
			protected.POST("/api/DecryptionMedicalRecord/:MedrecID", MedicalRecord.DecryptionMedicalRecord)
			protected.GET("/api/ListMedicalRecord/:MedrecID", MedicalRecord.ListMedicalRecordByID)


		}
	}
	//Get func login/Actor
	r.POST("/login", controller.Login)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
