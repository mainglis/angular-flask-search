var app = angular.module('nextgenweb', ['ngTable'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    });
    app.directive('pavSearch', [function () {
        return {
            restrict: 'A',
            scope: {
                reset: '&',
                search: '&pavSearch'
            },
            link: function (scope, elem, attrs, ctrl) {
                elem
                    .on('keyup', function (e) {
                        var value = elem.val();
                        if(!value.length || value.length < 3) {
                            scope.reset();
                            return;
                        }
                        scope.search();
                    });
            }
        };
    }])
    .controller('searchController', ['$scope', '$http', '$filter', 'ngTableParams', function($scope, $http, $filter, ngTableParams) {
        $scope.value = "first";
        console.log('i get to search controller but scope is', $scope.value);

        $scope.submit = function() {
        console.log('what are my search terms', $scope.searchTerms);
             $http
                .get('/angular-search/' + $scope.searchTerms)
                .success(function(data, status, headers, config) {
                    $scope.results = data;
                    console.log('scope results', $scope.results);
                    $scope.makeTable($scope.results);
                })
                .error(function(data, status, headers, config) {
                    console.log('error');
                });
        }

        $scope.makeTable = function(data) {
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                total: data.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ?
                                        $filter('orderBy')(data, params.orderBy()) :
                                        data;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        };


    }]);



