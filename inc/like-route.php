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
  
  function createLike($data) {
    $professor_id = $data['professor_id'];
    wp_insert_post(array(
      'post_type' => 'like',
      'post_status' => 'publish',
      'post_title' => 'Test Post',
      'meta_input' => array(
        'liked_professor_id' => $professor_id
      )
    ));
  }
  
  function deleteLike() {
    return "Thanks for deleting a like";
  }
?>