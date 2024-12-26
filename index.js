document.addEventListener("DOMContentLoaded", () => {
    const team = [
        { name: "Yadnesh Bamne", role: "Frontend" },
        { name: "Bharat Sharma", role: "Backend/Frontend" },
        { name: "Yash Baviskar", role: "Backend" },
        { name: "Anisha", role: "Frontend" },
    ];

    const cursor = document.querySelector(".cursor");
    const cursorIcon = cursor.querySelector("i");
    const modalImages = document.querySelectorAll(".modal-images .img");
    const infoName = document.querySelector(".info .name");
    const infoRole = document.querySelector(".info .role");
    let currentSlide = 1;

    const updateSlide = (index) => {
        modalImages.forEach((img, i) => {
            img.style.display = i === index - 1 ? "block" : "none";
        });

        infoName.textContent = team[index - 1].name;
        infoRole.textContent = team[index - 1].role;
    };

    updateSlide(currentSlide);

    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
        });
    });

    document.addEventListener("click", (e) => {
        const isRight = e.clientX > window.innerWidth / 2;

        if (isRight && currentSlide < team.length) {
            currentSlide++;
        } else if (!isRight && currentSlide > 1) {
            currentSlide--;
        }

        updateSlide(currentSlide);
    });

    // Lazy load images
    modalImages.forEach((img) => {
        img.style.backgroundImage = `url(${img.dataset.src})`;
    });
});
