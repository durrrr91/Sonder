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

'public/img/aprilci.jpg',
'public/img/godlevo.jpg',
'public/img/montana.jpg',
'public/img/smolyan.jpg',
'public/img/arbanasi.jpg',
'public/img/govedartsi.jpg',
'public/img/neseber.jpg',
'public/img/sofia.jpg',
'public/img/balchik.jpg',
'public/img/greece.jpg',
'public/img/obzor.jpg',
'public/img/stara_zagora.jpg',
'public/img/bansko.jpg',
'public/img/haskovo.jpg',
'public/img/pamporovo.jpg',
'public/img/sunny_beach.jpg',
'public/img/banya.jpg',
'public/img/hisarya.jpg',
'public/img/panagurishte.jpg',
'public/img/svishtov.jpg',
'public/img/borovec.jpg',
'public/img/irakli.jpg',
'public/img/pazardzhik.jpg',
'public/img/teteven.jpg',
'public/img/bracigovo.jpg',
'public/img/kalofer.jpg',
'public/img/pernik.jpg',
'public/img/triavna.jpg',
'public/img/bulgaria.jpg',
'public/img/kardzhali.jpg',
'public/img/peshtera.jpg',
'public/img/trigrad.jpg',
'public/img/burgas.jpg',
'public/img/karlovo.jpg',
'public/img/pleven.jpg',
'public/img/troyan.jpg',
'public/img/cari_mali_grad.jpg',
'public/img/koprivshtitsa.jpg',
'public/img/plovdiv.jpg',
'public/img/tsarevo.jpg',
'public/img/chepelare.jpg',
'public/img/kostenec.jpg',
'public/img/pomorie.jpg',
'public/img/tsigov_chark.jpg',
'public/img/chiflik.jpg',
'public/img/kyustendil.jpg',
'public/img/pravets.jpg',
'public/img/varna.jpg',
'public/img/devin.jpg',
'public/img/leshten.jpg',
'public/img/ravadinovo.jpg',
'public/img/veliko_turnovo.jpg',
'public/img/dobrinishte.jpg',
'public/img/logo.jpg',
'public/img/ravda.jpg',
'public/img/velingrad.jpg',
'public/img/drianovo.jpg',
'public/img/razlog.jpg',
'public/img/vratsa.jpg',
'public/img/elena.jpg',
'public/img/marker.png',
'public/img/ribarica.jpg',
'public/img/vurshec.jpg',
'public/img/etropole.jpg',
'public/img/marker_w.png',
'public/img/ruse.jpg',
'public/img/yagodina.jpg',
'public/img/ezerec.jpg',
'public/img/melnik.jpg',
'public/img/samokov.jpg',
'public/img/zlatni_piasaci.jpg',
'public/img/gabrovo.jpg',
'public/img/mirkovo.jpg',
'public/img/sandanski.jpg',
'public/img/zlatograd.jpg',
'public/img/goce_delchev.jpg',
'public/img/mladejko.jpg',
'public/img/shumen.jpg'

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
