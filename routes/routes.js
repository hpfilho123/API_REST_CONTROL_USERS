const express = require("express")
const app = express();
const router = express.Router();
const UserController = require("../controllers/UserController");
const adminAuth = require('../middleware/adminAuth');


router.post('/user',adminAuth,UserController.create);
router.get('/user',UserController.index);
router.get('/user/:id',UserController.findUser);
router.delete('/user/:id',adminAuth,UserController.deleteUsers);
router.put('/user',adminAuth,UserController.updateUser);
router.post('/recoverpassword',UserController.recoverPassword);
router.post('/changepassword',UserController.changepassword);
router.post('/login',UserController.login);

module.exports = router;