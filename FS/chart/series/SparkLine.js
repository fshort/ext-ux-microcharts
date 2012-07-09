/**
 * @class FS.chart.series.SparkLine
 * @extends Ext.chart.series.Line
 *
 * Creates a SparkLine Chart. A Line Chart is a useful visualization technique to display quantitative information for different
 * categories or other real values (as opposed to the bar chart), that can show some progression (or regression) in the dataset.
 * As with all other series, the Line Series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information. A typical configuration object for the line series could be:
 *
 *     @example
 *     See app.js for an example how to create a sparkline chart.
 *
 */
Ext.define('FS.chart.series.SparkLine', {

    /* Begin Definitions */

    extend: 'Ext.chart.series.Line',

    alternateClassName: ['Ext.chart.SparkLineSeries'],

    /* End Definitions */

    alias: 'series.sparkline',

    /**
     * @cfg {Number} selectionTolerance
     * The offset distance from the cursor position to the line series to trigger events (then used for highlighting series, etc).
     */
    selectionTolerance: 3,

    /**
     * @cfg {Boolean} showMarkers
     * Whether markers should be displayed at the data points along the line. If true,
     * then the {@link #markerConfig} config item will determine the markers' styling.
     */
    showMarkers: false,

    /**
     * @cfg {Object} markerConfig
     * The display style for the markers. Only used if {@link #showMarkers} is true.
     * The markerConfig is a configuration object containing the same set of properties defined in
     * the Sprite class. For example, if we were to set red circles as markers to the line series we could
     * pass the object:
     *
     <pre><code>
     markerConfig: {
     type: 'circle',
     radius: 4,
     'fill': '#f00'
     }
     </code></pre>

     */
    markerConfig: {
        type: 'circle',
        radius:0.25
    },

    constructor: function(config) {
        var me = this;
        Ext.apply(config, { });

        this.callParent([config]);
    }
});