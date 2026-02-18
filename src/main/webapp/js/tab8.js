// ===== TAB 8: CRON JOB (HELLO WORLD) =====
var Tab8 = (function() {
    var refreshIntervalId = null;
    var lastCronData = null;

    var cardStyle = 'background: #f8f9fa; border: 1px solid #d0d9e0; border-radius: 6px; padding: 20px 24px; margin: 0;';
    var rowStyle = 'margin: 12px 0;';
    var labelStyle = 'display: inline-block; width: 160px; font-weight: bold; color: #333; font-size: 13px; vertical-align: top;';
    var valueStyle = 'color: #0066cc; font-size: 14px; word-break: break-word;';

    function setStatusContent(data) {
        lastCronData = data;
        var el = document.getElementById('cronHelloSummary');
        if (!el) return;
        if (!data || data.error) {
            el.innerHTML = '<div style="' + cardStyle + '"><p style="color: #c00; margin: 0;">Failed to load cron status.</p></div>';
            return;
        }
        var msg = data.message || 'Hello World';
        var lastAt = data.lastTriggeredAt != null ? data.lastTriggeredAt : 'Not triggered yet';
        var runCount = data.runCount != null ? data.runCount : 0;
        var cronExpr = data.cronExpression || '';
        var serverTime = data.serverTime != null ? data.serverTime : '';
        el.innerHTML =
            '<div style="' + cardStyle + '">' +
            '<div style="' + rowStyle + '"><span style="' + labelStyle + '">Message</span><span style="' + valueStyle + '">' + Ext.String.htmlEncode(msg) + '</span></div>' +
            '<div style="' + rowStyle + '"><span style="' + labelStyle + '">Last triggered at</span><span style="' + valueStyle + '">' + Ext.String.htmlEncode(String(lastAt)) + '</span></div>' +
            '<div style="' + rowStyle + '"><span style="' + labelStyle + '">Run count</span><span style="' + valueStyle + '">' + runCount + '</span></div>' +
            '<div style="' + rowStyle + '"><span style="' + labelStyle + '">Schedule</span><span style="' + valueStyle + '">' + Ext.String.htmlEncode(cronExpr || '—') + '</span></div>' +
            '<div style="' + rowStyle + '"><span style="' + labelStyle + '">Server time</span><span style="' + valueStyle + '">' + Ext.String.htmlEncode(serverTime || '—') + '</span></div>' +
            '</div>';
    }

    function loadCronStatus() {
        var el = document.getElementById('cronHelloSummary');
        if (el) el.innerHTML = '<div style="' + cardStyle + '"><p style="color: #666; margin: 0;">Loading…</p></div>';

        fetch('/FinalProject/api/cron/status', { method: 'GET' })
            .then(function(response) { return response.json(); })
            .then(function(data) {
                setStatusContent(data);
            })
            .catch(function(error) {
                setStatusContent({
                    success: false,
                    message: 'Failed to load cron status',
                    error: String(error)
                });
            });
    }

    function startAutoRefresh() {
        if (refreshIntervalId) return;
        refreshIntervalId = setInterval(loadCronStatus, 5000);
    }

    function stopAutoRefresh() {
        if (!refreshIntervalId) return;
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }

    function showRawJson() {
        var json = lastCronData != null ? JSON.stringify(lastCronData, null, 2) : 'No data loaded yet.';
        var win = Ext.create('Ext.window.Window', {
            title: 'Raw JSON',
            width: 520,
            height: 420,
            modal: true,
            layout: 'fit',
            bodyPadding: 12,
            html: '<pre style="margin:0; padding:12px; background:#fff; border:1px solid #d0d9e0; border-radius:4px; font-family:Consolas, monospace; font-size:12px; white-space:pre-wrap; word-break:break-word; overflow:auto;">' + Ext.String.htmlEncode(json) + '</pre>'
        });
        win.show();
    }

    function createTab() {
        return {
            title: 'Tab 8: Cron Job',
            layout: 'vbox',
            bodyPadding: 20,
            items: [
                {
                    xtype: 'component',
                    html: '<h2 style="margin: 0 0 12px 0; font-size: 1.4em;">Hello World Cron Job</h2>' +
                          '<p style="margin: 0 0 8px 0; color: #333;">This tab shows a server-side scheduled job (cron) that runs automatically with a <strong>Hello World</strong> message.</p>' +
                          '<p style="margin: 0 0 8px 0; color: #666; font-size: 0.95em;"><em>The status below shows the message and the time at which the job was last triggered.</em></p>' +
                          '<p style="margin: 0; color: #333;"><strong>Auto-refresh:</strong> every 5 seconds when this tab is active.</p>',
                    margin: '0 0 16px 0'
                },
                {
                    xtype: 'toolbar',
                    margin: '0 0 16px 0',
                    items: [
                        {
                            text: 'Refresh Now',
                            iconCls: 'x-fa fa-refresh',
                            handler: function() {
                                loadCronStatus();
                            }
                        },
                        '-',
                        {
                            text: 'Stop Auto-Refresh',
                            iconCls: 'x-fa fa-pause',
                            handler: function() {
                                stopAutoRefresh();
                                Ext.Msg.alert('Auto-Refresh', 'Auto-refresh stopped.');
                            }
                        },
                        {
                            text: 'Start Auto-Refresh',
                            iconCls: 'x-fa fa-play',
                            handler: function() {
                                startAutoRefresh();
                                Ext.Msg.alert('Auto-Refresh', 'Auto-refresh started (every 5 seconds).');
                            }
                        },
                        '-',
                        {
                            text: 'View raw JSON',
                            iconCls: 'x-fa fa-code',
                            handler: showRawJson
                        }
                    ]
                },
                {
                    xtype: 'component',
                    html: '<div id="cronHelloSummary" style="min-height: 120px;">Loading…</div>'
                }
            ],
            listeners: {
                activate: function() {
                    Ext.defer(function() {
                        loadCronStatus();
                        startAutoRefresh();
                    }, 100);
                },
                deactivate: function() {
                    stopAutoRefresh();
                }
            }
        };
    }

    return {
        create: createTab
    };
})();

