highstocks-ng
============

This is a fork from pablojim's highcharts-ng directive. This caters for using highstock charts
instead of highcharts. The directive is different than to pablojim's directive. Instead of
attributes on the element, this binds to a model, which mirrors the config in the highstock api.
This is more appropriate imo, e.g. on highchart element you specify `title` attr, but then you
get the attribute value as tooltip when you hover on the chart.

Usage
-----

Include highstocks-ng file. The directive can only be used as an element called `highstock`. The
element must have a ng-model assigned to it.

html:
`<highstock ng-model="mychart"></highstock>`

controller:
`$scope.mychart = {
    title: {
        text: 'highstock ftw'
    },
    series: []
}`

Issues
------

- Does not resize to 100% width of parent. (same issue with highcharts-ng).
- Currently only listens if series object changes and recreates chart, thus it's not dynamic (WIP)


highcharts-ng
=============

AngularJS directive for Highcharts

A simple Angularjs directive for Highcharts.

`<highchart id="chart1" series="chart.series" title="chart.title" options="chart.options"></highchart>`

See an example here: [http://jsfiddle.net/pablojim/Cp73s/](http://jsfiddle.net/pablojim/Cp73s/)

Features:
---------

- Adding and removing series
- Setting/Updating Chart options
- Updating the chart title


Caveats:
--------

- Due to many equality checks the directive maybe slow with large datasets (this is solvable though...)
- Whole Chart/Series is often redrawn where a simple update of data would suffice
- Needs tests!

See an example here: [http://jsfiddle.net/pablojim/Cp73s/](http://jsfiddle.net/pablojim/Cp73s/)
