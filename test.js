var _ = require('underscore');
var paginator, throwCountError = false;
exports.paginator = {
    setUp: function (done) {
        paginator = require('./paginator')({
            get: function (start, numberOfResults, done, error) {
                if(start > 8) {
                    error({
                        message: 'test getPage error'
                    });
                }
                else {
                    done(_.range(8).splice(start, numberOfResults));
                }
            },
            count: function (done, error) {
                if(throwCountError) {
                    error({
                        message: 'test getNumberOfPages error'
                    });
                }
                else {
                    done(8);
                }
            },
            resultsPerPage: 3
        });

        done();
    },

    tearDown: function (done) {
        throwCountError = false;
        done();
    },

    testFirstPage: function (test) {
        test.expect(1);
        paginator.getPage(1)
        .then(function (results) {
            test.deepEqual(results, [0, 1, 2]);
            test.done();
        });
    },

    testSecondPage: function (test) {
        test.expect(1);
        paginator.getPage(2)
        .then(function (results) {
            test.deepEqual(results, [3, 4, 5]);
            test.done();
        });
    },

    testLastPageCutoff: function (test) {
        test.expect(1);
        paginator.getPage(3)
        .then(function (results) {
            test.deepEqual(results, [6, 7]);
            test.done();
        });
    },

    testNumberOfPages: function (test) {
        test.expect(1);
        paginator.getNumberOfPages()
        .then(function (numberOfPages) {
            test.deepEqual(numberOfPages, 3);
            test.done();
        });
    },

    testGetPageError: function (test) {
        test.expect(1);
        paginator.getPage(4)
        .catch(function (err) {
            test.deepEqual(err, { message: 'test getPage error' });
            test.done();
        });
    },

    testGetNumberOfPagesError: function (test) {
        test.expect(1);
        throwCountError = true;
        paginator.getNumberOfPages()
        .catch(function (err) {
            test.deepEqual(err, { message: 'test getNumberOfPages error' });
            test.done();
        });
    },

    testFirstPageCallback: function (test) {
        test.expect(1);
        paginator.getPage(1, function (results) {
            test.deepEqual(results, [0, 1, 2]);
            test.done();
        });
    },

    testNumberOfPagesCallback: function (test) {
        test.expect(1);
        paginator.getNumberOfPages(function (numberOfPages) {
            test.deepEqual(numberOfPages, 3);
            test.done();
        });
    },

    testGetPageErrorCallback: function (test) {
        test.expect(1);
        paginator.getPage(4, undefined, function (err) {
            test.deepEqual(err, { message: 'test getPage error' });
            test.done();
        });
    },

    testGetNumberOfPagesErrorCallback: function (test) {
        test.expect(1);
        throwCountError = true;
        paginator.getNumberOfPages(undefined, function (err) {
            test.deepEqual(err, { message: 'test getNumberOfPages error' });
            test.done();
        });
    }
};
