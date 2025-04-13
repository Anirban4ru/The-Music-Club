document.addEventListener('DOMContentLoaded', function() {
    // Navigation Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking a nav link on mobile
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Modal Functionality
    const modal = document.getElementById('modal');
    const adminLogin = document.getElementById('adminLogin');
    const closeButton = document.querySelector('.close-button');
    
    adminLogin.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
    
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submissions with validation and notifications
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    function showNotification(message, isSuccess = true) {
        const notification = document.getElementById('notification');
        const notificationMessage = document.getElementById('notification-message');
        
        notification.classList.remove('success', 'error');
        notification.classList.add(isSuccess ? 'success' : 'error');
        notificationMessage.textContent = message;
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', false);
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', false);
                return;
            }
            
            // Simulate form submission
            showNotification('Your message has been sent! We\'ll get back to you soon.');
            contactForm.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value.trim();
            
            if (!email) {
                showNotification('Please enter your email address', false);
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', false);
                return;
            }
            
            showNotification('Thanks for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
    
    // Admin login form
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (!username || !password) {
                showNotification('Please enter both username and password', false);
                return;
            }
            
            // Demo admin login (replace with actual authentication in production)
            if (username === 'admin' && password === 'admin123') {
                showNotification('Login successful!');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    document.getElementById('adminSection').style.display = 'block';
                }, 1000);
            } else {
                showNotification('Invalid username or password', false);
            }
        });
    }
    
    // Event registration
    const registerButtons = document.querySelectorAll('[id="registerEvent"]');
    
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const eventName = this.getAttribute('data-event');
            
            // Open registration modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Change modal content for event registration
            document.getElementById('modal-title').textContent = `Register for ${eventName}`;
            document.getElementById('modal-body').innerHTML = `
                <form id="eventRegistrationForm">
                    <div class="form-group">
                        <label for="regName">Full Name</label>
                        <input type="text" id="regName" required>
                    </div>
                    <div class="form-group">
                        <label for="regEmail">Email</label>
                        <input type="email" id="regEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="regPhone">Phone Number</label>
                        <input type="tel" id="regPhone" required>
                    </div>
                    <div class="form-group">
                        <label for="regInstrument">Instrument/Vocal Range (Optional)</label>
                        <input type="text" id="regInstrument">
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>
            `;
            
            // Event registration form submission
            const eventRegistrationForm = document.getElementById('eventRegistrationForm');
            
            eventRegistrationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                showNotification(`You have successfully registered for ${eventName}!`);
                
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 1500);
            });
        });
    });
    
    // Add event form (for admin)
    const addEventForm = document.getElementById('addEventForm');
    
    if (addEventForm) {
        addEventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const eventName = document.getElementById('eventName').value.trim();
            const eventDate = document.getElementById('eventDate').value;
            const eventTime = document.getElementById('eventTime').value;
            const eventLocation = document.getElementById('eventLocation').value.trim();
            const eventDescription = document.getElementById('eventDescription').value.trim();
            
            if (!eventName || !eventDate || !eventTime || !eventLocation || !eventDescription) {
                showNotification('Please fill in all event details', false);
                return;
            }
            
            // Create new event element (demo only)
            showNotification(`Event "${eventName}" has been added successfully!`);
            addEventForm.reset();
            
            // Convert date to day and month
            const date = new Date(eventDate);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
            
            // Add the new event to the page
            const newEvent = document.createElement('div');
            newEvent.className = 'event';
            newEvent.innerHTML = `
                <div class="event-date">
                    <span class="day">${day}</span>
                    <span class="month">${month}</span>
                </div>
                <div class="event-details">
                    <h3>${eventName}</h3>
                    <p class="event-meta"><i class="fas fa-map-marker-alt"></i> ${eventLocation} | <i class="fas fa-clock"></i> ${eventTime}</p>
                    <p class="event-description">${eventDescription}</p>
                    <a href="#" class="btn btn-small" id="registerEvent" data-event="${eventName}">Register Now</a>
                </div>
            `;
            
            document.querySelector('.event-container').appendChild(newEvent);
            
            // Add event listener to the new register button
            newEvent.querySelector('[id="registerEvent"]').addEventListener('click', function(e) {
                e.preventDefault();
                
                const eventName = this.getAttribute('data-event');
                
                // Open registration modal
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Change modal content for event registration
                document.getElementById('modal-title').textContent = `Register for ${eventName}`;
                document.getElementById('modal-body').innerHTML = `
                    <form id="eventRegistrationForm">
                        <div class="form-group">
                            <label for="regName">Full Name</label>
                            <input type="text" id="regName" required>
                        </div>
                        <div class="form-group">
                            <label for="regEmail">Email</label>
                            <input type="email" id="regEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="regPhone">Phone Number</label>
                            <input type="tel" id="regPhone" required>
                        </div>
                        <div class="form-group">
                            <label for="regInstrument">Instrument/Vocal Range (Optional)</label>
                            <input type="text" id="regInstrument">
                        </div>
                        <button type="submit" class="btn btn-primary">Register</button>
                    </form>
                `;
                
                // Event registration form submission
                const eventRegistrationForm = document.getElementById('eventRegistrationForm');
                
                eventRegistrationForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    showNotification(`You have successfully registered for ${eventName}!`);
                    
                    setTimeout(() => {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 1500);
                });
            });
        });
    }
    
    // Image slider for gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;
    
    function showFullscreenImage(index) {
        const imageUrl = galleryItems[index].querySelector('img').src;
        const caption = galleryItems[index].querySelector('.gallery-overlay p').textContent;
        
        // Create fullscreen modal
        const fullscreenModal = document.createElement('div');
        fullscreenModal.className = 'fullscreen-modal';
        fullscreenModal.innerHTML = `
            <div class="fullscreen-content">
                <span class="fullscreen-close">&times;</span>
                <img src="${imageUrl}" alt="${caption}">
                <div class="image-caption">${caption}</div>
                <div class="navigation">
                    <button class="nav-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
                    <button class="nav-btn next-btn"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        `;
        
        document.body.appendChild(fullscreenModal);
        document.body.style.overflow = 'hidden';
        
        // Navigate between images
        const prevBtn = fullscreenModal.querySelector('.prev-btn');
        const nextBtn = fullscreenModal.querySelector('.next-btn');
        
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            updateFullscreenImage();
        });
        
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
            updateFullscreenImage();
        });
        
        // Close fullscreen view
        const closeBtn = fullscreenModal.querySelector('.fullscreen-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(fullscreenModal);
            document.body.style.overflow = 'auto';
        });
        
        fullscreenModal.addEventListener('click', (e) => {
            if (e.target === fullscreenModal) {
                document.body.removeChild(fullscreenModal);
                document.body.style.overflow = 'auto';
            }
        });
        
        // Update image in fullscreen view
        function updateFullscreenImage() {
            const newImageUrl = galleryItems[currentImageIndex].querySelector('img').src;
            const newCaption = galleryItems[currentImageIndex].querySelector('.gallery-overlay p').textContent;
            
            fullscreenModal.querySelector('img').src = newImageUrl;
            fullscreenModal.querySelector('.image-caption').textContent = newCaption;
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
                updateFullscreenImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
                updateFullscreenImage();
            } else if (e.key === 'Escape') {
                document.body.removeChild(fullscreenModal);
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Add click event to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            showFullscreenImage(index);
        });
    });
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    
    function animateSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateSections);
    animateSections(); // Initial check
    
    // Upcoming events countdown
    function updateEventCountdowns() {
        const events = [
            { date: new Date('2025-03-15T18:00:00'), name: 'Spring Music Festival 2025' },
            { date: new Date('2025-03-22T15:00:00'), name: 'Guitar Masterclass Workshop' },
            { date: new Date('2025-03-29T19:00:00'), name: 'Open Mic Night' }
        ];
        
        // Create countdown elements if they don't exist
        if (!document.querySelector('.event-countdown')) {
            const eventElements = document.querySelectorAll('.event-details');
            
            eventElements.forEach((element, index) => {
                if (index < events.length) {
                    const countdownDiv = document.createElement('div');
                    countdownDiv.className = 'event-countdown';
                    countdownDiv.dataset.eventIndex = index;
                    element.appendChild(countdownDiv);
                }
            });
        }
        
        // Update all countdowns
        const countdowns = document.querySelectorAll('.event-countdown');
        const now = new Date();
        
        countdowns.forEach(countdown => {
            const eventIndex = parseInt(countdown.dataset.eventIndex);
            const event = events[eventIndex];
            
            if (event && event.date > now) {
                const timeRemaining = event.date - now;
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                
                countdown.innerHTML = `
                    <div class="countdown-title">Event starts in:</div>
                    <div class="countdown-timer">
                        <div class="countdown-unit">
                            <span class="countdown-value">${days}</span>
                            <span class="countdown-label">Days</span>
                        </div>
                        <div class="countdown-unit">
                            <span class="countdown-value">${hours}</span>
                            <span class="countdown-label">Hours</span>
                        </div>
                        <div class="countdown-unit">
                            <span class="countdown-value">${minutes}</span>
                            <span class="countdown-label">Mins</span>
                        </div>
                        <div class="countdown-unit">
                            <span class="countdown-value">${seconds}</span>
                            <span class="countdown-label">Secs</span>
                        </div>
                    </div>
                `;
            } else {
                countdown.innerHTML = '<div class="event-live">Event in progress or completed</div>';
            }
        });
    }
    
    // Update countdowns every second
    setInterval(updateEventCountdowns, 1000);
    updateEventCountdowns(); // Initial update
    
    // Testimonials slider
    if (document.querySelector('.testimonials')) {
        let testimonialIndex = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        const totalTestimonials = testimonials.length;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            testimonials[index].style.display = 'block';
            
            // Update indicators
            const indicators = document.querySelectorAll('.testimonial-indicator');
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
        }
        
        function nextTestimonial() {
            testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
            showTestimonial(testimonialIndex);
        }
        
        function prevTestimonial() {
            testimonialIndex = (testimonialIndex - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(testimonialIndex);
        }
        
        // Create indicators
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'testimonial-indicators';
        
        for (let i = 0; i < totalTestimonials; i++) {
            const indicator = document.createElement('span');
            indicator.className = 'testimonial-indicator';
            indicator.addEventListener('click', () => {
                testimonialIndex = i;
                showTestimonial(testimonialIndex);
            });
            indicatorsContainer.appendChild(indicator);
        }
        
        document.querySelector('.testimonials').appendChild(indicatorsContainer);
        
        // Create navigation buttons
        const prevButton = document.createElement('button');
        prevButton.className = 'testimonial-nav prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.addEventListener('click', prevTestimonial);
        
        const nextButton = document.createElement('button');
        nextButton.className = 'testimonial-nav next';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.addEventListener('click', nextTestimonial);
        
        document.querySelector('.testimonials').appendChild(prevButton);
        document.querySelector('.testimonials').appendChild(nextButton);
        
        // Auto-rotate testimonials
        setInterval(nextTestimonial, 5000);
        
        // Show the first testimonial
        showTestimonial(testimonialIndex);
    }
});
// Background music functionality
document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = musicToggle.querySelector('i');
    
    // Function to play music
    function playMusic() {
      backgroundMusic.play().then(() => {
        musicIcon.className = 'fas fa-volume-up';
      }).catch(error => {
        // Auto-play was prevented by browser
        console.log("Autoplay prevented:", error);
        musicIcon.className = 'fas fa-volume-mute';
      });
    }
    
    // Function to toggle music
    function toggleMusic() {
      if (backgroundMusic.paused) {
        playMusic();
      } else {
        backgroundMusic.pause();
        musicIcon.className = 'fas fa-volume-mute';
      }
    }
    
    // Set up click event for music toggle button
    musicToggle.addEventListener('click', toggleMusic);
    
    // Attempt to play music when user interacts with the page
    document.body.addEventListener('click', function() {
      if (backgroundMusic.paused) {
        playMusic();
      }
    }, { once: true });
  });