Telescope.theme.settings.useDropdowns = true; // not strictly needed since "true" is the current default

Telescope.modules.remove("postComponents","post_avatars");
Telescope.modules.remove("postMeta","post_author");

Telescope.modules.remove("profileDisplay","user_info");
Telescope.modules.remove("profileDisplay","user_posts");
//"user_downvoted_posts"); is used as change-password

Telescope.modules.remove("footer","footer_code");

Telescope.modules.add("top", {
  template: "banner",
  order: 10
});