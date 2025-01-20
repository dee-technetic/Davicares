import httpStatus from "http-status";
import {Appointment} from "../model/appointment.js";

// Function to aggregate appointments  
const aggregateAppointments = async (req, res) => {  
    try {  
        const [appointments, countResult] = await Promise.all([  
            Appointment.aggregate([  
                {  
                    $project: {  
                        _id: 1,  
                        fullName: 1,  
                        email: 1,   
                        date: 1,  
                    },  
                },  
            ]),  
            Appointment.aggregate([  
                { $count: 'totalAppointments' }  
            ])  
        ]);  

        // Extract total count from countResult  
        const totalAppointments = countResult.length > 0 ? countResult[0].totalAppointments : 0;  

        return res.status(httpStatus.OK).json({  
            status: 'success',  
            data: {  
                totalAppointments,  
                appointments  
            },  
        });  
    } catch (error) {  
        console.error(error);  
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({  
            status: 'error',  
            message: 'An error occurred while aggregating appointments.',  
        });  
    }  
};  

export {aggregateAppointments};