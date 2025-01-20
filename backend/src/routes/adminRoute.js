import express from "express";
import {authorizeUser} from "../middleware/authorize.js"
import { checkRolesAdmin } from "../middleware/checkRoles.js";
import {aggregateAppointments} from "../aggregation/appointmentAggregation.js";
import{
    registerAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin,
    getAppointment,
    getOneAppointment,
    deleteAppointment
  } from '../controller/adminController.js';

  const router = express.Router();

  router.post('/register',registerAdmin);
  router.post('/login',loginAdmin);
  router.get('/list-appointment-details',authorizeUser,checkRolesAdmin(['admin']),aggregateAppointments);
  router.put('/update-admin/:id',authorizeUser,checkRolesAdmin(['admin']),updateAdmin);
  router.delete('/delete-admin',authorizeUser,checkRolesAdmin(['admin']),deleteAdmin);
  router.get('/list-appointment',authorizeUser,checkRolesAdmin(['admin']),getAppointment);
  router.get('/list-one-appointment',authorizeUser,checkRolesAdmin(['admin']),getOneAppointment);
  router.delete('/delete-appointment/:id',authorizeUser,checkRolesAdmin(['admin']),deleteAppointment);
  
  export default router;