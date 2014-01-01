#Paginator
##Pagination facade for node

###Create a paginator object.
```javascript
paginator = require('paginator')({
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
```

###promise getPage(pageNumber, successCallback, errorCallback)
```javascript
paginator.getPage(
    1,
    function (results) {
        test.deepEqual(results, [0, 1, 2]);
    },
    function (err) {
        test.deepEqual(err, { message: 'test getPage error' });
    }
);
```

###promise getNumberOfPages(successCallback, errorCallback)
```javascript
paginator.getNumberOfPages(
    function (numberOfPages) {
        test.deepEqual(numberOfPages, 3);
    },
    function (err) {
        test.deepEqual(err, { message: 'test getNumberOfPages error' });
    }
);
```

Both methods can alternatively be used with Q promises
```javascript
paginator.getPage(1)
.then(function (results) {
    test.deepEqual(results, [0, 1, 2]);
})
.catch(function (err) {
    test.deepEqual(err, { message: 'test getPage error' });
});
```
