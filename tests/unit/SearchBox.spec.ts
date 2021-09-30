import { shallowMount } from "@vue/test-utils";
import SearchBox from "@/components/SearchBox.vue";
import Vuex from "vuex";

describe("SearchBox.vue", () => {
  const options = ["first", "second"];
  const wrapper = shallowMount(SearchBox, {
    props: { options },
  });
  const input = wrapper.find("input");

  it("search elements", async () => {
    await input.setValue(options[0][0]);
    await input.trigger("focus");
    expect(wrapper.vm.searchString).toEqual(options[0][0]);
    expect(wrapper.vm.isInputInFocus).toEqual(true);
    expect(wrapper.text()).toMatch(options[0]);
  });

  it("select item", async () => {
    const actions = {
      getCurrentForecast: jest.fn(),
      getFiveDaysForecasts: jest.fn(),
    };
    const store = new Vuex.Store({ actions });
    const wrapper = shallowMount(SearchBox, {
      props: { options },
      global: {
        mocks: {
          $store: store,
        },
      },
    });
    const input = wrapper.find("input");
    await input.setValue(options[0][0]);
    await input.trigger("focus");
    const option = wrapper.find(".option");

    await option.trigger("mousedown");
    expect(actions.getFiveDaysForecasts).toHaveBeenCalled();
    expect(actions.getCurrentForecast).toHaveBeenCalled();
  });

  it("blur after searching elements", async () => {
    await input.setValue(options[0][0]);
    await input.trigger("focus");
    await input.trigger("blur");
    expect(wrapper.text()).toBe("");
  });

  it("clear search", async () => {
    await input.setValue(options[0][0]);
    await input.trigger("focus");
    await input.setValue("");
    expect(wrapper.text()).toBe("");
  });
});
