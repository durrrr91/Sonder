Package.describe({
  name: "telescope:post-by-feed-c",
  summary: "Auto post via RSS to Telescope",
  version: "0.25.2",
  git: "https://github.com/TelescopeJS/telescope-post-by-feed.git"
});

Npm.depends({
  'feedparser': '1.0.0',
  'to-markdown': '0.0.2',
  'he': '0.5.0',
  'iconv-lite': '0.4.7',
  'xml2js': '0.4.12',
  'request': '2.65.0'
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use(['telescope:core@0.25.2']);

  api.addFiles([
    'lib/feeds.js',
    'lib/extendPosts.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/routes.js',
    'lib/client/templates/feeds.html',
    'lib/client/templates/feeds.js',
    'lib/client/templates/feed_item.html',
    'lib/client/templates/feed_item.js',
  ], 'client');

  api.addFiles([
    'lib/server/fetch_feeds.js',
    'lib/server/cron.js',
    'lib/server/publications.js',
    'lib/server/delete_inactive_offers.js',
    'lib/server/riobg.js',
    'lib/server/grabobg.js'
  ], ['server']);

  var languages = ["ar", "bg", "cs", "da", "de", "el", "en", "es", "et", "fr", "hu", "id", "it", "ja", "kk", "ko", "nl", "pl", "pt-BR", "ro", "ru", "sl", "sv", "th", "tr", "vi", "zh-CN"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

  api.export([
    'Feeds'
  ]);
});

Package.onTest(function(api) {
  api.use('tinytest');
});
