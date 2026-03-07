const points = [
  {
    id: '1',
    type: 'taxi',
    destination: '1',
    dateFrom: '2019-03-18T10:30:00.000Z',
    dateTo: '2019-03-18T11:00:00.000Z',
    basePrice: 20,
    offers: ['1'],
    isFavorite: true,
  },
  {
    id: '2',
    type: 'flight',
    destination: '2',
    dateFrom: '2019-03-18T12:25:00.000Z',
    dateTo: '2019-03-18T13:35:00.000Z',
    basePrice: 160,
    offers: ['6', '7'],
    isFavorite: false,
  },
  {
    id: '3',
    type: 'check-in',
    destination: '3',
    dateFrom: '2019-03-19T00:00:00.000Z',
    dateTo: '2019-03-20T10:00:00.000Z',
    basePrice: 900,
    offers: ['11'],
    isFavorite: false,
  },
];

export {points};
