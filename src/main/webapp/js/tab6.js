// ===== TAB 6: ENTRY / LIST (WEB SERVICE) =====
var Tab6 = (function() {
    // Function to load and display JSON data
    function loadJsonData(panel) {
        var store = PrefixStoreModule.getStore();
        var records = store.getRange();

        var jsonData = {
            timestamp: new Date().toISOString(),
            totalRecords: records.length,
            data: records.map(function(record) {
                return {
                    id: record.get('id'),
                    prefixName: record.get('prefixName'),
                    gender: record.get('gender'),
                    prefixOf: record.get('prefixOf')
                };
            })
        };

        var jsonElement = document.getElementById('jsonDisplay');
        if (jsonElement) {
            jsonElement.innerHTML = JSON.stringify(jsonData, null, 2);
        }
    }

    function createTab() {
        var panelRef;

        return {
            title: 'Tab 6: Entry (Web Service)',
            layout: 'border',
            items: [
                {
                    xtype: 'form',
                    region: 'north',
                    height: 180,
                    bodyPadding: 15,
                    defaults: { anchor: '100%', labelWidth: 120, xtype: 'textfield' },
                    items: [
                        { fieldLabel: 'Prefix Name', name: 'prefixName', allowBlank: false },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Gender',
                            name: 'gender',
                            store: StaticStores.getGenderStore(),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            editable: false,
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Prefix Of',
                            name: 'prefixOf',
                            store: StaticStores.getPrefixOfStore(),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            editable: false
                        }
                    ],
                    buttons: [
                        {
                            text: 'Save (REST API)',
                            iconCls: 'x-fa fa-save',
                            handler: function() {
                                var form = this.up('form');
                                if (form.isValid()) {
                                    var values = form.getValues();

                                    Ext.Msg.wait('Saving via Web Service...', 'Please wait');
                                    fetch('/FinalProject/api/prefix/create', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(values)
                                    })
                                    .then(response => response.text())
                                    .then(data => {
                                        Ext.Msg.close();
                                        Ext.Msg.alert('Success', 'Prefix saved via Web Service successfully!');
                                        PrefixStoreModule.getStore().load();
                                        form.reset();
                                    })
                                    .catch(error => {
                                        Ext.Msg.close();
                                        Ext.Msg.alert('Error', 'Failed to save prefix: ' + error);
                                    });
                                }
                            }
                        },
                        {
                            text: 'Clear',
                            iconCls: 'x-fa fa-eraser',
                            handler: function() {
                                this.up('form').reset();
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    region: 'center',
                    layout: 'fit',
                    items: [{
                        xtype: 'panel',
                        title: 'JSON Response Data',
                        bodyPadding: 15,
                        scrollable: 'y',
                        html: '<pre id="jsonDisplay" style="background: #ffffff; padding: 20px; border-radius: 4px; border: 2px solid #0066cc; font-family: \'Courier New\', monospace; font-size: 14px; white-space: pre-wrap; word-wrap: break-word; color: #000000; line-height: 1.6;">{...loading...}</pre>',
                        tbar: [{
                            text: 'Refresh (from API)',
                            iconCls: 'x-fa fa-refresh',
                            handler: function() {
                                PrefixStoreModule.getStore().load();
                            }
                        }, '-', {
                            text: 'Copy to Clipboard',
                            iconCls: 'x-fa fa-copy',
                            handler: function() {
                                var jsonElement = document.getElementById('jsonDisplay');
                                if (jsonElement) {
                                    var text = jsonElement.innerText;
                                    navigator.clipboard.writeText(text).then(function() {
                                        Ext.Msg.alert('Success', 'JSON data copied to clipboard!');
                                    }).catch(function(err) {
                                        Ext.Msg.alert('Error', 'Failed to copy to clipboard');
                                    });
                                }
                            }
                        }, '-', {
                            text: 'Download JSON',
                            iconCls: 'x-fa fa-download',
                            handler: function() {
                                var jsonElement = document.getElementById('jsonDisplay');
                                if (jsonElement) {
                                    var text = jsonElement.innerText;
                                    var blob = new Blob([text], { type: 'application/json' });
                                    var url = window.URL.createObjectURL(blob);
                                    var a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'prefix-data-' + new Date().getTime() + '.json';
                                    document.body.appendChild(a);
                                    a.click();
                                    window.URL.revokeObjectURL(url);
                                    document.body.removeChild(a);
                                }
                            }
                        }]
                    }]
                }
            ],
            listeners: {
                activate: function() {
                    var store = PrefixStoreModule.getStore();
                    if (store) {
                        // Load data from API
                        store.load({
                            callback: function(records, operation, success) {
                                if (success) {
                                    // Display JSON after successful load
                                    Ext.defer(function() {
                                        loadJsonData();
                                    }, 100);
                                } else {
                                    // Still display any cached data
                                    Ext.defer(function() {
                                        loadJsonData();
                                    }, 100);
                                }
                            }
                        });
                    }
                }
            }
        };
    }

    // Listen for store updates to refresh JSON display
    var storeLoadListener = function(store, records, successful) {
        // Always refresh JSON display when store loads
        Ext.defer(function() {
            loadJsonData();
        }, 50);
    };

    if (PrefixStoreModule.getStore()) {
        PrefixStoreModule.getStore().on('load', storeLoadListener);
    }

    return {
        create: createTab
    };
})();
