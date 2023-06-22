<?php
add_action('rest_api_init', 'university_custom_route');
function university_custom_route() {
  register_rest_route( 'university/v1', '/search/', array(
    'methods' => 'GET',
    'callback' => 'universitySearchResult',
  ));
}
function universitySearchResult() {
  return 'hello 123';
}