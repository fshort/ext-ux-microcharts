Ext.define('FS.chart.SparkLabel', {

    extend: 'Ext.chart.Legend',

    requires: ['FS.chart.SparkLabelItem'],

    alias: 'sparklabel',

    /**
     * @cfg {String} labelFont
     * Font to be used for the SparkLabel items, eg '12px Helvetica'
     */
    labelFont: '10px Helvetica, sans-serif',

    /**
     * @cfg {String} display
     * Options are:
     *  'lastYValue': displays the last y value in the series.
     *  'lastXValue': displays the last x value in the series.
     *  'lastXYValue': displays the last x and y values in the series.
     *  'text': displays the 'sparkLabelText' value. If using this option,
     *  you need to specify the 'sparkLabelText' config.
     *  'storeField': display an alternate field in the store. If using this option,
     *  you need to specify the 'storeField' config.
     */

    display: 'lastYValue',

    /**
     * @cfg {String} sparkLabelText
     * When 'display' is set to 'text', this value will be displayed
     * as the SparkLabel item.
     */
    sparkLabelText: Ext.emptyString,

    /**
     * @cfg {String} storeField
     * The name of the field in the store to display as the SparkLabel
     * when 'display' is set to 'storeField'.
     */
    storeField: Ext.emptyString,

    /**
     * Creates new SparkLabel.
     * @param {Object} config  (optional) Config object.
     */
    constructor: function(config) {
        var me = this;

        //apply fixed values. these settings are needed to render the SparkLabel correctly.
        Ext.apply(config, {
            boxStrokeWidth: 0, //removes border from label box
            padding: 5,
            itemSpacing: 10,
            position: 'right'  //should always be to the right of the line.
        });
        me.callParent([config]);
    },

    /**
     * @private Create the SparkLabel items
     */
    createItems: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            data = store.data.items,
            record, labelValue,
            seriesItems = chart.series.items,
            series,
            items = me.items,
            padding = me.padding,
            spacingOffset = 2,
            maxWidth = 0,
            maxHeight = 0,
            totalWidth = 0,
            totalHeight = 0,
            vertical = me.isVertical,
            math = Math,
            mfloor = math.floor,
            mmax = math.max,
            i = 0,
            len = items ? items.length : 0,
            spacing, item, bbox, height, width;

        //remove all legend items
        if (len) {
            for (i=0; i < len; i++) {
                items[i].destroy();
            }
        }
        //empty array
        items.length = [];
        // Create all the item labels, collecting their dimensions and positioning each one
        // properly in relation to the previous item

        series = seriesItems[0];
        record = data[(data.length - 1)];
        if (me.display === 'lastYValue' ) {
            labelValue = record.get(series.yField);
        } else if (me.display === 'lastXValue') {
            labelValue = record.get(series.xField);
        } else if (me.display === 'lastXYValue') {
            labelValue = record.get(series.xField) + " = " + record.get(series.yField);
        } else if (me.display === 'storeField') {
            labelValue = record.get(me.storeField);
        } else {
            labelValue = me.sparkLabelText;
        }

        //create a sparklabelitem
        item = new FS.chart.SparkLabelItem({
            legend: this,
            series: series,
            text: labelValue,
            surface: chart.surface,
            yFieldIndex: 0
        });
        bbox = item.getBBox();

        //always measure from x=0, since not all markers go all the way to the left
        width = bbox.width;
        height = bbox.height;

        spacing = vertical ? padding + height / 2 : padding;

        // Set the item's position relative to the legend box
        item.x = mfloor(vertical ? padding : totalWidth + spacing);
        item.y = mfloor(vertical ? totalHeight + spacing : padding + height / 2);

        // Collect cumulative dimensions
        totalWidth += width + spacing;
        totalHeight += height + spacing;
        maxWidth = mmax(maxWidth, width);
        maxHeight = mmax(maxHeight, height);

        items.push(item);

        // Store the collected dimensions for later
        me.width = mfloor((vertical ? maxWidth : totalWidth) + padding * 2);
        if (vertical && items.length === 1) {
            spacingOffset = 1;
        }
        me.height = mfloor((vertical ? totalHeight - spacingOffset * spacing : maxHeight) + (padding * 2));
        me.itemHeight = maxHeight;
    }
});