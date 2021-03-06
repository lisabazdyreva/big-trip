import AbstractView from './abstract-view';

import {SortingType} from '../consts';
import {isInput} from '../utils/utils';


const sortingTypes = Object.values(SortingType);


const createSortingView = (activeSortingType) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortingTypes.map((type) => {
    const isChecked = activeSortingType === type ? 'checked' : '';
    const isDisabled = SortingType.EVENT === type || SortingType.OFFERS === type ? 'disabled' : '';

    return `<div class="trip-sort__item  trip-sort__item--${type}">
      <input
        id="sort-${type}"
        data-sort-type="${type}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${type}"
        ${isChecked}
        ${isDisabled}
      >
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>`;}).join('')}
</form>`;


export default class SortingView extends AbstractView {
  #activeSortingType = null;

  constructor(activeSortingType) {
    super();
    this.#activeSortingType = activeSortingType;
  }

  get template() {
    return createSortingView(this.#activeSortingType);
  }

  setSortingChangeHandler = (cb) => {
    this._callbacks.sortingChangeHandler = cb;
    this.element.addEventListener('change', this.#sortingChangeHandler);
  }

  #sortingChangeHandler = (evt) => {
    if (!isInput(evt)) {
      return;
    }

    this._callbacks.sortingChangeHandler(evt.target.dataset.sortType);
  }
}
