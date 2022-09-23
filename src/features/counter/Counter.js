import { LitElement, html } from 'lit-element';
import store from '../../app/redux/store';

export class SampleCounter extends LitElement {
  constructor() {
    super();
    this.childCounter = store.getState().originalAmount;
  }

  static get properties() {
    return {
      childCounter: { type: Number }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    store.subscribe(() => this.childCounter = store.getState().originalAmount);
  }

  render() {
    return html`
      <p>${'counter child component'.toUpperCase()}</p>
      <p>Child counter: ${this.childCounter}</p>
    `;
  }
}

customElements.define('sample-counter', SampleCounter);