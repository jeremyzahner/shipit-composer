# shipit-composer

[![Build Status](https://travis-ci.org/jeremyzahner/shipit-composer.svg)](https://travis-ci.org/jeremyzahner/shipit-composer)
[![Dependency Status](https://www.versioneye.com/user/projects/561b8423a193340f320012d7/badge.svg?style=flat)](https://www.versioneye.com/user/projects/561b8423a193340f320012d7)

**Note: this plugin is in a very early alpha stage.**

**Roadmap**

- Automatic installation of composer.
- Better error catching.
- Possibility to run any composer command.


## Install

```
npm install shipit-composer --save-dev
```


## Usage

Just simply run: This triggers the `composer` task on the deploy `updated` or `fetched` event.

```
shipit staging deploy

```

Or you can run the tasks separatly :

```
shipit staging composer:init composer:install

```


## Options `shipit.config.composer`

### `composer.remote`

Type: `Boolean`
Default: `true`

A Boolean to determine whether to run the task in local workspace or on the remote.

### `composer.installArgs`

Type: `Array` or `String`
Default: []

An array or string specifying composer args passed to the [composer install](https://getcomposer.org/doc/03-cli.md) cmd.

### `composer.installFlags`

Type: `Array` or `String`
Default: []

An array or string specifying composer flags passed to the [composer install](https://getcomposer.org/doc/03-cli.md) cmd.

### `composer.triggerEvent`

Type: `String`,`Boolean`
Default: `updated` or `fetched` (depending on `composer.remote` value)

An event name that triggers `composer:install`. Can be set to false to prevent the `composer:install` task from listening to any events.

### `composer.composerFile`

Type: `String`,
Default: `composer`

A simple string which gets converted to a path for adding a custom composer-file if the command is not present in the environment. (i.E. shared hosting).
**Provide absolute path!**

### Example `shipitfile.js` options usage

```js
module.exports = function (shipit) {

  require('shipit-deploy')(shipit);
  require('shipit-composer')(shipit);

  shipit.initConfig({
    default: {
      composer: {
        remote: false,
        installFlags: ['--no-dev', '--prefer-stable']
      }
    }
  });

};
```


## Workflow tasks

- composer
  - composer:init
      - Emit event "composer_inited".
  - composer:install
    - Runs composer install (with any Args `composer.installArgs` or Flags `composer.installFlags` defined in options)
    - Emit event "composer_installed"
  - composer:run
      - Runs composer command.

##### Event flow:

- on Event "deploy" (shipit-deploy initialized)
  - Runs *composer:init*
  - on Event "composer_inited"
    - Runs *composer:install* (Triggered on the `updated` or `fetched` event from [shipit-deploy](https://github.com/shipitjs/shipit-deploy) or by a custom `composer.triggerEvent` as mentioned above.)


## License

MIT


## Contributing

1. Fork it ( https://github.com/jeremyzahner/shipit-composer/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
