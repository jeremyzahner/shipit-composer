var utils = require('shipit-utils');
var sprintf = require('sprintf-js').sprintf;

/**
 * Runs composer install
 */

module.exports = function (shipitInstance) {

  utils.registerTask(shipitInstance, 'composer:install', task);

  function task() {

    var shipit = utils.getShipit(shipitInstance);

    function install(remote) {

      shipit.log('Installing composer modules.');
      var method = remote ? 'remote' : 'local';
      var cdPath = remote ? shipit.releasePath || shipit.currentPath : shipit.config.workspace;

      if(!cdPath) {
        var msg = remote ? 'Please specify a deploy to path (shipit.config.deployTo)' : 'Please specify a workspace (shipit.config.workspace)'
        throw new Error(
          shipit.log(msg)
        );
      }

      var args = Array.isArray(shipit.config.composer.installArgs) ? shipit.config.composer.installArgs.join(' ') : shipit.config.composer.installArgs;
      var flags = Array.isArray(shipit.config.composer.installFlags) ? shipit.config.composer.installFlags.join(' ') : shipit.config.composer.installFlags;
      var AF = args ? flags ? args.concat(' ',flags) : args : flags ? flags : '';

      return shipit[method](
        sprintf('cd %s && composer install %s', cdPath, AF)
      );

    }

    if(shipit.composer_inited) {

      return install(shipit.config.composer.remote)
      .then(function () {
        shipit.log('composer install complete');
      })
      .then(function () {
        shipit.emit('composer_installed')
      })
      .catch(function (e) {
        shipit.log(e);
      });

    }else {
      throw new Error(
        shipit.log(
          'try to install composer before composer:install'
        )
      );
    }

  }

};
