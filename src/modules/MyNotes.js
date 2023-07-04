import $ from "jquery";

class MyNotes {
  /* constructor
  ====================================================*/
  constructor() {
    this.events();
  }
  
  /* events
  ====================================================*/
  events() {
    $(".delete-note").on("click", this.deleteNote);
    $(".edit-note").on("click", this.editNote.bind(this));
    $(".update-note").on("click", this.updateNote.bind(this));
  }
  
  /* methods
  ====================================================*/
  // edit note
  editNote(e) {
    var thisNote = $(e.target).parents('li');
    if (thisNote.data("state") == 'editable') {
      this.makeNoteReadOnly(thisNote);
    } else {
      this.makeNoteEditable(thisNote);
    }
  }
  makeNoteEditable(thisNote) {
    thisNote.find(".edit-note").html('<i class="fa fa-close""></i> Cancel');
    thisNote.find(".note-title-field, .note-body-field").removeAttr('readonly').addClass("note-active-field");
    thisNote.find(".update-note").addClass("update-note--visible");
    thisNote.data("state", "editable");
  }
  makeNoteReadOnly(thisNote) {
    thisNote.find(".edit-note").html('<i class="fa fa-pencil""></i> Edit');
    thisNote.find(".note-title-field, .note-body-field").attr('readonly', 'readonly').removeClass("note-active-field");
    thisNote.find(".update-note").removeClass("update-note--visible");
    thisNote.data("state", "cancel");
  }
  
    // update note
    updateNote(e) {
      var thisNote = $(e.target).parents('li');
      var updateNoteData = {
        'title': thisNote.find(".note-title-field").val(),
        'content': thisNote.find(".note-body-field").val(),
      };
      $.ajax({
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
        },
        url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
        method: 'POST',
        data: updateNoteData,
        success: (response) => {
          this.makeNoteReadOnly(thisNote);
          console.log('success');
        },
        error: (error) => {
          console.log('error');
        }
      })
    }
  
  // delete note
  deleteNote(e) {
    var thisNote = $(e.target).parents('li');
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
      method: 'DELETE',
      success: (response) => {
        thisNote.slideUp();
        console.log('success');
      },
      error: (error) => {
        console.log('error');
      }
    })
  }
}

export default MyNotes;