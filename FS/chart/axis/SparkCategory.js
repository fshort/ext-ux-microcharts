/**
 * Created By: Fred Short
 * Date: 6/30/12 @ 4:35 PM
 */
Ext.define('FS.chart.axis.SparkCategory', {

    extend: 'Ext.chart.axis.Category',

    alternateClassName: 'FS.chart.SparkCategoryAxis',

    alias: 'axis.sparkcategory',

    initComponent: function() {
        Ext.apply(this, {

        });

        this.callParent(arguments);
    },

    drawAxis: Ext.emptyFn,

    drawLabel: Ext.emptyFn,

    drawTitle: Ext.emptyFn
});

