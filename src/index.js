import './css/styles.css';
import { debounce } from 'lodash';
const _ = require('lodash');
import Notiflix from 'notiflix';

Notiflix.Report.init({
  svgSize: '48px',
  messageFontSize: '16px',
  buttonFontSize: '16px',
  backOverlayClickToClose: true,
});

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputRef.addEventListener('input', event => {
  if (event.currentTarget.value === '') return clearAll();

  _.debounce(() => {}, DEBOUNCE_DELAY);
});
