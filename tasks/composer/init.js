var utils = require('shipit-utils');
var path = require('path');

/**
 * Init task.
 * - Emit composer_inited event.
 */

module.exports = function (shipit) {

  utils.registerTask(shipit, 'composer:init', task);

  function task() {

    var shipit = utils.getShipit(shipit);

    shipit.config = shipit.config || {};
    shipit.currentPath = shipit.config.deployTo ? path.join(shipit.config.deployTo, 'current') : undefined;
    shipit.config.composer = shipit.config.composer || {};
    shipit.config.composer.remote = shipit.config.composer.remote !== false;
    shipit.config.composer.installArgs = shipit.config.composer.installArgs || [];
    shipit.config.composer.installFlags = shipit.config.composer.installFlags || [];

    var triggerEvent = shipit.config.composer.remote ? 'updated' : 'fetched';
    shipit.config.composer.triggerEvent = shipit.config.composer.triggerEvent !== undefined ? shipit.config.composer.triggerEvent : triggerEvent;

    shipit.composer_inited = true;
    shipit.emit('composer_inited');
    
  }
};