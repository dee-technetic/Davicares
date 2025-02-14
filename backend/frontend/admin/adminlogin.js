
export async function loginAdmin(adminData) {  
    const url = "http://localhost:2000/api/admin/login";  
    console.log("Data to be sent:", adminData);  

    try {  
        const response = await fetch(url, {  
            method: "POST",  
            headers: {  
                "Content-Type": "application/json",  
            },  
            body: JSON.stringify(adminData),  
        });  

        if (!response.ok) {  
            throw new Error(`HTTP error! status: ${response.status}`);  
        }  

        const data = await response.json();  

        // Check if admin data exists correctly  
        if (data && data.status === 'success' && data.adminData) {  
            const admin = data.adminData;  
            console.log(admin.authToken);
            localStorage.setItem("authToken", admin.authToken);
            console.log("Logged in admin:", admin);    
            localStorage.setItem('loggedInadmin', JSON.stringify(admin));  

            logAdminActivity(admin.name);

             window.location.href = "admindash.html";  
            
             
        } else {  
            console.error("Unexpected data structure:", data);  
        }  

    } catch (error) {  
        console.error("Error logging in admin:", error);  
    }  
}

document.getElementById("loginForm").addEventListener("submit", function(event) {  
    event.preventDefault();   
    const adminData = {   
        email: document.getElementById("email").value,  
        password: document.getElementById("password").value,   
    };  

    loginAdmin(adminData);   
});  

function logAdminActivity(adminName) {  
    const logEntry = {  
        name: adminName,  
        date: new Date().toLocaleString(), 
        action: "Logged In"  
    };  

   
    let activityLog = JSON.parse(localStorage.getItem("activityLog")) || [];  
    activityLog.push(logEntry);  
    localStorage.setItem("activityLog", JSON.stringify(activityLog));  
}