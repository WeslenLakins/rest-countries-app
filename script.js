let allCountries = []; // To hold all countries data

document.addEventListener('DOMContentLoaded', () => {
  fetchCountries();

  document.getElementById('search-input').addEventListener('input', (event) => {
    displayCountries(
      filterCountries(
        event.target.value,
        document.getElementById('region-filter').value
      )
    );
  });

  document
    .getElementById('region-filter')
    .addEventListener('change', (event) => {
      displayCountries(
        filterCountries(
          document.getElementById('search-input').value,
          event.target.value
        )
      );
    });
});

function fetchCountries() {
  fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,languages,currencies'
  )
    .then((response) => response.json())
    .then((data) => {
      allCountries = data;
      displayCountries(data);
    })
    .catch((error) => console.error('Error fetching data: ', error));
}

function displayCountries(countries) {
  const container = document.getElementById('countries-container');
  container.innerHTML = ''; // Clear previous countries
  countries.forEach((country) => {
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('country');
    countryDiv.innerHTML = `
        <a href="country-details.html?name=${encodeURIComponent(
          country.name.common
        )}">
            <h3>${country.name.common}</h3>
            <img src="${country.flags.svg}" alt="Flag of ${
      country.name.common
    }">
        </a>
        <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>Region: ${country.region}</p>
    `;
    container.appendChild(countryDiv);
  });
}

function filterCountries(search, region) {
  return allCountries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase()) &&
      (!region || country.region === region)
  );
}
