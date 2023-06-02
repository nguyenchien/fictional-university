<?php get_header(); 
  pageBanner();
?>
  <?php
    while(have_posts()) {
      the_post(); ?>
      <div class="container container--narrow page-section">
        <div class="metabox metabox--position-up metabox--with-home-link">
          <p>
            <a class="metabox__blog-home-link" href="/"><i class="fa fa-home" aria-hidden="true"></i> Home</a> <span class="metabox__main"><?php the_title(); ?></span>
          </p>
        </div>
        <div class="generic-content">
          <div class="one-third">
            <?php the_post_thumbnail('professorPortrait'); ?>
          </div>
          <div class="two-thirds">
            <?php the_content(); ?>
          </div>
        </div>
        <?php
          $relatedPrograms = get_field('related_programs');
          if ($relatedPrograms) {
          echo '<hr class="section-break" style="clear:both;">';
          echo '<h2 class="headline headline--medium">Subject(s) Taught</h2>';
          echo '<ul class="link-list min-list">';
          foreach ($relatedPrograms as $program) { ?>
            <li><a href="<?php echo get_the_permalink($program); ?>"><?php echo get_the_title($program); ?></a></li>
          <?php }
          echo '</ul>';
          }
        ?>
      </div>
      <?php
    }
  ?>
<?php get_footer(); ?>