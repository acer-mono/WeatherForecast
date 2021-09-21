import { createStore } from "vuex";
import axios from "axios";
import moment from "moment";

export type Forecast = {
  id: string;
  date: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  airPressure: number;
  visibility: number;
  icon: string;
};

export type PreviewForecast = {
  id: string;
  date: string;
  temperature: number;
  humidity: number;
  icon: string;
};

export default createStore({
  state: {
    cities: [] as string[],
    forecasts: [] as PreviewForecast[],
    currentForecast: null as Forecast | null,
  },
  mutations: {
    loadForecasts(store, forecasts) {
      store.forecasts = forecasts;
    },
    setCurrentForecast(store, forecast) {
      store.currentForecast = forecast;
    },
    setCities(store, cities: string[]): void {
      store.cities = cities;
    },
    reset(store): void {
      store.forecasts = [];
      store.currentForecast = null;
    },
  },
  actions: {
    getCities: function ({ commit }) {
      axios
        .get("https://countriesnow.space/api/v0.1/countries/population/cities")
        .then((response) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          commit("setCities", response.data.data.map((a) => a.city));
        });
    },

    getCurrentForecast: function ({ commit }, city) {
      axios
        .get(`http://api.weatherapi.com/v1/current.json?key=aae21a8c486442cbbab45041211409&q=${city}&aqi=yes`)
        .then((response) => {
          const currentForecast = {
            id: response.data.current.temp_c,
            date: moment(new Date(response.data.current.last_updated)).format("D MMMM YYYY"),
            temperature: response.data.current.temp_c,
            humidity: response.data.current.humidity,
            windSpeed: response.data.current.wind_mph,
            windDirection: response.data.current.wind_degree,
            airPressure: response.data.current.pressure_mb,
            visibility: response.data.current.vis_km,
            icon: `http:${response.data.current.condition.icon}`,
          };
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          commit("setCurrentForecast", currentForecast);
        });
    },

    getFiveDaysForecasts: function ({ commit }, city) {
      axios
        .get(
          `http://api.weatherapi.com/v1/forecast.json?key=aae21a8c486442cbbab45041211409&q=${city}&days=3`
        )
        .then((response) => {
          let forecasts: PreviewForecast[];
          // eslint-disable-next-line prefer-const
          forecasts = [];
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          response.data.forecast.forecastday.forEach(({ date, day }) => {
            const current = {
              id: date,
              date: moment(new Date(date)).format("DD.MM"),
              temperature: day.avgtemp_c,
              humidity: day.avghumidity,
              icon: `http:${day.condition.icon}`,
            };
            forecasts.push(current);
          });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          commit("loadForecasts", forecasts);
        });
    },
  },
});
