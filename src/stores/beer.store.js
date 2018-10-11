import { observable, action, computed } from "mobx";
import { sortBy, debounce } from "lodash/fp";
import api from "../utils/api.utils";

class Beer {
  id;
  @observable
  title;

  constructor(beer) {
    Object.assign(this, beer);
  }

  @action
  setTitle(title) {
    this.title = title;
  }

  debouncedUpdateBeer = debounce(300, () => api.updateBeer(this));

  update(title) {
    this.setTitle(title);
    this.debouncedUpdateBeer();
  }
}

export class BeerStore {
  @observable
  beers;

  @action
  setBeers(beers) {
    this.beers = beers.map(beer => new Beer(beer));
  }

  @computed
  get sortedBeers() {
    return sortBy("title", this.beers);
  }

  fetchBeers(id) {
    api
      .getBeers()
      .then(response => response.json())
      .then(beers => this.setBeers(beers));
  }

  addBeer() {
    const newBeer = new Beer({
      title: "TBD",
      id: (Math.random() * 100000000000000000).toString()
    });
    this.beers.push(newBeer);
    api.createBeer(newBeer);
  }

  removeBeer(id) {
    this.beers = this.beers.filter(beer => beer.id !== id);
    api.removeBeer(id);
  }
}

export default new BeerStore();
