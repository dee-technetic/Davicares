const profileForm = document.getElementById('profileForm');

profileForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  
  const storedAdmin = localStorage.getItem('registeredAdmin');
  if (!storedAdmin) {
    alert("Admin data not found. Please log in.");
    return;
  }

  const admin = JSON.parse(storedAdmin);
  const id = admin._id; 
  console.log(`${id}`);
 
  const fullname = document.getElementById('fullname').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log(`${ fullname, username, email,password, id}`);

  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication token not found. Please log in.');
      return; 
    }

   
    const url = `https://davicares.onrender.com/api/admin/update-admin/${id}`;

    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ fullname, username, email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || 'An error occurred while updating your profile.');
      return;
    }

    const data = await response.json();
    console.log('Update response:', data); 

    
    window.location.href = "admindash.html";
    alert(data.message || 'Profile updated successfully!');

    
    localStorage.setItem('registeredAdmin', JSON.stringify({ fullname, email, id }));

    
    const welcomeElement = document.querySelector('.welcome-section h5');
    if (welcomeElement) {
      welcomeElement.textContent = `Welcome, ${fullname} - ${email}`;
    } else {
      console.warn('Welcome section element not found.');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('An error occurred while updating your profile.');
  }
});