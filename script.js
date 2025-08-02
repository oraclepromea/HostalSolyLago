// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple form validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Por favor, ingresa un email válido.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate
    const animateElements = document.querySelectorAll('.feature, .room-card, .amenity, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.alt = 'Imagen no disponible';
    });
});

// Back to top button (optional)
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2c5282;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Add click effect to buttons
document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
`;
document.head.appendChild(style);

// Restaurant Slideshow functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.restaurant-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-advance slideshow every 4 seconds
let slideshowInterval;

function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, 4000);
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (slides.length > 0) {
        showSlide(0);
        startSlideshow();
        
        // Pause slideshow on hover
        const slideshow = document.querySelector('.restaurant-slideshow');
        if (slideshow) {
            slideshow.addEventListener('mouseenter', stopSlideshow);
            slideshow.addEventListener('mouseleave', startSlideshow);
        }
    }
});

// Make currentSlide function globally available for onclick handlers
window.currentSlide = currentSlide;

// Language Translation System - FIXED VERSION
const translations = {
    es: {
        // Navigation
        'Home': 'Home',
        'Rooms': 'Habitaciones', 
        'Services': 'Servicios',
        'Gallery': 'Galería',
        'Contact': 'Contacto',
        
        // Hero Section
        'Your home in the heart of Copacabana': 'Tu hogar en el corazón de Copacabana',
        'Enjoy spectacular views of Lake Titicaca': 'Disfruta de vistas espectaculares del Lago Titicaca',
        'Book via WhatsApp': 'Reservar por WhatsApp',
        
        // About Section
        'Welcome to Sol y Lago': 'Bienvenidos a Sol y Lago',
        'Located in the picturesque city of Copacabana, Bolivia, our hostel offers a unique experience with stunning views of the majestic Lake Titicaca. Enjoy the tranquility and natural beauty while exploring one of the most mystical destinations in South America.': 'Ubicado en la pintoresca ciudad de Copacabana, Bolivia, nuestro hostal ofrece una experiencia única con vistas impresionantes del majestuoso Lago Titicaca. Disfruta de la tranquilidad y belleza natural mientras exploras uno de los destinos más místicos de América del Sur.',
        'Panoramic Views': 'Vistas Panorámicas',
        'Wake up every morning to spectacular views of Lake Titicaca': 'Despierta cada mañana con vistas espectaculares del Lago Titicaca',
        'Privileged Location': 'Ubicación Privilegiada',
        'Steps away from downtown Copacabana and its main attractions': 'A pasos del centro de Copacabana y sus principales atractivos',
        'Family Atmosphere': 'Ambiente Familiar',
        'Personalized attention in a warm and welcoming environment': 'Atención personalizada en un ambiente cálido y acogedor',
        
        // Rooms Section
        'Our Rooms': 'Nuestras Habitaciones',
        'Single Room': 'Habitación Individual',
        'Perfect for solo travelers seeking comfort and tranquility.': 'Perfecta para viajeros solos que buscan comodidad y tranquilidad.',
        'Comfortable single bed': 'Cama individual cómoda',
        'Private bathroom': 'Baño privado',
        'Lake view': 'Vista al lago',
        'Double Room': 'Habitación Doble',
        'Ideal for couples or friends traveling together.': 'Ideal para parejas o amigos que viajan juntos.',
        'Queen bed': 'Cama matrimonial',
        'Terrace with view': 'Terraza con vista',
        'Triple Room': 'Habitación Triple',
        'Spacious room for small groups or families seeking comfort.': 'Espaciosa habitación para grupos pequeños o familias que buscan confort.',
        'Three single beds': 'Tres camas individuales',
        'Large private bathroom': 'Baño privado amplio',
        'Seating area': 'Área de estar',
        
        // Amenities Section
        'Services & Amenities': 'Servicios y Comodidades',
        'Free WiFi': 'WiFi Gratuito',
        'High-speed internet in all areas': 'Internet de alta velocidad en todas las áreas',
        'Breakfast': 'Desayuno',
        'Continental breakfast included': 'Desayuno continental incluido',
        'Parking': 'Estacionamiento',
        'Free parking available': 'Estacionamiento gratuito disponible',
        '24h Reception': 'Recepción 24h',
        'Personalized attention 24 hours a day': 'Atención personalizada las 24 horas',
        'Luggage Storage': 'Guarda Equipaje',
        'Luggage storage service': 'Servicio de custodia de equipaje',
        'Tourist Information': 'Información Turística',
        'Advice on tours and activities': 'Asesoramiento sobre tours y actividades',
        'Hot Water': 'Agua Caliente',
        'Hot water available 24 hours': 'Agua caliente disponible las 24 horas',
        'Lake View': 'Vista al Lago',
        'Rooms with panoramic views of Titicaca': 'Habitaciones con vista panorámica al Titicaca',
        
        // Gallery Section
        'Photo Gallery': 'Galería de Fotos',
        'Discover the beauty of our hostel and surroundings': 'Descubre la belleza de nuestro hostal y sus alrededores',
        'Exterior View': 'Vista Exterior',
        'Common Area': 'Área Común',
        'Terrace': 'Terraza',
        'Reception': 'Recepción',
        'Hallways': 'Pasillos',
        
        // Restaurant Section
        'Sol y Lago Restaurant': 'Restaurante Sol y Lago',
        'Enjoy delicious Bolivian and international cuisine in our cozy restaurant with panoramic views of Lake Titicaca.': 'Disfruta de deliciosos platos de la gastronomía boliviana e internacional en nuestro acogedor restaurante con vista panorámica al Lago Titicaca.',
        'Bolivian & International Cuisine': 'Cocina Boliviana e Internacional',
        'Lake Trout Specialty': 'Especialidad en Trucha del Lago',
        'Homemade Breakfasts': 'Desayunos Caseros',
        'Panoramic View': 'Vista Panorámica',
        'Service Hours': 'Horarios de Atención',
        'Breakfast: 7:00 - 10:00': 'Desayuno: 7:00 - 10:00',
        'Lunch: 12:00 - 15:00': 'Almuerzo: 12:00 - 15:00',
        'Dinner: 18:00 - 21:00': 'Cena: 18:00 - 21:00',
        
        // Testimonials Section
        'What Our Guests Say': 'Lo que Dicen Nuestros Huéspedes',
        
        // Location Section
        'Our Location': 'Nuestra Ubicación',
        'In the Heart of Copacabana': 'En el Corazón de Copacabana',
        'Hostal Sol y Lago is strategically located in Copacabana, Bolivia, offering easy access to:': 'Hostal Sol y Lago se encuentra estratégicamente ubicado en Copacabana, Bolivia, ofreciendo fácil acceso a:',
        'Basilica of Copacabana (5 min walk)': 'Basílica de Copacabana (5 min caminando)',
        'Lake Titicaca Port (3 min walk)': 'Puerto del Lago Titicaca (3 min caminando)',
        'Calvario Hill (10 min walk)': 'Cerro Calvario (10 min caminando)',
        'Local restaurants and cafes': 'Restaurantes y cafés locales',
        'Craft markets': 'Mercados de artesanías',
        
        // Contact Section
        'Contact Us': 'Contáctanos',
        'Address': 'Dirección',
        'Email': 'Email',
        'Reception Hours': 'Horario de Recepción',
        '24 hours, every day': '24 horas, todos los días',
        'Contact Methods': 'Formas de Contacto',
        'Immediate response': 'Respuesta inmediata',
        'Detailed inquiries': 'Consultas detalladas',
        'Call': 'Llamar',
        'Direct attention': 'Atención directa',
        'Quick Information': 'Información Rápida',
        'Check-in: 2:00 PM': 'Check-in: 14:00 hrs',
        'Check-out: 11:00 AM': 'Check-out: 11:00 hrs',
        'Free WiFi': 'WiFi gratuito',
        'Breakfast included': 'Desayuno incluido',
        'Follow Us': 'Síguenos',
        
        // Footer
        'Your home in Copacabana, Bolivia. Enjoy the magic of Lake Titicaca in a warm and welcoming environment.': 'Tu hogar en Copacabana, Bolivia. Disfruta de la magia del Lago Titicaca en un ambiente cálido y acogedor.',
        'Quick Links': 'Enlaces Rápidos',
        'Information': 'Información',
        'All rights reserved.': 'Todos los derechos reservados.'
    },
    en: {
        // Navigation  
        'Home': 'Home',
        'Habitaciones': 'Rooms',
        'Servicios': 'Services', 
        'Galería': 'Gallery',
        'Contacto': 'Contact',
        
        // Hero Section
        'Tu hogar en el corazón de Copacabana': 'Your home in the heart of Copacabana',
        'Disfruta de vistas espectaculares del Lago Titicaca': 'Enjoy spectacular views of Lake Titicaca',
        'Reservar por WhatsApp': 'Book via WhatsApp',
        
        // About Section
        'Bienvenidos a Sol y Lago': 'Welcome to Sol y Lago',
        'Ubicado en la pintoresca ciudad de Copacabana, Bolivia, nuestro hostal ofrece una experiencia única con vistas impresionantes del majestuoso Lago Titicaca. Disfruta de la tranquilidad y belleza natural mientras exploras uno de los destinos más místicos de América del Sur.': 'Located in the picturesque city of Copacabana, Bolivia, our hostel offers a unique experience with stunning views of the majestic Lake Titicaca. Enjoy the tranquility and natural beauty while exploring one of the most mystical destinations in South America.',
        'Vistas Panorámicas': 'Panoramic Views',
        'Despierta cada mañana con vistas espectaculares del Lago Titicaca': 'Wake up every morning to spectacular views of Lake Titicaca',
        'Ubicación Privilegiada': 'Privileged Location',
        'A pasos del centro de Copacabana y sus principales atractivos': 'Steps away from downtown Copacabana and its main attractions',
        'Ambiente Familiar': 'Family Atmosphere',
        'Atención personalizada en un ambiente cálido y acogedor': 'Personalized attention in a warm and welcoming environment',
        
        // Rooms Section
        'Nuestras Habitaciones': 'Our Rooms',
        'Habitación Individual': 'Single Room',
        'Perfecta para viajeros solos que buscan comodidad y tranquilidad.': 'Perfect for solo travelers seeking comfort and tranquility.',
        'Cama individual cómoda': 'Comfortable single bed',
        'Baño privado': 'Private bathroom',
        'Vista al lago': 'Lake view',
        'Habitación Doble': 'Double Room',
        'Ideal para parejas o amigos que viajan juntos.': 'Ideal for couples or friends traveling together.',
        'Cama matrimonial': 'Queen bed',
        'Terraza con vista': 'Terrace with view',
        'Habitación Triple': 'Triple Room',
        'Espaciosa habitación para grupos pequeños o familias que buscan confort.': 'Spacious room for small groups or families seeking comfort.',
        'Tres camas individuales': 'Three single beds',
        'Baño privado amplio': 'Large private bathroom',
        'Área de estar': 'Seating area',
        
        // Amenities Section
        'Servicios y Comodidades': 'Services & Amenities',
        'WiFi Gratuito': 'Free WiFi',
        'Internet de alta velocidad en todas las áreas': 'High-speed internet in all areas',
        'Desayuno': 'Breakfast',
        'Desayuno continental incluido': 'Continental breakfast included',
        'Estacionamiento': 'Parking',
        'Estacionamiento gratuito disponible': 'Free parking available',
        'Recepción 24h': '24h Reception',
        'Atención personalizada las 24 horas': 'Personalized attention 24 hours a day',
        'Guarda Equipaje': 'Luggage Storage',
        'Servicio de custodia de equipaje': 'Luggage storage service',
        'Información Turística': 'Tourist Information',
        'Asesoramiento sobre tours y actividades': 'Advice on tours and activities',
        'Agua Caliente': 'Hot Water',
        'Agua caliente disponible las 24 horas': 'Hot water available 24 hours',
        'Vista al Lago': 'Lake View',
        'Habitaciones con vista panorámica al Titicaca': 'Rooms with panoramic views of Titicaca',
        
        // Gallery Section
        'Galería de Fotos': 'Photo Gallery',
        'Descubre la belleza de nuestro hostal y sus alrededores': 'Discover the beauty of our hostel and surroundings',
        'Vista Exterior': 'Exterior View',
        'Área Común': 'Common Area',
        'Terraza': 'Terrace',
        'Recepción': 'Reception',
        'Pasillos': 'Hallways',
        
        // Restaurant Section
        'Restaurante Sol y Lago': 'Sol y Lago Restaurant',
        'Disfruta de deliciosos platos de la gastronomía boliviana e internacional en nuestro acogedor restaurante con vista panorámica al Lago Titicaca.': 'Enjoy delicious Bolivian and international cuisine in our cozy restaurant with panoramic views of Lake Titicaca.',
        'Cocina Boliviana e Internacional': 'Bolivian & International Cuisine',
        'Especialidad en Trucha del Lago': 'Lake Trout Specialty',
        'Desayunos Caseros': 'Homemade Breakfasts',
        'Vista Panorámica': 'Panoramic View',
        'Horarios de Atención': 'Service Hours',
        'Desayuno: 7:00 - 10:00': 'Breakfast: 7:00 - 10:00',
        'Almuerzo: 12:00 - 15:00': 'Lunch: 12:00 - 15:00',
        'Cena: 18:00 - 21:00': 'Dinner: 18:00 - 21:00',
        
        // Testimonials Section
        'Lo que Dicen Nuestros Huéspedes': 'What Our Guests Say',
        
        // Location Section
        'Nuestra Ubicación': 'Our Location',
        'En el Corazón de Copacabana': 'In the Heart of Copacabana',
        'Hostal Sol y Lago se encuentra estratégicamente ubicado en Copacabana, Bolivia, ofreciendo fácil acceso a:': 'Hostal Sol y Lago is strategically located in Copacabana, Bolivia, offering easy access to:',
        'Basílica de Copacabana (5 min caminando)': 'Basilica of Copacabana (5 min walk)',
        'Puerto del Lago Titicaca (3 min caminando)': 'Lake Titicaca Port (3 min walk)',
        'Cerro Calvario (10 min caminando)': 'Calvario Hill (10 min walk)',
        'Restaurantes y cafés locales': 'Local restaurants and cafes',
        'Mercados de artesanías': 'Craft markets',
        
        // Contact Section
        'Contáctanos': 'Contact Us',
        'Dirección': 'Address',
        'Email': 'Email',
        'Horario de Recepción': 'Reception Hours',
        '24 horas, todos los días': '24 hours, every day',
        'Formas de Contacto': 'Contact Methods',
        'Respuesta inmediata': 'Immediate response',
        'Consultas detalladas': 'Detailed inquiries',
        'Llamar': 'Call',
        'Atención directa': 'Direct attention',
        'Información Rápida': 'Quick Information',
        'Check-in: 14:00 hrs': 'Check-in: 2:00 PM',
        'Check-out: 11:00 hrs': 'Check-out: 11:00 AM',
        'WiFi gratuito': 'Free WiFi',
        'Desayuno incluido': 'Breakfast included',
        'Síguenos': 'Follow Us',
        
        // Footer
        'Tu hogar en Copacabana, Bolivia. Disfruta de la magia del Lago Titicaca en un ambiente cálido y acogedor.': 'Your home in Copacabana, Bolivia. Enjoy the magic of Lake Titicaca in a warm and welcoming environment.',
        'Enlaces Rápidos': 'Quick Links',
        'Información': 'Information',
        'Todos los derechos reservados.': 'All rights reserved.'
    }
};

let currentLanguage = 'es';

// Enhanced language switching functionality
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all text elements
    updatePageContent(lang);
    
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
}

function updatePageContent(lang) {
    // Get all translatable elements
    const translatableElements = document.querySelectorAll('h1, h2, h3, h4, p, span:not(.flag), a:not([href*="tel:"]):not([href*="mailto:"]), li');
    
    translatableElements.forEach(element => {
        // Skip if element is inside a script tag or other non-content areas
        if (element.closest('script') || element.closest('style') || element.closest('.flag')) {
            return;
        }
        
        // Get the text content, trimmed
        const currentText = element.textContent.trim();
        
        // Skip empty elements or elements with only numbers/symbols
        if (!currentText || /^[\d\s\-\+\(\)]+$/.test(currentText)) {
            return;
        }
        
        // Handle WhatsApp links specially
        if (element.tagName === 'A' && element.href.includes('whatsapp')) {
            updateWhatsAppLink(element, lang, currentText);
            return;
        }
        
        // Look for translation
        if (translations[lang] && translations[lang][currentText]) {
            element.textContent = translations[lang][currentText];
        }
    });
    
    // Update meta tags
    updateMetaTags(lang);
}

function updateWhatsAppLink(element, lang, currentText) {
    // Update button text
    if (translations[lang] && translations[lang][currentText]) {
        element.textContent = translations[lang][currentText];
    }
    
    // Update WhatsApp message URL
    let href = element.href;
    
    if (lang === 'en') {
        href = href.replace(/Hola%2C%20me%20interesa/g, 'Hello%2C%20I%20am%20interested%20in')
                  .replace(/información%20sobre/g, 'information%20about')
                  .replace(/reservar%20una%20habitación/g, 'booking%20a%20room')
                  .replace(/hacer%20una%20reserva/g, 'making%20a%20reservation');
    } else {
        href = href.replace(/Hello%2C%20I%20am%20interested%20in/g, 'Hola%2C%20me%20interesa')
                  .replace(/information%20about/g, 'información%20sobre')
                  .replace(/booking%20a%20room/g, 'reservar%20una%20habitación')
                  .replace(/making%20a%20reservation/g, 'hacer%20una%20reserva');
    }
    
    element.href = href;
}

function updateMetaTags(lang) {
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    
    if (lang === 'en') {
        if (title) title.textContent = 'Hostal Sol y Lago - Copacabana, Bolivia | Lake Titicaca View';
        if (description) description.content = 'Hostal Sol y Lago in Copacabana, Bolivia. Rooms with Lake Titicaca view, breakfast included, free WiFi. Reservations via WhatsApp +591 73064877';
    } else {
        if (title) title.textContent = 'Hostal Sol y Lago - Copacabana, Bolivia | Vista al Lago Titicaca';
        if (description) description.content = 'Hostal Sol y Lago en Copacabana, Bolivia. Habitaciones con vista al Lago Titicaca, desayuno incluido, WiFi gratuito. Reservas por WhatsApp +591 73064877';
    }
}

// Initialize language toggle system
function initializeLanguageSystem() {
    // Add click listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLang = btn.dataset.lang;
            if (targetLang && targetLang !== currentLanguage) {
                switchLanguage(targetLang);
            }
        });
    });
    
    // Check for saved language preference or default to Spanish
    const savedLang = localStorage.getItem('preferredLanguage') || 'es';
    switchLanguage(savedLang);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for all content to load
    setTimeout(() => {
        initializeLanguageSystem();
    }, 100);
});