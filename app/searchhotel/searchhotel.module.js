(function () {
    angular
        .module("searchHotel", [])
    //'angular-bind-html-compile'
})();

//(function () {
//    angular.module('searchHotel', [])
//        .directive('icheck', ['$timeout', '$parse', function ($timeout, $parse) {
//        return {
//            restrict: 'A',
//            require: '?ngModel',
//            link: function (scope, element, attr, ngModel) {
//                $timeout(function () {
//                    var value = attr.value;

//                    function update(checked) {
//                        if (attr.type === 'radio') {
//                            ngModel.$setViewValue(value);
//                        } else {
//                            ngModel.$setViewValue(checked);
//                        }
//                    }

//                    $(element).iCheck({
//                        checkboxClass: attr.checkboxClass || 'icheckbox_square-green',
//                        radioClass: attr.radioClass || 'iradio_square-green'
//                    }).on('ifChanged', function (e) {
//                        scope.$apply(function () {
//                            update(e.target.checked);
//                        });
//                    });

//                    scope.$watch(attr.ngChecked, function (checked) {
//                        if (typeof checked === 'undefined') checked = !!ngModel.$viewValue;
//                        update(checked)
//                    }, true);

//                    scope.$watch(attr.ngModel, function (model) {
//                        $(element).iCheck('update');
//                    }, true);

//                })
//            }
//        }
//    }])

//    //app.controller('Ctrl', ['$scope', function ($scope) {
//    //    $scope.selectAll = false;

//    //    $scope.selected = {};
//    //    $scope.items = [{
//    //        id: 1,
//    //        name: 'AAAA'
//    //    }, {
//    //        id: 2,
//    //        name: 'BBBB'
//    //    }];

//    //}])
//})();