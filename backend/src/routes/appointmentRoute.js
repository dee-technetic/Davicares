import express from 'express';
import { setAppointment } from '../controller/appointmentController.js';

const router = express.Router();
router.post('/appointment',setAppointment);

export default router;