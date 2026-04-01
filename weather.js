const WEATHER_LAT = 23.7957;
const WEATHER_LON = 86.4304;

const tempEl = document.getElementById("weather-temp");
const descEl = document.getElementById("weather-desc");
const windEl = document.getElementById("weather-wind");
const timeEl = document.getElementById("weather-time");

const weatherCodeMap = new Map([
  [0, "Clear sky"],
  [1, "Mainly clear"],
  [2, "Partly cloudy"],
  [3, "Overcast"],
  [45, "Fog"],
  [48, "Depositing rime fog"],
  [51, "Light drizzle"],
  [53, "Moderate drizzle"],
  [55, "Dense drizzle"],
  [56, "Light freezing drizzle"],
  [57, "Dense freezing drizzle"],
  [61, "Slight rain"],
  [63, "Moderate rain"],
  [65, "Heavy rain"],
  [66, "Light freezing rain"],
  [67, "Heavy freezing rain"],
  [71, "Slight snowfall"],
  [73, "Moderate snowfall"],
  [75, "Heavy snowfall"],
  [77, "Snow grains"],
  [80, "Slight rain showers"],
  [81, "Moderate rain showers"],
  [82, "Violent rain showers"],
  [85, "Slight snow showers"],
  [86, "Heavy snow showers"],
  [95, "Thunderstorm"],
  [96, "Thunderstorm with hail"],
  [99, "Thunderstorm with heavy hail"],
]);

const formatTime = (isoTime) => {
  if (!isoTime) {
    return "--";
  }
  const parsed = new Date(isoTime);
  if (Number.isNaN(parsed.getTime())) {
    return "--";
  }
  return parsed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const setError = (message) => {
  if (tempEl) tempEl.textContent = "Weather unavailable";
  if (descEl) descEl.textContent = message;
  if (windEl) windEl.textContent = "Wind: --";
  if (timeEl) timeEl.textContent = "Updated: --";
};

const loadWeather = async () => {
  try {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", WEATHER_LAT);
    url.searchParams.set("longitude", WEATHER_LON);
    url.searchParams.set("current_weather", "true");
    url.searchParams.set("timezone", "auto");

    const response = await fetch(url.toString(), { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Weather request failed: ${response.status}`);
    }
    const data = await response.json();
    const current = data?.current_weather;

    if (!current) {
      throw new Error("Weather data missing");
    }

    const temp = Math.round(current.temperature);
    const wind = Math.round(current.windspeed);
    const description = weatherCodeMap.get(current.weathercode) || "Current conditions";

    if (tempEl) tempEl.textContent = `${temp}°C`;
    if (descEl) descEl.textContent = description;
    if (windEl) windEl.textContent = `Wind: ${wind} km/h`;
    if (timeEl) timeEl.textContent = `Updated: ${formatTime(current.time)}`;
  } catch (error) {
    setError("Please try again later");
  }
};

loadWeather();
