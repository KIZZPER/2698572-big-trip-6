import {render, RenderPosition} from '../framework/render.js';
import {FilterType} from '../const.js';
import {generateFilters} from '../mock/filter.js';
import {updateItem} from '../utils.js';
import TripInfoView from '../view/trip-info.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import EventListView from '../view/event-list.js';
import ListEmptyView from '../view/list-empty.js';
import PointPresenter from './point.js';

export default class BoardPresenter {
  #tripMainContainer = null;
  #filterContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;
  #eventListComponent = new EventListView();

  #points = [];
  #pointPresenters = new Map();

  constructor({tripMainContainer, filterContainer, tripEventsContainer, pointsModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#filterContainer = filterContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    render(new TripInfoView(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView({filters: generateFilters(this.#points)}), this.#filterContainer);

    if (this.#points.length === 0) {
      render(new ListEmptyView({filterType: FilterType.EVERYTHING}), this.#tripEventsContainer);
      return;
    }

    render(new SortView(), this.#tripEventsContainer);
    render(this.#eventListComponent, this.#tripEventsContainer);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      offers: this.#pointsModel.offers,
      destinations: this.#pointsModel.destinations,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
