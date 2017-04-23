/**
 * Code by @lbotinelly 2015-09-04
 * Based on original code by Abdullah on 9/19/14.
 * Modified and enhanced by Juergen Wahlmann on 3/5/15
 */

var app = angular.module('ionSlider', []);

app.directive('ionslider', function ($timeout) {
    return {
        restrict: 'E',
        scope: {
            type: '@',
            prefix: '@',
            maxPostfix: '@',
            grid: '@',
            gridSnap: '@',
            gridMargin: '@',
            gridNum: '@',
            postfix: '@',
            step: '@',
            hideMinMax: '@',
            forceEdges: '@',
            hideFromTo: '@',
            min: '=',
            max: '=',
            from: '=',
            to: '=',
            disable: '=',
            prettify: '='
        },
        template: '<div></div>',
        replace: true,
        link: function ($scope, $element, attrs) {

            $scope.rangeChangeCallback = function (sliderObj) {
                debugger

                $scope.from = sliderObj.from;
                $scope.to = sliderObj.to;
            }

            $scope.rangeFinishCallback = function (sliderObj) {
                debugger
                $scope.from = sliderObj.from;
                $scope.to = sliderObj.to;
                $scope.$apply();
            }

            $element.ionRangeSlider({
                min: $scope.min,
                max: $scope.max,
                type: $scope.type,
                prefix: $scope.prefix,
                maxPostfix: $scope.maxPostfix,
                prettify: $scope.prettify,
                force_edges: $scope.forceEdges,
                grid: $scope.grid,
                grid_snap: $scope.gridSnap,
                grid_num: $scope.gridNum,
                gridMargin: $scope.gridMargin,
                postfix: $scope.postfix,
                step: $scope.step,
                hideMinMax: $scope.hideMinMax,
                hideFromTo: $scope.hideFromTo,
                from: $scope.from,
                to: $scope.to,
                disable: $scope.disable,
                onChange: $scope.rangeChangeCallback,
                onFinish: $scope.rangeFinishCallback
            });

            $scope.el = $element.data("ionRangeSlider");

            $scope.$on('$destroy', function () {
                console.log("ionRangeSlider - destroy");
                $scope.el && $scope.el.destroy();
            });
            $scope.init(function () {
                console.log("ionRangeSlider - init");
 debugger               
                var type= $scope.type;
                var prefix = $scope.prefix;
 

            });
            $scope.$watch('min', function (value) {
                $timeout(function () {
                    $element.data("ionRangeSlider").update({ min: value });
                });
            }, true);
            $scope.$watch('max', function (value) {
                $timeout(function () {
                    $element.data("ionRangeSlider").update({ max: value });
                });
            });
            $scope.$watch('from', function (value) {
                $timeout(function () {
                    $element.data("ionRangeSlider").update({ from: value });
                });
            });
            $scope.$watch('disable', function (value) {
                $timeout(function () {
                    $element.data("ionRangeSlider").update({ disable: value });
                });
            });
        }
    }
});