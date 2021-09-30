import { shallowMount } from "@vue/test-utils";
import Forecast from "@/components/Forecast.vue";
import Vuex from "vuex";

describe("Forecast.vue", () => {
  it("", () => {
    const currentForecast = {
      id: "123",
      date: "26/12/1800",
      temperature: "11.2",
      humidity: "0.1",
      windSpeed: "12.3",
      windDirection: "234",
      airPressure: "1234",
      visibility: "1",
      icon: "somePath",
    };

    const state = {
      cities: [],
      forecasts: [],
      currentForecast,
    };

    const store = new Vuex.Store({ state });

    const wrapper = shallowMount(Forecast, {
      global: {
        mocks: {
          $store: store,
        },
      },
    });

    const image = wrapper.find("img");
    expect(image.attributes("alt")).toMatch(currentForecast.icon);
    expect(wrapper.text()).toMatch(currentForecast.id);
    expect(wrapper.text()).toMatch(currentForecast.date);
    expect(wrapper.text()).toMatch(currentForecast.temperature);
    expect(wrapper.text()).toMatch(currentForecast.humidity);
    expect(wrapper.text()).toMatch(currentForecast.windSpeed);
    expect(wrapper.text()).toMatch(currentForecast.windDirection);
    expect(wrapper.text()).toMatch(currentForecast.airPressure);
    expect(wrapper.text()).toMatch(currentForecast.visibility);
  });
});
