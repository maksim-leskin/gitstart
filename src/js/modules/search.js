import {searchBooks} from "./serviceBook.js";
import {renderList} from "./renderListBooks.js";

const btnSearch = document.querySelectorAll('.header__btn_search');
const search = document.querySelector('.search');
const searchForm = document.querySelector('.search__form');


const closeSearch = ({target}, flag) => {

  if (target.closest('.search, .header__btn_search') && !flag) {
    return;
  }
  search.classList.remove('search_active');
  document.body.removeEventListener('click', closeSearch);
};

btnSearch.forEach(btn => {
  btn.addEventListener('click', () => {
    search.classList.add('search_active');
    document.body.addEventListener('click', closeSearch, true);
  });
});

searchForm.addEventListener('submit', async  e => {
  e.preventDefault();
  const books = await searchBooks(searchForm.input.value);
  renderList(books);
  e.target.reset();
  closeSearch(e, true);
})
