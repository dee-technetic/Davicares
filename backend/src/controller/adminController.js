import httpStatus from "http-status";
import { Admin } from "../model/admin.js";
import { Appointment } from "../model/appointment.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerAdmin = async (req, res) => {
  const { fullname, username, email, role, password } = req.body;

  if (!password) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Please enter a password",
    });
  }

  try {
    let user = await Admin.findOne({ email: email });
    if (user) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "email already exists",
      });
    }

    user = await Admin.findOne({ username: username });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new Admin({
      fullname,
      username,
      email,
      role,
      password: hashedPassword,
    });

    await user.save();

    res.status(httpStatus.CREATED).json({
      status: "success",
      message: "User registration successful",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Invalid",
    });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminExists = await Admin.findOne({ email: email });

    if (!adminExists) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "Not Found",
        message: "Invalid login details",
      });
    }
    const correctPassword = await bcrypt.compare(
      password,
      adminExists.password
    );

    if (!correctPassword) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        status: "Unauthorized",
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      {
        id: adminExists._id,
        email: adminExists.email,
      },
      process.env.JWT_SECRET
    );
    return res.status(httpStatus.OK).json({
      status: "success",
      message: "Token created",
      adminData: {
        id: adminExists._id,
        name: adminExists.username,
        email: adminExists.email,
        authToken: token,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An error occurred while trying to login",
    });
  }
};


const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, username, email, password } = req.body;
    const updateAdmin = await Admin.findByIdAndUpdate(
      id,
      { fullname, username, email, password },
      { new: true }
    );
    if (!updateAdmin) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "admin not found",
      });
    }
    return res.status(httpStatus.OK).json({
      status: "success",
      message: "admin updated successfully",
      data: updateAdmin,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Invalid",
    });
  }
};

const deleteAdmin = async (req, res) => {  
  const { id } = req.params;  

  try {  
    const deletedAdmin = await Admin.findByIdAndDelete(id);  // Renamed to deletedAdmin  
    if (!deletedAdmin) {  
      return res.status(httpStatus.NOT_FOUND).json({  
        status: "error",  
        message: "Admin not found",  
      });  
    }  
    return res.status(httpStatus.NO_CONTENT).json({  
      status: "success",  
      message: "Admin deleted successfully",  
      data: deletedAdmin, 
    });  
  } catch (error) {  
    console.error(error);  
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({  
      status: "error",  
      message: "Invalid",  
    });  
  }  
};  

const getAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    if (appointments.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "No appointments found",
      });
    }
    res.status(httpStatus.OK).json({
      status: "success",
      message: "appointments retrieved successfully",
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while retrieving appointments",
    });
  }
};

const getOneAppointment = async (req, res) => {
  const { id, fullname, email } = req.query;
  try {
    let appointment;
    if (id) {
      appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "appointment with the given id does not exist",
        });
      } else {
        return res.status(httpStatus.OK).json({
          status: "success",
          message: "appointment retrieved successfully",
          data: appointment,
        });
      }
    } else if (fullname) {
      appointment = await Appointment.findOne({ fullname });
      if (!appointment) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "appointment with the given fullname does not exist",
        });
      } else {
        return res.status(httpStatus.OK).json({
          status: "success",
          message: "appointment retrieved successfully",
          data: appointment,
        });
      }
    } else if (email) {
      appointment = await Appointment.findOne({ email });
      if (!appointment) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "appointment with email already exists",
        });
      } else {
        return res.status(httpStatus.OK).json({
          status: "success",
          message: "appointment retrieved successfully",
          data: appointment,
        });
      }
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: "Either id or filename parameter is required",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Invalid",
    });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Appointment.findByIdAndDelete(id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Appointment not found",
      });
    }
    return res.status(httpStatus.NO_CONTENT).json({
      status: "success",
      message: "Appointment deleted successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Invalid",
    });
  }
};
export {
  registerAdmin,
  loginAdmin,
  updateAdmin,
  deleteAdmin,
  getAppointment,
  getOneAppointment,
  deleteAppointment
};
