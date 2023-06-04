import $ from "jquery";
class Search {
  // 1. describle init object
  constructor() {
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.events();
  }
  
  // 2. events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keyup", this.keyPressDispathcher.bind(this))
  }
  
  // 3. methods
  keyPressDispathcher (e) {
    let keyCode = e.keyCode;
    console.log(keyCode);
    if (keyCode === 83) {
      this.openOverlay();
    }
    if (keyCode === 27) {
      this.closeOverlay();
    }
  }
  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
  }
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
  }
}

export default Search;