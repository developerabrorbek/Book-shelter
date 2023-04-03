"use strict";

import { BASE_URL , elNumberOfCards, elCards, elPages, elBookmark, elModal, bookmarkArr } from "./constants.js";

export function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

export function getFetch(
  url = `?q=all&startIndex=0&maxResults=40`,
  usedFunc = renderCards
) {
  fetch(BASE_URL + url)
    .then((response) => response.json())
    .then((result) => {
      const data = result.totalItems ? result.items : [result];
      if(data.length > 1) elNumberOfCards.textContent = `${data.length}`;
      usedFunc(data);
    });
}

export function renderCards(arr) {
  elCards.innerHTML = "";

  arr.forEach((item) => {
    const html = `
          <li class="hero-card bg-white rounded-2 p-3 shadow">
              <div class="card-img bg-info bg-opacity-10 p-2 rounded-2 mb-3 d-flex align-items-center justify-content-center">
                  <img src="${item.volumeInfo?.imageLinks?.thumbnail}" alt="Book">
              </div>
              <div class="card-body">
                  <h4 class="card-title" title="${item.volumeInfo.title}">${item.volumeInfo.title}</h4>
                  <p class="card-subtitle" title="${item.volumeInfo.authors}">${item.volumeInfo?.authors}</p>
                  <p class="card-subtitle">${item.volumeInfo?.publishedDate.slice(
                    0,
                    4
                  )}</p>
              </div>
              <div class="card-buttons">
                  <button class="btn btn-warning py-2 bookmark-btn" dataset-id="${
                    item.id
                  }">Bookmark</button>
                  <button class="btn btn-link text-decoration-none py-2 more-btn" dataset-id="${
                    item.id
                  }">More info</button>
                  <a href="${
                    item.volumeInfo.previewLink
                  }" target="_blank" class="btn btn-secondary read-btn py-2" dataset-id="${
      item.id
    }">Read</a>
              </div>
          </li>`;

    elCards.insertAdjacentHTML("afterbegin", html);
  });
}


export function renderBookmark(item) {
    const [obj] = item;
    if(bookmarkArr.every(el => el.id != obj.id)) bookmarkArr.push(obj);
    addBookmark(bookmarkArr)
}

export function addBookmark(arr){
  elBookmark.innerHTML = "";
    arr.forEach((item,index) =>{
        const html = `
    <li class="list-item d-flex justify-content-between">
        <div class="list-body">
            <h4 class="list-body__title" title="${item?.volumeInfo.title}">${item?.volumeInfo.title}</h4>
            <p class="list-body__subtitle">${item.volumeInfo?.authors}</p>
        </div>
        <div class="list-actions d-flex align-items-center gap-1">
            <a href="${
              item.volumeInfo?.previewLink
            }" target="_blank"  dataset-id="${
              item.id
            }"><img src="./images/read-book.svg" alt="Book icon" class="read-book"></a>
            <img src="./images/delete-icon.svg" alt="Delete icon" class="delete-book" dataset-id="${
                index
              }">
        </div>
    </li>`;

    elBookmark.insertAdjacentHTML("afterbegin", html);
    })
}

export function searchBook(arr, searchValue){
  const filteredArr = arr.filter(item => item.volumeInfo.title.toLoverCase() == searchValue.toLoverCase())
  getFetch()
}

export function renderModal(obj) {
  const [item] = obj;
  elModal.innerHTML = `
            <div class="modal-header d-flex px-4 py-3">
                <h3 class="modal-title w-75">${item.volumeInfo?.title}</h3>
                <img src="./images/modal-exit.svg" alt="Exit modal" class="exit-modal">
            </div>
            <div class="modal-body d-flex flex-column align-items-center px-4 gap-2">
                <img src="${item.volumeInfo?.imageLinks?.thumbnail}" alt="Book">
                <p class="description text-center">${item.volumeInfo?.description ? `${item.volumeInfo?.description}` : "Description can't be found 😔😔😔"}</p>
                <ul class="modal-infos list-unstyled me-auto d-flex flex-column gap-3">
                    <li class="modal-info"><strong>Author: </strong><span class="value">${item.volumeInfo?.authors ? `${item.volumeInfo?.authors}` : "Authors were not found 😌😌😌"}</span></li>
                    <li class="modal-info"><strong>Published: </strong><span class="value">${item.volumeInfo?.publishedDate.slice(
                      0,
                      4
                    )}</span></li>
                    <li class="modal-info__first"><strong>Publishers: </strong><span class="value">${
                      item.volumeInfo?.publisher
                     ? `${item.volumeInfo.publisher}` : "Publisher is not found 🙃😕😕"}</span></li>
                    <li class="modal-info__second"><strong>Categories: </strong><span class="value">${
                      item.volumeInfo?.categories
                        ? `${item.volumeInfo?.categories}`
                        : "Could not find categories 😒😒😒"
                    }</span></li>
                    <li class="modal-info__third"><strong>Pages Count: </strong><span class="value">${
                      item.volumeInfo?.pageCount
                    }</span></li>
                </ul>
            </div>
            <a href="${
              item.volumeInfo?.previewLink
            }" target="_blank" class="btn btn-secondary modal-btn d-block ms-auto me-4 mb-3">Read</a>`;
}

export function createElement(parent, tag, className, textContent){
  const element = document.createElement(tag);
  element.classList.add(className);
  element.textContent = textContent;
  parent.append(element);
}

export function createPages(arr){
  const count = Math.ceil(arr.length/6);
  for(let i=0;i<count;i++){
    createElement(elPages,"li", "page", `${i+1}`);
  }
}