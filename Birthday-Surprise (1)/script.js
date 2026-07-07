// ตั้งรหัสผ่าน 6 หลักตรงนี้ (ต้องเป็นตัวเลข 6 ตัวเท่านั้น)
const PASSECODE_NUMBER = "300748"; 

let enteredCode = ""; 

function nextScene(currentId, nextId) {
    const current = document.getElementById(currentId);
    const next = document.getElementById(nextId);
    current.classList.remove('active');
    setTimeout(() => { next.classList.add('active'); }, 400);
}

// --- แป้นพิมพ์ iPhone 6 หลัก ---
function updateDotsIndicator() {
    const dots = document.querySelectorAll('#dots-indicator .p-dot');
    dots.forEach((dot, index) => {
        if (index < enteredCode.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function pressKey(number) {
    if (enteredCode.length >= 6) return; 
    
    enteredCode += number;
    updateDotsIndicator();
    document.getElementById('error-msg').textContent = "";

    if (enteredCode.length === 6) {
        setTimeout(verifyPasscode, 250); 
    }
}

function deleteKey() {
    if (enteredCode.length > 0) {
        enteredCode = enteredCode.slice(0, -1);
        updateDotsIndicator();
    }
}

function verifyPasscode() {
    if (enteredCode === PASSECODE_NUMBER) {
        // [จุดแก้ไขสำคัญ]: กดรหัสผ่านถูก เพลงจะขึ้นเล่นทันทีตรงนี้เลย!
        const music = document.getElementById('bg-music');
        music.play().catch(error => console.log("Audio play blocked by browser: ", error));
        
        nextScene('scene-lock', 'scene-gift');
    } else {
        const dotsIndicator = document.getElementById('dots-indicator');
        dotsIndicator.classList.add('shake');
        document.getElementById('error-msg').textContent = "รหัสผ่านไม่ถูกต้อง ลองอีกทีนะ 🤍";
        
        setTimeout(() => {
            enteredCode = "";
            updateDotsIndicator();
            dotsIndicator.classList.remove('shake');
        }, 500);
    }
}
// ------------------------------------------

function openGift() {
    nextScene('scene-gift', 'scene-letter-1');
}

// [ฟังก์ชันเพิ่มเติม]: กดที่จดหมายก่อน ถึงจะแสดงรูปภาพ 5 รูปและข้อความ
function revealLetterContent() {
    // ซ่อนปุ่มเปิดจดหมายอันเดิมออกไป
    document.getElementById('btn-open-content').classList.add('hidden');
    
    // เปลี่ยนไอคอนและหัวข้อให้ดูเปิดใช้งานแล้ว
    document.getElementById('letter-heart').innerHTML = "💖";
    document.getElementById('letter-title').innerHTML = "Our Special Memories";
    
    // แสดงสไลด์โชว์รูปภาพและข้อความทั้งหมดขึ้นมาพร้อมเอฟเฟกต์ Fade In
    const secretContent = document.getElementById('secret-content');
    secretContent.classList.add('show-fade');
    
    // สั่งจุดพลุเบาๆ ฉลองการเปิดอ่านจดหมาย
    triggerFireworks();
}

/* สไลด์โชว์รูปภาพ */
let currentSlideIndex = 0;
function updateSliderPosition() {
    const track = document.getElementById('slides-track');
    const dots = document.getElementsByClassName('dot');
    track.style.transform = `translateX(-${currentSlideIndex * 20}%)`;
    for (let i = 0; i < dots.length; i++) { dots[i].classList.remove('active'); }
    dots[currentSlideIndex].classList.add('active');
}
function moveSlider(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex > 4) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = 4;
    updateSliderPosition();
}
function currentSlide(index) {
    currentSlideIndex = index;
    updateSliderPosition();
}

function finishReading1() {
    triggerFireworks();
    triggerHearts();
    setTimeout(() => { nextScene('scene-letter-1', 'scene-cake'); }, 600);
}

document.getElementById('candle-flame').addEventListener('click', function() {
    this.classList.add('extinguished');
    document.getElementById('cake-instruction').innerHTML = "เทียนดับแล้ว... อธิษฐานให้คุณสมปรารถนานะ 🎂✨";
    const finalBtn = document.getElementById('btn-final-letter');
    finalBtn.classList.remove('hidden');
});

function showFinalLetter() {
    nextScene('scene-cake', 'scene-letter-2');
    setTimeout(triggerFireworks, 200);
    setTimeout(triggerFireworks, 800);
}

function triggerFireworks() {
    var duration = 2.5 * 1000; var end = Date.now() + duration;
    (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: ['#ff8fab', '#fb6f92', '#ffe5ec', '#ffffff'] });
        confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: ['#ff8fab', '#fb6f92', '#ffe5ec', '#ffffff'] });
        if (Date.now() < end) { requestAnimationFrame(frame); }
    }());
}

function triggerHearts() {
    const container = document.getElementById('hearts-container');
    const heartTypes = ['❤️', '💖', '💝', '🌸', '✨'];
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart-particle');
            heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
            heart.style.fontSize = (Math.random() * 22 + 16) + 'px';
            container.appendChild(heart);
            heart.addEventListener('animationend', () => { heart.remove(); });
        }, i * 120); 
    }
}