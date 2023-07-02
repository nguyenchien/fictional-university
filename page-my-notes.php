<?php get_header(); 
  pageBanner(array(
    'title' => 'My Notes',
    'subtitle' => 'It make me get better',
  ));
?>
  <div class="container container--narrow page-section">
    <ul class="min-list link-list">
      <?php 
        $myNotes = new WP_Query(array(
          'post_type' => 'note',
          'posts_per_page' => -1,
          'author' => get_current_user_id(),
        ));
        
        while($myNotes->have_posts()) {
          $myNotes->the_post();
      ?>
          <li>
            <input class="note-title-field" type="text" value="<?php echo esc_attr(get_the_title()); ?>">
            <span id="js-edit-note" class="edit-note"><i class="fa fa-pencil"></i> Edit</span>
            <span id="js-delete-note" class="delete-note"><i class="fa fa-trash-o"></i> Delete</span>
            <textarea class="note-body-field"><?php echo esc_attr(wp_strip_all_tags(get_the_content())); ?></textarea>
          </li>
        <?php }
      ?>
    </ul>
  </div>
<?php get_footer(); ?>