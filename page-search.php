<?php get_header(); 
  pageBanner(array(
    'title' => 'Search Page',
    'subtitle' => 'This is the common subtitle',
  ));
?>
  <?php
    while(have_posts()):
      the_post()
  ?>
    <div class="container container--narrow page-section">
      <?php
        $theParent = wp_get_post_parent_id(get_the_ID());
        if ($theParent) { ?>
          <div class="metabox metabox--position-up metabox--with-home-link">
            <p>
              <a class="metabox__blog-home-link" href="<?php echo get_the_permalink($theParent); ?>"><i class="fa fa-home" aria-hidden="true"></i> Back to <?php echo get_the_title($theParent) ?></a> <span class="metabox__main"><?php echo the_title(); ?></span>
            </p>
          </div>
        <?php } ?>
      <?php 
        $hasChildren = get_pages(array(
          'child_of' => get_the_ID()
        ));
        if ($theParent || $hasChildren) : ?>
        <div class="page-links">
          <h2 class="page-links__title"><a href="<?php echo get_the_permalink($theParent) ?>"><?php echo get_the_title($theParent) ?></a></h2>
          <ul class="min-list">
            <?php
              if ($theParent) {
                $findChildOf = $theParent;
              } else {
                $findChildOf = get_the_ID();
              }
              wp_list_pages(array(
                'title_li' => null,
                'child_of' => $findChildOf
              ))
            ?>
          </ul>
        </div>
      <?php endif; ?>
      <div class="generic-content">
        <form class="search-form" action="<?php echo esc_url(site_url('/')); ?>" method="get">
          <label for="s" class="headline headline--medium">Perform a New Search:</label>
          <div class="search-form-row">
            <input type="text" name="s" class="s" placeholder="What are you looking for?">
            <button type="submit" class="search-submit">Search</button>
          </div>
        </form>
      </div>
    </div>
  <?php endwhile; ?>
<?php get_footer(); ?>