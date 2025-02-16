
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
const typeWriterEl =  document.getElementById('typewriter');
const textOfWriter = "Hi, I'm Fadhil. I love building amazing things!";
let index = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const starCount = 50; // Kurangi jumlah bintang agar tidak terlalu padat

document.addEventListener("DOMContentLoaded", function() {
    const animateElements = document.querySelectorAll('.animate');
    const checkVisibility = () => {
        animateElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            if(elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add("slide-in-left");
            }
        })
    }

    const iconAnimate = document.querySelectorAll('.icon-animate');
    const checkIcon = () => {
        let index = 0;
        iconAnimate.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if(elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add("fade-in-1");
                element.style.animationDelay=`${index}s`
            }

            index+=0.3;
        });
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('scroll', checkIcon);
    checkVisibility();
    checkIcon();
})
// Typewritter function
function typeWriter() {

    if(index < textOfWriter.length) {
    typeWriterEl.innerHTML += textOfWriter.charAt(index);
    index++
    setTimeout(typeWriter, 100);
    }
}

// Fungsi untuk membuat bintang
function createStars() {
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width, // Posisi horizontal acak
            y: Math.random() * canvas.height, // Posisi vertikal acak
            radius: Math.random() * 1.5, // Ukuran bintang (1-3 piksel)
            speed: Math.random() * 0.5 + 0.1, // Kecepatan jatuh (1-3)
            tailLength: Math.random() * -20 + -10, // Panjang ekor (10-30 piksel)
            opacity: Math.random() * 0.5 + 0.5 // Opasitas (0.5-1)
        });
    }
}

// Fungsi untuk menggambar bintang dengan ekor
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas
    ctx.fillStyle = '#000'; // Warna latar belakang (hitam)
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Isi canvas dengan hitam

    stars.forEach(star => {
        // Gambar ekor bintang
        const gradient = ctx.createLinearGradient(star.x, star.y, star.x, star.y + star.tailLength);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`); // Warna awal (putih)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Warna akhir (transparan)
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.radius / 2; // Lebar garis ekor
        ctx.beginPath();
        ctx.moveTo(star.x, star.y); // Mulai dari posisi bintang
        ctx.lineTo(star.x, star.y + star.tailLength); // Garis ekor ke bawah
        ctx.stroke();

        // Gambar bintang (titik)
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); // Lingkaran kecil sebagai bintang
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`; // Warna bintang
        ctx.fill();

        // Gerakkan bintang ke bawah
        star.y += star.speed;

        // Jika bintang jatuh ke bawah layar, kembalikan ke atas
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(drawStars); // Ulangi animasi
}

// Inisialisasi
setTimeout(() => {
    typeWriter();
},1000);
createStars();
drawStars();

// Handle resize window
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars.length = 0;
    createStars();
});


// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Animations
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.8) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }
    });
});


