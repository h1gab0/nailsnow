import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Hero = ({ particlesContainer, typedElement, handleGoogleSuccess, handleGoogleError }) => {
  return (
    <section className="hero-bg min-h-screen flex items-center pt-20 relative">
      <div className="particles-bg" id="particles-container" ref={particlesContainer}></div>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10 text-white">
        <div className="reveal">
          <h1 className="font-display text-5xl lg:text-6xl font-medium mb-6 leading-tight">
            Transforma Tu Salón de
            <span ref={typedElement} id="typed-text"></span>
          </h1>
          <p className="text-xl mb-8 leading-relaxed">
            Nails Now es una suscripción que permite a sus usuarios la opción de liberar tiempo y optimizar la operación de salones de uñas y belleza mediante una plataforma digital que brinda los siguientes servicios: automatizar citas, controlar inventarios, reportar ganancias y mejorar la experiencia del cliente, todo en una sola herramienta personalizable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
            <button className="btn-secondary">
              Ver Video Explicativo
            </button>
          </div>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-display text-3xl font-medium">85%</div>
              <div className="text-sm">Menos Tiempo en Administración</div>
            </div>
            <div>
              <div className="font-display text-3xl font-medium">40%</div>
              <div className="text-sm">Aumento en Clientes</div>
            </div>
            <div>
              <div className="font-display text-3xl font-medium">24/7</div>
              <div className="text-sm">Disponibilidad de Citas</div>
            </div>
          </div>
        </div>
        <div className="reveal">
          <div className="relative">
            <img src="/resources/hero-dashboard-mockup.png" alt="Nails Now Dashboard" className="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-lime rounded-full flex items-center justify-center text-primary-green font-bold shadow-lg transform rotate-12">
              ¡Nuevo!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
