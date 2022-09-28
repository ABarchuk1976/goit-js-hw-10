import './css/styles.css';
import debounce from 'debounce';
const _ = require('lodash');
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
  fontSize: '16px',
});

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 3000;
const MAX_CONTRIES = 10;
const MORE_MAX = 'More MAX';

function clearAll() {
  console.log('Clear');
}

async function fetchCountries(name) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    console.log(name);

    if (response.status === 404) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      throw new Error(response.status);
    }

    const countries = await response.json();

    if (countries.length > MAX_CONTRIES) {
      console.log('In max');
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      throw new Error(MORE_MAX);
    }

    console.log('To chto ', countries);

    return countries;
  } catch {
    error => console.error(error);
  }
}

const debounceFetchCountries = _.debounce(fetchCountries, DEBOUNCE_DELAY);

function renderCountiesListItems(countries) {
  let markup = '';
  const listOfCountriesRef = document.querySelector('.country-list');
  listOfCountriesRef.style.listStyle = 'none';
  const countryInfoRef = document.querySelector('.country-info');

  if (countries.length === 1) {
    clearAll();
    markup = countries
      .map(
        country =>
          `<li style="margin-botton:100px;display:flex;align-items:center">
				<img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width = 100 height = 50 />
				<h1 style="font-size:48px;margin:0;margin-left:16px;font-weight:700">${country.name.official}</h1>
				</li>`
      )
      .join('');

    listOfCountriesRef.insertAdjacentHTML('beforeend', markup);

    // markup = countries
    //   .map(
    //     country =>
    //       `<li style="margin-botton:100px;display:flex;align-items:center">
    // 		<img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width = 100 height = 50 />
    // 		<h1 style="font-size:48px;margin:0;margin-left:16px;font-weight:700">${country.name.official}</h1>
    // 		</li>`
    //   )
    //   .join('');
    // listOfCountriesRef.insertAdjacentHTML('beforeend', markup);
  }
}

inputRef.addEventListener('input', event => {
  console.log('Value ', event.currentTarget.value);

  if (event.currentTarget.value === '') return clearAll();

  _.debounce(() => {
    const countries = fetchCountries(event.currentTarget.value);
    console.log(countries);
    renderCountiesListItems(countries);
  }),
    MAX_CONTRIES;
});
