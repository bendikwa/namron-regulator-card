import {html, LitElement, TemplateResult, nothing, svg} from 'lit';
import styles from './card.styles';
import {state} from "lit/decorators/state";

import {HassEntity} from "home-assistant-js-websocket";
import {HomeAssistant, LovelaceCardConfig} from "custom-card-helpers";

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
        const slider =
            this._state.state === "unavailable"
                ? html` <round-slider disabled="true"></round-slider> `
                : html`
                    <round-slider 
                            value="50"
                            step="10"
                            
                    ></round-slider>
                `;

        const currentTemperature = svg`
            <svg viewBox="0 0 40 20">
              <text
                x="50%"
                dx="1"
                y="60%"
                text-anchor="middle"
                style="font-size: 13px;"
              >
                ${
                this._state.state !== "unavailable" &&
                50 != null &&
                !isNaN(50)
                    ? svg`
                        50
                        <tspan dx="-3" dy="-6.5" style="font-size: 4px;">
                          50
                        </tspan>
                      `
                    : nothing
                }
              </text>
            </svg>
          `;

        return html`
          <ha-card header="${this._header}">
            <div class="content">
              <div id="controls">
                <div id="slider">
                  ${slider}
                </div>
              </div>
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

    private _dragEvent(e): void {
        console.log("_dragEvent");
    }

    private _setTemperature(e): void {
        console.log("_setTemperature");
    }

    public getCardSize(): number {
        return 7;
    }
}