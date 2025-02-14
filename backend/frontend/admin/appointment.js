
 
 const API_URL = "https://davicares.onrender.com/api/admin/list-appointment-details";
 const TOKEN = localStorage.getItem("authToken");
 
 // Function to fetch appointments
 async function fetchAppointments() {
   try {
     const response = await fetch(`${API_URL}`, {
       method: 'GET',
       headers: {
         'Authorization': `Bearer ${TOKEN}`,
         'Content-Type': 'application/json',
       }
     });
 
     if (!response.ok) {
       throw new Error('Failed to fetch appointments');
     }
 
     const data = await response.json();
     renderTotalAppointments(data.data.totalAppointments); 
     renderAppointments(data.data.appointments);
     
    
 
   } catch (error) {
     console.error('Error fetching appointments: ', error);
     alert('Error fetching appointments.');
   }
 }
 
 // Function to render appointments in the table (unchanged)
 function renderAppointments(appointments) {  
  const tableBody = document.getElementById('appointments-table-body');  
  if (tableBody) {  
      tableBody.innerHTML = '';  
   
      appointments.forEach((appointment, index) => {  
          const row = document.createElement('tr');  
          row.innerHTML = `  
              <td>${index + 1}</td>  
              <td>${appointment.fullName}</td>  
              <td>${new Date(appointment.date).toLocaleDateString()}</td>  
              <td><button class="btn btn-danger btn-sm cancelBtn" data-id="${appointment._id}" data-name="${appointment.fullName}">Cancel</button></td>  
          `;  
          tableBody.appendChild(row);  
      });  

      const cancelButtons = document.querySelectorAll('.cancelBtn');  
      cancelButtons.forEach(button => {  
          // Get name from button's data attribute  
          const name = button.getAttribute('data-name');  
          button.addEventListener('click', () => cancelAppointment(button.getAttribute('data-id'), name));  
      });  
  } else {  
      console.warn('Element with ID "appointments-table-body" not found.');  
  }  
}  
 
 // Function to render total appointments
 function renderTotalAppointments(totalAppointments) {
   const totalElement = document.getElementById('total-appointments'); 
   if (totalElement) {
     totalElement.textContent = totalAppointments || 0; 
   } else {
     console.warn('Element with ID "total-appointments" not found.');
   }
 }
 
// Function to cancel an appointment  
async function cancelAppointment(id, name) {  
  const confirmation = confirm("Are you sure you want to cancel this appointment?");  
  if (!confirmation) return;   

  try {  
      const response = await fetch(`https://davicares.onrender.com/api/admin/delete-appointment/${id}`, {  
          method: 'DELETE',  
          headers: {  
              'Authorization': `Bearer ${TOKEN}`,  
              'Content-Type': 'application/json',  
          }  
      });  

      if (!response.ok) {  
          throw new Error('Failed to delete appointment');  
      }  

      // Log the cancelation activity  
      logCancelAppointmentActivity(name);  

      fetchAppointments();  
  } catch (error) {  
      console.error('Error canceling appointment: ', error);  
      alert('Error canceling appointment.');  
  }  
}  

function logCancelAppointmentActivity(name) {  
  const logEntry = {  
      name: name,  
      date: new Date().toLocaleString(),   
      action: `Appointment Canceled`  
  };  

  let activityLog = JSON.parse(localStorage.getItem("activityLog")) || [];  
  activityLog.push(logEntry);  
  localStorage.setItem("activityLog", JSON.stringify(activityLog));  
}  

window.onload = fetchAppointments;

