import httpStatus from 'http-status';   
import { Appointment } from '../model/appointment.js';  
import nodemailer from 'nodemailer';  
import dotenv from 'dotenv';  

dotenv.config();  

const emailUser = process.env.EMAIL_USER;  
const emailPass = process.env.EMAIL_PASS;  

const setAppointment = async (req, res) => {  
    const { fullName, email, phoneNumber, date } = req.body;  

    // Validate required fields  
    if (!fullName || !email || !phoneNumber || !date) {  
        return res.status(httpStatus.BAD_REQUEST).json({  
            status: 'error',  
            message: 'All fields are required.'  
        });  
    }  

    try {  
        // Create a new appointment instance  
        const appointment = new Appointment({  
            fullName,  
            email,  
            phoneNumber,  
            date  
        });  

        // Save the appointment to the database  
        await appointment.save();  

        // Set up Nodemailer transporter 
        const transporter = nodemailer.createTransport({  
            service: 'gmail',  
            auth: {  
                user: emailUser,  
                pass: emailPass,   
               
            },  
            tls: {  
                rejectUnauthorized: false 
            }  
        });  

        // Define the email options  
        const mailOptions = {  
            from: emailUser,  
            to: email,  
            subject: 'Appointment Booking Confirmation',  
            text: `Appointment has been booked.\n\nDetails:\nName: ${fullName}\nPhone: ${phoneNumber}\nDate: ${new Date(date).toLocaleDateString()}`  
        };  

        // Send email with error handling  
        await transporter.sendMail(mailOptions);  
        return res.status(httpStatus.OK).json({  
            status: 'success',  
            message: 'Appointment saved and email sent successfully',  
            data: appointment  
        });  

    } catch (error) {  
        console.error('Error:', error);  

        if (error.code === 'ECONNRESET') {  
            return res.status(httpStatus.SERVICE_UNAVAILABLE).json({  
                status: 'error',  
                message: 'Email service is temporarily unavailable, please try again later.'  
            });  
        }  

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({  
            status: 'error',  
            message: 'An error occurred while setting the appointment.'  
        });  
    }  
};  

export { setAppointment };