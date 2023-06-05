import $ from "jquery";
class Search {
  // 1. describle init object
  constructor() {
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.searchField = $("#search-term");
    this.isOverlayOpen = false;
    this.typingTimer = 0;
    this.events();
  }
  
  // 2. events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keydown", this.keyPressDispathcher.bind(this));
    this.searchField.on("keydown", this.typingLogic.bind(this));
  }
  
  // 3. methods
  typingLogic () {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(function(){
      console.log('hello 123');
    }, 2000);
  }
  keyPressDispathcher (e) {
    let keyCode = e.keyCode;
    if (keyCode === 83 && !this.isOverlayOpen) { // key: 's'
      this.openOverlay();
    }
    if (keyCode === 27 && this.isOverlayOpen) { // key: 'esc'
      this.closeOverlay();
    }
  }
  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    this.isOverlayOpen = true;
  }
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }
}

export default Search;