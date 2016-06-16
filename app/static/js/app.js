// Declare app level module which depends on filters, and services
angular.module('hswf', ['ngRoute'])
    .service('salonService', function($http) {
        return {
            getAll: function() {
                return $http.get('/hswf/salons');
            },
            getOne: function(id) {
                return $http.get('/hswf/salons/' + id);
            },
            login: function(data) {
                return $http.post('/hswf/salons/access', data);
            },
            create: function(data) {
                return $http.post('/hswf/salons', data);
            },
            update: function(id, data) {
                return $http.put('/hswf/salons/' + id, data);
            },
            delete: function(id) {
                return $http.delete('/hswf/salons/' + id);
            }
        }
    })
    .service('invitesService', function($http) {
        return {
            getAll: function() {
                return $http.get('/hswf/invites');
            },
            getOne: function(id) {
                return $http.get('/hswf/invites/' + id);
            },
            create: function(data) {
                return $http.post('/hswf/invites', data);
            },
            update: function(id, data) {
                return $http.put('/hswf/invites/' + id, data);
            },
            delete: function(id) {
                return $http.delete('/hswf/invites/' + id);
            }
        }
    })
    .service('activitiesService', function($http) {
        return {
            getAll: function() {
                return $http.get('/hswf/activitis');
            },
            getOne: function(id) {
                return $http.get('/hswf/activitis/' + id);
            },
            create: function(data) {
                return $http.post('/hswf/activitis', data);
            },
            update: function(id, data) {
                return $http.put('/hswf/activitis/' + id, data);
            },
            delete: function(id) {
                return $http.delete('/hswf/activitis/' + id);
            }
        }
    })
    .service('emailService', function($http) {
        return {
            send: function(data) {
                return $http.post('/send_msg', data);
            }
        }
    })
    .controller('openSalonController', function($scope, $location, salonService) {
        $scope.openSalon = function() {
            salonService.login({
                password: $scope.salonPass
            }).then(function(res) {
                $location.path('/show/' + res.data[0].id);
            }, function(err) {
                $scope.error = 'Mot de passe invalide';
            });
        }
        $scope.createSalon = function() {
            salonService.create({
                title: $scope.title,
                password: $scope.cpassword,
                departurePlace: $scope.departurePlace,
                arrivePlace: $scope.arrivePlace,
                departureDate: $scope.departureDate,
                returndate: $scope.returndate,
                description: $scope.description,
                thematique: $scope.thematique
            }).then(function(res) {
                invitesService.create({
                    salon_id: res.data.id,
                    name: $scope.lastName,
                    firstName: $scope.firstName,
                    email: $scope.email
                }).then(function(res2) {
                    $location.path('/show/' + res.data.id);
                }, function(err) {
                    $scope.error2 = 'Ta fait de la merde espèce de boulet';
                });
            }, function(err) {
                $scope.error2 = 'Mot de passe invalide';
            });
        }
    })
    .controller('viewSalonController', function($scope, $routeParams, $location, salonService) {
        salonService.getOne($routeParams.id).then(function(res) {
            $scope.salon = res.data;
            console.dir(res.data);
        }, function(err) {
            $location.path('/');
        });
        $scope.createInvite = function() {
            invitesService.create($scope.newInvite);
        }
        $scope.createActivite = function() {
            activitiesService.create($scope.newActivity);
        }
        $scope.save = function() {
            salonService.update($scope.obj).then(function(res) {
                $scope.salon = res.data;
            }, function(err) {
                $scope.error = 'Tu t\'es foiré machin';
            })
        }
    })
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/open', {
                templateUrl: 'views/openSalon.html',
                controller: 'openSalonController'
            })
            .when('/show/:id', {
                templateUrl: 'views/viewSalon.html',
                controller: 'viewSalonController'
            })
            .otherwise({
                redirectTo: '/open'
            });
    }])
    .run(function() {
        function debounce(funct, timeout) {
            var timeoutID, timeout = timeout || 200;
            return function() {
                var scope = this,
                    args = arguments;
                clearTimeout(timeoutID);
                timeoutID = setTimeout(function() {
                    funct.apply(scope, Array.prototype.slice.call(args));
                }, timeout);
            }
        }

        Element.prototype.setAttributes = function(attrs) {
            for (var key in attrs) {
                this.setAttribute(key, attrs[key]);
            }
        }

        var points = [],
            polygons = [],
            oldWidth = 0;

        function trianglifyLimit() {
            limit = window.innerHeight - window.pageYOffset;
            polygons.forEach(function(polygon, index) {
                if (window.pageYOffset == 0 || Math.max.apply(null, polygon.getAttribute('points').replace(new RegExp(/[\d\.]+\,/g), '').split(' ').map(function(element) {
                        return parseFloat(element);
                    })) < limit) {
                    polygon.classList.add('visible');
                } else {
                    polygon.classList.remove('visible');
                }
            });
        }

        function trianglify() {
            if (oldWidth == window.innerWidth) {
                return;
            }
            var svg = document.querySelector('#canvas'),
                svgBackground = document.querySelector('#canvas-background'),
                svgPolygons = document.querySelector('#canvas-polygons'),
                svgMask = document.querySelector('#canvas-mask');

            points = [];
            polygons = [];
            oldWidth = window.innerWidth;
            while (svgPolygons.firstChild) {
                svgPolygons.removeChild(svgPolygons.firstChild);
            }
            while (svgMask.firstChild) {
                svgMask.removeChild(svgMask.firstChild);
            }

            var margin = 30,
                fullWidth = window.innerWidth - margin * 2,
                fullHeight = window.innerHeight - margin * 2,
                attributes = {
                    'width': fullWidth,
                    'height': fullHeight
                }

            svg.setAttributes(attributes);
            svgPolygons.setAttributes(attributes);
            svgBackground.setAttributes(attributes);

            var unitSize = (fullWidth + fullHeight) / 20;
            numPointsX = Math.ceil(fullWidth / unitSize) + 1;
            numPointsY = Math.ceil(fullHeight / unitSize) + 1;
            unitWidth = Math.ceil(fullWidth / (numPointsX - 1));
            unitHeight = Math.ceil(fullHeight / (numPointsY - 1));

            for (var y = 0; y < numPointsY; y++) {
                for (var x = 0; x < numPointsX; x++) {
                    points.push([
                        unitWidth * x + ((x == 0 || x == numPointsX - 1) ? 0 : (Math.random() * unitWidth - unitWidth / 2) / 1.4),
                        unitHeight * y + ((y == 0 || y == numPointsY - 1) ? 0 : (Math.random() * unitHeight - unitHeight / 2) / 1.4)
                    ]);
                }
            }

            for (var i = 0; i < points.length; i++) {
                if (i % numPointsX != numPointsX - 1 && i <= numPointsY * numPointsX - numPointsX - 1) {
                    var rando = Math.floor(Math.random() * 2);
                    for (var n = 0; n < 2; n++) {
                        var polygon = document.createElementNS(svg.namespaceURI, 'polygon'),
                            coords = '';
                        if (rando == 0) {
                            if (n == 0) {
                                coords = points[i].join(',') + ' ' + points[i + numPointsX].join(',') + ' ' + points[i + numPointsX + 1].join(',');
                            } else if (n == 1) {
                                coords = points[i].join(',') + ' ' + points[i + 1].join(',') + ' ' + points[i + numPointsX + 1].join(',');
                            }
                        } else if (rando == 1) {
                            if (n == 0) {
                                coords = points[i].join(',') + ' ' + points[i + numPointsX].join(',') + ' ' + points[i + 1].join(',');
                            } else if (n == 1) {
                                coords = points[i + numPointsX].join(',') + ' ' + points[i + 1].join(',') + ' ' + points[i + numPointsX + 1].join(',');
                            }
                        }
                        polygon.setAttributes({
                            'points': coords,
                            'fill': 'rgba(0,0,0,' + (Math.random() / 4) + ')'
                        });
                        polygonClone = polygon.cloneNode();
                        polygons.push(polygon);
                        polygons.push(polygonClone);
                        svgPolygons.appendChild(polygonClone);
                        svgMask.appendChild(polygon);
                    }
                }
            }

            trianglifyLimit();
            document.addEventListener('scroll', trianglifyLimit);
        }

        document.addEventListener('DOMContentLoaded', trianglify);

        window.addEventListener('resize', debounce(trianglify, 50));


        trianglify();
        debounce(trianglify, 50);
    });
