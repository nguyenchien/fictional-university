<?php
  // register rest api route
  require_once( get_template_directory() . '/inc/search-route.php' );

  // page banner
  function pageBanner($args = array()) {
    if (!isset($args['title'])) {
      $args['title'] = get_the_title();
    }
    if (!isset($args['subtitle'])) {
      $args['subtitle'] = get_field('page_banner_sub_title');
    }
    if (!isset($args['photo'])) {
        if (get_field('page_banner_background_image') && !is_archive() && !is_home()) {
          $args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
        } else {
          $args['photo'] = get_theme_file_uri('images/ocean.jpg');
        }
    }
    ?>
    <div class="page-banner">
      <div class="page-banner__bg-image" style="background-image: url(<?php echo $args['photo']; ?>)"></div>
      <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title"><?php echo $args['title']; ?></h1>
        <div class="page-banner__intro">
          <p><?php echo $args['subtitle']; ?></p>
        </div>
      </div>
    </div>
  <?php } ?>

  <?php
  // add style, script for theme
  add_action('wp_enqueue_scripts', 'university_files');
  function university_files() {
    //wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key=AIzaSyAQj28zH-bp5biS8H1qjAdiADOqzyVLn7c', NULL, '1.0', true);
    wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
    wp_enqueue_style('font-google', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style('university_main_style', get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style('university_extra_style', get_theme_file_uri('/build/index.css'));
    wp_localize_script('main-university-js', 'universityData', array(
      'root_url' => get_site_url(),
    ));
  }
  
  // hook setting feature for theme
  add_action('after_setup_theme', 'university_features');
  function university_features() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_image_size('professorLandscape', 400, 260, true);
    add_image_size('professorPortrait', 480, 650, true);
    add_image_size('pageBanner', 1500, 350, true);
    register_nav_menus(array(
      'headerMenuLocation' => 'Header Menu Location',
      'footerMenuLocation01' => 'Footer Menu Location 01',
      'footerMenuLocation02' => 'Footer Menu Location 02',
    ));
  }

  // hook pre get posts
  add_action('pre_get_posts', 'university_adjust_posts');
  function university_adjust_posts($query) {
    if ( !is_admin() && $query->is_main_query() && is_post_type_archive('event') ) {
      $today = date('Ymd');
      $query->set('meta_key', 'event_date');
      $query->set('orderby', 'meta_value_num');
      $query->set('order', 'ASC');
      $query->set('meta_query', array (
        array(
          'key' => 'event_date',
          'value' => $today,
          'type' => 'numeric',
          'compare' => '>='
        )
      ));
    }
    
    if ( !is_admin() && $query->is_main_query() && is_post_type_archive('program') ) {
      $query->set('order_by', 'title');
      $query->set('order', 'ASC');
      $query->set('posts_per_page', -1);
    }
  }
  
  add_filter('acf/fields/google_map/api', 'universityMapKey');
  function universityMapKey($api) {
    $api['key'] = 'AIzaSyAQj28zH-bp5biS8H1qjAdiADOqzyVLn7c';
    return $api;
  }
  
  // register_rest_field api
  add_action('rest_api_init', 'university_custom_rest');
  function university_custom_rest() {
    register_rest_field( 'post', 'authorName', array(
      'get_callback' => 'get_post_meta_for_api'
    ));
  }
  function get_post_meta_for_api() {
    return get_the_author();
  }
?>