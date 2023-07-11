import $ from 'jquery';

class Like {
  // constructor
  constructor() {
    this.events();
  }
  
  // events
  events () {
    $(".like-box").on("click", this.ourClickDispatcher.bind(this));
  }

  // methods
  ourClickDispatcher(e) {
    var currentLikeBox = $(e.target).closest(".like-box");
    if (currentLikeBox.data("exists") == "yes") {
      this.deleteLike(currentLikeBox);
    } else {
      this.createLike(currentLikeBox);
    }
  }

  createLike(currentLikeBox) {
    let id = currentLikeBox.data("id");
    $.ajax({
      url: universityData.root_url + '/wp-json/university/v1/manageLike',
      method: 'POST',
      data: {
        "professor_id": id
      },
      success: (response) => {
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      },
    })
  }

  deleteLike(currentLikeBox) {
    $.ajax({
      url: universityData.root_url + '/wp-json/university/v1/manageLike',
      method: 'DELETE',
      success: (response) => {
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      },
    })
  }
}

export default Like