export const CURRENT_WEATHER_URL =
  "https://api.weatherapi.com/v1/current.json?key=aae21a8c486442cbbab45041211409&aqi=yes";
export const WEATHER_FOR_THREE_DAYS_URL =
  "https://api.weatherapi.com/v1/forecast.json?key=aae21a8c486442cbbab45041211409&aqi=yes";
export const CITIES_URL =
  "https://countriesnow.space/api/v0.1/countries/population/cities";
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

async function handleErrors(response: any) {
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error);
  }
  return data;
}

const api = {
  cities: {
    get: () =>
      fetch(CITIES_URL, {
        method: "GET",
        headers: DEFAULT_HEADERS,
      }).then(handleErrors),
  },
  forecasts: {
    current: (city: string) =>
      fetch(`${CURRENT_WEATHER_URL}&q=${city}`, {
        method: "GET",
        headers: DEFAULT_HEADERS,
      }).then(handleErrors),

    all: (city: string) =>
      fetch(`${WEATHER_FOR_THREE_DAYS_URL}&q=${city}&days=3`, {
        method: "GET",
        headers: DEFAULT_HEADERS,
      }).then(handleErrors),
  },
};

export default api;
