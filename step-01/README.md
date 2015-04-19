# Step 1 - unit testing AppController

## Where are we?

A running Angular application running from a local webserver;
displaying a filterable, sortable list of restaurants and delivery info form.

## Goals

Ensure karma is installed
Configure a karma test config
Create and run initial unit tests for `AppController`

## Topics

* Karma
* Jasmine
* angular.mock.inject
* angular.mock.module
* $controller

## Tasks

* Install karma-cli and karma libraries in the root of the repository

```bash
$ cd foodme-further
$ npm install -g karma-cli
$ npm init

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (foodme-further)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository: (https://github.com/petebacondarwin/foodme-further.git)
keywords:
author:
license: (ISC)
About to write to /Users/pete/dev/angular/foodme-further/package.json:

{
  "name": "foodme-further",
  "version": "1.0.0",
  "description": "(explain about http server and XHR issues) * Step 0 - run the local webserver",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/petebacondarwin/foodme-further.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/petebacondarwin/foodme-further/issues"
  },
  "homepage": "https://github.com/petebacondarwin/foodme-further"
}


Is this ok? (yes)
```

* Initialize karma config in the step folder

```bash
$ cd step-01
$ karma init


Which testing framework do you want to use ?
Press tab to list possible options. Enter to move to the next question.
> jasmine

Do you want to use Require.js ?
This will add Require.js plugin.
Press tab to list possible options. Enter to move to the next question.
> no

Do you want to capture any browsers automatically ?
Press tab to list possible options. Enter empty string to move to the next question.
> Chrome
>

What is the location of your source and test files ?
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.
> ../shared/js/angular.js
> ../shared/js/angular-messages.js
> ../shared/js/angular-message-format.js
> ../shared/js/angular-mocks.js
> *.js
>

Should any of the files included by the previous patterns be excluded ?
You can use glob patterns, eg. "**/*.swp".
Enter empty string to move to the next question.
>

Do you want Karma to watch all the files and run the tests on change ?
Press tab to list possible options.
> yes
```

* Create `app.spec.js` Jasmine spec file

```js
describe('AppController controller', function() {
  var controller;

  beforeEach(module('app'));

  beforeEach(inject(function($controller) {
    controller = $controller('AppController', {});
  }));

  it('should initialize controller properties', function() {
    expect(controller.deliveryFormVisible).toBe(true);
    expect(controller.user).toEqual(jasmine.any(Object));
    expect(controller.sortProperty).toEqual('name');
    expect(controller.sortDirection).toBe(false);
  });
});
```

* Start the karma test runner

```bash
$ karma start
```

## Extras

* Test that the `AppController` `filters` property has been correctly initialized