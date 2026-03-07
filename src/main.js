import BoardPresenter from './presenter/board.js';
import PointsModel from './model/points-model.js';

const tripMainElement = document.querySelector('.trip-main');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const boardPresenter = new BoardPresenter({
  tripMainContainer: tripMainElement,
  filterContainer: filterContainerElement,
  tripEventsContainer: tripEventsElement,
  pointsModel,
});

boardPresenter.init();
