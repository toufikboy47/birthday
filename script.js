// Romantic Birthday Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initFloatingHearts();
    initBalloons();
    initGiftCards();
    initConfetti();
    
    // Prevent unwanted scroll on mobile
    document.body.addEventListener('touchmove', function(e) {
        if (e.target.closest('.wishes-overlay')) {
            const wishesContent = document.querySelector('.wishes-content');
            if (wishesContent && !e.target.closest('.wishes-content')) {
                e.preventDefault();
            }
        }
    }, { passive: false });
});

/* ============================================
   FLOATING HEARTS ANIMATION
   ============================================ */
function initFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💕', '💗', '💖', '💓', '💝', '💘'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.animationDelay = Math.random() * 3 + 's';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }
    
    // Create initial hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 400);
    }
    
    // Keep creating hearts
    setInterval(createHeart, 600);
}

/* ============================================
   BALLOONS ANIMATION
   ============================================ */
function initBalloons() {
    const container = document.getElementById('balloonsContainer');
    const balloons = ['🎈', '🎈', '🎈', '🎈', '🎈'];
    
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.textContent = balloons[Math.floor(Math.random() * balloons.length)];
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.fontSize = (Math.random() * 30 + 30) + 'px';
        balloon.style.animationDuration = (Math.random() * 5 + 12) + 's';
        balloon.style.animationDelay = Math.random() * 5 + 's';
        balloon.style.filter = 'hue-rotate(' + (Math.random() * 30) + 'deg)';
        
        container.appendChild(balloon);
        
        setTimeout(() => {
            balloon.remove();
        }, 20000);
    }
    
    // Create initial balloons
    for (let i = 0; i < 8; i++) {
        setTimeout(createBalloon, i * 800);
    }
    
    // Keep creating balloons
    setInterval(createBalloon, 2000);
}

/* ============================================
   CONFETTI ANIMATION
   ============================================ */
function initConfetti() {
    const container = document.getElementById('confettiContainer');
    const confettiEmojis = ['🎊', '🎉', '✨', '⭐', '💫', '🎂', '🎈', '❤️'];
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.fontSize = (Math.random() * 15 + 10) + 'px';
        confetti.style.animationDuration = (Math.random() * 3 + 4) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 8000);
    }
    
    // Initial confetti burst
    setTimeout(function() {
        for (let i = 0; i < 30; i++) {
            setTimeout(createConfetti, i * 100);
        }
    }, 1000);
    
    // Keep creating confetti occasionally
    setInterval(createConfetti, 3000);
}

/* ============================================
   GIFT CARDS INTERACTION
   ============================================ */
function initGiftCards() {
    const giftCards = document.querySelectorAll('.gift-card');
    const finalSurprise = document.getElementById('finalSurprise');
    const wishesOverlay = document.getElementById('wishesOverlay');
    const wishesClose = document.getElementById('wishesClose');
    let openedCards = 0;
    const totalCards = giftCards.length;

    // Close wishes overlay
    wishesClose.addEventListener('click', function() {
        wishesOverlay.classList.remove('show');
    });

    giftCards.forEach(function(card, index) {
        card.addEventListener('click', function() {
            if (this.classList.contains('flipped')) return;
            
            // Flip the card
            this.classList.add('flipped');
            openedCards++;
            
            // Update progress hearts
            updateProgressHearts(openedCards);
            
            // Create celebration hearts
            createCelebrationHearts(this);
            
            // Create click feedback
            createClickFeedback(this);
            
            // Animate the card
            this.classList.add('celebrating');
            setTimeout(function() {
                this.classList.remove('celebrating');
            }.bind(this), 500);
            
            // Check if all cards are opened
            if (openedCards === totalCards) {
                setTimeout(function() {
                    showFinalSurprise();
                }, 1500);
            }
        });
        
        // Add hover animations
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'scale(1.03)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
}

// Update progress hearts
function updateProgressHearts(openedCount) {
    const progressHearts = document.getElementById('progressHearts');
    if (progressHearts) {
        const hearts = progressHearts.querySelectorAll('span');
        hearts.forEach(function(heart, index) {
            if (index < openedCount) {
                heart.style.opacity = '1';
            } else {
                heart.style.opacity = '0.3';
            }
        });
    }
}

function createCelebrationHearts(element) {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💕', '💗', '💖', '💓', '💝'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(function() {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = (Math.random() * 100) + '%';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            
            container.appendChild(heart);
            
            setTimeout(function() {
                heart.remove();
            }, 8000);
        }, i * 80);
    }
}

function createClickFeedback(element) {
    const rect = element.getBoundingClientRect();
    const feedback = document.createElement('div');
    feedback.className = 'click-feedback';
    feedback.textContent = '💖';
    feedback.style.left = (rect.left + rect.width / 2 - 20) + 'px';
    feedback.style.top = (rect.top + rect.height / 2 - 20) + 'px';
    
    document.body.appendChild(feedback);
    
    setTimeout(function() {
        feedback.remove();
    }, 600);
}

/* ============================================
   FINAL SURPRISE REVEAL
   ============================================ */
function showFinalSurprise() {
    const finalSurprise = document.getElementById('finalSurprise');
    
    // Trigger massive confetti burst
    for (let i = 0; i < 50; i++) {
        setTimeout(function() {
            const container = document.getElementById('confettiContainer');
            const confettiEmojis = ['🎊', '🎉', '✨', '⭐', '💫', '🎂', '🎈', '❤️'];
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
            
            container.appendChild(confetti);
            
            setTimeout(function() {
                confetti.remove();
            }, 6000);
        }, i * 50);
    }
    
    // Show final surprise section
    setTimeout(function() {
        finalSurprise.classList.add('show');
    }, 500);
    
    // Show wishes overlay after final surprise
    setTimeout(function() {
        const wishesOverlay = document.getElementById('wishesOverlay');
        if (wishesOverlay) {
            wishesOverlay.classList.add('show');
        }
    }, 3000);
    
    // Create final hearts
    createFinalHearts();
}

function createFinalHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💕', '💗', '💖', '💓', '💝', '💘'];
    
    // Continuous heart burst
    setInterval(function() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 35 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        container.appendChild(heart);
        
        setTimeout(function() {
            heart.remove();
        }, 10000);
    }, 300);
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.gifts-section').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* ============================================
   INITIAL CELEBRATION
   ============================================ */
window.addEventListener('load', function() {
    // Initial celebration after page loads
    setTimeout(function() {
        const container = document.getElementById('heartsContainer');
        const hearts = ['💕', '💗', '💖', '💓'];
        
        for (let i = 0; i < 10; i++) {
            setTimeout(function() {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = (20 + i * 8) + '%';
                heart.style.animationDelay = '0s';
                heart.style.fontSize = '25px';
                
                container.appendChild(heart);
                
                setTimeout(function() {
                    heart.remove();
                }, 10000);
            }, i * 200);
        }
    }, 1500);
});
