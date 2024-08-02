import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import fetchData from './fetch';
import getUserInput from './userInput';

window.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.querySelector('.search-button');
  const searchBar = document.querySelector('.search-bar');

  searchBar.addEventListener('keypress', (e) => {
    if (document.activeElement === searchBar && e.key === 'Enter') {
      getUserInput();
      fetchData();
    }
  });

  searchBtn.addEventListener('click', () => {
    getUserInput();
    fetchData();
  });
});
