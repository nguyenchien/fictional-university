<?php get_header(); 
  pageBanner();
?>
<div class="container container--narrow page-section">
  <?php
    while(have_posts()) {
      the_post();?>
      <div class="post-item">
        <h2 class="headline headline--medium headline--post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
        <div class="metabox">
          <p>Post by <?php the_author_posts_link(); ?> on <?php the_time('Y-m-d') ?> in <?php echo get_the_category_list(', '); ?></p>
        </div>
        <div class="generic-content">
          <?php the_excerpt(); ?>
          <p><a href="<?php the_permalink(); ?>" class="btn btn--blue">Continue reading &raquo;</a></p>
        </div>
      </div>
      <?php
    }
  ?>
  <div class="pagination">
    <?php
      echo paginate_links();
    ?>
  </div>
</div>
<?php get_footer(); ?>