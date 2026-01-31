import express from 'express'
import { Login, Logout, Signup, verifyEmail ,forgotPassword, resetPassword } from '../controllers/userController.js'

const router = express.Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/logout',Logout)
router.post('/verify-email',verifyEmail)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password',resetPassword)

export default router