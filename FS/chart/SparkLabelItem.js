/**
 * @class FS.chart.SparkLabelItem
 * A single item of a sparkline chart label
 */
Ext.define('FS.chart.SparkLabelItem', {

    extend: 'Ext.draw.CompositeSprite',

    // Position of the item, relative to the upper-left corner of the legend box
    x: 0,

    y: 0,

    zIndex: 500,

    // checks to make sure that a unit size follows the bold keyword in the font style value
    boldRe: /bold\s\d{1,}.*/i,

    constructor: function(config) {
        this.callParent(arguments);
        this.createSparkLabel(config);
    },

    /**
     * Creates all the individual sprites for this sparklabel item
     */
    createSparkLabel: function(config) {
        var me = this,
            index = config.yFieldIndex,
            series = me.series,
            text = me.text,
            legend = me.legend,
            surface = me.surface,
            bbox, z = me.zIndex,
            label, mask,
            toggle = false;
        
        label = me.add('label', surface.add({
            type: 'text',
            x: 20,
            y: 0,
            zIndex: (z || 0) + 2,
            fill: legend.labelColor,
            font: legend.labelFont,
            text: text,
            style: {
                'cursor': 'pointer'
            }
        }));

        me.setAttributes({
            hidden: false
        }, true);
        
        bbox = me.getBBox();

        //removed logic to add line to label

        mask = me.add('mask', surface.add({
            type: 'rect',
            x: bbox.x,
            y: bbox.y,
            width: bbox.width || 20,
            height: bbox.height || 20,
            zIndex: (z || 0) + 1,
            fill: me.legend.boxFill,
            style: {
                'cursor': 'pointer'
            }
        }));

        //add toggle listener
        me.on('mouseover', function() {
            label.setStyle({
                'font-weight': 'bold'
            });
            mask.setStyle({
                'cursor': 'pointer'
            });
            series._index = index;
            series.highlightItem();
        }, me);

        me.on('mouseout', function() {
            label.setStyle({
                'font-weight': legend.labelFont && me.boldRe.test(legend.labelFont) ? 'bold' : 'normal'
            });
            series._index = index;
            series.unHighlightItem();
        }, me);
        
        if (!series.visibleInLegend(index)) {
            toggle = true;
            label.setAttributes({
               opacity: 0.5
            }, true);
        }

        me.on('mousedown', function() {
            if (!toggle) {
                series.hideAll(index);
                label.setAttributes({
                    opacity: 0.5
                }, true);
            } else {
                series.showAll(index);
                label.setAttributes({
                    opacity: 1
                }, true);
            }
            toggle = !toggle;
        }, me);

        me.updatePosition({x:0, y:0}); //Relative to 0,0 at first so that the bbox is calculated correctly
    },

    /**
     * Update the positions of all this item's sprites to match the root position
     * of the legend box.
     * @param {Object} relativeTo (optional) If specified, this object's 'x' and 'y' values will be used
     *                 as the reference point for the relative positioning. Defaults to the Legend.
     */
    updatePosition: function(relativeTo) {
        var me = this,
            items = me.items,
            ln = items.length,
            i,
            item;
        if (!relativeTo) {
            relativeTo = me.legend;
        }
        for (i = 0; i < ln; i++) {
            item = items[i];
            switch (item.type) {
                case 'text':
                    item.setAttributes({
                        x: relativeTo.x + me.x, //removed +20
                        y: relativeTo.y + me.y
                    }, true);
                    break;
                case 'rect':
                    item.setAttributes({
                        translate: {
                            x: relativeTo.x + me.x - 20, //added -20
                            y: relativeTo.y + me.y - 6
                        }
                    }, true);
                    break;
                default:
                    item.setAttributes({
                        translate: {
                            x: relativeTo.x + me.x,
                            y: relativeTo.y + me.y
                        }
                    }, true);
            }
        }
    }
});