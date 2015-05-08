var app = angular.module('nextgenweb', ['ui.router'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    });
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/search');
        $stateProvider
            .state('angular-search', {
                url:'/search',
                templateUrl: '/static/partials/search.html',
                controller: 'searchController'
            })
    }])
    .directive('pavSearch', [function () {
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
    .controller('searchController', ['$scope', '$http', function($scope, $http) {
        $scope.submit = function() {
             $http
                .get('/angular-search/' + $scope.searchTerms)
                .success(function(data, status, headers, config) {
                    $scope.results = data;
                })
                .error(function(data, status, headers, config) {
                    console.log('error');
                });
        }
    }]);



