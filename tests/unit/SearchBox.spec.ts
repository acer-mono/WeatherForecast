import { shallowMount } from "@vue/test-utils";
import SearchBox from "@/components/SearchBox.vue";

describe("SearchBox.vue", () => {
  it("renders props.options when passed", async () => {
    const options = ["first", "second"];
    const wrapper = shallowMount(SearchBox, {
      props: { options },
    });
    const input = wrapper.find("input");
    await input.setValue(options[0][0]);
    expect(wrapper.text()).toMatch(options[0]);
  });
});
