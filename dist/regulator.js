var $gXNCa$lit = require("lit");



var $709c0579617ab16e$export$2e2bcd8739ae039 = (0, $gXNCa$lit.css)`
    .error {
        color: red;
    }
    .dl {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .dt {
        display: flex;
        align-content: center;
        flex-wrap: wrap;
    }
    .dd {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, auto) minmax(0, 2fr));
        margin: 0;
    }
    .toggle {
        padding: 0.6em;
        border: grey;
        border-radius: 50%;
    }
    .toggle.on { background-color: green; }
    .toggle.off{ background-color: red; }
    .button {
        display: block;
        border: outset 0.2em;
        border-radius: 50%;
        border-color: silver;
        background-color: silver;
        width: 1.4em;
        height: 1.4em;
    }
    .value {
        padding-left: 0.5em;
        display: flex;
        align-content: center;
        flex-wrap: wrap;
    }
`;


class $beabb7f95d0325e3$export$663c3a2f480dfe74 extends (0, $gXNCa$lit.LitElement) {
    // private property
    _hass;
    // internal reactive states
    static get properties() {
        return {
            _header: {
                state: true
            },
            _entity: {
                state: true
            },
            _name: {
                state: true
            },
            _state: {
                state: true
            },
            _status: {
                state: true
            }
        };
    }
    setConfig(config) {
        this._header = config.header === "" ? (0, $gXNCa$lit.nothing) : config.header;
        this._entity = config.entity;
        // call set hass() to immediately adjust to a changed entity
        // while editing the entity in the card editor
        if (this._hass) this.hass = this._hass;
    }
    set hass(hass) {
        this._hass = hass;
        this._state = hass.states[this._entity];
        if (this._state) {
            this._status = this._state.state;
            let fn = this._state.attributes.friendly_name;
            this._name = fn ? fn : this._entity;
        }
    }
    static styles = (0, $709c0579617ab16e$export$2e2bcd8739ae039);
    render() {
        let content;
        if (!this._state) content = (0, $gXNCa$lit.html)`
                <p class="error">
                    ${this._entity} is unavailable.
                </p>
            `;
        else content = (0, $gXNCa$lit.html)`
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
        return (0, $gXNCa$lit.html)`
            <ha-card header="${this._header}">
                <div class="card-content">
                    ${content}
                </div>
            </ha-card>
        `;
    }
    // event handling
    doToggle(event) {
        this._hass.callService("input_boolean", "toggle", {
            entity_id: this._entity
        });
    }
    // card configuration
    static getConfigElement() {
        return document.createElement("namron-regulator-card-dev");
    }
    static getStubConfig() {
        return {
            entity: "input_boolean.toggletest",
            header: ""
        };
    }
}



class $024613ee6ee50c79$export$ee6b42fb053c9299 extends (0, $gXNCa$lit.LitElement) {
    static get properties() {
        return {
            _config: {
                state: true
            }
        };
    }
    setConfig(config) {
        this._config = config;
    }
    static styles = (0, $gXNCa$lit.css)`
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
        return (0, $gXNCa$lit.html)`
            <form class="table">
                <div class="row">
                    <label class="label cell" for="header">Header:</label>
                    <input
                        @change="${this.handleChangedEvent}"
                        class="value cell" id="header" value="${this._config.header}"></input>
                </div>
                <div class="row">
                    <label class="label cell" for="entity">Entity:</label>
                    <input
                        @change="${this.handleChangedEvent}"
                        class="value cell" id="entity" value="${this._config.entity}"></input>
                </div>
            </form>
        `;
    }
    handleChangedEvent(changedEvent) {
        // this._config is readonly, copy needed
        var newConfig = Object.assign({}, this._config);
        if (changedEvent.target.id == "header") newConfig.header = changedEvent.target.value;
        else if (changedEvent.target.id == "entity") newConfig.entity = changedEvent.target.value;
        const messageEvent = new CustomEvent("config-changed", {
            detail: {
                config: newConfig
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(messageEvent);
    }
}


customElements.define("namron-regulator-card-dev", (0, $beabb7f95d0325e3$export$663c3a2f480dfe74));
customElements.define("namron-regulator-card-dev-editor", (0, $024613ee6ee50c79$export$ee6b42fb053c9299));
window.customCards = window.customCards || [];
window.customCards.push({
    type: "namron-regulator-card-dev",
    name: "Namron Regulator Card",
    description: "Simple card for Namron Regulator!" // optional
});


//# sourceMappingURL=regulator.js.map
