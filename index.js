const team = [
    { name: "Yadnesh Bamne", role: "frontend" },
    { name: "Bharat Sharma", role: "Backend/Frontend" },
    { name: "Anisha", role: "frontend" },
    { name: "Yash Baviskar", role: "Backend" },
    { name: "Aditya Singh", role: "Volunteer" },
    { name: "Lucky Sharma", role: "Volunteer" },
];

const cursor = document.querySelector('.cursor');
const cursorIcon = document.querySelector('i');

if (!cursor || !cursorIcon) {
    console.error('Cursor or cursorIcon element is missing.');
}

const cursorWidth = cursor ? cursor.getBoundingClientRect().width / 2 : 0;
const cursorHeight = cursor ? cursor.getBoundingClientRect().height / 2 : 0;

let currentSlide = 1;
const totalSlides = team.length;

const updateCursorClass = (xPosition) => {
    const halfPageWidth = window.innerWidth / 2;
    if (xPosition > halfPageWidth) {
        if (currentSlide < totalSlides) {
            cursorIcon.classList.remove('ph-arrow-left');
            cursorIcon.classList.add('ph-arrow-right');
            cursor.style.display = '';
        } else {
            cursor.style.display = 'none';
        }
    } else {
        if (currentSlide > 1) {
            cursorIcon.classList.remove('ph-arrow-right');
            cursorIcon.classList.add('ph-arrow-left');
            cursor.style.display = '';
        } else {
            cursor.style.display = 'none';
        }
    }
};

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - cursorWidth,
        y: e.clientY - cursorHeight,
        duration: 0.3,
        ease: "power3.out",
    });
    updateCursorClass(e.clientX);
});

const updateInfo = (slideNumber) => {
    const member = team[slideNumber - 1];
    document.querySelector('.info .name').textContent = member.name;
    document.querySelector('.info .role').textContent = member.role;
};

const animateSlide = (slideNumber, reveal) => {
    const marquee = document.querySelector(`.t-${slideNumber}.marquee-wrapper`);
    const img = document.getElementById(`t-${slideNumber}`);
    if (!marquee || !img) {
        console.error(`Slide ${slideNumber} elements not found.`);
        return;
    }
    const clipPathValue = reveal
        ? 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)'
        : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';

    gsap.to(marquee, { clipPath: clipPathValue, duration: 2, ease: "power4.out", delay: 0.3 });
    gsap.to(img, { clipPath: clipPathValue, duration: 1, ease: "power4.out" });
};

updateInfo(currentSlide);

const handleRightClick = () => {
    if (currentSlide < totalSlides) {
        animateSlide(currentSlide + 1, true);
        currentSlide++;
        updateInfo(currentSlide);
    }
};

const handleLeftClick = () => {
    if (currentSlide > 1) {
        animateSlide(currentSlide, false);
        currentSlide--;
        updateInfo(currentSlide);
    }
};

document.addEventListener('click', (e) => {
    const halfPageWidth = window.innerWidth / 2;
    if (e.clientX > halfPageWidth) {
        handleRightClick();
    } else {
        handleLeftClick();
    }
});
const scroll = new LocomotiveScroll({
    el: document.querySelector('#container'),
    smooth: true
  });
  