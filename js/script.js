"use strict";

let bookmarkName = document.querySelector("#bookmarkName");

let siteUrl = document.querySelector("#siteUrl");

let websitesList;

if (localStorage.getItem("websitesList") == null) {
  websitesList = [];
} else {
  websitesList = JSON.parse(localStorage.getItem("websitesList"));
  display(websitesList);
}

let addSite = document
  .querySelector("#btn-add")
  .addEventListener("click", function () {
    if (urlValidation() == true && bookmarkNameValidation() == true) {
      let website = {
        name: bookmarkName.value,
        url: siteUrl.value,
      };

      websitesList.push(website);

      display(websitesList);

      localStorage.setItem("websitesList", JSON.stringify(websitesList));

      clearForm();
    } else {
      document
        .querySelector("#light-box-container")
        .classList.replace("d-none", "d-flex");
    }
  });

function display(site) {
  let cartona = "";

  for (let i = 0; i < site.length; i++) {
    cartona += `<tr>
        <td>${i + 1}</td>

        <td>${site[i].name}</td>

        <td>
          <button class="btn btn-visit" onclick="visit(${i})">
            <i class="fa-solid fa-eye pe-2"></i>
            Visit
          </button>
        </td>

        <td>
          <button class="btn btn-delete" onclick="del(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
      </tr>`;
  }

  document.querySelector("#tableBody").innerHTML = cartona;
}

function clearForm() {
  bookmarkName.value = "";
  siteUrl.value = "";
}

function del(index) {
  websitesList.splice(index, 1);
  localStorage.setItem("websitesList", JSON.stringify(websitesList));
  display(websitesList);
}

function urlValidation() {
  let regex =
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

  if (regex.test(siteUrl.value) == true) {
    return true;
  } else {
    return false;
  }
}

function bookmarkNameValidation() {
  let regex = /^[A-Z][a-z]{3,8}$/;

  if (regex.test(bookmarkName.value) == true) {
    return true;
  } else {
    return false;
  }
}

document
  .querySelector("#close-lightbox")
  .addEventListener("click", function () {
    document
      .querySelector("#light-box-container")
      .classList.replace("d-flex", "d-none");
  });

function visit(index) {
  window.open(websitesList.at(index).url);
}

document.addEventListener("click", function (e) {
  if (e.target.offsetWidth > 480 && e.target.offsetHeight > 647) {
    document
      .querySelector("#light-box-container")
      .classList.replace("d-flex", "d-none");
  }
});
