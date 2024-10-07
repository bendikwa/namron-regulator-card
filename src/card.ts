import {html, LitElement, TemplateResult, nothing} from "lit";
import {styles} from "./card.styles";
import {state} from "lit/decorators";
import { mdiMinus, mdiPlus } from '@mdi/js'

import {HassEntity} from "home-assistant-js-websocket";
import {HomeAssistant, LovelaceCardConfig} from "custom-card-helpers";
import {ResizeController} from "@lit-labs/observers/resize-controller";

interface Config extends LovelaceCardConfig {
    header: string;
    entity: string;
}

export type LovelaceLayoutOptions = {
    grid_columns?: number | "full";
    grid_rows?: number | "auto";
    grid_max_columns?: number;
    grid_min_columns?: number;
    grid_min_rows?: number;
    grid_max_rows?: number;
};

export class InputNumberSlider extends LitElement {
    // internal reactive states
    @state() _header: string | typeof nothing;
    @state() _entity: string;
    @state() _name: string;
    @state() _value: number;
    @state() _unit: string = "%";
    @state() _step: number = 1;
    @state() _min: number = 0;
    @state() _max: number = 100;
    @state() _active: boolean = false;
    @state() _state: HassEntity;
    @state() _length: number = 0;

    private _containerSizeController = new ResizeController(this, {
        callback: (entries) => {
            const width = entries[0]?.contentRect.width;
            return width < 148
                ? "xs"
                : width < 208
                    ? "sm"
                    : width < 268
                        ? "md"
                        : "lg";
        },
    });

    private _maxWidthController = new ResizeController(this, {
        callback: (entries) => {
            const container = entries[0]?.target.shadowRoot?.querySelector(
                ".container"
            ) as HTMLElement | undefined;
            return container?.clientWidth;
        },
    });

    public getLayoutOptions(): LovelaceLayoutOptions {
        const grid_columns = 4;
        let grid_rows = 5;
        let grid_min_rows = 2;
        const grid_min_columns = 2;
        if (this._length >= 0) {
            const featureHeight = Math.ceil((this._length * 2) / 3);
            grid_rows += featureHeight;
            grid_min_rows += featureHeight;
        }
        return {
            grid_columns,
            grid_rows,
            grid_min_rows,
            grid_min_columns,
        };
    }

    public getCardSize(): number {
        return 7;
    }


    @state() _status: string;
    private _hass: HomeAssistant;

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
            if (!this._active) {
                this._value = Number(this._state.state);
            }
            let fn = this._state.attributes.friendly_name;
            let state_min: number = this._state.attributes.min;
            let state_max: number = this._state.attributes.max;
            let state_step: number = this._state.attributes.step;
            this._name = fn ? fn : this._entity;
            this._min = state_min ? state_min : this._min;
            this._max = state_max ? state_max : this._max;
            this._step = state_step ? state_step : this._step;
        }
    }

    private _renderButtons() {
        return html`
            <div class="buttons">
                <ha-outlined-icon-button
                        .step=${-this._step}
                        @click=${this.doHandleButton}
                >
                    <ha-svg-icon .path=${mdiMinus}></ha-svg-icon>
                </ha-outlined-icon-button>
                <ha-outlined-icon-button
                        .step=${this._step}
                        @click=${this.doHandleButton}
                >
                    <ha-svg-icon .path=${mdiPlus}></ha-svg-icon>
                </ha-outlined-icon-button>
            </div>
        `;
    }

    static styles = styles;

    render() {
        let slider: TemplateResult;
        let value: number = 0;

        const containerSizeClass = this._containerSizeController.value
            ? ` ${this._containerSizeController.value}`
            : "";

        const controlMaxWidth = this._maxWidthController.value
            ? `${this._maxWidthController.value}px`
            : undefined;

        slider = html`
            <round-slider class="round-slider"
                          value=${this._value}
                          step=${this._step}
                          min=${this._min}
                          max=${this._max}
                          @value-changed=${this.doSetValue}
                          @value-changing=${this.doUpdateCenterView}
            ></round-slider>
        `;

        return html`
            <ha-card>
                <p class="title">
                    ${this._header}
                </p>
                <div class="container">
                    <input-number-slider style="max-width: ${controlMaxWidth}">
                        <div class="container${containerSizeClass}">
                            <div class="info">
                                <p class="value">
                                    <span class="displayed-value">
                                        <span>
                                            ${this._value}
                                        </span>
                                        <span class="unit">
                                            ${this._unit}
                                        </span>
                                    </span>
                                </p>
                            </div>
                            ${this._renderButtons()}
                            ${slider}
                        </div>
                    </input-number-slider>
                </div>
            </ha-card>
        `;
    }

    doHandleButton(event: CustomEvent) {
        console.log("doHandleButton " + event);
    }

    doSetValue(event: CustomEvent) {
        console.log("Setting value to " + event.detail.value);
        this._active = false;
        this._hass.callService("input_number", "set_value", {
            entity_id: this._entity,
            value: event.detail.value
        });
    }

    doUpdateCenterView(event: CustomEvent) {
        console.log("Updating center to " + event.detail.value);
        this._active = true;
        this._value = event.detail.value;
    }

    // card configuration
    static getConfigElement() {
        return document.createElement("custom-input-number-slider-card-editor");
    }

    static getStubConfig() {
        return {
            entity: "input_boolean.toggletest",
            header: "",
        };
    }
}