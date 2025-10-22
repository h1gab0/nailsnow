import React, { useEffect, useState, useRef } from 'react';
import Typed from 'typed.js';
import * as echarts from 'echarts';
import anime from 'animejs';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { GoogleLogin } from '@react-oauth/google';
import './LandingPage.css';

import Hero from './components/Hero';
import Features from './components/Features';
import Demo from './components/Demo';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Video from './components/Video';


const LandingPage = () => {
  const typedElement = useRef(null);
  const particlesContainer = useRef(null);
  const revenueChart = useRef(null);
  const testimonialsSlider = useRef(null);
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  // State for booking demo
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
    // Here you would typically send the token to your backend to verify and create a session
  };

  const handleGoogleError = () => {
    console.log('Google Login Failed');
  };

  // Smooth scrolling for navigation links
  const handleNavClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(e.currentTarget.getAttribute('href'));
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    setMobileMenuOpen(false);
  };

  // Scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Typed text animation
  useEffect(() => {
    if (!typedElement.current) return;
    const options = {
      strings: ['Belleza', 'Negocio', 'Éxito', 'Futuro'],
      typeSpeed: 80,
      backSpeed: 60,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    };
    const typed = new Typed(typedElement.current, options);
    return () => typed.destroy();
  }, []);

  // Particle system
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = particlesContainer.current;
    if (!container) return;
    container.appendChild(canvas);
    let particles = [];
    let animationId;
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '#E8B4B8' : '#A8B5A0',
    });
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
      }
    };
    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animationId = requestAnimationFrame(updateParticles);
    };
    resizeCanvas();
    initParticles();
    updateParticles();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      if(container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  // Revenue chart
  useEffect(() => {
    if (!revenueChart.current) return;
    const chart = echarts.init(revenueChart.current);
    const option = {
        tooltip: { trigger: 'axis', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#E8B4B8', textStyle: { color: '#2C2C2C' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], axisLine: { lineStyle: { color: '#A8B5A0' } }, axisLabel: { color: '#6B6B6B' } },
        yAxis: { type: 'value', axisLine: { lineStyle: { color: '#A8B5A0' } }, axisLabel: { color: '#6B6B6B', formatter: '${value}k' }, splitLine: { lineStyle: { color: '#F0F0F0' } } },
        series: [{ name: 'Ingresos', type: 'line', smooth: true, data: [18, 22, 25, 28, 31, 35], lineStyle: { color: '#E8B4B8', width: 3 }, itemStyle: { color: '#E8B4B8' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(232, 180, 184, 0.3)' }, { offset: 1, color: 'rgba(232, 180, 184, 0.05)' }] } } }]
    };
    chart.setOption(option);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chart.resize();
                setTimeout(() => chart.setOption({ animation: true, animationDuration: 1000, animationEasing: 'cubicOut' }), 500);
            }
        });
    });
    observer.observe(revenueChart.current);
    window.addEventListener('resize', () => chart.resize());
    return () => {
        chart.dispose();
        observer.disconnect();
    };
  }, []);

    // Pricing toggle animation
    useEffect(() => {
        anime({
            targets: ['#free-price', '#premium-price'],
            scale: [1, 1.1, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    }, [isAnnualBilling]);


  // Testimonials slider
  useEffect(() => {
    if (!testimonialsSlider.current) return;
    const splide = new Splide(testimonialsSlider.current, { type: 'loop', perPage: 1, autoplay: true, interval: 5000, pauseOnHover: true, arrows: false, pagination: true, gap: '2rem' });
    splide.mount();
    return () => splide.destroy();
  }, []);

  const getServiceName = (service) => {
    const names = {
        'manicura': 'Manicura Clásica',
        'pedicura': 'Pedicura Completa',
        'acrilicas': 'Uñas Acrílicas'
    };
    return names[service] || service;
  }

  const getServicePrice = (service) => {
    const prices = {
      'manicura': 150,
      'pedicura': 200,
      'acrilicas': 400
    }
    return prices[service] || 0;
  }

  const handleBookAppointment = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedService(null);
      setSelectedDate(null);
      setSelectedTime(null);
    }, 5000);
  }

  return (
    <div>
      {/* Navigation */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-display text-2xl font-medium text-deep-charcoal">
            Nails <span className="text-soft-rose">Now</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" onClick={handleNavClick} className="transition-colors">Características</a>
            <a href="#demo" onClick={handleNavClick} className="transition-colors">Demo</a>
            <a href="#pricing" onClick={handleNavClick} className="transition-colors">Planes</a>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
            <button onClick={toggleDarkMode} className="p-2 rounded-full focus:outline-none">
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <button className="md:hidden p-2" id="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 translate-x-0">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <div className="font-display text-2xl font-medium">Nails <span className="text-soft-rose">Now</span></div>
                        <button id="close-menu" className="p-2" onClick={() => setMobileMenuOpen(false)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    <nav className="space-y-4">
                        <a href="#features" onClick={handleNavClick} className="block transition-colors">Características</a>
                        <a href="#demo" onClick={handleNavClick} className="block transition-colors">Demo</a>
                        <a href="#pricing" onClick={handleNavClick} className="block transition-colors">Planes</a>
                        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
                        <button onClick={toggleDarkMode} className="p-2 rounded-full focus:outline-none">
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                    </nav>
                </div>
            </div>
        </>
      )}

      <Hero
        particlesContainer={particlesContainer}
        typedElement={typedElement}
        handleGoogleSuccess={handleGoogleSuccess}
        handleGoogleError={handleGoogleError}
      />
      <Features />
      <Demo
        revenueChart={revenueChart}
        selectedService={selectedService}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        bookingConfirmed={bookingConfirmed}
        setSelectedService={setSelectedService}
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
        handleBookAppointment={handleBookAppointment}
        getServiceName={getServiceName}
        getServicePrice={getServicePrice}
      />
      <Video/>
      <Pricing
        isAnnualBilling={isAnnualBilling}
        setIsAnnualBilling={setIsAnnualBilling}
        handleGoogleSuccess={handleGoogleSuccess}
        handleGoogleError={handleGoogleError}
      />
      <Testimonials testimonialsSlider={testimonialsSlider} />
      <CTA
        handleGoogleSuccess={handleGoogleSuccess}
        handleGoogleError={handleGoogleError}
      />
      <Footer />
    </div>
  );
};

export default LandingPage;
