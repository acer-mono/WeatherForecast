import { createStore } from "vuex";

export type Forecast = {
  id: string,
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
  },
  actions: {},
  modules: {},
});
