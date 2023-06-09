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
    this.resultsDiv= $("#search-overlay__results")
    this.isSpinnerVisible = false;
    this.previousValue;
    this.events();
  }
  
  // 2. events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keydown", this.keyPressDispathcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
  }
  
  // 3. methods
  typingLogic () {
    if (this.previousValue !== this.searchField.val()) {
      clearTimeout(this.typingTimer);
      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 2000); 
      } else {
        this.resultsDiv.html('');
        this.isSpinnerVisible = false;
      }
    }
    this.previousValue = this.searchField.val();
  }
  getResults () {
    $.getJSON( "http://localhost:10010/wp-json/wp/v2/posts?search=" + this.searchField.val(), function(post) {
      alert(post[0].title.rendered);
    });
    if (this.searchField.val()) {
      this.resultsDiv.html('This is results of search...');
      this.isSpinnerVisible = false;
    } else {
      this.resultsDiv.html('');
    }
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