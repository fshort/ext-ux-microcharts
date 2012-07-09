/**
 * Created By: Fred Short
 * Date: 6/30/12 @ 4:35 PM
 */
Ext.define('FS.chart.axis.SparkNumeric', {

    extend: 'Ext.chart.axis.Numeric',

    alias: 'axis.sparknumeric',

    initComponent: function() {
        Ext.apply(this, {

        });

        this.callParent(arguments);
    },

    drawAxis: Ext.emptyFn,

    drawLabel: Ext.emptyFn,

    drawTitle: Ext.emptyFn


});

