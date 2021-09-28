import { createStore } from "vuex";
import moment from "moment";
import api from "@/components/api";

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

export type State = {
  cities: string[];
  forecasts: PreviewForecast[];
  currentForecast: Forecast | null;
};

export default createStore({
  state(): State {
    return {
      cities: [] as string[],
      forecasts: [] as PreviewForecast[],
      currentForecast: null as Forecast | null,
    };
  },

  mutations: {
    loadForecasts(store: State, forecasts: PreviewForecast[]): void {
      store.forecasts = forecasts;
    },
    setCurrentForecast(store: State, forecast: Forecast): void {
      store.currentForecast = forecast;
    },
    setCities(store: State, cities: string[]): void {
      store.cities = cities;
    },
    reset(store: State): void {
      store.forecasts = [];
      store.currentForecast = null;
    },
  },
  actions: {
    getCities: async ({ commit }) => {
      const { data } = await api.cities.get();
      commit(
        "setCities",
        data.map(({ city }: { city: number[] }) => city)
      );
    },

    getCurrentForecast: async ({ commit }, city: string) => {
      const data = await api.forecasts.current(city);
      const currentForecast = {
        id: data.current.temp_c,
        date: moment(new Date(data.current.last_updated)).format("D MMMM YYYY"),
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_mph,
        windDirection: data.current.wind_degree,
        airPressure: data.current.pressure_mb,
        visibility: data.current.vis_km,
        icon: `http:${data.current.condition.icon}`,
      };
      commit("setCurrentForecast", currentForecast);
    },

    getFiveDaysForecasts: async ({ commit }, city: string) => {
      const data = await api.forecasts.all(city);
      const forecasts = [] as PreviewForecast[];
      data.forecast.forecastday.forEach(
        ({ date, day }: { date: string; day: any }) => {
          const current = {
            id: date,
            date: moment(new Date(date)).format("DD.MM"),
            temperature: day.avgtemp_c,
            humidity: day.avghumidity,
            icon: `http:${day.condition.icon}`,
          };
          forecasts.push(current);
        }
      );
      commit("loadForecasts", forecasts);
    },
  },
});
