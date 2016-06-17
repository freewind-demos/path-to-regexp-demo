path-to-regexp demo
===================

path-to-regexp is used in express for defining paths of routes.

Note
----

Current Express `4.14.0` is using an old version of [path-to-regexp 0.1.7](https://github.com/expressjs/express/blob/master/package.json#L47), 
the rules are not the same for some examples (like `/ab*cd`, `/ab+cd`) 

How to run
----------

```
npm install
node index.js
```

and see the outputs, and the code of `index.js`

Docs
----

https://www.npmjs.com/package/path-to-regexp
http://forbeslindesay.github.io/express-route-tester/

A question
----------

http://stackoverflow.com/questions/37861777/whats-the-difference-between-foo-and-foo-in-express-routes