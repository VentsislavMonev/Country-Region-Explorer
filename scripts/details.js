const urlParams = new URLSearchParams(window.location.search);
const countryCode = urlParams.get('code');
const isFavorite = urlParams.get('favorite') === "true";

const countryFlag = document.querySelector(".flag");
const countryName = document.querySelector(".name");

const capitalSpan = document.querySelector("#capital");
const AreaSpan = document.querySelector("#Area");
const TimezonesSpan = document.querySelector("#Timezones");
const LanguagesSpan = document.querySelector("#Languages");
const CurrenciesSpan = document.querySelector("#Currencies");
const NeighboursSpan = document.querySelector("#Neighbours");

const heart = document.querySelector(".favourite");
if(isFavorite) {
  heart.querySelector("path").setAttribute("fill", "red");
}
else {
  heart.querySelector("path").setAttribute("fill", "rgb(209 213 218)");
}

fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
.then(response => response.json())
.then(data => {
    countryFlag.src = data[0].flags['png'];
    countryName.textContent = data[0].name["common"];

    capitalSpan.textContent = data[0].capital ? data[0].capital : "N/A";
    AreaSpan.textContent = data[0].area ? `${data[0].area} km²` : "N/A";
    TimezonesSpan.textContent = data[0].timezones ? data[0].timezones.join(", ") : "N/A";
    LanguagesSpan.textContent = data[0].languages? Object.values(data[0].languages).join(", "): "N/A";

    if (data[0].currencies) {
      const currencies = Object.values(data[0].currencies).map(currency => currency.name);
      CurrenciesSpan.textContent = currencies.join(", ");
    } else {
      CurrenciesSpan.textContent = "N/A";
    }
    
    if (data[0].borders) {
      NeighboursSpan.textContent = data[0].borders.join(", ");
    } else {
      NeighboursSpan.textContent = "None";
    }

})
.catch(error => {
  console.error('There was an error fetching the data:', error);
});

heart.addEventListener("click", () => {
   const heartPath = heart.querySelector("path");
    const fillColor = heartPath.getAttribute("fill") === "red" ? "rgb(209 213 218)" : "red";
     heartPath.setAttribute("fill", fillColor);
      localStorage.setItem(countryName.textContent, fillColor === "red" ? "favorite" : "not-favorite");
});