<?php
  add_action('rest_api_init', 'universityRegisterLike');
  function universityRegisterLike() {
    register_rest_route('university/v1', '/manageLike/', array(
      'methods' => 'POST',
      'callback' => 'createLike',
    ));
    
    register_rest_route('university/v1', '/manageLike/', array(
      'methods' => 'DELETE',
      'callback' => 'deleteLike',
    ));
  }
  
  function createLike() {
    return "Thanks for creating a like";
  }
  
  function deleteLike() {
    return "Thanks for deleting a like";
  }
?>