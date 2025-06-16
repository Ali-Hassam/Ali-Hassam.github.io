//for all the collapsible components
document.querySelectorAll(".collapsible__header").forEach((element) =>
  element.addEventListener("click", function () {
    this.parentElement.classList.toggle("collapsible--expanded");
  })
);
const footer__experience = document.getElementById("footer__experience");
const footer__skills = document.getElementById("footer__skills");
const footer_awards = document.getElementById("footer_awards");
const experience = document.getElementById("experience");
const skills = document.getElementById("skills");
const awards = document.getElementById("awards");

//Typed Js for hero component
var typed = new Typed("#typed", {
  stringsElement: "#typed-strings",
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 1000,
  loop: true,
});
function abc() {
  alert(this.innerHTML);
}
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
  "https://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web_grau/default/WEBMERCATOR/{z}/{y}/{x}.png",
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
      //hide the thank you message after promise resolve
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
      // hide errror message after a 5 seconds
      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 5000);
    });
});

// Footer links
// Select all anchors with IDs that start with "foo__"
const anchors = document.querySelectorAll('a[id^="foo__"]');

anchors.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default anchor behavior

    const fullId = anchor.id;
    const targetId = fullId.replace(/^foo__/, ""); // Remove "foo" prefix
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.classList.add("collapsible--expanded");
    }
    // Scroll to the element smoothly
    targetElement.scrollIntoView({ behavior: "smooth" });
  });
});

// Projects Components
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
// anything that starts with data- ...
// See in project articles above the class
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
    //Empty string in Js means "False" and "!False" === "True".
    // Thus matchesSearch is "True" for this project if searchbar is empty.
    const matchesSearch =
      !searchTerm ||
      name.includes(searchTerm) ||
      type.includes(searchTerm) ||
      tech.includes(searchTerm);
    // matchesFilter is true if currentFilter is set to 'all'
    // OR if the project-type matches currentFilter applied via buttons in UI
    const matchesFilter = currentFilter === "all" || type === currentFilter;
    // If words in the searchbar matches name/type/tech of the project or
    // currentFilter applied via a button matches project type, show the project
    if (matchesSearch && matchesFilter) {
      project.style.display = "flex";
      anyVisible = true;
    } else {
      project.style.display = "none";
    }
  });
  // Nothing to show message
  message.style.display = anyVisible ? "none" : "flex";
}
// Filter button click event
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    //change the value of current filter
    currentFilter = button.dataset.filter.toLowerCase();

    // Optional: update active class for styling
    filterButtons.forEach((btn) => btn.classList.remove("btn--active"));
    button.classList.add("btn--active");

    filterProjects();
  });
});
// // Search bar and button click event
// searchInput.addEventListener("input", filterProjects);
// searchBtn.addEventListener("click", filterProjects);
// 1. Initially, do not attach input listener
let inputListenerActivated = false;
// Handle Search button click
searchBtn.addEventListener("click", () => {
  filterProjects();
  inputListenerActivated = true;
});
// Handle input typing — will run only if the search button has been clicked
searchInput.addEventListener("input", () => {
  if (inputListenerActivated) {
    filterProjects();
  }
});

//To open the images onClick
function openImage(event, src) {
  event.preventDefault();

  // Create overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0, 0, 0, 0.8)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.cursor = "zoom-out";
  overlay.style.zIndex = 9999;

  // Create image
  const img = document.createElement("img");
  img.src = src;
  img.style.cursor = "zoom-in";
  img.style.maxWidth = "100%";
  img.style.maxHeight = "100%";
  img.style.transition = "transform 0.3s ease";

  // Toggle zoom on click
  let zoomed = false;
  img.onclick = function (e) {
    //prevent the click propation / bubble up to overlay
    //otherwise the overlay onClick fucntion could also trigger
    e.stopPropagation();
    if (!zoomed) {
      img.style.transform = "scale(" + img.naturalWidth / img.clientWidth + ")";
      img.style.cursor = "zoom-out";
      zoomed = true;
    } else {
      img.style.transform = "scale(1)";
      img.style.cursor = "zoom-in";
      zoomed = false;
    }
  };

  // Remove on overlay click
  overlay.onclick = function () {
    document.body.removeChild(overlay);
  };

  overlay.appendChild(img);
  document.body.appendChild(overlay);
}
