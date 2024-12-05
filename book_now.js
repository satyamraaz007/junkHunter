document.addEventListener('DOMContentLoaded', () => {
  const dateSection = document.getElementById('dateSection');
  const slotSection = document.getElementById('slotSection');
  const selectedDateDiv = document.getElementById('selectedDate');
  const selectedSlotDiv = document.getElementById('selectedSlot');
  const dateCarousel = document.getElementById('dateCarousel');
  const formSection = document.getElementById('formSection');
  const summarySection = document.getElementById('summarySection');
  const appointmentForm = document.getElementById('appointmentForm');

  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const totalDates = 21; // To simulate a larger date range for carousel
  const visibleDates = 7;

  let dates = [];
  for (let i = 1; i <= totalDates; i++) {
    const date = new Date(today.getTime() + i * oneDay);
    const dateString = `${date.getDate()}`;
    const fullDateString = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
    dates.push({ dateString, fullDateString });
  }

  let currentIndex = 0;

  function renderDates() {
    dateSection.innerHTML = '';
    const start = currentIndex;
    const end = currentIndex + visibleDates;

    dates.slice(start, end).forEach((date) => {
      const dateDiv = document.createElement('div');
      dateDiv.className = 'date';
      dateDiv.innerText = date.dateString;
      dateDiv.onclick = () => selectDate(date.fullDateString, dateDiv);
      dateSection.appendChild(dateDiv);
    });
  }

  function moveCarousel(direction) {
    currentIndex += direction * visibleDates;
    currentIndex = Math.max(0, Math.min(currentIndex, dates.length - visibleDates));
    renderDates();
  }

  function selectDate(fullDate, dateElement) {
    selectedDateDiv.innerText = `Selected Date: ${fullDate}`;
    showSlots();

    document.querySelectorAll('.date').forEach(date => date.classList.remove('selected'));
    dateElement.classList.add('selected');
  }

  function showSlots() {
    slotSection.innerHTML = '';
  
    const slots = [
      '07:00AM - 09:00AM',
      '09:00AM - 11:00AM',
      '11:00AM - 01:00PM',
      '01:00PM - 03:00PM',
      '03:00PM - 05:00PM',
      '05:00PM - 07:00PM',
      '07:00PM - 09:00PM',
      '09:00PM - 11:00PM'
    ];
  
    slots.forEach(slot => {
      const button = document.createElement('button');
      button.className = 'slot-button';
      button.innerText = slot;
      button.onclick = () => selectSlot(slot);
      slotSection.appendChild(button);
    });
  
    slotSection.style.display = 'flex';
    slotSection.style.flexWrap = 'wrap'; /* Allow wrapping if needed */
  }
  
  

  function selectSlot(slot) {
    selectedSlotDiv.innerText = `Selected Slot: ${slot}`;
    document.getElementById('dot1').classList.add('ticked');
    document.getElementById('line1').classList.remove('active'); // Ensure only the first dot is ticked
    document.getElementById('dot2').classList.remove('ticked');
  
    // Hide date carousel and slot sections
    dateCarousel.style.display = 'none';
    slotSection.style.display = 'none';
  
    // Update selected date and slot information
    const selectedDate = selectedDateDiv.innerText.replace('Selected Date: ', '');
    document.getElementById('summaryDate').innerText = selectedDate;
    document.getElementById('summarySlot').innerText = `Selected Slot: ${slot}`;
  
    // Show the form section
    formSection.style.display = 'flex';
  }
  

  appointmentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(appointmentForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const address = formData.get('address');

    // Populate summary section
    document.getElementById('summaryDate').innerText = selectedDateDiv.innerText.replace('Selected Date: ', '');
    document.getElementById('summarySlot').innerText = selectedSlotDiv.innerText.replace('Selected Slot: ', '');
    document.getElementById('summaryName').innerText = name;
    document.getElementById('summaryEmail').innerText = email;
    document.getElementById('summaryPhone').innerText = phone;
    document.getElementById('summaryAddress').innerText = address;

    // Update progress section
    document.getElementById('line1').classList.add('active');
    document.getElementById('dot2').classList.add('ticked');
    document.getElementById('line2').classList.add('active');
    document.getElementById('dot3').classList.add('ticked');

    // Hide the form section
    formSection.style.display = 'none';

    // Show the summary section
    summarySection.style.display = 'block';
  });

  window.moveCarousel = moveCarousel; // Make the moveCarousel function globally accessible

  renderDates();
});
