/**
 * Created By: Fred Short
 * Date: 6/30/12 @ 4:35 PM
 */
Ext.define('FS.chart.axis.SparkTime', {

    extend: 'Ext.chart.axis.Time',

    alias: 'axis.sparktime',

    initComponent: function() {
        Ext.apply(this, {

        });

        this.callParent(arguments);
    },

    drawAxis: Ext.emptyFn,

    drawLabel: Ext.emptyFn,

    drawTitle: Ext.emptyFn


});

