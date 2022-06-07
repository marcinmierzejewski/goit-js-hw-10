import './css/styles.css';

const _ = require('lodash');

const DEBOUNCE_DELAY = 3000;
let filterFields = "name,capital,population,flags,languages";

const fetchCountryName = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

fetchCountryName.addEventListener(
  'input',
  _.debounce(e => {
    fetchCountries(e.target.value)
      .then(countries => {
        console.log(countries);
        renderCountriesList(countries);
      })
      .then(console.log('sprawdzammm'))
      .catch(error => {
        console.log(error);
        countryList.innerHTML = '';
      });
  }, DEBOUNCE_DELAY)
);

function fetchCountries(name) {
  const params = new URLSearchParams({
    fields: filterFields,
  });

  return fetch(
    `https://restcountries.com/v3.1/name/${name}?${params}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderCountriesList(countries) {
  const markup = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `<li>
          <p><b>Name</b>: ${name.official}</p>
          <p><b>Capitol</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Flags</b>: ${flags.svg}</p>
          <p><b>Languages</b>: ${Object.values(languages)}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
