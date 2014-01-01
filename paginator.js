var Q = require('q');
module.exports = function (fig) {
    'use strict';
    return {
        getPage: function (pageNumber, success, error) {
            var deferred = Q.defer();
            fig.get(
                fig.resultsPerPage * (pageNumber - 1),
                fig.resultsPerPage,
                function getPageDone (results) {
                    if(success) {
                        success(results);
                    }
                    deferred.resolve(results);
                },
                function getPageError (err) {
                    if(error) {
                        error(err);
                    }
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        getNumberOfPages: function (success, error) {
            var deferred = Q.defer();
            fig.count(
                function getNumberOfPagesDone (numberOfItems) {
                    var results = Math.ceil(numberOfItems / fig.resultsPerPage);
                    if(success) {
                        success(results);
                    }
                    deferred.resolve(results);
                },
                function getNumberOfPagesError (err) {
                    if(error) {
                        error(err);
                    }
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        getAll: function (pageNumber, success, error) {
            var deferred = Q.defer();
            fig.all(
                fig.resultsPerPage * (pageNumber - 1),
                fig.resultsPerPage,
                function getAllDone (results) {
                    var finalResults = {
                        results: results.results,
                        numberOfPages: Math.ceil(results.count / fig.resultsPerPage)
                    };
                    if(success) {
                        success(finalResults);
                    }
                    deferred.resolve(finalResults);
                },
                function getAllError (err) {
                    if(error) {
                        error(err);
                    }
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        }
    };
};
