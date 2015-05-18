# slugify-files v0.1.1 [![Build Status](https://travis-ci.org/raiseandfall/slugify-files.svg)](https://travis-ci.org/raiseandfall/slugify-files)

> A simple CL tool to slugify files

> ```"this Filename NEEDS cleaning.png" -> "this-filename-needs-cleaning.png"```


## INSTALL

```shell
$ npm install slugify-files
```

## USAGE

```javascript
var slugify = require('slugify-files');

snt(['*.png'], function (err) {
    console.log('files renamed');
});
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
