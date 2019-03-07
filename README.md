# tiny-mce
A vue JS tinyMCE example with file uploads to local server written in PHP for PDFs and Image files
support for other backend image storage logic the endpoint must return an object like:

```
{...
      location: 'https://fileupload.com/exapmle'
...}

```
For valid completed uploads

## TODO

Add support for Amazon S3/DO spaces
Add NodeJS backend


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
