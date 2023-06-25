<?php
  add_action('rest_api_init', 'university_custom_route');
  function university_custom_route() {
    register_rest_route('university/v1', '/search/', array(
      'methods' => 'GET',
      'callback' => 'universitySearchResult',
    ));
  }
  function universitySearchResult($data) {
    $mainQuery = new WP_Query(
      array (
        'post_type' => array('post', 'page', 'event', 'program', 'professor', 'campus'),
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
      if (get_post_type() == 'event') {
        $eventDay = new DateTime(get_field('event_date'));
        $month = $eventDay->format('M');
        $day = $eventDay->format('d');
        $description = wp_trim_words(get_the_content(), 5);
        array_push($result['events'], array (
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
          'month' => $month,
          'day' => $day,
          'description' => $description,
        ));
      }
      if (get_post_type() == 'program') {
        array_push($result['programs'], array (
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
          'id' => get_the_ID(),
        ));
      }
      if (get_post_type() == 'professor') {
        array_push($result['professor'], array (
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
          'image' => get_the_post_thumbnail_url(get_the_ID(), 'professorLandscape'),
        ));
      }
      if (get_post_type() == 'campus') {
        array_push($result['campuses'], array (
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
        ));
      }
    }
    
    
    // get professor related with program
    if ($result['programs']) {
      $programMetaQuery = array('relation' => 'OR');
      foreach ($result['programs'] as $item) {
        array_push($programMetaQuery, array(
          'key' => 'related_programs',
          'value' => $item['id'],
          'compare' => 'LIKE'
        ));
      }
      
      $professorRelatedProgramQuery = new WP_Query(
        array(
          'post_type' => 'professor',
          'meta_query' => $programMetaQuery,
        )
      );
      
      while ($professorRelatedProgramQuery->have_posts()) {
        $professorRelatedProgramQuery->the_post();
        if (get_post_type() == 'professor') {
          array_push($result['professor'], array (
            'title' => get_the_title(),
            'permalink' => get_the_permalink(),
            'image' => get_the_post_thumbnail_url(get_the_ID(), 'professorLandscape'),
          ));
        }
      }
      
      $result['professor'] = array_values(array_unique($result['professor'], SORT_REGULAR));
    }
    
    return $result;
  }
?>