AOS.init();

const availableTimeSlots = {
  "09:00": true,
  "10:00": true,
  "11:00": true,
  "12:00": true,
  "13:00": true,
  "14:00": true,
  "15:00": true,
  "16:00": true,
  "17:00": true,
  "18:00": true
};

// Simula horários ocupados para diferentes dias
const bookedSlots = {
  // formato: 'YYYY-MM-DD': ['HH:MM', 'HH:MM']
};

function initDatePicker() {
  const dateInput = document.getElementById('booking-date');
  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2); // Permite agendamento até 2 meses no futuro
  
  dateInput.min = today.toISOString().split('T')[0];
  dateInput.max = maxDate.toISOString().split('T')[0];
  
  dateInput.addEventListener('change', updateTimeSlots);
}

function updateTimeSlots() {
  const dateInput = document.getElementById('booking-date');
  const timeSlotsContainer = document.querySelector('.time-slots');
  const selectedDate = dateInput.value;
  
  if (!selectedDate) {
    timeSlotsContainer.innerHTML = '<p class="no-date">Please select a date first</p>';
    return;
  }
  
  const bookedTimesForDate = bookedSlots[selectedDate] || [];
  timeSlotsContainer.innerHTML = '';
  
  Object.keys(availableTimeSlots).forEach(time => {
    const timeSlot = document.createElement('div');
    timeSlot.className = `time-slot${bookedTimesForDate.includes(time) ? ' booked' : ''}`;
    timeSlot.textContent = time;
    
    if (!bookedTimesForDate.includes(time)) {
      timeSlot.addEventListener('click', () => selectTimeSlot(timeSlot, time));
    }
    
    timeSlotsContainer.appendChild(timeSlot);
  });
  
  updateBookingButton();
}

function selectTimeSlot(element, time) {
  const allTimeSlots = document.querySelectorAll('.time-slot');
  allTimeSlots.forEach(slot => slot.classList.remove('selected'));
  element.classList.add('selected');
  updateBookingButton();
}

function handleBooking() {
  const selectedService = document.querySelector('input[name="service"]:checked');
  const selectedDate = document.getElementById('booking-date').value;
  const selectedTimeSlot = document.querySelector('.time-slot.selected');
  
  if (selectedService && selectedDate && selectedTimeSlot) {
    const service = selectedService.value;
    const time = selectedTimeSlot.textContent;
    
    // Adiciona o horário aos slots ocupados
    if (!bookedSlots[selectedDate]) {
      bookedSlots[selectedDate] = [];
    }
    bookedSlots[selectedDate].push(time);
    
    alert(`Booking confirmed!\nService: ${service}\nDate: ${selectedDate}\nTime: ${time}`);
    updateTimeSlots();
  }
}

function updateBookingButton() {
  const selectedService = document.querySelector('input[name="service"]:checked');
  const selectedDate = document.getElementById('booking-date').value;
  const selectedTimeSlot = document.querySelector('.time-slot.selected');
  const bookingButton = document.getElementById('bookingButton');
  
  bookingButton.disabled = !(selectedService && selectedDate && selectedTimeSlot);
}

document.addEventListener('DOMContentLoaded', function() {
  initDatePicker();
  
  const serviceInputs = document.querySelectorAll('input[name="service"]');
  serviceInputs.forEach(input => {
    input.addEventListener('change', updateBookingButton);
  });
  
  const bookingButton = document.getElementById('bookingButton');
  if (bookingButton) {
    bookingButton.addEventListener('click', handleBooking);
  }
});