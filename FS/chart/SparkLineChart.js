/**
 * Created By: Fred Short
 * Date: 6/30/12 @ 5:34 PM
 */
Ext.define('FS.chart.SparkLineChart', {
    extend: 'Ext.chart.Chart',

    alias: 'widget.sparklinechart',

    requires: [
        'FS.chart.SparkLabel'
    ],

    insetPadding: 1,

    sparkLabel: {
        position: 'right',
        display: 'lastYValue'
    },

    background: false,

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            legend: false
        });

        //Replaces legend creation logic to create a SparkLabel.
        if (me.sparkLabel !== false) {
            me.sparkLabel = new FS.chart.SparkLabel(Ext.applyIf({chart:me}, me.sparkLabel));
        }

        me.callParent(arguments);
    },

    /**
     * Redraws the chart. If animations are set this will animate the chart too.
     * @param {Boolean} resize (optional) flag which changes the default origin points of the chart for animations.
     */
    redraw: function(resize) {
        var me = this,
            seriesItems = me.series.items,
            seriesLen = seriesItems.length,
            axesItems = me.axes.items,
            axesLen = axesItems.length,
            i,
            chartBBox = me.chartBBox = {
                x: 0,
                y: 0,
                height: me.curHeight,
                width: me.curWidth
            },
            sparkLabel = me.sparkLabel; //replaced legend with sparklabel

        me.surface.setSize(chartBBox.width, chartBBox.height);

        // Instantiate Series and Axes
        me.initializeSeries(seriesItems[0],0);

        for (i = 0; i < axesLen; i++) {
            me.initializeAxis(axesItems[i]);
        }

        for (i = 0; i < axesLen; i++) {
            axesItems[i].processView();
        }

        for (i = 0; i < axesLen; i++) {
            axesItems[i].drawAxis(true);
        }

        // Create sparklabel if not already created
        if (sparkLabel !== false && sparkLabel.visible) {
            if (sparkLabel.update || !sparkLabel.created) {
                sparkLabel.create();
            }
        }

        me.alignAxes();

        // Reposition sparklabel based on new axis alignment
        if (sparkLabel !== false && sparkLabel.visible) {
            sparkLabel.updatePosition();
        }

        // Find the max gutter
        me.getMaxGutter();

        // Draw axes and series
        me.resizing = !!resize;

        for (i = 0; i < axesLen; i++) {
            axesItems[i].drawAxis();
        }

        //should only have one series
        me.drawCharts(seriesItems[0]);

        me.resizing = false;
    },

    /**
     * @private Adjust the dimensions and positions of each axis and the chart body area after accounting
     * for the space taken up on each side by the axes and legend.
     */
    alignAxes: function() {
        var me = this,
            axes = me.axes,
            axesItems = axes.items,
            axis,
            legend = me.sparkLabel, //replace me.legend with sparklabel
            edges = ['top', 'right', 'bottom', 'left'],
            edge,
            i, ln,
            chartBBox,
            insetPadding = me.insetPadding,
            insets = {
                top: insetPadding,
                right: insetPadding,
                bottom: insetPadding,
                left: insetPadding
            },
            isVertical, bbox, pos;

        function getAxis(edge) {
            var i = axes.findIndex('position', edge);
            return (i < 0) ? null : axes.getAt(i);
        }

        // Find the space needed by axes and legend as a positive inset from each edge
        for (i = 0, ln = edges.length; i < ln; i++) {
            edge = edges[i];
            isVertical = (edge === 'left' || edge === 'right');
            axis = getAxis(edge);

            // Add legend size if it's on this edge
            if (legend !== false) {
                if (legend.position === edge) {
                    bbox = legend.getBBox();
                    insets[edge] += (isVertical ? bbox.width : bbox.height) + insets[edge];
                }
            }

            // Add axis size if there's one on this edge only if it has been
            //drawn before.
            if (axis && axis.bbox) {
                bbox = axis.bbox;
                insets[edge] += (isVertical ? bbox.width : bbox.height);
            }
        }
        // Build the chart bbox based on the collected inset values
        chartBBox = {
            x: insets.left,
            y: insets.top,
            width: me.curWidth - insets.left - insets.right,
            height: me.curHeight - insets.top - insets.bottom
        };
        me.chartBBox = chartBBox;

        // Go back through each axis and set its length and position based on the
        // corresponding edge of the chartBBox
        for (i = 0, ln = axesItems.length; i < ln; i++) {
            axis = axesItems[i];
            pos = axis.position;
            isVertical = (pos === 'left' || pos === 'right');

            axis.x = (pos === 'right' ? chartBBox.x + chartBBox.width : chartBBox.x);
            axis.y = (pos === 'top' ? chartBBox.y : chartBBox.y + chartBBox.height);
            axis.width = (isVertical ? chartBBox.width : chartBBox.height);
            axis.length = (isVertical ? chartBBox.height : chartBBox.width);
        }
    }
});
