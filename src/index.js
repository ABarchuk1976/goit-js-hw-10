import './css/styles.css';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';

Notiflix.Report.init({
  svgSize: '48px',
  messageFontSize: '16px',
  buttonFontSize: '16px',
  backOverlayClickToClose: true,
});

const DEBOUNCE_DELAY = 300;
