import React from 'react';

const Demo = ({ revenueChart, selectedService, selectedDate, selectedTime, bookingConfirmed, setSelectedService, setSelectedDate, setSelectedTime, handleBookAppointment, getServiceName, getServicePrice }) => {
  return (
    <section id="demo" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-4xl lg:text-5xl font-medium mb-6">
            Experimenta la Diferencia
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Prueba nuestra demo interactiva y descubre cómo Nails Now transforma la gestión de tu salón en tiempo real.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Booking Demo */}
          <div className="demo-calendar rounded-2xl p-8 reveal">
            <h3 className="font-display text-2xl font-medium mb-6">Reserva una Cita Demo</h3>

            {/* Service Selection */}
            <div className="mb-6">
              <h4 className="font-medium mb-4">Selecciona un Servicio:</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className={`service-card p-4 rounded-lg ${selectedService === 'manicura' ? 'selected' : ''}`} onClick={() => setSelectedService('manicura')}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Manicura Clásica</div>
                      <div className="text-sm">45 minutos</div>
                    </div>
                    <div className="font-medium">$150</div>
                  </div>
                </div>
                <div className={`service-card p-4 rounded-lg ${selectedService === 'pedicura' ? 'selected' : ''}`} onClick={() => setSelectedService('pedicura')}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Pedicura Completa</div>
                      <div className="text-sm">60 minutos</div>
                    </div>
                    <div className="font-medium">$200</div>
                  </div>
                </div>
                <div className={`service-card p-4 rounded-lg ${selectedService === 'acrilicas' ? 'selected' : ''}`} onClick={() => setSelectedService('acrilicas')}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Uñas Acrílicas</div>
                      <div className="text-sm">90 minutos</div>
                    </div>
                    <div className="font-medium">$400</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="mb-6">
              <h4 className="font-medium mb-4">Selecciona Fecha y Hora:</h4>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                  <div key={day} className="text-center text-sm font-medium py-2">{day}</div>
                ))}
                {[21, 22, 23, 24, 25, 26, 27].map(day => (
                  <div key={day} className={`calendar-day text-center py-2 rounded ${selectedDate === `Octubre ${day}, 2024` ? 'selected' : ''}`} onClick={() => setSelectedDate(`Octubre ${day}, 2024`)}>{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'].map(time => (
                  <div key={time} className={`time-slot text-center py-2 px-3 rounded border cursor-pointer transition-all ${selectedTime === time ? 'bg-primary-green text-white' : ''}`} onClick={() => setSelectedTime(time)}>{time}</div>
                ))}
              </div>
            </div>

            {/* Booking Summary */}
            {selectedService && selectedDate && selectedTime && (
              <div id="booking-summary" className="p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Resumen de tu Cita:</h5>
                <div className="text-sm space-y-1">
                  <div>Servicio: <span>{getServiceName(selectedService)}</span></div>
                  <div>Fecha: <span>{selectedDate}</span></div>
                  <div>Hora: <span>{selectedTime}</span></div>
                  <div>Precio: <span>${getServicePrice(selectedService)}</span></div>
                </div>
              </div>
            )}

            <button id="book-appointment" className="btn-primary w-full py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed" disabled={!selectedService || !selectedDate || !selectedTime} onClick={handleBookAppointment}>
              Confirmar Cita Demo
            </button>
          </div>

          {/* Analytics Preview */}
          <div className="reveal">
            <div className="p-8 rounded-2xl">
              <h3 className="font-display text-2xl font-medium mb-6">Vista Previa del Dashboard</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 rounded-lg"><div className="font-display text-2xl font-medium">127</div><div className="text-sm">Citas este mes</div></div>
                <div className="text-center p-4 rounded-lg"><div className="font-display text-2xl font-medium">$31,450</div><div className="text-sm">Ingresos mensuales</div></div>
                <div className="text-center p-4 rounded-lg"><div className="font-display text-2xl font-medium">94%</div><div className="text-sm">Clientes satisfechos</div></div>
                <div className="text-center p-4 rounded-lg"><div className="font-display text-2xl font-medium">12</div><div className="text-sm">Productos bajos en stock</div></div>
              </div>
              <div id="revenue-chart" ref={revenueChart} className="h-64 mb-6"></div>
              <div>
                <h4 className="font-medium mb-4">Actividad Reciente</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b"><div className="flex items-center"><div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">M</div><div><div className="font-medium text-sm">María González</div><div className="text-xs">Manicura Clásica</div></div></div><div className="text-sm">Hace 5 min</div></div>
                  <div className="flex items-center justify-between py-2 border-b"><div className="flex items-center"><div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">A</div><div><div className="font-medium text-sm">Ana Martínez</div><div className="text-xs">Pedicura Completa</div></div></div><div className="text-sm">Hace 12 min</div></div>
                  <div className="flex items-center justify-between py-2"><div className="flex items-center"><div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">L</div><div><div className="font-medium text-sm">Lucía Fernández</div><div className="text-xs">Uñas Acrílicas</div></div></div><div className="text-sm">Hace 18 min</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {bookingConfirmed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h3 className="font-display text-2xl font-medium mb-4">¡Cita Confirmada!</h3>
                <p className="mb-6">Tu cita demo ha sido reservada exitosamente. En un salón real, tu cliente recibiría una confirmación por email y SMS.</p>
                <button className="btn-primary px-6 py-3 rounded-lg font-medium" onClick={() => setBookingConfirmed(false)}>
                    Entendido
                </button>
            </div>
        </div>
      )}
    </section>
  );
};

export default Demo;
