# Backbone.js/RequireJS generator [![Build Status](https://secure.travis-ci.org/reintroducing/generator-bbr.png?branch=master)](http://travis-ci.org/reintroducing/generator-bbr)

Maintainer: [Matt Przybylski](https://github.com/reintroducing)

A Backbone generator that uses RequireJS for Yeoman that provides a functional boilerplate Backbone app out of the box. You also get access to a number of sub-generators which can be used to easily create individual models, views, collections and so on.

This is technically a fork of the [official Yeoman Backbone.js generator](https://github.com/yeoman/generator-backbone) that has been heavily edited to suit my needs and coding style.  I've added Jade templating and removed anything that I don't use or that I viewed as unnecessary.


## Usage

Install: `npm install -g generator-bbr`

Make a new directory and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo bbr`, optionally passing an app name:
```
yo bbr [app-name]
```

## Generators

Available generators:

- bbr:model
- bbr:view
- bbr:collection
- bbr:router
- bbr:all

## Typical workflow

```
yo bbr # generates your application base and build workflow
yo bbr:model blog
yo bbr:collection blog
yo bbr:router blog
yo bbr:view blog
grunt server
```

You could also optionally pass a second parameter to the subgenerator that will define the directory structure to put the files into:

```
yo bbr:model modelname directory/to/put/it
yo bbr:collection collectionname directory/to/put/it
yo bbr:router routername directory/to/put/it
yo bbr:view viewname directory/to/put/it
```

Collection subgenerators also take a third parameter (optional) that allows you to define the path to your model:

```
yo bbr:collection collectionname directory/to/put/it path/to/model
```

So, in the case that you have the following structure:

```
|-- js
|   |-- models
|       |-- test
|           |-- test.js
```

And you want to create a collection for TestModel (the name of the model from test.js), you would run this:

```
yo bbr:collection test test test # first is name of collection, second is directory to create it in, third is path to model
```

This would generate the following:

```
|-- js
|   |-- collections
|       |-- test
|           |-- test.js # TestCollection
|   |-- models
|       |-- test
|           |-- test.js # TestModel
```

Now `TestCollection` references `TestModel` with the define statement looking for `models/test/test` and passing it in as `TestModel` for reference within the collection.

**NOTE: Do not put beginning or trailing slashes on the directory structure!**


## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched for
  another supported testing framework like `jasmine`.

## A note regarding JST templates and strict mode

If you use strict mode in your app and JST templates the default grunt-jst implementation will cause your app to error out as the templates will be precompiled using a 'with' statement.

This can be addressed by changing the jst grunt task as follows:

```
jst: {
    compile: {
        options:
        {
            templateSettings:
            {
                variable: 'data'
            }
        },
        files: {
            '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.ejs']
        }
    }
},
```
A result of this change is that your template variable definitions must also be updated from `<%= templateVariable %>` to `<%= data.templateVariable %>`. More information on this can be found in the [Underscore documentation](http://underscorejs.org/#template).


## License

[MIT license](http://opensource.org/licenses/MIT)
