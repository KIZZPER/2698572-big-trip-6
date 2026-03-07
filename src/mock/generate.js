import {destinations} from './destinations.js';
import {offers} from './offers.js';
import {EVENT_TYPES} from '../const.js';

const POINTS_COUNT = 3;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(items) {
  return items[getRandomInt(0, items.length - 1)];
}

let generatedId = 0;

function generatePoint() {
  const type = getRandomArrayElement(EVENT_TYPES);
  const destination = getRandomArrayElement(destinations);
  const typeOffers = offers.find((offer) => offer.type === type)?.offers ?? [];
  const selectedOffers = typeOffers
    .filter(() => Math.random() > 0.5)
    .map((offer) => offer.id);

  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() + getRandomInt(-3, 3));
  const dateTo = new Date(dateFrom);
  dateTo.setHours(dateTo.getHours() + getRandomInt(1, 72));

  return {
    id: String(++generatedId),
    type,
    destination: destination.id,
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString(),
    basePrice: getRandomInt(10, 1000),
    offers: selectedOffers,
    isFavorite: Math.random() > 0.5,
  };
}

export {generatePoint, POINTS_COUNT};