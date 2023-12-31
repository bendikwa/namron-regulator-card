import {html, LitElement, TemplateResult, nothing, svg} from 'lit';
import styles from './card.styles';
import {state} from "lit/decorators/state";

import {HassEntity} from "home-assistant-js-websocket";
import {fireEvent, HomeAssistant, LovelaceCardConfig} from "custom-card-helpers";
import {mdiDotsVertical} from "@mdi/js";

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

    private _hass: HomeAssistant;

    public getCardSize(): number {
        return 7;
    }

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

        const name = this._name;
        const value: string = "60";

        const slider =
            this._state.state === "unavailable"
                ? html`
                        <round-slider disabled="true"></round-slider> `
                : html`
                        <round-slider
                                value=${value}
                                step="10"
                                @value-changed=${this._setRegulatorValue}
                        ></round-slider>
                `;

        const currentRegulatorValue = svg`
            <svg viewBox="0 0 40 20">
              <text
                x="50%"
                dx="1"
                y="60%"
                text-anchor="middle"
                style="font-size: 13px;"
              >
                ${value 
                    ? svg`
                        ${value}%
                      `
                    : nothing
                }
              </text>
            </svg>
          `;

        return html`
            <ha-card header="${this._header}">
                <ha-icon-button
                        class="more-info"
                        .label="Show more info"
                        .path=${mdiDotsVertical}
                        @click=${this._handleMoreInfo}
                        tabindex="0"
                ></ha-icon-button>
                <div class="content">
                    <div id="controls">
                        <div id="slider">
                            ${slider}
                            <div id="slider-center">
                                <div id="temperature">${currentRegulatorValue}</div>
                            </div>
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

    private _handleMoreInfo() {
        fireEvent(this, "hass-more-info", {
            entityId: this._entity,
        });
    }

    private _setRegulatorValue(e): void {
        console.log("_setRegulatorValue");
        console.log(e.detail.value);
    }
}