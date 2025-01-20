let currentSlide = 0;  

function showSlide(index) {  
    const slides = document.querySelectorAll('.slide');  
    const totalSlides = slides.length;  

   
    if (index >= totalSlides) {  
        currentSlide = 0;  
    } else if (index < 0) {  
        currentSlide = totalSlides - 1;  
    } else {  
        currentSlide = index;  
    }  

    
    const slidesContainer = document.querySelector('.slides');  
    slidesContainer.style.transform = `translateX(${-currentSlide * 100}%)`;  
}  

function changeSlide(direction) {  
    showSlide(currentSlide + direction);  
}  

  
showSlide(currentSlide);

