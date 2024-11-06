let countryData = [];
fetch('https://restcountries.com/v3.1/all')
  .then(res => res.json())
  .then(dataList => {
    countryData = dataList;
    displayCountries(countryData); 
  })
  .catch(error => console.error("Error fetching data:", error));

function displayCountries(countries) {
  let body = "";

  countries.forEach((element) => {
    body += `
      <div class="col">
        <div class="card shadow-sm">
          <img src="${element.flags.png}" class="card-img-top" alt="${element.name.common} flag">
          <div class="card-body">
            <h5 class="card-title">${element.name.common}</h5>
            <p class="card-text">
              Capital: ${element.capital ? element.capital[0] : "N/A"}<br>
              Region: ${element.region}<br>
              Population: ${element.population.toLocaleString()}
            </p>
            <a href="${element.maps.googleMaps}" target="_blank" class="btn btn-primary">View on Google Maps</a>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("country-info").innerHTML = body;
}

function fetchCountryInfo() {
  const searchQuery = document.getElementById("country-input").value.toLowerCase();

  const filteredCountries = countryData.filter(country => {
    return country.name.common.toLowerCase().includes(searchQuery);
  });

  displayCountries(filteredCountries);
}
