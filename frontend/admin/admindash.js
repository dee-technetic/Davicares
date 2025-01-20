document.addEventListener('DOMContentLoaded', () => {
    const storedAdmin = localStorage.getItem('registeredAdmin');
    if (storedAdmin) {
      const admin = JSON.parse(storedAdmin);
      const welcomeElement = document.querySelector('.welcome-section h5');
      if (welcomeElement) {
        welcomeElement.textContent = `Welcome, ${admin.fullname} - ${admin.email}`; 
      }
    }
  });

  window.addEventListener('DOMContentLoaded', function() {  
    populateActivityLog();  
});  

function populateActivityLog() {  
    const activityLog = JSON.parse(localStorage.getItem("activityLog")) || [];  
    const activityLogTable = document.getElementById("activity-log");  
    activityLogTable.innerHTML = "";   

    // Update total activities count  
    const totalActivities = document.getElementById("total-activities");  
    totalActivities.textContent = ` ${activityLog.length}`;  

    // Populate activity log table  
    activityLog.forEach((entry, index) => {  
        const row = document.createElement("tr");  

        // Create table cells  
        const indexCell = document.createElement("td");  
        indexCell.textContent = index + 1; 
        row.appendChild(indexCell);  

        const dateCell = document.createElement("td");  
        dateCell.textContent = entry.date;   
        row.appendChild(dateCell);  

        const actionCell = document.createElement("td");  
        actionCell.textContent = `${entry.name} - ${entry.action}`; 
        row.appendChild(actionCell);  

        // Create delete button  
        const deleteCell = document.createElement("td");  
        const deleteButton = document.createElement("button");  
        deleteButton.textContent = "Delete";  
        deleteButton.className = "delete-button btn btn-danger"; 
        deleteButton.onclick = () => deleteActivity(index);  
        deleteCell.appendChild(deleteButton);  
        row.appendChild(deleteCell);  

        
        activityLogTable.appendChild(row);  
    });  
}  

function deleteActivity(index) {  
    let activityLog = JSON.parse(localStorage.getItem("activityLog")) || [];  
    activityLog.splice(index, 1);  
    localStorage.setItem("activityLog", JSON.stringify(activityLog));  
    populateActivityLog();  
}