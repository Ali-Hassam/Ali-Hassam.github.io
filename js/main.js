// for collapsible and navbar
allElements = document.querySelectorAll(".collapsible__header");
allElements.forEach((element) => {
  element.addEventListener("click", function () {
    allElements.forEach((element) => {
      element === this
        ? element.parentElement.classList.toggle("collapsible--expanded")
        : element.parentElement.classList.remove("collapsible--expanded");
    });
  });
});

document.querySelectorAll(".collapsible__header__CV").forEach((element) =>
  element.addEventListener("click", function () {
    this.parentElement.classList.toggle("collapsible--expanded");
  })
);
const menuToggle = document.getElementById("menuToggler");
const menuIcon = document.getElementById("menuIcon");

menuToggle.addEventListener("click", () => {
  menuIcon.classList.toggle("fa-bars");
  menuIcon.classList.toggle("fa-times"); // or use "fa-xmark" if you're on FA 6
});

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const filterButtons = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll(".project");
const message = document.querySelector(".portfolio__warning");

let currentFilter = "all"; // default to show all projects
searchInput.value = ""; // default nothing in the search bar

// Main filtering function
function filterProjects() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let anyVisible = false;

  projects.forEach((project) => {
    const name = project.dataset.name?.toLowerCase() || "";
    const type = project.dataset.type?.toLowerCase() || "";
    const tech = project.dataset.tech?.toLowerCase() || "";

    const matchesSearch =
      !searchTerm || // match all if search bar is empty
      name.includes(searchTerm) ||
      type.includes(searchTerm) ||
      tech.includes(searchTerm);

    const matchesFilter = currentFilter === "all" || type === currentFilter;

    if (matchesSearch && matchesFilter) {
      project.style.display = "flex";
      anyVisible = true;
    } else {
      project.style.display = "none";
    }
  });

  message.style.display = anyVisible ? "none" : "flex";
}
// Filter button click event
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter.toLowerCase();

    // Optional: update active class if you want styling
    filterButtons.forEach((btn) => btn.classList.remove("btn--active"));
    button.classList.add("btn--active");

    filterProjects();
  });
});
// Search bar and button click event
searchInput.addEventListener("input", filterProjects);
searchBtn.addEventListener("click", filterProjects);

//Expand-one-collpase-other (final logic)
allElements = document.querySelectorAll(".collapsible__header");
allElements.forEach((element) => {
  element.addEventListener("click", function () {
    allElements.forEach((element) => {
      element === this
        ? element.parentElement.classList.toggle("collapsible--expanded")
        : element.parentElement.classList.remove("collapsible--expanded");
    });
  });
});

//for header expand-and-collapse
document.querySelectorAll(".collapsible__header__CV").forEach((element) =>
  element.addEventListener("click", function () {
    this.parentElement.classList.toggle("collapsible--expanded");
  })
);

// Contact - Map
var map = L.map("map").setView([51.9694182, 7.5956726], 10);

L.tileLayer(
  "http://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web_grau/default/WEBMERCATOR/{z}/{y}/{x}.png",
  {
    maxZoom: 18,
    attribution:
      'Map data: &copy; <a href="http://www.govdata.de/dl-de/by-2-0">dl-de/by-2-0</a>',
  }
).addTo(map);
var marker = L.marker([51.9694182, 7.5956726]).addTo(map);
marker.bindPopup("<b><h2>GEO 1</b></h2><br> <h3>Universität Münster</h3>");

//Contact - contact form
const form = document.getElementById("contact-form");
// const thankYouMessage = document.getElementById("thank-you-message");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  const formData = new FormData(form);
  // const data = new URLSearchParams(formData);

  fetch(
    "https://script.google.com/macros/s/AKfycbwhn-DoEkixJuwJ4VHU1_CgZymyaBxkYh3nkdcuE5GyH1pEuVaayyqkYWCJYPhqzAHd/exec",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.text())
    .then((responseText) => {
      // Show the thank you alert
      alert(
        "Thank you for your message.\nI will reach out to you as soon as possible"
      );
      // Reset the form
      form.reset();
    })
    .catch((error) => {
      console.error("Submission failed:", error);
    });
});
