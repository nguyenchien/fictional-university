<?php get_header(); 
  pageBanner(array(
    'title' => 'My Notes',
    'subtitle' => 'It make me get better',
  ));
?>
  <div class="container container--narrow page-section">
    <div class="create-note">
      <h2 class="headline headline--medium">Create New Note</h2>
      <input type="text" class="new-note-title" placeholder="Title">
      <textarea class="new-note-body" placeholder="Your Note here..."></textarea>
      <span class="submit-note">Create Note</span>
    </div>
    <ul id="myNotes" class="min-list link-list">
      <?php 
        $myNotes = new WP_Query(array(
          'post_type' => 'note',
          'posts_per_page' => -1,
          'author' => get_current_user_id(),
        ));
        
        while($myNotes->have_posts()) {
          $myNotes->the_post();
      ?>
          <li data-id="<?php echo get_the_ID(); ?>">
            <input class="note-title-field" readonly type="text" value="<?php echo esc_attr(get_the_title()); ?>">
            <span class="edit-note"><i class="fa fa-pencil"></i> Edit</span>
            <span class="delete-note"><i class="fa fa-trash-o"></i> Delete</span>
            <textarea class="note-body-field" readonly><?php echo esc_attr(wp_strip_all_tags(get_the_content())); ?></textarea>
            <span class="update-note btn btn--blue btn--small"><i class="fa fa-save"></i> Save</span>
          </li>
        <?php }
      ?>
    </ul>
  </div>
<?php get_footer(); ?>