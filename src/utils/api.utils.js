const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://92f6vkght7.execute-api.us-east-1.amazonaws.com/dev/api' : 'http://localhost:8080/api';

export default {
  getRequests() {
    return fetch(BASE_URL + '/requests');
  },
  createRequest(request) {
    return fetch(BASE_URL + '/requests/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
  },
  getBeers() {
    return fetch(BASE_URL + '/beers');
  },
  updateBeer(beer) {
    return fetch(BASE_URL + '/beers/' + beer.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: beer.title, id: beer.id })
    });
  },
  createBeer(beer) {
    return fetch(BASE_URL + '/beers/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: beer.title, id: beer.id })
    });
  },
  removeBeer(id) {
    return fetch(BASE_URL + '/beers/' + id, {
      method: 'DELETE'
    });
  }
}