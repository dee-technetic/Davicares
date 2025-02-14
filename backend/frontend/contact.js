document.getElementById('send-message').addEventListener('click', function() {  
   
    const name = document.getElementById('name').value;  
    const email = document.getElementById('email').value;  
    const inquiry = document.getElementById('inquiry').value;  
    const comment = document.getElementById('comment').value;  

      
    const phoneNumber = '23408188752399';  
    const message = `Hi, my name is ${name}. ${comment}`;  
    const whatsappUrl = `https://wa.me/send?phone=${phoneNumber}&text=${message}`;  

     
    alert('You will be redirected to WhatsApp to send your message.');  

     
    window.open(whatsappUrl, '_blank');  

     
   
});