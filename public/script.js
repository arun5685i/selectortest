document.addEventListener('DOMContentLoaded', fetchCountries);

async function fetchCountries() {
  try {
    const response = await fetch('/api/countries');
    const countries = await response.json();
    const countrySelect = document.getElementById('country');
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country;
      option.textContent = country;
      countrySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}

async function fetchStates() {
  const country = document.getElementById('country').value;
  const stateSelect = document.getElementById('state');
  stateSelect.innerHTML = '<option value="">Select State</option>'; // Reset
  document.getElementById('city').innerHTML = '<option value="">Select City</option>'; // Reset
  document.getElementById('city').disabled = true;

  if (!country) return;
  
  try {
    const response = await fetch(`/api/states/${country}`);
    const states = await response.json();
    states.forEach(state => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });
    stateSelect.disabled = false;
  } catch (error) {
    console.error('Error fetching states:', error);
  }
}

async function fetchCities() {
  const state = document.getElementById('state').value;
  const citySelect = document.getElementById('city');
  citySelect.innerHTML = '<option value="">Select City</option>'; // Reset

  if (!state) return;

  try {
    const response = await fetch(`/api/cities/${state}`);
    const cities = await response.json();
    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
    citySelect.disabled = false;
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
}