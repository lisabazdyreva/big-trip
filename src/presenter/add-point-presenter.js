import EditPointView from '../view/edit-point-view';
import {DefaultValue, RenderPosition, UpdateType, UserPointAction} from '../consts';
import {remove, render} from '../utils/render-utils';
import {isEsc} from '../utils/utils';

export default class AddPointPresenter {
  #container = null;
  #editPointComponent = null;
  #changeData = null;

  #destinations = null;
  #offers = null;
  #types = null;
  #names = null;

  #undisableButton = null;

  constructor(container, changeData, undisableButton, destinations, offers, types, names) {
    this.#container = container;
    this.#changeData = changeData;

    this.#destinations = destinations;
    this.#offers = offers;
    this.#types = types;
    this.#names = names;

    this.#undisableButton = undisableButton;
  }

  init = () => {
    this.#editPointComponent = new EditPointView(DefaultValue.POINT, this.#destinations, this.#offers, this.#types, this.#names);

    this.#render();

    this.#editPointComponent.setSubmitHandler(this.#formSubmitHandler);
    this.#editPointComponent.setDeleteHandler(this.#deleteFormHandler);
    document.addEventListener('keydown', this.#formEscHandler);
  }

  #render = () => {
    render(this.#container, this.#editPointComponent, RenderPosition.AFTERBEGIN);
  }

  remove = () => {
    if (this.#editPointComponent === null ) {
      return;
    }

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#formEscHandler);
    this.#undisableButton();
  }

  #formEscHandler = (evt) => {
    if (isEsc(evt.code)) {
      this.#deleteFormHandler();
    }
  }

  #deleteFormHandler = () => {
    this.remove();
    document.removeEventListener('keydown', this.#formEscHandler);
  }

  #formSubmitHandler = (point) => {
    this.#changeData(
      UserPointAction.ADD,
      UpdateType.MAJOR, // TODO можно минор, если инфо компонент перенести
      point,
    );
    this.remove();
  }
}
