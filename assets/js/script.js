$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // emailjs to mail contact form data
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Durga Prasad";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });

// typed js effect
var typed = new Typed(".typing-text", {
    strings: ["UI/XI Designer", "Java Programmer", "Machine Learning Enthusiast", "Web Developer", "Problem Solver"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

// Projects data and rendering
const projects = [
    {
        title: "Real-Time Urban Flood Mapping and Mitigation Using Cloud-Optimized GeoTIFFs (COGs)",
        description: "Developed a system for real-time urban flood mapping using Cloud-Optimized GeoTIFFs to aid in disaster mitigation.",
        image: "./assets/images/project-flood-mapping.jpg",
        tech: ["Python", "GeoTIFF", "AWS", "GIS"],
        github: "#",
        demo: "#",
        date: "2025-04-22"
    },
    {
        title: "Empowering Autocomplete and Spellchecking Through Unified Markov and N-gram",
        description: "Built an autocomplete and spellchecking system using Markov models and N-gram techniques for efficient text prediction.",
        image: "./assets/images/project-autocomplete.jpg",
        tech: ["Python", "NLP", "Markov Models", "N-gram"],
        github: "#",
        demo: "#",
        date: "2024-11-25"
    },
    {
        title: "Music Playlist Generator System Using Collaborative Filtering",
        description: "Created a music playlist generator leveraging collaborative filtering to recommend personalized playlists.",
        image: "./assets/images/project-playlist.jpg",
        tech: ["Python", "Pandas", "Scikit-learn", "Spotify API"],
        github: "#",
        demo: "#",
        date: "2024-11-19"
    },
    {
        title: "Handwritten Digits Classification with TensorFlow OCR",
        description: "Implemented a neural network using TensorFlow for classifying handwritten digits with optical character recognition.",
        image: "./assets/images/project-ocr.jpg",
        tech: ["Python", "TensorFlow", "Keras", "OpenCV"],
        github: "#",
        demo: "#",
        date: "2024-05-01"
    },
    {
        title: "Genetic Algorithm to Solve the 0-1 Knapsack Problem",
        description: "Applied genetic algorithms to optimize solutions for the 0-1 knapsack problem in computational optimization.",
        image: "./assets/images/project-knapsack.jpg",
        tech: ["Python", "NumPy", "Genetic Algorithms"],
        github: "#",
        demo: "#",
        date: "2024-04-21"
    },
    {
        title: "Movie Ticket Booking System",
        description: "Developed a web-based movie ticket booking system with user authentication and payment integration.",
        image: "./assets/images/project-ticket-booking.jpg",
        tech: ["HTML", "CSS", "JavaScript", "Node.js"],
        github: "#",
        demo: "#",
        date: "2022-12-09"
    }
];

// Sort projects by date in reverse chronological order
projects.sort((a, b) => new Date(b.date) - new Date(a.date));

const projectList = document.getElementById("project-list");

projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-img">
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(t => `<span>${t}</span>`).join("")}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank">GitHub</a>
                <a href="${project.demo}" target="_blank">Demo</a>
            </div>
        </div>
    `;
    projectList.appendChild(card);
});

const messages = [
    "Please wait...",
    "Hold tight, we're preparing something special!",
    "The magic is happening...",
    "Just a second, good things take time!",
    "Patience is a virtue! We're almost there!"
];

// Function to display loading messages
let messageIndex = 0;
function updateLoadingMessage() {
    const loaderText = document.getElementById('loaderText');
    loaderText.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length; // Loop through messages
}

// Update message every second
setInterval(updateLoadingMessage, 1000);

// Function to handle loader fade-out
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
    document.getElementById('main-content').style.display = 'block';
}

function fadeOut() {
    setTimeout(loader, 6400); // Loader stays for 5 seconds
}

// Start the loading process on window load
window.onload = fadeOut;

// Disable right-click
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Disable F12 and Ctrl+Shift+I (Developer tools)
document.addEventListener('keydown', function (e) {
    // Disable F12
    if (e.key === "F12") {
        e.preventDefault();
    }
    // Disable Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
    }
});

// Detect if developer tools are open
(function () {
    let element = new Image();
    Object.defineProperty(element, 'id', {
        get: function () {
            window.location.href = "about:blank"; // Redirect or close the window
        }
    });
    console.log(element);
})();

document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .youtube', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });

/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.projects-grid .project-card', { interval: 200 });

/* SCROLL CERTIFICATES */
srtop.reveal('.certificates-grid .certificate-card', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

srtop.reveal('.research-grid .research-card', { interval: 200 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

// Search Filter
const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.research-card');
const noResults = document.getElementById('no-results');
const chips = document.querySelectorAll('.chip');

function searchPapers() {
    const searchValue = searchInput.value.toLowerCase();
    let matchFound = false;

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchValue)) {
            card.style.display = 'block';
            matchFound = true;
        } else {
            card.style.display = 'none';
        }
    });

    noResults.style.display = matchFound ? 'none' : 'block';
}

// Chip Filter
chips.forEach(chip => {
    chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const filter = chip.getAttribute('data-filter').toLowerCase();
        let matchFound = false;

        cards.forEach(card => {
            const tags = card.getAttribute('data-tags').toLowerCase();
            if (filter === 'all' || tags.includes(filter)) {
                card.style.display = 'block';
                matchFound = true;
            } else {
                card.style.display = 'none';
            }
        });

        noResults.style.display = matchFound ? 'none' : 'block';
    });
});

// Achievements & Awards Carousel
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.achievement-card').length;
const carousel = document.getElementById('achievementsCarousel');
const dotsContainer = document.getElementById('carouselDots');

// Function to create the dots dynamically
function createDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (i === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => navigateToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Function to move the carousel to the next slide
function moveSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
    updateDots();
}

// Function to move the carousel to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
    updateDots();
}

// Function to update the carousel position
function updateCarousel() {
    const slideWidth = document.querySelector('.achievement-card').offsetWidth;
    carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Function to update the active dot
function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
            dot.classList.remove('inactive');
        } else {
            dot.classList.add('inactive');
            dot.classList.remove('active');
        }
    });
}

// Function to navigate to a specific slide
function navigateToSlide(index) {
    currentSlide = index;
    updateCarousel();
    updateDots();
}

// Auto-scroll the carousel every 3 seconds
setInterval(moveSlide, 3000);

// Initialize the dots and set up the carousel
createDots();