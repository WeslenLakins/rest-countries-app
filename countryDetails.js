document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const countryName = params.get('name');
  fetchCountryDetails(countryName);
  document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});

function fetchCountryDetails(name) {
  fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`)
    .then((response) => response.json())
    .then((data) => {
      const country = data[0];
      displayCountryDetail(country);
    })
    .catch((error) => console.error('Error fetching data: ', error));
}

function displayCountryDetail(country) {
  document.getElementById('country-name').textContent =
    country.name.common || 'N/A';
  document.getElementById('country-flag').src = country.flags.svg || '';
  document.getElementById(
    'country-flag'
  ).alt = `Flag of ${country.name.common}`;
  document.getElementById('country-capital').textContent = `Capital: ${
    country.capital ? country.capital[0] : 'N/A'
  }`;
  document.getElementById('country-population').textContent = `Population: ${
    country.population.toLocaleString() || 'N/A'
  }`;
  document.getElementById('country-region').textContent = `Region: ${
    country.region || 'N/A'
  }`;
  document.getElementById('country-subregion').textContent = `Subregion: ${
    country.subregion || 'N/A'
  }`;
  const languagesList = document.getElementById('country-languages');
  Object.values(country.languages || {}).forEach((lang) => {
    languagesList.innerHTML += `<li>${lang}</li>`;
  });
  document.getElementById(
    'country-currencies'
  ).textContent = `Currencies: ${Object.values(country.currencies || {})
    .map((currency) => `${currency.name} (${currency.symbol})`)
    .join(', ')}`;
  document.getElementById('country-timezones').textContent = `Timezones: ${
    country.timezones.join(', ') || 'N/A'
  }`;
  document.getElementById('country-borders').textContent = `Borders: ${
    country.borders.join(', ') || 'N/A'
  }`;

  const map = L.map('country-map').setView(
    [country.latlng[0], country.latlng[1]],
    5
  );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  L.marker([country.latlng[0], country.latlng[1]]).addTo(map);
}
