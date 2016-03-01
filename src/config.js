import angular from 'angular';
import uiRouter from 'angular-ui-router';

const app = angular.module('app', [uiRouter]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
        $urlRouterProvider.otherwise('/sushi');
       
       $stateProvider
        .state('menu', {
            abstract: true,
            template: require('shop/menu.html'),
            controller: ($scope, $state) => {
                    $scope.orderItem = [];
                    $scope.increase =  item => {
                        if (item.quantity !== null) {
                            item.quantity += 1;
                        }
                    };
                    $scope.decrease = item => {
                        if (item.quantity !== null && item.quantity > 0) {
                            item.quantity -= 1;
                        }
                    };
                    $scope.orderCall = item => {
                        if (item.quantity !== null && item.quantity > 0) {
                            var addItem = angular.copy(item);
                            $scope.orderItem.push(addItem);
                            item.quantity = 0;
                        }
                    };
                    $scope.removeOrder = item => {
                        var index = $scope.orderItem.indexOf(item);
                        $scope.orderItem.splice(index, 1);
                    }
                    $scope.checkOut = () => {
                        var params = {"orderItem":$scope.orderItem};
                        console.log(params);
                        $state.go("checkout", params);
                    };
                }
            })
            .state('menu.sushi', {
                url: '/sushi',
                resolve: {
                    sushiItem: () => {
                        var item = [
                        {
                            "name": "Maguro",
                            "price": 200
                        },
                        {
                            "name": "Tamago",
                            "price": 120
                        },
                        {
                            "name": "Ebi",
                            "price": 150
                        },
                        {
                            "name": "Tako",
                            "price": 180
                        }
                    ];
                    return item;
                    }
                },
                views: {
                    "menulist": {
                        template: require('shop/menulist.html'),
                        controller: ($scope, sushiItem) => {
                            $scope.menuItem = sushiItem;
                        }
                    },
                    "order": {
                         template: require('shop/order.html')
                    }
                }
            })
             .state('menu.appetizer', {
                url: '/appetizer',
                resolve: {
                    appetizerItem:  () => {
                        var item = [
                            {name: "Takoyaki", price: 500},
                            {name: "Okonomiyaki", price: 500},
                            {name: "Yakisoba", price: 650},
                            {name: "Soba", price: 400}
                        ];
                        return item;
                    }
                },
                views: {
                    "menulist": {
                        template: require('shop/menulist.html'),
                        controller: ($scope, appetizerItem) => {
                            $scope.menuItem = appetizerItem;
                        }
                    },
                    "order": {
                        template: require('shop/order.html')
                    }
                }
            })
            .state('menu.drink', {
                url: '/drink',
                resolve: {
                    drinkItem:  () => {
                        var item = [
                            {name: "Coke", price: 100},
                            {name: "Water", price: 100},
                            {name: "Lemon Soda", price: 250},
                            {name: "Matcha", price: 200}
                        ];
                        return item;
                    }
                },
                views: {
                    "menulist": {
                        template: require('shop/menulist.html'),
                        controller: ($scope, drinkItem) => {
                            $scope.menuItem = drinkItem;
                        }
                    },
                    "order": {
                         template: require('shop/order.html')
                    }
                }
            })
            .state('checkout', {
                url: '/checkout',
                params: {'orderItem':''},
                template: require('shop/checkout.html'),
                controller: function ($scope, $stateParams, $state) {
                    $scope.orderItem = $stateParams.orderItem;
                    $scope.sum = 0;
                    angular.forEach($scope.orderItem, function(item) {
                        $scope.sum += (item.price * item.quantity);
                    });
                    console.log($stateParams);
                    $scope.payMoney =  () => {
                        alert("Thank you.");
                        $state.go('menu.sushi');
                    }
                }
            });

    $locationProvider.html5Mode(true); 
          });
export default app;