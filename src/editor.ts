import {css, html, LitElement} from 'lit';
import {state} from "lit/decorators/state";
import {LovelaceCardConfig} from "custom-card-helpers";

export class InputNumberCardEditor extends LitElement {
    @state() _config: LovelaceCardConfig;

    setConfig(config: LovelaceCardConfig) {
        this._config = config;
    }

    static styles = css`
        .table {
            display: table;
        }

        .row {
            display: table-row;
        }

        .cell {
            display: table-cell;
            padding: 0.5em;
        }
    `;

    render() {
        return html`
            <form class="table">
                <div class="row">
                    <label class="label cell" for="header">Header:</label>
                    <input
                            @change="${this.handleChangedEvent}"
                            class="value cell" id="header" value="${this._config.header}">
                </div>
                <div class="row">
                    <label class="label cell" for="entity">Entity:</label>
                    <input
                            @change="${this.handleChangedEvent}"
                            class="value cell" id="entity" value="${this._config.entity}">
                </div>
            </form>
        `;
    }

    handleChangedEvent(changedEvent: Event) {
        const target = changedEvent.target as HTMLInputElement;
        // this._config is readonly, copy needed
        const newConfig = Object.assign({}, this._config);
        if (target.id == "header") {
            newConfig.header = target.value;
        } else if (target.id == "entity") {
            newConfig.entity = target.value;
        }
        const messageEvent = new CustomEvent("config-changed", {
            detail: {config: newConfig},
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(messageEvent);
    }
}