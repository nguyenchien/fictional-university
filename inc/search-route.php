<?php
  add_action('rest_api_init', 'university_custom_route');
  function university_custom_route() {
    register_rest_route( 'university/v1', '/search/', array(
      'methods' => 'GET',
      'callback' => 'universitySearchResult',
    ));
  }
  function universitySearchResult($data) {
    $professor = new WP_Query(
      array (
        'post_type' => 'professor',
        's' => sanitize_text_field($data['term'])
      )
    );
    $professorResult = array();
    while($professor->have_posts()) {
      $professor->the_post();
      array_push($professorResult, array(
        'title' => get_the_title(),
        'permalink' => get_the_permalink(),
      ));
    }
    return $professorResult;
  }
?>