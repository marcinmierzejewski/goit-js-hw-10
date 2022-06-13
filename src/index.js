import './css/styles.css';
import { fetchCountries } from './fetchCountries';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const _ = require('lodash');

const DEBOUNCE_DELAY = 300;

const notifyOptions = {
  opacity: 0.9,
};

const fetchCountryName = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

fetchCountryName.addEventListener(
  'input',
  _.debounce(e => {
    fetchCountries(e.target.value.trim()) //() => {fetchCountries(fetchCountryName.value.trim())...
      .then(countries => {
        console.log(countries);
        renderCountriesList(countries);
      })
      .then(console.log('Checking...'))
      .catch(error => {
        if (e.target.value.trim() !== '') {
          // if (fetchCountryName.value.trim())
          noFoundMatch(error);
        } else {
          Notify.info('Enter country name');
          clearResult();
        }
      });
  }, DEBOUNCE_DELAY)
);

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
  clearResult();
  return;
}

function toMuchFound() {
  Notify.info('Too many matches found. Please enter a more specific name.');
  clearResult();
  return;
}

function muchFoundTo10(countries) {
  clearResult();
  const markupList = countries
    .map(({ name, flags }) => {
      return `<li>
        <img src="${flags.svg}" alt="Flag of ${name.official}">
        <p>${name.official}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markupList;
}

function foundOneCountry(countries) {
  clearResult();
  const markupInfo = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `
        <div class="title">
          <img src="${flags.svg}" alt="Flag of ${name.official}">
          <p>${name.official}</p>
        </div>
        <p><b>Capitol</b>: ${capital}</p>
        <p><b>Population</b>: ${population}</p>
        <p><b>Languages</b>: ${Object.values(languages).map(l => ' ' + l)}</p>
      `;
    })
    .join('');
  countryInfo.innerHTML = markupInfo;
}

function clearResult() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
