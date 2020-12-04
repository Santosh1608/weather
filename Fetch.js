class Weather {
  constructor(
    name,
    weather_desc,
    temp,
    humidity,
    dew,
    feels_like,
    wind_dir,
    wind_speed,
    icon
  ) {
    this.name = name;
    this.desc = weather_desc;
    this.temp = temp;
    this.humidity = humidity;
    this.dew = dew;
    this.feels_like = feels_like;
    this.wind_dir = wind_dir;
    this.wind_speed = wind_speed;
    this.icon = icon;
  }
}

async function getWeather(address, callback) {
  try {
    console.log(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2FudGVjaCIsImEiOiJja2Z6bXBmaHYyOTA2MnJzOG1iZWIzYnQxIn0.ZzBfghVpYVmT208Pnb9QRQ`
    );
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2FudGVjaCIsImEiOiJja2Z6bXBmaHYyOTA2MnJzOG1iZWIzYnQxIn0.ZzBfghVpYVmT208Pnb9QRQ`
    );
    const loc = await res.json();
    [lon, lat] = loc.features[0].center;
    const weatherRes = await fetch(
      `http://api.weatherstack.com/current?access_key=9aee4641467d9d36597044ee86f750b1&query=${lat},${lon}`
    );
    const weather = await weatherRes.json();
    console.log(weather);
    const placeName = address;
    const weatherData = new Weather(
      placeName,
      weather.current.weather_descriptions[0],
      weather.current.temperature,
      weather.current.humidity,
      weather.current.visibility,
      weather.current.feelslike,
      weather.current.wind_dir,
      weather.current.wind_speed,
      weather.current.weather_icons[0]
    );
    console.log(weatherData);
    callback(null, weatherData);
  } catch {
    callback("error occured", null);
  }
}
