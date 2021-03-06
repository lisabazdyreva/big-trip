import {ErrorMessage} from '../consts';
import {createElement} from '../utils/utils';


const ANIMATION_TIMEOUT = 600;
const MILLISECONDS_IN_SECOND = 1000;

export default class AbstractView {
  #element = null;
  _callbacks = {};

  constructor() {
    if (new.target === AbstractView) {
      throw new Error(ErrorMessage.INSTANT);
    }
  }

  get template() {
    throw new Error(ErrorMessage.GETTER);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

  shake = (cb = null) => {
    this.element.style.animation = `shake ${ANIMATION_TIMEOUT / MILLISECONDS_IN_SECOND}s`;

    setTimeout(() => {
      this.element.style.animation = '';

      if (cb !== null) {
        cb();
      }

    }, ANIMATION_TIMEOUT);
  }
}
