/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  /*Active link*/
  navLink.forEach((n) => n.classList.remove("active"));
  this.classList.add("active");

  /*Remove menu mobile*/
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: true,
});

/*SCROLL HOME*/
sr.reveal(".home__title", {});
sr.reveal(".button", { delay: 200 });
sr.reveal(".home__img", { delay: 400 });
sr.reveal(".home__social-icon", { interval: 200 });

/*SCROLL ABOUT*/
sr.reveal(".about__img", {});
sr.reveal(".about__subtitle", { delay: 400 });
sr.reveal(".about__text", { delay: 400 });


/*SCROLL WORK*/
sr.reveal(".work__img", { interval: 200 });

/*SCROLL CONTACT*/

const URL = "./assets/js/data.json";
const worksContainer = document.querySelector(".work__container");

const showData = (projects) => {
  worksContainer.innerHTML = "";
  projects.forEach((project) => {
    const { img, title, category, link } = project;
    let html = "";
    html += `
          <a class="work-link" href="${link}" target="_blank">
                    <div class="work__img">
                        <img src="${img}" alt="${title}">
                    </div>
                    <div class="work__title">
                        <span>${title}</span>
                    </div>
                </a>
        `;
    worksContainer.insertAdjacentHTML("beforeend", html);
  });
};

let projects = [];
async function getData() {
  const response = await fetch(URL);
  const result = await response.json();
  projects = result;
  showData(projects);
}
window.addEventListener("load", getData);

const selectInput = document.querySelector(".filter-input");
selectInput.addEventListener("change", filterData);

function filterData(e) {
  e.preventDefault();
  let value = selectInput.value;
  console.log(value);
  if (value === "All") {
    showData(projects);
  } else {
    const newProjects = projects.filter((x) => x.category === value);
    showData(newProjects);
  }
}

const scrollUpBtn = document.querySelector(".scroll_up_btn");
scrollUpBtn.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});
