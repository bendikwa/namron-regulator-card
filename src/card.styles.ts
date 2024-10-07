import { css } from "lit";

export const styles = css`
    :host {
        position: relative;
        display: block;
        height: 100%;
    }

    .title {
        width: 100%;
        font-size: 18px;
        line-height: 36px;
        padding: 8px 30px 8px 30px;
        margin: 0;
        text-align: center;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: none;
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        max-width: 100%;
        box-sizing: border-box;
        flex: 1;
    }

    .error {
        color: red;
    }

    .container.lg {
        font-size: 57px;
    }

    .container.md {
        font-size: 44px;
    }

    .container.sm {
        font-size: 32px;
    }

    .container.xs {
        font-size: 32px;
    }

    .ha-card {
        position: relative;
        height: 100%;
        width: 100%;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .value {
        display: flex;
        margin: 0px;
        direction: ltr;
    }

    .displayed-value {
        display: inline-flex;
        flex-direction: row;
        align-items: flex-end;
    }
    
    .unit {
        display: flex;
        flex-direction: column-reverse;
    }
    .info {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }
    input-number-slider {
        max-width: 336px;
    }

    .round-slider {        
        width: 320px;
    }
    
    .buttons {
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        margin: 0 auto;
        gap: 24px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }
    
    ha-outlined-icon-button {
        --md-outlined-icon-button-container-width: 48px;
        --md-outlined-icon-button-container-height: 48px;
        --md-outlined-icon-button-icon-size: 24px;
    }
`;