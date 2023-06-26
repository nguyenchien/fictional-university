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
      
      $.getJSON(universityData.root_url +"/wp-json/university/v1/search?term=" + this.searchField.val(), (result) => {
        this.resultsDiv.html(`
          <div class="row">
            <div class="one-third">
              <h2 class="search-overlay__section-title">General Information</h2>
              ${result.generalData.length ? '<ul class="link-list min-list">' : `<p>No info found! Please try again.</p>`}
              ${result.generalData.map(item => {
                return `<li><a href="${item.permalink}">${item.title}</a> ${item.postType == 'post' ? `by ${item.authorName}`:''} </li>`;
              }).join('')}
              ${result.generalData.length ? '</ul>' : ''}
            </div>
            <div class="one-third">
              <h2 class="search-overlay__section-title">Events</h2>
              ${result.events.length ? '' : `<p>No events found! Let view <a href="${universityData.root_url}/events">all events</a></p>`}
              ${result.events.map(item => {
                return `
                <div class="event-summary">
                  <a class="event-summary__date t-center" href="${item.permalink}">
                    <span class="event-summary__month">${item.month}</span>
                    <span class="event-summary__day">${item.day}</span>
                  </a>
                  <div class="event-summary__content">
                    <h5 class="event-summary__title headline headline--tiny">
                      <a href="${item.permalink}">${item.title}</a>
                    </h5>
                    <p>${item.description} <a href="${item.permalink}" class="nu gray">Learn more</a></p>
                  </div>
                </div>
                `;
              }).join('')}
              
              <h2 class="search-overlay__section-title">Programs</h2>
              ${result.programs.length ? '<ul class="link-list min-list">' : `<p>No programs found! Let view <a href="${universityData.root_url}/programs">all programs</a></p>`}
              ${result.programs.map(item => {
                return `<li><a href="${item.permalink}">${item.title}</a></li>`;
              }).join('')}
              ${result.programs.length ? '</ul>' : ''}
            </div>
            <div class="one-third">
              <h2 class="search-overlay__section-title">Professor</h2>
              ${result.professor.length ? '<ul class="professor-cards">' : `<p>No professor found! Let view <a href="${universityData.root_url}/professor">all professor</a></p>`}
              ${result.professor.map(item => {
                return `
                  <li class="professor-card__list-item">
                    <a href="${item.permalink}" class="professor-card">
                      <img class="professor-card__image" src="${item.image}" alt="">
                      <span class="professor-card__name">${item.title}</span>
                    </a>
                  </li>
                `;
              }).join('')}
              ${result.professor.length ? '</ul>' : ''}
              
              <h2 class="search-overlay__section-title">Campuses</h2>
              ${result.campuses.length ? '<ul class="link-list min-list">' : `<p>No campus found! Let view <a href="${universityData.root_url}/campuses">all campus</a></p>`}
              ${result.campuses.map(item => {
                return `<li><a href="${item.permalink}">${item.title}</a></li>`;
              }).join('')}
              ${result.campuses.length ? '</ul>' : ''}
            </div>
          </div>
        `);
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