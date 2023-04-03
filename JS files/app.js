"use strict";

import {$, getFetch, renderCards, createPages, renderBookmark, addBookmark, renderModal } from "./utils.js"
import { elSortBtn,inputSearch,overlay,btnLogout, elCards, elPages, elBookmark, elModal, bookmarkArr } from "./constants.js";





getFetch(`?q=all&startIndex=0&maxResults=6`, renderCards);

getFetch(`?q=all&startIndex=0&maxResults=40`,createPages);

elSortBtn.addEventListener("click", (evt) => {
  if (evt.target.textContent == "Order by newest") {
    getFetch(
      "?q=flowers&orderBy=newest&startIndex=0&maxResults=40&key=AIzaSyBtpP1f28pSvF8alBUxH_1SA2VLYnStbhk",
      renderCards
    );
    evt.target.textContent = "Order by relevance";
  } else {
    getFetch(
      "?q=flowers&orderBy=relevance&startIndex=0&maxResults=40&key=AIzaSyBtpP1f28pSvF8alBUxH_1SA2VLYnStbhk",
      renderCards
    );
    evt.target.textContent = "Order by newest";
  }
});

inputSearch.addEventListener("input", (evt) => {
  let searchValue = evt.target.value;
  if (searchValue == "") {
    getFetch("?q=all&startIndex=0&maxResults=40", renderCards);
  } else {
    getFetch(`/?q=${searchValue}`, renderCards);
  }
});

elCards.addEventListener("click", (evt) => {
  const id = evt.target.getAttribute("dataset-id");
  if (evt.target.matches(".bookmark-btn")) {
    getFetch(
      `/${id}?key=AIzaSyBtpP1f28pSvF8alBUxH_1SA2VLYnStbhk`,
      renderBookmark
    );
  }

  if (evt.target.matches(".more-btn")) {
    getFetch(`/${id}?key=AIzaSyBtpP1f28pSvF8alBUxH_1SA2VLYnStbhk`, renderModal);
    overlay.classList.remove("modal");
    elModal.classList.remove("modal");
  }
});

elBookmark.addEventListener("click", (evt) => {
  if (evt.target.matches(".delete-book")) {
    let index = evt.target.getAttribute("dataset-id");
    bookmarkArr.splice(index, 1);
    addBookmark(bookmarkArr);
  }
});

elModal.addEventListener("click", (evt) => {
  if (evt.target.matches(".exit-modal")){
     elModal.classList.add("modal");
     overlay.classList.add("modal");
    };
});

elPages.addEventListener("click", (evt)=>{
  if(evt.target.matches(".page")){
    const number = evt.target.textContent - 1;
    getFetch(`?q=all&startIndex=${number * 6}&maxResults=6`,renderCards)
  }
})

btnLogout.addEventListener("click", (evt)=>{
  window.location.href= "../login.html";
})




