import { css } from 'lit';

export default css`
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

  .toggle.on {
    background-color: green;
  }

  .toggle.off {
    background-color: red;
  }

  .button {
    display: block;
    border-radius: 50%;
    border: 0.2em outset silver;
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
  
  #slider {
    height: 100%;
    width: 100%;
    position: relative;
    max-width: 250px;
    min-width: 100px;
  }
  
  round-slider1 {
    --round-slider-path-color: var(--slider-track-color);
    --round-slider-bar-color: var(--mode-color);
    padding-bottom: 10%;
  }

  #slider-center {
    position: absolute;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    box-sizing: border-box;
    border-radius: 100%;
    left: 20px;
    top: 20px;
    text-align: center;
    overflow-wrap: break-word;
    pointer-events: none;
  }
`;