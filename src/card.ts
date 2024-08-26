import { html, LitElement, TemplateResult, nothing } from "lit";
import { styles } from "./card.styles";
import { state } from "lit/decorators/state";

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  header: string;
  entity: string;
}

export class NamronRegulatorCard extends LitElement {
    // internal reactive states
    @state() _header: string | typeof nothing;
    @state() _entity: string;
    @state() _name: string;
    @state() _state: HassEntity;
    @state() _status: string;

    private _hass;

    setConfig(config: Config) {
        this._header = config.header === "" ? nothing : config.header;
        this._entity = config.entity;
        // call set hass() to immediately adjust to a changed entity
        // while editing the entity in the card editor
        if (this._hass) {
            this.hass = this._hass
        }
    }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._state = hass.states[this._entity];
    if (this._state) {
      this._status = this._state.state;
      let fn = this._state.attributes.friendly_name;
      this._name = fn ? fn : this._entity;
    }
  }


    static styles = styles;

    render() {
        let content: TemplateResult;
        if (!this._state) {
            content = html`
                <p class="error">
                    ${this._entity} is unavailable.
                </p>
            `;
        } else {
            content = html`
                <dl class="dl">
                    <dt class="dt">${this._name}</dt>
                    <dd class="dd" @click="${this.doToggle}">
                        <span class="toggle ${this._status}">
                            <span class="button"></span>
                        </span>
                        <span class="value">${this._status}</span>
                    </dd>
                </dl>
            `;
        }
        return html`
            <ha-card header="${this._header}">
                <div class="card-content">
                    ${content}
                </div>
            </ha-card>
        `;
    }
    // event handling

    doToggle() {
        this._hass.callService("input_boolean", "toggle", {
            entity_id: this._entity
        });
    }

    // card configuration
    static getConfigElement() {
        return document.createElement("namron-regulator-card-dev-editor");
    }

    static getStubConfig() {
        return {
            entity: "input_boolean.toggletest",
            header: "",
        };
    }
}