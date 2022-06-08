import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const _ = require('lodash');

const DEBOUNCE_DELAY = 300;
let filterFields = 'name,capital,population,flags,languages';

const notifyOptions = {
  opacity: 0.9,
};

const fetchCountryName = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

fetchCountryName.addEventListener(
  'input',
  _.debounce(e => {
    fetchCountries(e.target.value.trim())
      .then(countries => {
        console.log(countries);
        renderCountriesList(countries);
      })
      .then(console.log('sprawdzamy'))
      .catch(error => {
        if(e.target.value.trim() !== ""){
          noFoundMatch(error);
        }
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';        
      });
  }, DEBOUNCE_DELAY)
);

function fetchCountries(name) {
  const params = new URLSearchParams({
    fields: filterFields,
  });

  return fetch(`https://restcountries.com/v3.1/name/${name}?${params}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderCountriesList(countries) {
  let matchFound = countries.length;
  console.log(`Match founded: ${matchFound}`);
  if (matchFound > 10) {
    toMuchFound();
  }

  if (matchFound >= 2 && matchFound <= 10) {
    muchFoundTo10(countries);
  }

  if (matchFound === 1) {
    foundOneCountry(countries);
  }
}

function noFoundMatch(error) {
  console.log(error);
  Notify.failure('Oops, there is no country with that name', notifyOptions);
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function toMuchFound() {
  Notify.info('Too many matches found. Please enter a more specific name.');
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  return;
}

function muchFoundTo10(countries) {
  const markupList = countries
    .map(({ name, flags }) => {
      return `<li>
        <img src="${flags.svg}" alt="Flag of ${name.official}">
        <p>${name.official}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markupList;
  countryInfo.innerHTML = '';
}

function foundOneCountry(countries) {
  const markupInfo = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `
        <div class="title">
          <img src="${flags.svg}" alt="Flag of ${name.official}">
          <p>${name.official}</p>
        </div>
        <p><b>Capitol</b>: ${capital}</p>
        <p><b>Population</b>: ${population}</p>
        <p><b>Languages</b>: ${Object.values(languages)}</p>
      `;
    })
    .join('');

  countryList.innerHTML = '';
  countryInfo.innerHTML = markupInfo;
}
