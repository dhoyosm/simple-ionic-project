'use strict';

angular.module('conFusion.services', ['ngResource'])

.constant("baseURL", "http://192.168.0.4:3000/")

.factory('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

    return $resource(baseURL + "dishes/:id", null, {
        'update': {
            method: 'PUT'
        }
    });

}])

.factory('promotionFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    return $resource(baseURL + "promotions/:id");

}])

.factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    return $resource(baseURL + "leadership/:id");
}])

.factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    return $resource(baseURL + "feedback/:id");
}])

.factory('favoriteFactory', ['$resource', '$localStorage', 'baseURL', function($resource, $localStorage, baseURL) {
    var favFac = {};
    var favorites = $localStorage.getObject('favorites', '[]');

    favFac.addToFavorites = function(index) {
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id == index)
                return;
        }
        favorites.push({
            id: index
        });
        $localStorage.storeObject('favorites', favorites);
    };

    favFac.deleteFromFavorites = function(index) {
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id == index) {
                favorites.splice(i, 1);
                $localStorage.storeObject('favorites', favorites);
            }
        }
    }

    favFac.getFavorites = function() {
        return favorites;
    };

    return favFac;
}])

;
