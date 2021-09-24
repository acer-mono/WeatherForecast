import { shallowMount } from "@vue/test-utils";
import ForecastPreview from "@/components/ForecastPreview.vue";

describe("ForecastPreview.vue", () => {
  const forecast = {
    id: "1",
    date: "22/02/2020",
    temperature: 10.1,
    humidity: 11.5,
    icon: "none",
  };
  const wrapper = shallowMount(ForecastPreview, {
    props: { forecast },
  });

  it("render elements", async () => {
    expect(wrapper.text()).toMatch(forecast.date);
    expect(wrapper.text()).toMatch(forecast.temperature.toString());
    expect(wrapper.text()).toMatch(forecast.humidity.toString());
  });
});
