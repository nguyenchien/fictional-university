import $ from "jquery";
class Search {
  // 1. describle init object
  constructor() {
    this.renderHtmlSearch();
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
        this.typingTimer = setTimeout(this.getResults.bind(this), 750); 
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
      $.when(
        $.getJSON(universityData.root_url +"/wp-json/wp/v2/posts?search=" + this.searchField.val()),
        $.getJSON(universityData.root_url +"/wp-json/wp/v2/pages?search=" + this.searchField.val()),
      ).then((posts, pages) => {
        var combinedResults = posts[0].concat(pages[0]);
        let resultHtml = '<h2 class="search-overlay__section-title">General Information</h2>';
        if (combinedResults.length) {
          resultHtml += '<ul class="link-list min-list">';
          combinedResults.forEach((item) => {
            resultHtml += `<li><a href="${item.link}">${item.title.rendered}</a></li>`;
          });
          resultHtml += '</ul>';
        } else {
          resultHtml += '<p>No results found!</p>';
        }
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
    this.searchField.val('');
    setTimeout(() => {
      this.searchField.focus();
    }, 301);
    this.isOverlayOpen = true;
  }
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }
  renderHtmlSearch() {
    $('body').append(`
      <div class="search-overlay">
        <div class="search-overlay__top">
          <div class="container">
            <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
            <input type="text" id="search-term" class="search-term" placeholder="What are you looking for?">
            <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
          </div>
        </div>
        <div class="container">
          <div id="search-overlay__results"></div>
        </div>
      </div>
    `);
  }
}

export default Search;