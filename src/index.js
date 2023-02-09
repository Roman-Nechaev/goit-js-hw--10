import './css/styles.css';
import debounce from 'lodash.debounce';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import listCountrisTemp from './template/listCards.hbs';
import oneCountrisTemp from './template/oneCount.hbs';

import { fetchCountries } from './API/fetchCountries';

const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const inputRes = document.querySelector('#search-box');

inputRes.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(e) {
  const search = e.target.value.trim();

  if (search === '') {
    clearInterface();
    return;
  }
  fetchCountries(search).then(queryProcessing).catch(responseError);
}

function queryProcessing(response) {
  clearInterface();
  const answerQuantity = response.length;

  if (answerQuantity === 1) {
    renerIntrfaceOne(response);
  } else if (answerQuantity >= 2 && answerQuantity <= 10) {
    console.log('то что нужно !!');
    renerIntrfaceList(response);
  } else if (answerQuantity > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function responseError() {
  Notify.failure('Oops, there is no country with that name');
}

function clearInterface() {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}

function renerIntrfaceList(params) {
  const markap = listCountrisTemp(params);
  countryListRef.innerHTML = markap;
}
function renerIntrfaceOne(params) {
  const markap = oneCountrisTemp(params);
  countryInfoRef.innerHTML = markap;
}
