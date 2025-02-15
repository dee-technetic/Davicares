import httpStatus from 'http-status';
import { Appointment } from '../model/appointment.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Joi from 'joi'; // Import Joi

dotenv.config();

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

// Define the Joi schema (preferably in a separate validation file)
const appointmentValidationSchema = Joi.object({
    fullName: Joi.string().required().max(255),
    email: Joi.string().email().required().lowercase(),
    phoneNumber: Joi.string().required(),
    date: Joi.date().required(), // Ensure date is required and a valid date
});


const setAppointment = async (req, res) => {
    // 1. Validate with Joi FIRST
    const { error, value } = appointmentValidationSchema.validate(req.body);

    if (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            status: 'error',
            message: error.details[0].message // Send validation error message
        });
    }

    // 2. Use the validated data from 'value'
    const { fullName, email, phoneNumber, date } = value; // Destructure validated values

    try {
        const appointment = new Appointment({
            fullName,
            email,
            phoneNumber,
            date // The date is now guaranteed to be a valid Date object or a string that Mongoose can convert
        });

        await appointment.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass,
            },
            tls: {
                rejectUnauthorized: false // Use with CAUTION in production!
            }
        });

        const mailOptions = {
            from: emailUser,
            to: email, // Use validated email
            subject: 'Appointment Booking Confirmation',
            // Improved email formatting (HTML is better than plain text for this)
            html: `<p>Your appointment has been booked.</p>
                   <p><strong>Details:</strong></p>
                   <ul>
                       <li>Name: ${fullName}</li>
                       <li>Phone: ${phoneNumber}</li>
                       <li>Date: ${new Date(date).toLocaleDateString()}</li> 
                   </ul>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId); // Log for tracking

        return res.status(httpStatus.OK).json({
            status: 'success',
            message: 'Appointment saved and email sent successfully',
            data: appointment
        });

    } catch (error) {
        console.error('Error:', error);

        if (error.code === 'ECONNRESET' || error.message.includes('connect ECONNRESET')) {
            return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
                status: 'error',
                message: 'Email service is temporarily unavailable, please try again later.'
            });
        }

        if (error.name === 'ValidationError') { // Mongoose validation error
            return res.status(httpStatus.BAD_REQUEST).json({
                status: 'error',
                message: error.message // Send Mongoose validation errors to client
            });
        }

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'An error occurred while setting the appointment: ' + error.message // Include error message for debugging
        });
    }
};

export { setAppointment };