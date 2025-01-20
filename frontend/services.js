document.addEventListener("DOMContentLoaded", () => {  
  const appointmentForm = document.getElementById('appointmentForm');  

  appointmentForm.addEventListener('submit', async (event) => {  
    event.preventDefault();  

    const name = document.getElementById('name').value;  
    const email = document.getElementById('email').value;  
    const phone = document.getElementById('phone').value;  
    const date = document.getElementById('date').value;  

    try {  
      const response = await fetch('http://localhost:2000/api/appointment', {  
        method: 'POST',  
        headers: {  
          'Content-Type': 'application/json'  
        },  
        body: JSON.stringify({  
          fullName: name,  
          email: email,  
          phoneNumber: phone,  
          date: date  
        })  
      });  

      if (response.ok) {  
        const data = await response.json();  
        console.log('Update response:', data);  

        if (data.status === 'success') {  
          const successMessage = document.createElement('p');  
          successMessage.classList.add('success-message');   
          successMessage.textContent = "Appointment booked successfully!";  
          appointmentForm.insertAdjacentElement('afterend', successMessage);  
     
          logAppointmentActivity(name, date); 

          appointmentForm.reset();  

        } else {  
           
          const errorMessage = document.createElement('p');  
          errorMessage.classList.add('error-message');   
          errorMessage.textContent = "An error occurred: " + data.message;  
          appointmentForm.insertAdjacentElement('afterend', errorMessage);  
        }  
      } else {  
        throw new Error('Network response was not ok');  
      }  
    } catch (error) {  
      console.error('Error:', error);  

      const errorMessage = document.createElement('p');  
      errorMessage.classList.add('error-message');   
      errorMessage.textContent = "An error occurred while booking the appointment.";  
      appointmentForm.insertAdjacentElement('afterend', errorMessage);  
    }  
  });  

  function logAppointmentActivity(name, date) {  
    const logEntry = {  
        name: name,  
        date: new Date().toLocaleString(),   
        action: `Booked Appointment`
    };  

    
    let activityLog = JSON.parse(localStorage.getItem("activityLog")) || [];  
    activityLog.push(logEntry);  
    localStorage.setItem("activityLog", JSON.stringify(activityLog));  

   
}  

});