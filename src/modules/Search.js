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
    if (this.searchField.val()) {
      let $that = this;
      $.getJSON(universityData.root_url +"/wp-json/wp/v2/posts?search=" + this.searchField.val(), function(posts) {
        let resultHtml = '';
        resultHtml += '<ul class="link-list min-list">';
        posts.forEach((post) => {
          resultHtml += `<li><a href="${post.link}">${post.title.rendered}</a></li>`;
        });
        resultHtml += '</ul>';
        $that.resultsDiv.html(resultHtml);
      });
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