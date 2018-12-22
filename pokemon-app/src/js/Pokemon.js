class Pokemon {

  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.isActive = false;
  }

  setActive() {
    this.isActive = true;
  }

  setInactive() {
    this.isActive = false;
  }

}

export default Pokemon;
