import { NamronRegulatorCard } from "./card";
import { NamronRegulatorCardEditor } from "./editor";
declare global {
    interface Window {
        customCards: Array<Object>;
    }
}

customElements.define(
    "namron-regulator-card-dev",
    NamronRegulatorCard
);
customElements.define(
    "namron-regulator-card-dev-editor",
    NamronRegulatorCardEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "namron-regulator-card-dev",
    name: "Namron Regulator Card",
    description: "Simple card for Namron Regulator!" // optional
});