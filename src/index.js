import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const fetchCountryName = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

fetchCountryName.addEventListener("input", (e) => {
  fetchCountries(e.currentTarget.value)
    .then((countries) => {
      console.log(countries)
      renderCountriesList(countries)
    })
    .then(console.log("sprawdzamm"))
    .catch((error) => {
      console.log(error);
      countryList.innerHTML = "";
    });
});

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderCountriesList(countries) {
  const markup = countries
    .map(({name, capital, population, flags, languages}) => {
      return `<li>
          <p><b>Name</b>: ${name.official}</p>
          <p><b>Capitol</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Flags</b>: ${flags.svg}</p>
          <p><b>Languages</b>: ${Object.values(languages)}</p>
        </li>`;
    })
    .join("");
    countryList.innerHTML = markup;
}