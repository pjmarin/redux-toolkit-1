import { LitElement, html, css } from 'lit-element';
import { SampleCounter } from '../features/counter/Counter';
// import { createStore } from 'redux';
import store from './redux/store.js';

export class sampleHttp extends LitElement {
  static styles = css`
    p, li { color: blue; } 
    .contador {
      color: #fff;
      background: #000;
      padding: 0.8em 1.2em;
      margin: 0 0 0 1em;
    }
    .container-buttons { padding: 1em; }
  `;

  static get properties() {
    return {
      posts: { type: Array },
      defaultState: { type: Number },
      store: { type: Number },
      counter: { type: Number }
    }
  }

  constructor() {
    super();
    this.defaultState = store.getState().originalAmount;
  }

  increment() {
    store.dispatch({ type: 'INCREMENT ORIGIN AMOUNT', data: 1 });
  }

  decrement() {
    store.dispatch({ type: 'DECREMENT ORIGIN AMOUNT', data: 1 });
  }

  connectedCallback() {
    super.connectedCallback();

    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
      this.posts = json;
      console.log(json);
      store.subscribe(() => { console.log('state', store.getState()); this.defaultState = store.getState().originalAmount;});
    });
  }
  
  render() {
    return html`
      <div class="container">
        <h1>Contador</h1>
        <span class="contador">${this.defaultState}</span>
        <div class="container-buttons">
          <button @click="${this.increment}">increment</button>
          <button @click="${this.decrement}">decrement</button>
        </div>
        <sample-counter></sample-counter>
        <ul>
          ${this.posts ? this.posts.map(post => html`<li>${post.title}</li>`) : html`loading`}
        </ul>
      </div>
    `;
  }
}

customElements.define('sample-http', sampleHttp);