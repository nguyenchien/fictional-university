<?php
  add_action('rest_api_init', 'university_custom_route');
  function university_custom_route() {
    register_rest_route( 'university/v1', '/search/', array(
      'methods' => 'GET',
      'callback' => 'universitySearchResult',
    ));
  }
  function universitySearchResult($data) {
    $mainQuery = new WP_Query(
      array (
        'post_type' => array('post', 'page', 'events', 'programs', 'professor', 'campuses'),
        's' => sanitize_text_field($data['term'])
      )
    );
    $result = array(
      'generalData' => array(),
      'events' => array(),
      'programs' => array(),
      'professor' => array(),
      'campuses' => array(),
    );
    while($mainQuery->have_posts()) {
      $mainQuery->the_post();
      if (get_post_type() == 'post' || get_post_type() == 'page') {
        array_push($result['generalData'], array (
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
          'postType' => get_post_type(),
          'authorName' => get_the_author(),
        ));
      }
      if (get_post_type() == 'events') {
        array_push($result['events'], array (
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
        ));
      }
      if (get_post_type() == 'programs') {
        array_push($result['programs'], array (
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
        ));
      }
      if (get_post_type() == 'professor') {
        array_push($result['professor'], array (
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
        ));
      }
      if (get_post_type() == 'campuses') {
        array_push($result['campuses'], array (
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
        ));
      }
    }
    return $result;
  }
?>