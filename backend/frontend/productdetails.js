document.getElementById('add-to-cart-btn').addEventListener('click', function() {  
   const phoneNumber = 23407043186334; 
    const whatsappUrl = `https://wa.me/send?phone=${phoneNumber}&text=Hi,I would like to buy some of your products`;  
    window.open(whatsappUrl, '_blank');  

     
   
});