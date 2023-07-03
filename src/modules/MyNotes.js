import $ from "jquery";

class MyNotes {
  // constructor
  constructor() {
    this.events();
  }
  
  // events
  events() {
    $("#js-delete-note").on("click", this.deleteNote);
  }
  
  // methods
  deleteNote() {
   $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
    },
    url: universityData.root_url + '/wp-json/wp/v2/note/127',
    method: 'DELETE',
    success: (response) => {
      console.log('success');
      console.log(response);
    },
    error: (response) => {
      console.log('error');
      console.log(response);
    }
   })
  }
}

export default MyNotes;