import {render} from './utils/render-utils';
import {DefaultValue, RenderPosition} from './consts';


import TripPresenter from './presenter/trip-presenter';
import FiltersPresenter from './presenter/filters-presenter';

import PointsModel from './model/points-model';

import MenuView from './view/menu-view';
import FiltersModel from './model/filters-model';

import ApiService from './api/api-service';

const AUTHORIZATION_KEY = 'Basic difg537hffs08a';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const api = new ApiService(END_POINT, AUTHORIZATION_KEY);

const pointsModel = new PointsModel(api);
// pointsModel.points = data;

pointsModel.init();

const filtersModel = new FiltersModel();

const menuComponent = new MenuView(DefaultValue.MENU);

const menuContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');
const infoContainer = document.querySelector('.trip-main');

render(menuContainer, menuComponent, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(mainContainer, infoContainer, pointsModel, filtersModel);
const filtersPresenter = new FiltersPresenter(filtersContainer, filtersModel);


filtersPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', () => tripPresenter.createPoint());
