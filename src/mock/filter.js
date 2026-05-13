import {filter} from '../utils.js';

function generateFilters(points) {
  return Object.entries(filter).map(([type, filterPoints]) => ({
    type,
    count: filterPoints(points).length,
  }));
}

export {generateFilters};
