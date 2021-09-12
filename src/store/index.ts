import { createStore } from "vuex";

export type Forecast = {
  date: string;
  temperature: number;
  humidity: number;
};

export default createStore({
  state: {
    cities: ["London", "Moscow", "Novosibirsk"] as string[],
    forecasts: [
      { date: "06.09", temperature: 27.7, humidity: 13.3 },
      { date: "07.09", temperature: 21.3, humidity: 14.1 },
      { date: "08.09", temperature: 13.1, humidity: 10.0 },
      { date: "09.09", temperature: 7.5, humidity: 12.6 },
      { date: "10.09", temperature: 21.0, humidity: 11.8 },
    ] as Forecast[],
  },
  mutations: {},
  actions: {},
  modules: {},
});
