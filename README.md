# sanitize-filenames [![Build Status](https://travis-ci.org/raiseandfall/sanitize-filenames.svg)](https://travis-ci.org/raiseandfall/sanitize-filenames)

> A simple CL tool to sanitize filenames.


## INSTALL

<!--
```shell
$ npm install --save sanitize-filenames
```
-->

## USAGE

```shell
var snt = require('sanitize-filenames');

snt(['assets/*.png'], function (err) {
    console.log('files renamed');
});
```

## CONTRIBUTE

```shell
$ git clone git@github.com:raiseandfall/sanitize-filenames.git && cd sanitize-filenames
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
