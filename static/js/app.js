var app = angular.module('nextGenWeb', ['ngTable', 'googlechart'], function($interpolateProvider) {
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
    .directive('helloWorld', function() {
          return {
            restrict: 'AE',
            templateUrl: '/static/partials/myHelloWorld.html',
            link: function(scope, elem, attrs) {
              elem.bind('click', function() {
                console.log('do i get lciekce?');
                elem.css('background-color', 'blue');
                scope.$apply(function() {
                  scope.color = "blue";
                });
              });
              elem.bind('mouseover', function() {
                elem.css('cursor', 'pointer');
              });
            }
          };
        });
//    .controller('searchController', ['$scope', '$http', '$filter', 'ngTableParams', function($scope, $http, $filter, ngTableParams) {
//        $scope.value = "first";
//        console.log('i get to search controller but scope is', $scope.value);
//        $scope.forcedResults = [{"rating":"PG-13","fulltext":"'ancient':18 'battl':14 'boat':11 'china':19 'drama':5 'feminist':16 'must':13 'pond':1 'seattl':2 'stun':4 'teacher':8","description":"A Stunning Drama of a Teacher And a Boat who must Battle a Feminist in Ancient China","film_id":690,"rental_duration":7,"rental_rate":2.99,"replacement_cost":25.99,"release_year":2006,"title":"Pond Seattle","language_id":1,"last_update":"2013-05-26T14:50:58.951000","length":185,"special_features":["Trailers","Commentaries","Behind the Scenes"]},{"rating":"PG","fulltext":"'boat':25 'chef':15 'documentari':7 'escap':18 'fast':5 'fast-pac':4 'moos':20 'must':17 'pace':6 'pastri':14 'sea':1 'technic':10 'u':24 'u-boat':23 'virgin':2 'writer':11","description":"A Fast-Paced Documentary of a Technical Writer And a Pastry Chef who must Escape a Moose in A U-Boat","film_id":772,"rental_duration":4,"rental_rate":2.99,"replacement_cost":24.99,"release_year":2006,"title":"Sea Virgin","language_id":1,"last_update":"2013-05-26T14:50:58.951000","length":80,"special_features":["Deleted Scenes"]},{"rating":"NC-17","fulltext":"'convent':22 'cow':18 'discov':15 'forens':11 'insight':4 'mad':17 'man':8 'must':14 'mysql':21 'psychologist':12 'punk':2 'saga':5 'seabiscuit':1","description":"A Insightful Saga of a Man And a Forensic Psychologist who must Discover a Mad Cow in A MySQL Convention","film_id":773,"rental_duration":6,"rental_rate":2.99,"replacement_cost":28.99,"release_year":2006,"title":"Seabiscuit Punk","language_id":1,"last_update":"2013-05-26T14:50:58.951000","length":112,"special_features":["Commentaries","Deleted Scenes","Behind the Scenes"]},{"rating":"NC-17","fulltext":"'ancient':21 'car':10 'fast':5 'fast-pac':4 'japan':22 'kill':17 'mad':13 'must':16 'pace':6 'scientist':14 'searcher':1 'tale':7 'wait':2 'woman':19","description":"A Fast-Paced Tale of a Car And a Mad Scientist who must Kill a Womanizer in Ancient Japan","film_id":774,"rental_duration":3,"rental_rate":2.99,"replacement_cost":22.99,"release_year":2006,"title":"Searchers Wait","language_id":1,"last_update":"2013-05-26T14:50:58.951000","length":182,"special_features":["Trailers","Commentaries","Deleted Scenes","Behind the Scenes"]},{"rating":"PG-13","fulltext":"'crocodil':8 'desert':22 'expec':2 'insight':4 'meet':15 'must':14 'reflect':5 'sahara':21 'seattl':1 'sumo':11 'technic':17 'wrestler':12 'writer':18","description":"A Insightful Reflection of a Crocodile And a Sumo Wrestler who must Meet a Technical Writer in The Sahara Desert","film_id":775,"rental_duration":4,"rental_rate":4.99,"replacement_cost":18.99,"release_year":2006,"title":"Seattle Expecations","language_id":1,"last_update":"2013-05-26T14:50:58.951000","length":110,"special_features":["Trailers"]},{"rating":"NC-17","fulltext":"'ancient':18 'boy':16 'butler':8 'china':19 'face':14 'husband':11 'lacklustur':4 'must':13 'seabiscuit':2 'tale':5 'westward':1","description":"A Lacklusture Tale of a Butler And a Husband who must Face a Boy in Ancient China","film_id":970,"rental_duration":7,"rental_rate":0.99,"replacement_cost":11.99,"release_year":2006,"title":"Westward Seabiscuit","language_id":1,"last_update":"2013-05-26T14:50:58.951000","length":52,"special_features":["Commentaries","Deleted Scenes"]},{"rating":"NC-17","fulltext":"'ancient':19 'boat':8 'brilliant':4 'india':20 'mad':11 'meet':15 'moos':17 'must':14 'saga':5 'scientist':12 'sea':2 'wonka':1","description":"A Brilliant Saga of a Boat And a Mad Scientist who must Meet a Moose in Ancient India","film_id":986,"rental_duration":6,"rental_rate":2.99,"replacement_cost":24.99,"release_year":2006,"title":"Wonka Sea","language_id":1,"last_update":"2013-05-26T14:50:58.951000","length":85,"special_features":["Trailers","Commentaries"]}]
//
//        $scope.submit = function() {
//        console.log('what are my search terms', $scope.searchTerms);
//             $http
//                .get('/angular-search/' + $scope.searchTerms)
//                .success(function(data, status, headers, config) {
//                    $scope.results = data;
//                    console.log('scope results', $scope.results);
//                    $scope.makeTable($scope.results);
//                })
//                .error(function(data, status, headers, config) {
//                    console.log('error');
//                });
//        }
//
//        $scope.makeTable = function(data) {
//            $scope.tableParams = new ngTableParams({
//                page: 1,            // show first page
//                count: 10,          // count per page
//                sorting: {
//                    name: 'asc'     // initial sorting
//                }
//            }, {
//                total: data.length, // length of data
//                getData: function($defer, params) {
//                    // use build-in angular filter
//                    var orderedData = params.sorting() ?
//                                        $filter('orderBy')(data, params.orderBy()) :
//                                        data;
//
//                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
//                }
//            });
//        };
//
//        $scope.init = function () {
//          $scope.makeTable($scope.forcedResults);
//        }
//
//        $scope.init();
//
//
//    }]);



