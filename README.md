# webgl2-demoreel #
Demo of WebGL2.

This project goes with:
* *Server side rendering* and *code spliting* with
[react-universal-component](https://github.com/faceyspacey/react-universal-component)
and [webpack-flush-chunks](https://github.com/faceyspacey/webpack-flush-chunks).
* CI/CD with `cloudbuild.yaml`, which currently enables static file web hosting.
* Code generateor with [plop](https://github.com/amwmedia/plop), which enables auto adding jsDoc comments.
* Document generator with [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).

## Usage ##
### Deploy static files ###
* push to `master/develop` branch will auto trigger CI for google cloud platform.

### Run production server ###
```sh
$ yarn install
$ cp default.config.json config.json
$ vim config.json # change SERVER_SIDE_RENDER and other values as you like.
$ PORT=xxx yarn start
```
* server will start on on *http://localhost:xxx*. (default port is 3000)

### Run develop server ###
```sh
$ yarn install
$ cp default.config.json config.json
$ vim config.json # change NODE_ENV to 'develop', SERVER_SIDE_RENDER and other values as you like.
$ PORT=xxx yarn devstart
```
* server will start on on *http://localhost:xxx*. (default port is 3000)

### Changing files ###
* Use `yarn plop` to add *reducer/reducerAction/action/selector/component*.
* Discuss with @frontend before changing/adding anything without `yarn plop`.

### Update this document ###
```sh
$ yarn install
$ yarn docs
```

## Document ##
