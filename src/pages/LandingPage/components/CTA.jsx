import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const CTA = ({ handleGoogleSuccess, handleGoogleError }) => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center reveal">
        <h2 className="font-display text-4xl lg:text-5xl font-medium mb-6">¿Listo para Transformar Tu Salón de Belleza?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Únete a más de 500 salones que ya han optimizado su operación y aumentado sus ingresos con Nails Now.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
          <button className="btn-secondary">Agendar Demo Personalizada</button>
        </div>
        <div className="text-sm"><p>Sin tarjeta de crédito • Cancelación en cualquier momento • Soporte personalizado</p></div>
      </div>
    </section>
  );
};

export default CTA;
