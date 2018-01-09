<?php echo js(PLUGIN_DIST_ROOT . 'index.js'); ?>

<script>
    gears.VisitorsWidget({
        container: 'visitors-widget',
        client: '<?php echo c::get('analytics.dashboard.client.id'); ?>',
        visitorsReport: {
            viewId: '<?php echo c::get('analytics.dashboard.view.id'); ?>',
            dateRanges: [
                {
                    startDate: "<?php echo date('Y-m-d', strtotime('-1 month'));?>",
                    endDate: "<?php echo date("Y-m-d", strtotime('last day of December '.date('Y') ));?>"
                }
            ],
            dimensions: [
                {
                    name: 'ga:date'
                }
            ],
            metrics: [
                {
                    expression: 'ga:users'
                }
            ]
        }
    });
</script>