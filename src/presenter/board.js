import {render, RenderPosition} from '../render.js';
import TripInfoView from '../view/trip-info.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import EventListView from '../view/event-list.js';
import EditPointView from '../view/edit-point.js';
import EventPointView from '../view/event-point.js';

export default class BoardPresenter {
  #tripMainContainer = null;
  #filterContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;
  #eventListComponent = new EventListView();

  constructor({tripMainContainer, filterContainer, tripEventsContainer, pointsModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#filterContainer = filterContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    const points = this.#pointsModel.points;
    const offers = this.#pointsModel.offers;
    const destinations = this.#pointsModel.destinations;

    render(new TripInfoView(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#tripEventsContainer);
    render(this.#eventListComponent, this.#tripEventsContainer);

    render(new EditPointView({point: points[0], offers, destinations}), this.#eventListComponent.getElement());

    points.forEach((point) => {
      render(new EventPointView({point, offers, destinations}), this.#eventListComponent.getElement());
    });
  }
}
