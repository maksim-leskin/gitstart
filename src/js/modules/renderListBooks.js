import {getLabels, getBooks, API_URI} from "./serviceBook.js";


export const data = {
  books: [],
  labels: [],
  sortBook(sort) {
    return this.books.sort((a, b) => {
      if (sort === 'up') return a.rating > b.rating ? 1 : -1;
      if (sort === 'down') return a.rating < b.rating ? 1 : -1;
    })
  },
  filterBook(value) {
    return this.books.filter(book => book.label === value)
  }
};


const libraryList = document.querySelector('.library__list');
const fieldsList = document.querySelector('.fields__list_filter');

const getStars = rating => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      stars.push(`<img class="cart__rating-star" src="img/star.svg" alt="Рейтинг ${rating} из 5">`);
    } else if (i < rating) {
      stars.push(`<img class="cart__rating-star" src="img/star.svg" alt="">`);
    } else {
      stars.push(`<img class="cart__rating-star" src="img/star-o.svg" alt="">`);
    }
  }

  return stars;
};

export const renderList = (books = data.books) => {
  libraryList.textContent = '';

  const items =  books.map(({author, description, id, image, label, rating, title}) => {
    const item = document.createElement('li');
    item.classList.add('library__item');
    item.innerHTML = `
      <a href="/#/book?id=${id}">
        <article class="cart">
          <div class="cart__wrapper">
            <img src="${API_URI}${image}" alt="Обложка книги ${title}" class="cart__image">

            <p class="cart__label">${data.labels[label]}</p>
          </div>

          <div class="cart__content">
            <h3 class="cart__title">${title}</h3>

            <p class="cart__author">${author}</p>

            <p class="cart__description">${description.substring(0, 80)}...</p>

            <div class="cart__rating">
              ${getStars(rating).join('')}
            </div>
          </div>
        </article>
      </a>
    `;

    return item;
  });

  libraryList.append(...items);

};

const renderFields = (labels) => {
  fieldsList.textContent = '';

  for (const key in labels) {
    const item = document.createElement('li');
    item.className = 'fields__item';

    const button = document.createElement('button');
    button.className = 'fields__button';

    button.dataset.filter = key;
    button.textContent = labels[key];
    item.append(button)
    fieldsList.append(item);
  }
};


export const renderListBooks = async () => {
  const [books, labels] = await Promise.all([getBooks(), getLabels()]);
  data.books = books;
  data.labels = labels;

  renderList(books);
  renderFields(labels);
}
