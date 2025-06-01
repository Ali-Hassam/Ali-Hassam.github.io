//for all the collapsible components
document.querySelectorAll(".collapsible__header").forEach((element) =>
  element.addEventListener("click", function () {
    this.parentElement.classList.toggle("collapsible--expanded");
  })
);
//Typed Js for hero component
var typed = new Typed("#typed", {
  stringsElement: "#typed-strings",
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 1000,
  loop: true,
});

//menu toggler for smaller screens
const menuToggle = document.getElementById("menuToggler");
const menuIcon = document.getElementById("menuIcon");

menuToggle.addEventListener("click", () => {
  menuIcon.classList.toggle("fa-bars");
  menuIcon.classList.toggle("fa-times"); // or use "fa-xmark" if you're on FA 6. I am using v5
});

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
const overlay = document.getElementById("contact-overlay");
const messageBanner = document.getElementById("contact-message");

form.addEventListener("submit", function (e) {
  // Prevent the default form submission and page reload
  e.preventDefault();

  // Show the thank you message
  overlay.classList.remove("hidden");
  // hide the thank you message after 5 seconds if the server takes long
  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 5000);

  //get the form-data to submit
  const formData = new FormData(form);
  fetch(
    "https://script.google.com/macros/s/AKfycbwhn-DoEkixJuwJ4VHU1_CgZymyaBxkYh3nkdcuE5GyH1pEuVaayyqkYWCJYPhqzAHd/exec",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.text())
    .then(() => {
      //hide the thank you message
      overlay.classList.add("hidden");
      // Reset the form
      form.reset();
    })
    .catch((error) => {
      console.error("Submission failed:", error);
      // Replace inner HTML of the message banner to show an error otherwise
      messageBanner.innerHTML = `
    <i class="fas fa-exclamation-triangle" style="font-size: 100px; color: #f44336; margin-bottom: 10px;"></i>
    <h2 style="color: #f44336;">Error</h2>
    <h3 style="color: #f44336;">Something went wrong.</h3>
    <h4 style="color: #f44336;">Please try again later.</h4>
  `;
      // hide after a 5 seconds
      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 5000);
    });
});

// Projects Components
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
