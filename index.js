var _ = require("lodash");
var pathToRegexp = require('path-to-regexp');


var data = {
    "/abc": {
        good: ["/abc"],
        bad: ["/abc2"]
    },
    "/index.json": {
        good: ["/index.json"],
        bad: ["/index_json"]
    },
    "/index(.)json": {
        good: ["/index.json", "/index_json"],
        bad: ["/indexjson", "/index__json"]
    },
    "/:name": {
        good: ["/mike", "/mike/"],
        bad: ["/mike/jackson"]
    },
    "/aaa/:name": {
        good: ["/aaa/mike"],
        bad: ["/aaa", "/aaa/mike/bbb"]
    },
    "/aaa:name": {
        good: ["/aaa123"],
        bad: ["/aaa", "/aaa/"]
    },
    "/:foo/:bar": {
        good: ["/aaa/bbb", "/aaa/bbb/"],
        bad: ["/aaa", "/aaa/", "/aaa/bbb/ccc"]
    },
    "/:foo/:bar?": {
        good: ["/aaa", "/aaa/", "/aaa/bbb", "/aaa/bbb/"],
        bad: ["/aaa/bbb/ccc"]
    },
    "/:foo*": {
        good: ["/", "/aaa", "/aaa/bbb", "/aaa/bbb/ccc"],
        bad: []
    },
    "/:foo(.*)": {
        good: ["/", "/aaa", "/aaa/bbb", "/aaa/bbb/ccc"],
        bad: []
    },
    "/:foo+": {
        good: ["/aaa", "/aaa/bbb", "/aaa/bbb/ccc"],
        bad: ["/"]
    },
    "/:foo(\\d+)": {
        good: ["/1", "/123"],
        bad: ["/", "/abc"]
    },
    "/:foo/(.*)": {
        good: ["/aaa/", "/aaa/bbb", "/aaa/bbb/ccc"],
        bad: ["/", "/aaa"]
    },
    "/aaa/*": {
        good: ["/aaa/", "/aaa/bbb", "/aaa/bbb/ccc"],
        bad: ["/aaa", "/"]
    },
    "/(apple-)?icon-:res(\\d+).png": {
        good: ["/icon-76.png", "/apple-icon-7.png"],
        bad: ["/orange-icon-76.png", "/icon-a.png", "/icon-.png", "/icon-76"]
    }
};

function checkPaths(collection, r, expected) {
    _.each(collection, function (realPath) {
        var result = r.test(realPath);
        var hasError = (result !== expected);
        console.log(realPath + " >>> " + result + " " + (hasError ? "(*)" : ""));
        if (result) {
            console.log(r.exec(realPath));
        }
    });
}

_.each(data, function (goodNBad, pathDef) {
    console.log("----------- " + pathDef + " -----------");
    var r = pathToRegexp(pathDef);
    console.log(r);
    console.log();

    console.log("== good paths:");
    checkPaths(goodNBad.good, r, true);

    console.log("== bad paths:");
    checkPaths(goodNBad.bad, r, false);

    console.log();
});
