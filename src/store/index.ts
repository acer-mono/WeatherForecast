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
};

export default createStore({
  state: {
    cities: ["London", "Moscow", "Novosibirsk"] as string[],
    forecasts: [] as Forecast[],
    currentForecast: null as Forecast | null,
  },
  mutations: {
    loadForecasts(store) {
      store.forecasts.push(
        ...[
          {
            id: "1",
            date: "06.09",
            temperature: 27.7,
            humidity: 13.3,
            windSpeed: 10,
            windDirection: 258.0,
            airPressure: 1008.0,
            visibility: 5,
          },
          {
            id: "2",
            date: "07.09",
            temperature: 21.3,
            humidity: 14.1,
            windSpeed: 10,
            windDirection: 258.0,
            airPressure: 1008.0,
            visibility: 5,
          },
          {
            id: "3",
            date: "08.09",
            temperature: 13.1,
            humidity: 10.0,
            windSpeed: 10,
            windDirection: 258.0,
            airPressure: 1008.0,
            visibility: 5,
          },
          {
            id: "4",
            date: "09.09",
            temperature: 7.5,
            humidity: 12.6,
            windSpeed: 10,
            windDirection: 258.0,
            airPressure: 1008.0,
            visibility: 5,
          },
          {
            id: "5",
            date: "10.09",
            temperature: 21.0,
            humidity: 11.8,
            windSpeed: 10,
            windDirection: 258.0,
            airPressure: 1008.0,
            visibility: 5,
          },
        ]
      );
    },
    clearForecasts(store) {
      store.forecasts = [];
    },

    setCurrentForecast(store, id) {
      store.currentForecast =
        store.forecasts.find((el) => el.id === id) ?? null;
    },

    setForecast(store, forecast) {
      store.currentForecast = forecast;
    },

    setCities(store, cities: string[]): void {
      store.cities = cities;
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
          console.log(response);
          const currentForecast = {
            id: response.data.current.temp_c,
            date: moment(new Date(response.data.current.last_updated)).format("D MMMM YYYY"),
            temperature: response.data.current.temp_c,
            humidity: response.data.current.humidity,
            windSpeed: response.data.current.wind_mph,
            windDirection: response.data.current.wind_degree,
            airPressure: response.data.current.pressure_mb,
            visibility: response.data.current.vis_km,
          };
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
            commit("setForecast", currentForecast);
        });
    },
  },
  modules: {},
});
