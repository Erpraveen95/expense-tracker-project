const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')


router.get('/',userController.getUser)

router.post('/add-data',userController.postUser )
router.delete('/delete/:id',userController.deleteUser)
module.exports = router
