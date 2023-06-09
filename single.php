<?php get_header();
  pageBanner();
?>
  <?php
    while(have_posts()) {
      the_post(); ?>
      <div class="container container--narrow page-section">
        <div class="metabox metabox--position-up metabox--with-home-link">
          <p>
            <a class="metabox__blog-home-link" href="<?php echo site_url('/blog'); ?>"><i class="fa fa-home" aria-hidden="true"></i> Back to Home Blog</a> <span class="metabox__main">Post by <?php the_author_posts_link(); ?> on <?php the_time('Y-m-d') ?> in <?php echo get_the_category_list(', '); ?></span>
          </p>
        </div>
        <div class="generic-content">
          <?php the_content(); ?>
        </div>
      </div>
      <?php
    }
  ?>
<?php get_footer(); ?>