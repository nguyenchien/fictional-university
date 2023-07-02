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
   alert("hello 123");
  }
}

export default MyNotes;