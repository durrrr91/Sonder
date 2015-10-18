Package.describe({
  name: "custom-theme",
  summary: "Telescope Hubble theme package",
  version: "0.25.2",
  git: "https://github.com/TelescopeJS/telescope-theme-hubble.git"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use(['telescope:core@0.25.2']);

  api.addFiles([
    'lib/hubble.js',
    ], ['client', 'server']);

  api.addAssets([
    'public/img/logo.jpg',
    'public/img/marker_w.png',
    'public/img/bulgaria.jpg'
  ], 'client');

  api.addFiles(
    [
      // modules
      'lib/client/scss/modules/_accounts.scss',
      'lib/client/scss/modules/_comments.scss',
      'lib/client/scss/modules/_dialogs.scss',
      'lib/client/scss/modules/_nav.scss',
      'lib/client/scss/modules/_posts.scss',
      'lib/client/scss/modules/_user-profile.scss',
      'lib/client/scss/modules/_banners.scss',

      // partials
      'lib/client/scss/partials/_colors.scss',
      'lib/client/scss/partials/_grid.scss',
      'lib/client/scss/partials/_mixins.scss',
      'lib/client/scss/partials/_tooltips.scss',
      'lib/client/scss/partials/_typography.scss',

      // screen
      'lib/client/scss/screen.scss',
      'lib/client/scss/custom.scss',

      //templates
      'lib/client/templates/profile/change-password.html',
      'lib/client/templates/hero/banner.html',
      'lib/client/templates/hero/banner.js',
      'lib/client/templates/posts/custom_post_title.html'
    ],
    'client'
  );

});
