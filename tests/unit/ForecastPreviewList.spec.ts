import { mount } from "@vue/test-utils";
import ForecastPreviewList from "@/components/ForecastPreviewList.vue";
import { getters } from "@/store";
import Vuex from "vuex";

describe("ForecastPreviewList.vue", () => {
  it("", () => {
    const forecasts = [
      {
        id: "1",
        date: "26/2/2222",
        temperature: "12.2",
        humidity: "70.1",
        icon: "somePath",
      },
      {
        id: "2",
        date: "26/2/2222",
        temperature: "12.2",
        humidity: "70.1",
        icon: "somePath",
      },
    ];

    const state = {
      cities: [],
      forecasts,
      currentForecast: null,
    };

    const store = new Vuex.Store({ state, getters });

    const wrapper = mount(ForecastPreviewList, {
      global: {
        mocks: {
          $store: store,
        },
      },
    });

    expect(wrapper.text()).toMatch(forecasts[0].date);
    expect(wrapper.text()).toMatch(forecasts[0].temperature);
    expect(wrapper.text()).toMatch(forecasts[0].humidity);

    expect(wrapper.text()).toMatch(forecasts[1].date);
    expect(wrapper.text()).toMatch(forecasts[1].temperature);
    expect(wrapper.text()).toMatch(forecasts[1].humidity);
  });
});
