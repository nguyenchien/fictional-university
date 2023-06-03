<?php get_header(); 
  pageBanner(array(
    'title' => 'All Events',
    'subtitle' => 'All events going in here'
  ));
?>
<div class="container container--narrow page-section">
  <?php
    while(have_posts()) {
      the_post();?>
      <div class="event-summary">
        <a class="event-summary__date t-center" href="<?php the_permalink(); ?>">
          <?php 
            $eventDay = new DateTime(get_field('event_date'));
            $month = $eventDay->format('M');
            $day = $eventDay->format('d');
          ?>
          <span class="event-summary__month"><?php echo $month; ?></span>
          <span class="event-summary__day"><?php echo $day; ?></span>
        </a>
        <div class="event-summary__content">
          <h5 class="event-summary__title headline headline--tiny">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
          </h5>
          <p><?php echo wp_trim_words(get_the_content(), 50); ?> <a href="<?php the_permalink(); ?>" class="nu gray">Learn more</a></p>
        </div>
      </div>
    <?php }
  ?>
  <div class="pagination">
    <?php
      echo paginate_links();
    ?>
  </div>
  <hr class="section-break">
  <p>Looking for a recap of past events. <a href="<?php echo site_url('past-events') ?>">Check it out past events archive.</a></p>
</div>
<?php get_footer(); ?>