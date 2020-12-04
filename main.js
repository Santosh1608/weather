const closeBtn = document.querySelector(".close");
const changeBtn = document.querySelector(".change");
const popUp = document.querySelector(".back");
const saveBtn = document.querySelector(".save");
const city = document.querySelector(".city");
const state = document.querySelector(".state");
const box = document.querySelector(".box");
const i = document.querySelector(".fa-remove");
closeBtn.addEventListener("click", () => {
  popUp.style.display = "none";
});
i.addEventListener("click", () => {
  popUp.style.display = "none";
});

box.addEventListener("click", (e) => {
  if (e.target.className === "change") {
    popUp.style.display = "block";
    city.value = "";
    state.value = "";
  }
});

saveBtn.addEventListener("click", () => {
  if (city.value.trim() === "" && state.value.trim() === "") {
    const flash = document.querySelector(".flash");
    console.log(flash);
    flash.style.display = "block";
    setTimeout(() => {
      flash.style.display = "none";
    }, 3000);
  } else {
    const position = `${city.value} ${state.value}`;
    getWeather(position, (err, data) => {
      if (data) {
        box.innerHTML = `        <h1>${data.name}</h1>
        <h3>${data.desc}</h3>
        <h2>${data.temp} <span>&deg;</span>C</h2>
        <div class="pic">
          <img src="${data.icon}" alt="Image" />
        </div>
        <div class="bg-light">
          <p>Relative Humidity <span>${data.humidity}%</span></p>
          <p>DewPoint <span>${data.dew}</span> &deg;C</p>
          <p>Feels like <span>${data.feels_like} &deg;C</span></p>
          <p>Wind from the <span>${data.wind_dir}</span> at <span>${data.wind_speed}</span>.0 MPH</p>
        </div>
        <button class="change">Change Location</button>`;
      }
    });
    box.innerHTML = `<div class="spinner-border m-5" style="width: 5rem; height: 5rem;" role="status">
    <span class="sr-only">Loading...</span>
  </div>`;
    popUp.style.display = "none";
  }
});
