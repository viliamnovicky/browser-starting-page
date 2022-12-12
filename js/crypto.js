const crypto = document.getElementById("crypto")
const cryptoClose = document.querySelector(".btn-close")

const modalCryptoBack = document.querySelector(".modal-back")
const modalCrypto = document.querySelector(".modal")
const modalCoinName = document.querySelector(".modal-coin-name")
const modalCoinPrice = document.getElementById("modal-coin-price")
const modalCoinDiff = document.getElementById("modal-coin-diff")
const modalCoinHight = document.getElementById("modal-coin-hight")
const modalCoinLow = document.getElementById("modal-coin-low")
const modalCoinAth = document.getElementById("modal-coin-ath")
const modalCoinMarket = document.getElementById("modal-coin-market")
const modalCoinSupply = document.getElementById("modal-coin-supply")
const modalCoinAtl = document.getElementById("modal-coin-atl")
const modalCoinCirc = document.getElementById("modal-coin-circ")
const modalImage = document.querySelector(".modal-img")

const getCryptoData = function() {
  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data[1]);
      for (let coin = 0; coin <= 99; coin++) {
        
        if ( parseFloat(data[coin].price_change_percentage_24h) > 0) {
          crypto.insertAdjacentHTML("beforeend", `
      <div class="info-div crypto-div" id = "${data[coin].symbol}-div" data-position = "${data[coin].market_cap_rank}">
      <div class = "coin" id="${data[coin].symbol}"><br>
        <h1 id="${data[coin].symbol}-actual" style = "text-align: center">#${data[coin].market_cap_rank} ${(data[coin].symbol).toUpperCase()}</h1>
        <h3 id="${data[coin].symbol}-actual">Actual price: ${parseFloat(data[coin].current_price).toFixed(2)}$</h3>
        <h3 class = "green" id="${data[coin].symbol}-dif">Difference (24h): <span> ${parseFloat(data[coin].price_change_percentage_24h).toFixed(2)}%</span></h3><br>
        <h3 id="${data[coin].symbol}-ath">ATH: ${parseFloat(data[coin].ath)}$</h3>
        <img src="${data[coin].image}" width = "100px">
      </div>
    </div>`)
        }
        else {
          crypto.insertAdjacentHTML("beforeend", `
      <div class="info-div crypto-div" id = "${data[coin].symbol}-div" data-position = "${data[coin].market_cap_rank}">
      <div class = "coin" id="${data[coin].symbol}"><br>
        <h1 id="${data[coin].symbol}-actual" style = "text-align: center">#${data[coin].market_cap_rank} ${(data[coin].symbol).toUpperCase()}</h1>
        <h3 id="${data[coin].symbol}-actual">Actual price: ${parseFloat(data[coin].current_price).toFixed(2)}$</h3>
        <h3 class = "red" id="${data[coin].symbol}-dif">Difference (24h): <span> ${parseFloat(data[coin].price_change_percentage_24h).toFixed(2)}%</span></h3><br>
        <h3 id="${data[coin].symbol}-ath">ATH: ${parseFloat(data[coin].ath)}$</h3>
        <img src="${data[coin].image}" width = "100px">
      </div>
    </div>`)
        }
        
      }
      const cryptoDiv = document.querySelectorAll(".crypto-div")
      cryptoDiv.forEach(div => div.addEventListener("click", function() {
        const index = parseInt(div.dataset.position) - 1
        modalCryptoBack.classList.remove("hidden")
        modalCoinName.textContent = `#${data[index].market_cap_rank} ${(data[index].symbol).toUpperCase()}`
        modalCoinPrice.textContent = ` ${parseFloat(data[index].current_price).toFixed(2)}$`
        modalCoinHight.textContent = ` ${parseFloat(data[index].high_24h).toFixed(2)}$`
        modalCoinLow.textContent = ` ${parseFloat(data[index].low_24h).toFixed(2)}$`
        modalCoinDiff.textContent = ` ${parseFloat(data[index].price_change_percentage_24h).toFixed(2)}%`
        modalCoinAth.textContent = `${parseFloat(data[index].ath)}$`
        modalCoinMarket.textContent = `${parseFloat((data[index].market_cap) / 1000000000).toFixed(2)}mld $`
        modalCoinSupply.textContent = `${parseFloat(data[index].max_supply)}`
        modalCoinAtl.textContent = `${parseFloat(data[index].atl)}$`
        modalCoinCirc.textContent = `${parseFloat(data[index].circulating_supply)}`
        modalImage.src = `${data[index].image}`

        // document.querySelector(".weather").classList.add("blur")
        // document.querySelector(".back").classList.add("blur")
        // document.querySelector(".links").classList.add("blur")
        // document.querySelector(".diesel-div").classList.add("blur")
        // document.querySelector(".music-player").classList.add("blur")
        // crypto.classList.add("blur")
      }))
    });
};


getCryptoData()

cryptoClose.addEventListener("click", function() {
  modalCryptoBack.classList.add("hidden")
  document.querySelector(".weather").classList.remove("blur")
  document.querySelector(".back").classList.remove("blur")
  document.querySelector(".links").classList.remove("blur")
  document.querySelector(".music-player").classList.remove("blur")
  document.querySelector(".diesel-div").classList.remove("blur")
  crypto.classList.remove("blur")
})

// setInterval(function() {
// window.location.reload()
// }, 50000)