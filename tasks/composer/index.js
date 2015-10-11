var utils = require('shipit-utils');

/**
 * Register Composer tasks.
 * - composer
 * - composer:install
 */

module.exports = function (shipitInstance) {

  var shipit = utils.getShipit(shipitInstance);

  require('./init')(shipitInstance);
  require('./install')(shipitInstance);

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
