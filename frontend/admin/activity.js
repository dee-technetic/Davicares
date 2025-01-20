function logActivity(action, details) {  
    const logBody = document.getElementById("activity-log");
    
    if (!logBody) {  
        console.error('Activity log body not found!');  
        return;   
    }  

    const row = document.createElement('tr');  
    row.innerHTML = `  
        <td>${logBody.children.length + 1}</td> 
        <td>${new Date().toLocaleString()}</td>  
        <td>${action}</td>  
        <td>${details}</td>  
    `;  
    logBody.appendChild(row);  
}  

export default logActivity;

