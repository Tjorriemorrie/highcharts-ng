'use strict';

angular.module('highcharts-ng', [])
    ///////////////////////////////////////////////////////////
    // highchart
    ///////////////////////////////////////////////////////////
    .directive('highchart', function () {
        var seriesId = 0;
        var ensureIds = function (series) {
            series.forEach(function (s) {
                if (!angular.isDefined(s.id)) {
                    s.id = "series-" + seriesId++;
                }
            });
        }

        var getMergedOptions = function (element, options) {
            var defaultOptions = {
                chart: {
                    renderTo: element[0]
                },
                title: {},
                series: []
            }
            var mergedOptions = {}
            if (options) {
                mergedOptions = $.extend(true, {}, defaultOptions, options);
            } else {
                mergedOptions = defaultOptions;
            }
            return mergedOptions
        }

        return {
            restrict: 'EC',
            replace: false,
            scope: {
                series: '=',
                options: '=',
                title: '='
            },
            link: function (scope, element, attrs) {

                var mergedOptions = getMergedOptions(element, scope.options);
                var chart = new Highcharts.Chart(mergedOptions);

                scope.$watch("series", function (newSeries, oldSeries) {
                    ensureIds(newSeries);
                    var ids = []

                    //Find series to add or update
                    newSeries.forEach(function (s) {
                        ids.push(s.id)
                        var chartSeries = chart.get(s.id);
                        if (chartSeries) {
                            chartSeries.update(angular.copy(s), false);
                        } else {
                            chart.addSeries(angular.copy(s), false)
                        }
                    });
                    //Now remove any missing series
                    chart.series.forEach(function (s) {
                        if (ids.indexOf(s.options.id) < 0) {
                            s.remove(false);
                        }
                    });
                    chart.redraw();

                }, true);
                scope.$watch("title", function (newTitle) {
                    chart.setTitle(newTitle, true);
                }, true);
                scope.$watch("options", function (newOptions, oldOptions, scope) {
                    //do nothing when called on registration
                    if (newOptions === oldOptions) return;
                    chart.destroy()
                    var mergedOptions = getMergedOptions(element, newOptions);
                    chart = new Highcharts.Chart(mergedOptions);
                    chart.setTitle(scope.title, true);
                    ensureIds(scope.series);
                    scope.series.forEach(function (s) {
                        chart.addSeries(angular.copy(s), false)
                    });
                    chart.redraw()

                }, true);
            }
        }
    })

    ///////////////////////////////////////////////////////////
    // highstock
    ///////////////////////////////////////////////////////////
    .directive('highstock', function () {
        var seriesId = 0;
        var ensureIds = function (series) {
            series.forEach(function (s) {
                if (!angular.isDefined(s.id)) {
                    s.id = "series-" + seriesId++;
                }
            });
        };

        var getMergedOptions = function (element, options) {
            var defaultOptions = {
                chart: {
                    renderTo: element[0]
                },
                title: {},
                series: [],
                rangeSelector: {}
            };
            var mergedOptions = {};
            if (options) {
                mergedOptions = $.extend(true, {}, defaultOptions, options);
            } else {
                mergedOptions = defaultOptions;
            }
            console.info('mergedOptions', mergedOptions);
            return mergedOptions
        };

        return {
            restrict: 'EC',
            replace: false,
            scope: {
                series: '=',
                options: '=',
                title: '=',
                rangeSelector: '='
            },
            link: function (scope, element, attrs) {

                var mergedOptions = getMergedOptions(element, scope.options);
                var chart = new Highcharts.Chart(mergedOptions);
                console.info('chart', chart);

                scope.$watch("series", function (newSeries, oldSeries) {
                    ensureIds(newSeries);
                    console.info('series old', oldSeries);
                    console.info('series new', newSeries);
                    var ids = [];

                    //Find series to add or update
                    newSeries.forEach(function (s) {
                        ids.push(s.id);
                        var chartSeries = chart.get(s.id);
                        if (chartSeries) {
                            chartSeries.update(angular.copy(s), false);
                        } else {
                            chart.addSeries(angular.copy(s), false)
                        }
                    });
                    //Now remove any missing series
                    chart.series.forEach(function (s) {
                        if (ids.indexOf(s.options.id) < 0) {
                            s.remove(false);
                        }
                    });
                    chart.redraw();

                }, true);
                scope.$watch("title", function (newTitle) {
                    chart.setTitle(newTitle, true);
                }, true);
                scope.$watch("options", function (newOptions, oldOptions, scope) {
                    //do nothing when called on registration
                    if (newOptions === oldOptions) return;
                    chart.destroy()
                    var mergedOptions = getMergedOptions(element, newOptions);
                    chart = new Highcharts.Chart(mergedOptions);
                    chart.setTitle(scope.title, true);
                    ensureIds(scope.series);
                    scope.series.forEach(function (s) {
                        chart.addSeries(angular.copy(s), false)
                    });
                    chart.redraw()

                }, true);
                scope.$watch('rangeSelector', function(oldRS, newRS) {
                    console.info('rangeSelector old', oldRS);
                    console.info('rangeSelector new', newRS);
                });
            }
        }
    });