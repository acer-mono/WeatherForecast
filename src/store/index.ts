import { Commit, createStore } from "vuex";
import api from "@/components/api";
import {
  convertCurrentForecast,
  convertForecasts,
} from "@/adapters/weatherapi";

export type Forecast = {
  id: string;
  date: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
  windDirection: string;
  airPressure: string;
  visibility: string;
  icon: string;
};

export type PreviewForecast = {
  id: string;
  date: string;
  temperature: string;
  humidity: string;
  icon: string;
};

export type State = {
  cities: string[];
  forecasts: PreviewForecast[];
  currentForecast: Forecast | null;
};

export const getters = {
  forecasts: (state: State): PreviewForecast[] => {
    return state.forecasts;
  },
  currentForecast: (state: State): Forecast | null => {
    return state.currentForecast;
  },
  cities: (state: State): string[] => {
    return state.cities;
  },
};

export const mutations = {
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
};

export const actions = {
  getCities: async ({ commit }: { commit: Commit }): Promise<void> => {
    const { data } = await api.cities.get();
    commit(
      "setCities",
      data.map(({ city }: { city: number[] }) => city)
    );
  },

  getCurrentForecast: async (
    { commit }: { commit: Commit },
    city: string
  ): Promise<void> => {
    const data = await api.forecasts.current(city);
    commit("setCurrentForecast", convertCurrentForecast(data));
  },

  getFiveDaysForecasts: async (
    { commit }: { commit: Commit },
    city: string
  ): Promise<void> => {
    let data;
    await api.forecasts
      .all(city)
      .then((res) => {
        data = res;
        commit("loadForecasts", convertForecasts(data));
      })
      .catch(() => {
        alert("Failed to recognize location");
      });
  },
};

export default createStore({
  state(): State {
    return {
      cities: [] as string[],
      forecasts: [] as PreviewForecast[],
      currentForecast: null as Forecast | null,
    };
  },
  mutations,
  actions,
  getters,
});
