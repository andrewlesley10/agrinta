document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Apply reveal to sections and bento cards
    document.querySelectorAll('section, .bento-card, .title-medium, .title-large').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Magnetic Button Effect (Basic implementation for CTA)
    const magneticBtns = document.querySelectorAll('.btn-primary');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });


    // AJAX Form Submission
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Loading State
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span><i class="fa-solid fa-spinner fa-spin" style="margin-left: 0.75rem;"></i>';
            submitBtn.style.opacity = '0.7';

            // Hide previous response
            formResponse.style.display = 'none';
            formResponse.className = ''; // Reset classes

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                formResponse.style.display = 'block';
                formResponse.textContent = result.message;

                if (result.success) {
                    formResponse.classList.add('success-message');
                    contactForm.reset();
                } else {
                    formResponse.classList.add('error-message');
                }
            } catch (error) {
                formResponse.style.display = 'block';
                formResponse.textContent = 'Oops! Something went wrong. Please try again later.';
                formResponse.classList.add('error-message');
            } finally {
                // Restore Button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.opacity = '1';

                // Scroll to response message for better mobile experience
                formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});
