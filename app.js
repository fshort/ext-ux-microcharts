/**
 * Created By: Fred Short
 * Date: 6/30/12 @ 9:26 AM
 */
Ext.Loader.setConfig({enabled: true, disableCaching: false});

Ext.Loader.setPath('FS', '/MicroCharts/FS');

Ext.application({
    name: 'SparkLineDemo',

    requires: [
        'Ext.container.Viewport',
        'FS.chart.SparkLineChart',
        'FS.chart.series.SparkLine',
        'FS.chart.axis.SparkNumeric',
        'FS.chart.axis.SparkCategory'
    ],

    appFolder: 'app',

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'vbox',
            margin: '5 5 5 5',
            items: [/*{
                xtype: 'chart',
                border: false,
                animate: true,
                margin: 5,
                background: '#ccc',
                height: 50,
                width: 200,
                legend: {
                    position: 'right'
                },
                store: Ext.create('Ext.data.JsonStore', {
                    fields: ['period', 'data1', 'data2', 'data3'],
                    data: [
                        { 'period': 1, 'data1': 8 },
                        { 'period': 2, 'data1': 11 },
                        { 'period': 3, 'data1': 14 },
                        { 'period': 4, 'data1': 9 },
                        { 'period': 5, 'data1': 12 },
                        { 'period': 6, 'data1': 15 },
                        { 'period': 7, 'data1': 18 },
                        { 'period': 8, 'data1': 14 },
                        { 'period': 9, 'data1': 9 },
                        { 'period': 10, 'data1': 11 }
                    ]
                }),
                shadow: false,
                axes: [{
                    type: 'SparkNumeric',
                    dashSize: 1,
                    position: 'left',
                    fields: ['data1']

                }, {
                    type: 'SparkNumeric',
                    dashSize: 1,
                    position: 'bottom',
                    fields: ['period']
                }],
                series: [{
                    type: 'line',
                    showMarkers: false,
                    highlight: {
                        size: 1,
                        radius: 1
                    },
                    axis: 'left',
                    xField: 'period',
                    yField: 'data1'
                }]
            },*/ {
                xtype: 'sparklinechart',
                border: false,
                animate: true,
                margin: 5,
                height: 40,
                width: 200,
                sparkLabel: {
                    position: 'right',
                    display: 'lastYValue'
                },
                store: Ext.create('Ext.data.JsonStore', {
                    fields: ['period', 'data1', 'data2'],
                    data: [
                        { 'period': 'First', 'data1': 8, 'data2': 'Hi' },
                        { 'period': 'Second', 'data1': 11, 'data2': 'Hi' },
                        { 'period': 'Third', 'data1': 14, 'data2': 'Hi' },
                        { 'period': 'Fourth', 'data1': 9, 'data2': 'Hi' },
                        { 'period': 'Fifth', 'data1': 12, 'data2': 'Hi' },
                        { 'period': 'Sixth', 'data1': 15, 'data2': 'Hi' },
                        { 'period': 'Seventh', 'data1': 18, 'data2': 'Hi' },
                        { 'period': 'Eighth', 'data1': 14, 'data2': 'Hi' },
                        { 'period': 'Ninth', 'data1': 9, 'data2': 'Hi' },
                        { 'period': 'Tenth', 'data1': 12, 'data2': 'Hi' },
                        { 'period': 'Eleventh', 'data1': 8, 'data2': 'Hi' },
                        { 'period': 'Twelveth', 'data1': 11, 'data2': 'Hi' },
                        { 'period': 'Thirteenth', 'data1': 14, 'data2': 'Hi' },
                        { 'period': 'Fourteenth', 'data1': 9, 'data2': 'Hi' },
                        { 'period': 'Fifteenth', 'data1': 12, 'data2': 'Hi' },
                        { 'period': 'Sixteenth', 'data1': 15, 'data2': 'Hi' },
                        { 'period': 'Seventeenth', 'data1': 18, 'data2': 'Hi' },
                        { 'period': 'Eighteenth', 'data1': 14, 'data2': 'Hi' },
                        { 'period': 'Ninteenth', 'data1': 9, 'data2': 'Hi' },
                        { 'period': 'Twentieth', 'data1': 12, 'data2': 'Hi' }
                    ]
                }),
                shadow: false,
                axes: [{
                    type: 'SparkNumeric',
                    dashSize: 1,
                    position: 'left',
                    fields: ['data1']

                }, {
                    type: 'SparkCategory',
                    dashSize: 1,
                    position: 'bottom',
                    fields: ['period']
                }],
                series: [{
                    type: 'sparkline',
                    highlight: {
                        size: 1,
                        radius: 1
                    },
                    axis: 'left',
                    xField: 'period',
                    yField: 'data1'
                }]
            }/*, {
                xtype: 'chart',
                border: false,
                animate: true,
                margin: 5,
                height: 200,
                width: 200,
                legend: {
                    position: 'right'
                },
                store: Ext.create('Ext.data.JsonStore', {
                    fields: ['period', 'data1', 'data2', 'data3'],
                    data: [
                        { 'period': 1, 'data1': 8 },
                        { 'period': 2, 'data1': 11 },
                        { 'period': 3, 'data1': 14 },
                        { 'period': 4, 'data1': 9 },
                        { 'period': 5, 'data1': 12 },
                        { 'period': 6, 'data1': 15 },
                        { 'period': 7, 'data1': 18 },
                        { 'period': 8, 'data1': 14 },
                        { 'period': 9, 'data1': 9 },
                        { 'period': 10, 'data1': 11 }
                    ]
                }),
                shadow: false,
                axes: [{
                    type: 'Numeric',
                    dashSize: 1,
                    position: 'left',
                    fields: ['data1']

                }, {
                    type: 'Numeric',
                    dashSize: 1,
                    position: 'bottom',
                    fields: ['period']
                }],
                series: [{
                    type: 'line',
                    showMarkers: false,
                    highlight: {
                        size: 1,
                        radius: 1
                    },
                    axis: 'left',
                    xField: 'period',
                    yField: 'data1'
                }]
            }*/]
        });
    }
});