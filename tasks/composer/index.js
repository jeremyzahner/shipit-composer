var utils = require('shipit-utils');

/**
 * Register Composer tasks.
 * - composer
 * - composer:install
 */

module.exports = function (shipit) {

  var shipit = utils.getShipit(shipit);

  require('./init')(shipit);
  require('./install')(shipit);

  shipit.on('deploy', function () {

    shipit.start('composer:init');

    shipit.on('composer_inited', function () {

      if (shipit.config.composer.triggerEvent) {
        shipit.on(shipit.config.composer.triggerEvent, function () {
          shipit.start('composer:install');
        });
      }

    });

  });

};
