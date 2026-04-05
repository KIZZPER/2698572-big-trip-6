import {render, replace, RenderPosition} from '../framework/render.js';
import {FilterType} from '../const.js';
import {generateFilters} from '../mock/filter.js';
import TripInfoView from '../view/trip-info.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import EventListView from '../view/event-list.js';
import ListEmptyView from '../view/list-empty.js';
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

    render(new TripInfoView(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView({filters: generateFilters(points)}), this.#filterContainer);

    if (points.length === 0) {
      render(new ListEmptyView({filterType: FilterType.EVERYTHING}), this.#tripEventsContainer);
      return;
    }

    render(new SortView(), this.#tripEventsContainer);
    render(this.#eventListComponent, this.#tripEventsContainer);

    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const offers = this.#pointsModel.offers;
    const destinations = this.#pointsModel.destinations;

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventPointComponent = new EventPointView({
      point,
      offers,
      destinations,
      onRollupClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const editPointComponent = new EditPointView({
      point,
      offers,
      destinations,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onRollupClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replacePointToForm() {
      replace(editPointComponent, eventPointComponent);
    }

    function replaceFormToPoint() {
      replace(eventPointComponent, editPointComponent);
    }

    render(eventPointComponent, this.#eventListComponent.element);
  }
}
