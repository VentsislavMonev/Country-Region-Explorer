const list = document.querySelector("ul");
const applyButton = document.querySelector(".apply-button");
let countries = [];

const urlParams = new URLSearchParams(window.location.search);
const region = urlParams.get('region');

fetch(`https://restcountries.com/v3.1/region/${region}`)
.then(response => response.json())
.then(data => {
  countries=data;
  render_countries(countries);
})
.catch(error => {
  console.error('There was an error fetching the data:', error);
});

function render_countries(countries) {
  list.innerHTML = "";
  for (const country of countries) 
  {      
    const isFavorite = localStorage.getItem(country.name.common) === "favorite";
    const heartColor = isFavorite ? "red" : "rgb(209 213 218)";
    
    const country_li = document.createElement("li");
    country_li.classList.add("gei");
    country_li.innerHTML =
    `<img class="country-image" src="${country.flags.png}" alt="country flag">
    
    <div class="country-header">
      <span>${country.name.common}</span>
      <svg class="heart-img">
        <path fill="${heartColor}" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
    
    <button class="check-country">Check country</button>`;
    list.appendChild(country_li);
  }
}

applyButton.addEventListener("click", (e) => {
  e.preventDefault();

  const sortOption = document.querySelector('input[name="sort"]:checked')?.value;
  const nameSearchInput = document.querySelector("#name-input");
  const nameSearch = nameSearchInput.value;

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(nameSearch)
  );

  switch (sortOption)
  {
    case "ascending" :
      filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
      break;
    case "descending" :
      filteredCountries.sort((a, b) => b.name.common.localeCompare(a.name.common));
      break;
  }
  render_countries(filteredCountries);
})

list.addEventListener("click", e => {
  if (e.target && e.target.classList.contains("check-country")) {
    const countryName = e.target.closest("li").querySelector(".country-header span").textContent;
    const country = countries.find(c => c.name.common === countryName);
    const isFavorite = localStorage.getItem(countryName) === "favorite";

    if (country) {
      window.location.assign(`/details.html?code=${country.cca3}&favorite=${isFavorite}`);
    } 
    else {
      console.error("Country not found in the list.");
    }
  }
      
  if (e.target && e.target.closest("svg").classList.contains("heart-img")) {
    const heartPath = e.target.closest("svg").querySelector("path");
    const countryName = e.target.closest("li").querySelector(".country-header span").textContent;
    
    if (heartPath.getAttribute("fill") === "red") {
      heartPath.setAttribute("fill", "rgb(209 213 218)");
      localStorage.setItem(countryName, "not-favorite");
    } else {
      heartPath.setAttribute("fill", "red");
      localStorage.setItem(countryName, "favorite");
    }
  }
});