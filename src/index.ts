import { InputNumberSlider } from "./card";
import { InputNumberCardEditor } from "./editor";
declare global {
  interface Window {
    customCards: Array<Object>;
  }
}

customElements.define(
    "custom-input-number-slider-card",
    InputNumberSlider
);
customElements.define(
    "custom-input-number-slider-card-editor",
    InputNumberCardEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "custom-input-number-slider-card",
    name: "Input number slider Card",
    description: "Simple card for controlling input numbers with a round slider!" // optional
});