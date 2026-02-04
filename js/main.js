// Custom Cursor with Two Dots
const cursorDot = document.querySelector('.cursor-dot');
const cursorFollower = document.querySelector('.cursor-follower');

// Only initialize cursor on desktop
if (window.innerWidth > 768) {
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  // Update main dot position immediately
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth follower animation
  function animateFollower() {
    const speed = 0.15; // Adjust speed of following effect
    
    followerX += (mouseX - followerX) * speed;
    followerY += (mouseY - followerY) * speed;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
  }
  
  animateFollower();

  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .skill-item, .card, input, textarea, .theme-label, .menu-btn, nav a, .btn, .project-link');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hover');
      cursorFollower.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hover');
      cursorFollower.classList.remove('hover');
    });
    
    // Ensure cursor works for clicks
    element.addEventListener('click', (e) => {
      // Add click animation
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.9)';
      
      setTimeout(() => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.3)';
      }, 100);
      
      setTimeout(() => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 200);
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorFollower.style.opacity = '1';
  });
}

// Mobile Menu Toggle
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.style.display =
    navMenu.style.display === "flex" ? "none" : "flex";
});

// Close menu after click (mobile UX) - Only for mobile devices
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    // Only close mobile menu on mobile devices
    if (window.innerWidth <= 768) {
      navMenu.style.display = "none";
    }
  });
});

// Theme Toggle Functionality
const themeSwitch = document.getElementById('themeSwitch');
const html = document.documentElement;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  html.setAttribute('data-theme', currentTheme);
  themeSwitch.checked = currentTheme === 'dark';
}

// Theme switch event listener
themeSwitch.addEventListener('change', function() {
  if (this.checked) {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScrollY = window.scrollY;
});

// Intersection Observer for section animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Smooth scroll for navigation links - Fixed desktop navigation issue
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      // Close mobile menu if it's open (only affects mobile)
      if (window.innerWidth <= 768) {
        navMenu.style.display = "none";
      }
      
      // Add visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
      
      // Smooth scroll to target with offset for fixed navbar
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add typing effect to hero section
const heroTitle = document.querySelector('.hero h1 span');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  let index = 0;
  
  function typeWriter() {
    if (index < text.length) {
      heroTitle.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 200);
    }
  }
  
  // Start typing after page load
  setTimeout(typeWriter, 1000);
}

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email', 'error');
      return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully!', 'success');
    this.reset();
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    ${type === 'success' ? 'background: #48bb78;' : 'background: #f56565;'}
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add hover effect to project cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Skills section animations
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillItems = entry.target.querySelectorAll('.skill-item');
      skillItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate');
        }, index * 100);
      });
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe skills grid
document.querySelectorAll('.skills-grid').forEach(grid => {
  skillsObserver.observe(grid);
});

// Skill level bar animation
const skillLevelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const levelBar = entry.target.querySelector('.level-bar');
      if (levelBar) {
        const level = levelBar.style.getPropertyValue('--level');
        levelBar.style.width = '0%';
        setTimeout(() => {
          levelBar.style.width = level;
        }, 300);
      }
    }
  });
}, {
  threshold: 0.5
});

// Observe all skill items for level bar animation
document.querySelectorAll('.skill-item').forEach(item => {
  skillLevelObserver.observe(item);
});

// Add interactive skill filtering (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
  // Add ripple effect to skill items
  document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('click', function(e) {
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
        background: rgba(102, 126, 234, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 0;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add CSS for ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});
