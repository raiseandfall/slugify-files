# slugify-files [![Build Status](https://travis-ci.org/raiseandfall/slugify-files.svg)](https://travis-ci.org/raiseandfall/slugify-files)

> A simple CL tool to slugify files (kebab-case)

> ```"this Filename NEEDS cleaning.png" -> "this-filename-needs-cleaning.png"```


## INSTALL

```shell
$ npm install slugify-files
```

## USAGE

```javascript
var slugify = require('slugify-files');

slugify(['*.png'], function (err) {
    console.log('files renamed');
});
```

## CLI

```shell
$ npm install --global slugify-files
```

```
$ slugify --help

  Usage
    $ slugify <source>

  Example
    $ slugify '*.tmp'

  <source> can contain globs if quoted
```

## CONTRIBUTE

```shell
$ git clone git@github.com:raiseandfall/slugify-files.git && cd slugify-files
```

```shell
$ npm i
```

Run
```shell
$ npm run dev
```

Run tests
```shell
$ npm run test
```
