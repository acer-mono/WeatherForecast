import { mutations } from "../../src/store";
import { actions } from "../../src/store";
import { createStore } from "vuex";
import fetchMock from "jest-fetch-mock";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

const initialState = {
  cities: [],
  forecasts: [],
  currentForecast: null,
};
let store;

describe("mutation tests", () => {
  beforeEach(() => {
    store = createStore({
      state: { ...initialState },
      mutations,
    });
  });

  it("loadForecasts", () => {
    const previewForecast = [
      {
        id: "1",
        date: "23/02/1999",
        temperature: "23.0",
        humidity: "18",
        icon: "hello/world",
      },
    ];

    store.commit("loadForecasts", previewForecast);
    expect(store.state.forecasts.length).toBe(1);
  });

  it("setCurrentForecast", () => {
    const forecast = {
      id: "1",
      date: "1",
      temperature: "1",
      humidity: "1",
      windSpeed: "1",
      windDirection: "1",
      airPressure: "1",
      visibility: "1",
      icon: "1",
    };

    store.commit("setCurrentForecast", forecast);
    expect(store.state.currentForecast).toEqual(forecast);
  });

  it("setCities", () => {
    const cities = ["1", "2"];
    const store = createStore({
      state: { ...initialState },
      mutations,
    });

    store.commit("setCities", cities);
    expect(store.state.cities.length).toEqual(cities.length);
  });

  it("reset", () => {
    const forecast = {
      id: "1",
      date: "1",
      temperature: "1",
      humidity: "1",
      windSpeed: "1",
      windDirection: "1",
      airPressure: "1",
      visibility: "1",
      icon: "1",
    };

    const previewForecast = [
      {
        id: "1",
        date: "23/02/1999",
        temperature: "23.0",
        humidity: "18",
        icon: "hello/world",
      },
    ];

    store.commit("loadForecasts", previewForecast);
    store.commit("setCurrentForecast", forecast);
    store.commit("reset");
    expect(store.state.forecasts.length).toBe(0);
    expect(store.state.currentForecast).toBe(null);
  });
});

describe("actions", () => {
  it("getCities", async () => {
    const data = { data: [{ city: "1" }, { city: "2" }] };
    fetchMock.mockResponseOnce(JSON.stringify(data));
    const commit = jest.fn();
    await actions.getCities({ commit });
    expect(commit).toHaveBeenCalledWith("setCities", ["1", "2"]);
  });

  it("getCurrentForecast", async () => {
    {
      const data = {
        current: {
          last_updated: "2021-10-07 03:45",
          temp_c: "12",
          humidity: "12",
          wind_mph: "12",
          wind_degree: "12",
          pressure_mb: "12",
          vis_km: "12",
          condition: {
            icon: "12",
          },
        },
      };
      fetchMock.mockResponseOnce(JSON.stringify(data));
      const commit = jest.fn();
      await actions.getCurrentForecast({ commit }, "");
      expect(commit).toHaveBeenCalledWith("setCurrentForecast", {
        airPressure: data.current.pressure_mb,
        date: "7 October 2021",
        humidity: data.current.humidity,
        icon: `http:${data.current.condition.icon}`,
        id: data.current.temp_c,
        temperature: data.current.temp_c,
        visibility: data.current.vis_km,
        windDirection: data.current.wind_degree,
        windSpeed: data.current.wind_mph,
      });
    }
  });

  it("getFiveDaysForecasts", async () => {
    {
      const data = {
        forecast: {
          forecastday: [
            {
              date: "2021-10-07",
              day: {
                avgtemp_c: "7",
                avghumidity: "59",
                condition: {
                  icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
                },
              },
            },
          ],
        },
      };
      fetchMock.mockResponseOnce(JSON.stringify(data));
      const commit = jest.fn();
      await actions.getFiveDaysForecasts({ commit }, "");
      expect(commit).toHaveBeenCalledWith("loadForecasts", [
        {
          id: data.forecast.forecastday[0].date,
          date: "07.10",
          humidity: data.forecast.forecastday[0].day.avghumidity,
          temperature: data.forecast.forecastday[0].day.avgtemp_c,
          icon: `http:${data.forecast.forecastday[0].day.condition.icon}`,
        },
      ]);
    }
  });
});
