import {render} from '../utils/render-utils';
import {RenderPosition, UpdateType} from '../consts';
import FiltersView from '../view/filters-view';

export default class FiltersPresenter {
  #container = null;
  #model = null;

  #component = null;

  constructor(container, model) {
    this.#container = container;
    this.#model = model;
  }

  get activeFilter() {
    return this.#model.activeFilter;
  }

  init = () => {
    this.#component = new FiltersView(this.activeFilter);

    this.#renderFilters();
    this.#component.setClickFilterHandler(this.#changeFilterHandler);
  }

  #renderFilters = () => {
    render(this.#container, this.#component, RenderPosition.BEFOREEND);
  }

  #changeFilterHandler = (currentFilter) => {
    if (this.#model.activeFilter === currentFilter) {
      return;
    }
    this.#model.setActiveFilter(UpdateType.MAJOR, currentFilter);
  }
}
