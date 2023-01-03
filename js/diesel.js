const diesel = document.querySelector(".diesel");

const getDiesel = function () {
  fetch(
    `https://creativecommons.tankerkoenig.de/json/list.php?lat=47.390&lng=11.255&rad=50&sort=dist&type=all&apikey=b2f21a59-fb34-c7ca-47ea-68587c82cc20`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      diesel.insertAdjacentHTML(
        "afterbegin",
        `<h3 class = "diesel__text">Agip Klais: ${data.stations[0].diesel}€</h3>
        <h3 class = "diesel__text">Sunoil Mittenwald: ${data.stations[1].diesel}€</h3>
        <h3 class = "diesel__text">SB Krun: ${data.stations[2].diesel}€</h3>
        <h3 class = "diesel__text">Shell GAP: ${data.stations[3].diesel}€</h3>
        <h3 class = "diesel__text">Aral GAP: ${data.stations[4].diesel}€</h3>`
      );
    });
};

const getDieselI = function () {
  fetch(
    `https://api.e-control.at/sprit/1.0/search/gas-stations/by-address?latitude=47.390&longitude=11.255&fuelType=DIE&includeClosed=true`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i <= 9; i++) {
        if (data[i].name === "Reinpold Tankstelle Scharnitz") {
          diesel.insertAdjacentHTML(
            "afterbegin",
            `<h3 class = "diesel__text">ENI Scharnitz: ${parseFloat(data[4].prices[0].amount)}€</h3>`
          );
        }
      }
    });
};

getDiesel();
getDieselI();
