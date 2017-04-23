(function () {
	angular
        .module("book", [])
	.directive('checkImage', function ($q) {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	            attrs.$observe('ngSrc', function (ngSrc) {
	                var deferred = $q.defer();
	                var image = new Image();
	                image.onerror = function () {
	                    deferred.resolve(false);
	                    element.attr('src', '/images/noimage.jpg?v=3.10'); // set default image
	                };
	                image.onload = function () {
	                    deferred.resolve(true);
	                };
	                image.src = ngSrc;
	                return deferred.promise;
	            });
	        }
	    };
	});
     
})();