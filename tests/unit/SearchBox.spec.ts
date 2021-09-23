import { shallowMount } from "@vue/test-utils";
import SearchBox from "@/components/SearchBox.vue";

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
