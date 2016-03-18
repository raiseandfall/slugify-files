# slugify-files  

[![Build Status](https://travis-ci.org/raiseandfall/slugify-files.svg)](https://travis-ci.org/raiseandfall/slugify-files)

> A simple CL tool to slugify files (kebab-case)

> ```"this Filename NEEDS cleaning.png" -> "this-filename-needs-cleaning.png"```

## [CHANGELOG](./CHANGELOG.md)

## INSTALL

```shell
$ npm install slugify-files
```

## USAGE

```javascript
var slugify = require('slugify-files');

slugify(['*.png'], function (err, sluggedFiles) {
  sluggedFiles.forEach(function(file, idx)) {
    console.log(file.old, 'renamed to', file.new);
  }
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

## API

```javascript
slugify(source, function(err, sluggedFiles){});
```
- ```source```: glob  
- ```err```: error  
- ```sluggedFiles```: Array of slugged files objects. Each has two keys: ```old``` and ```new```

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

## LICENSE
MIT
