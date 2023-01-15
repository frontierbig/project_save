package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team03/backend/entity"
)

func ListDoctor(c *gin.Context) {
	var Doctor []*entity.Doctor
	if err :=
		entity.DB().Table("doctors").Find(&Doctor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": Doctor})

}

// func ListDoctor(c *gin.Context) {
// 	var User []entity.User
// 	if err := entity.DB().Preload("Role").Raw("SELECT users.* FROM users LEFT JOIN roles ON users.role_id = roles.id WHERE roles.name = 'member';").Find(&User).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": User})
// }
