// Variables
let currentPage = 0;
const pages = document.querySelectorAll('.page');
const progressDots = document.querySelectorAll('.progress-dot');
let userResponse = '';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupNoButtonAvoidance();
    setupWhatsAppRedirect();
    // Menghapus baris berikut untuk menonaktifkan fitur upload foto
    // setupPhotoUploadListeners();
});

// Page Navigation
function showPage(pageIndex) {
    pages.forEach((page, index) => {
        if (index === pageIndex) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
    
    // Update progress dots
    progressDots.forEach((dot, index) => {
        if (index === pageIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    currentPage = pageIndex;
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        showPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
}

function restartPages() {
    showPage(0);
}

// Setup WhatsApp Redirect
// Simplify the Yes button click handler
function setupWhatsAppRedirect() {
    const yesBtn = document.querySelector('.yes-btn');
    
    yesBtn.addEventListener('click', function(e) {
        // Prevent the default anchor behavior temporarily
        e.preventDefault();
        
        // Show hearts animation
        createHeartsAnimation();
        
        // Set user response for final page
        userResponse = 'yes';
        
        // Show response and hide buttons
        const happyResponse = document.getElementById('happyResponse');
        const decisionButtons = document.querySelector('.decision-buttons');
        decisionButtons.style.display = 'none';
        happyResponse.style.display = 'block';
        
        // Directly open WhatsApp link - no delay
        const phoneNumber = "6288289907355";
        const message = "Aku juga suka kamu hehe";
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappURL; // Use location.href instead of window.open
    });
}

// Response Handling
// Modifikasi fungsi showResponse untuk mengarahkan ke WhatsApp langsung
function showResponse(type) {
    const happyResponse = document.getElementById('happyResponse');
    const sadResponse = document.getElementById('sadResponse');
    const decisionButtons = document.querySelector('.decision-buttons');
    
    decisionButtons.style.display = 'none';
    
    if (type === 'yes') {
        happyResponse.style.display = 'block';
        userResponse = 'yes';
        createHeartsAnimation();
        
        // Tambahkan redirect ke WhatsApp di sini
        setTimeout(() => {
            const phoneNumber = "6288289907355";
            const message = "Aku juga suka kamu hehe";
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        }, 1500); // Delay 1.5 detik
    } else {
        sadResponse.style.display = 'block';
        userResponse = 'no';
    }
}

// No Button Avoidance
function setupNoButtonAvoidance() {
    const noBtn = document.getElementById('noButton');
    
    noBtn.addEventListener('mouseover', function() {
        // Only move the button if we haven't clicked yes yet
        if (userResponse === '') {
            const btnWidth = noBtn.offsetWidth;
            const btnHeight = noBtn.offsetHeight;
            
            // Calculate a safe area to move within the viewport
            const maxX = window.innerWidth - btnWidth - 20;
            const maxY = window.innerHeight - btnHeight - 20;
            
            // Generate random position
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);
            
            // Position button
            noBtn.style.position = 'fixed';
            noBtn.style.left = randomX + 'px';
            noBtn.style.top = randomY + 'px';
        }
    });
    
    noBtn.addEventListener('click', function() {
        showResponse('no');
    });
}

// Hearts Animation
function createHeartsAnimation() {
    const heartsContainer = document.getElementById('heartsAnimation');
    heartsContainer.style.display = 'block';
    
    // Create hearts at regular intervals
    let count = 0;
    const maxHearts = 100;
    
    const heartInterval = setInterval(() => {
        if (count >= maxHearts) {
            clearInterval(heartInterval);
            return;
        }
        
        createHeart();
        count++;
    }, 100);
}

function createHeart() {
    const heartsContainer = document.getElementById('heartsAnimation');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    
    // Random position at the bottom of the screen
    const posX = Math.floor(Math.random() * window.innerWidth);
    const duration = 3 + Math.random() * 4; // Random duration between 3-7s
    
    heart.style.left = posX + 'px';
    heart.style.animationDuration = duration + 's';
    heart.style.fontSize = (20 + Math.random() * 20) + 'px'; // Random size
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Photo Upload Handling - fungsi ini tetap ada namun tidak dipanggil
function setupPhotoUploadListeners() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(photoItem => {
        photoItem.addEventListener('click', function() {
            // Create a file input
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            
            fileInput.addEventListener('change', function(event) {
                if (event.target.files && event.target.files[0]) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // Create new image element
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        
                        // Replace placeholder with image
                        const placeholder = photoItem.querySelector('.photo-placeholder');
                        photoItem.replaceChild(img, placeholder);
                    };
                    
                    reader.readAsDataURL(event.target.files[0]);
                }
            });
            
            fileInput.click();
        });
    });
}

// Update final page based on response
document.querySelector('#confession .next').addEventListener('click', function() {
    const finalTitle = document.getElementById('finalTitle');
    const finalMessage = document.getElementById('finalMessage');
    
    if (userResponse === 'yes') {
        finalTitle.textContent = 'Terima Kasih Sayang ❤️';
        finalMessage.textContent = 'Aku sangat bahagia kamu menerima perasaanku. Ini adalah awal dari kisah kita yang indah. Aku berjanji akan selalu berusaha membuatmu bahagia setiap hari.';
    } else {
        finalTitle.textContent = 'Terima Kasih';
        finalMessage.textContent = 'Terima kasih sudah mau membaca semuanya. Aku menghargai kejujuranmu dan berharap kita bisa tetap berteman baik. Persahabatan kita sangat berharga bagiku.';
    }
});

// Music Setup - Autoplay dengan loop
document.addEventListener('DOMContentLoaded', function() {
    setupAutoplayMusic();
    
    // Panggil fungsi yang sudah ada
    setupNoButtonAvoidance();
    setupWhatsAppRedirect();
});

function setupAutoplayMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // Set volume
    backgroundMusic.volume = 0.5; // 50% volume, bisa disesuaikan
    
    // Pastikan musik terus berputar
    backgroundMusic.loop = true;
    
    // Fungsi untuk memulai musik
    function playAudio() {
        backgroundMusic.play().catch(error => {
            console.log("Browser mencegah autoplay, akan mencoba saat interaksi user");
        });
    }
    
    // Coba putar musik saat halaman dimuat
    playAudio();
    
    // Putar musik saat user berinteraksi dengan halaman pertama kali
    // (diperlukan karena kebijakan browser modern)
    document.body.addEventListener('click', function initialPlay() {
        playAudio();
        // Hapus event listener setelah klik pertama
        document.body.removeEventListener('click', initialPlay);
    }, { once: true });
    
    // Tangani kasus ketika musik selesai (meskipun sudah ada atribut loop)
    backgroundMusic.addEventListener('ended', function() {
        // Mulai ulang musik
        backgroundMusic.currentTime = 0;
        playAudio();
    });
}