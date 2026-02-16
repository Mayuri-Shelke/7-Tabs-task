// ===== TAB 4: ENTRY / LIST (HIBERNATE + DWR) =====
var Tab4 = (function() {
    function createTab() {
        return {
            title: 'Tab 4: Entry (DWR)',
            layout: 'border',
            items: [
                {
                    xtype: 'form',
                    id: 'prefixForm',
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
                            text: 'Save',
                            iconCls: 'x-fa fa-save',
                            handler: function() {
                                var form = this.up('form');
                                if (form.isValid()) {
                                    var values = form.getValues();
                                    if (typeof PrefixService === 'undefined') {
                                        Ext.Msg.alert('Error', 'DWR Service not available. Please ensure the server is running.');
                                        return;
                                    }
                                    try {
                                        var options = {
                                            callback: function(response) {
                                                Ext.Msg.alert('Success', 'Prefix saved successfully!');
                                                var store = PrefixStoreModule.getStore();
                                                if (store) {
                                                    store.load();
                                                }
                                                form.reset();
                                            },
                                            errorHandler: function(errorString, exception) {
                                                Ext.Msg.alert('Error', 'Failed to save prefix: ' + errorString);
                                            }
                                        };
                                        PrefixService.savePrefix(values, options);
                                    } catch (err) {
                                        Ext.Msg.alert('Error', 'Exception saving prefix: ' + err);
                                    }
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
                    xtype: 'grid',
                    id: 'prefixGrid',
                    region: 'center',
                    store: PrefixStoreModule.getStore(),
                    columns: [
                        { text: 'ID', dataIndex: 'id', width: 60 },
                        { text: 'Prefix Name', dataIndex: 'prefixName', flex: 1 },
                        { text: 'Gender', dataIndex: 'gender', flex: 1 },
                        { text: 'Prefix Of', dataIndex: 'prefixOf', flex: 1.5 },
                        {
                            xtype: 'actioncolumn',
                            text: 'Actions',
                            width: 80,
                            items: [{
                                iconCls: 'x-fa fa-trash',
                                tooltip: 'Delete',
                                handler: function(grid, rowIndex, colIndex) {
                                    var record = grid.getStore().getAt(rowIndex);
                                    Ext.Msg.confirm('Delete', 'Are you sure you want to delete this prefix?', function(btn) {
                                        if (btn === 'yes') {
                                            if (typeof PrefixService === 'undefined') {
                                                Ext.Msg.alert('Error', 'DWR Service not available. Please ensure the server is running.');
                                                return;
                                            }
                                            try {
                                                var options = {
                                                    callback: function(response) {
                                                        Ext.Msg.alert('Success', 'Prefix deleted successfully!');
                                                        var store = PrefixStoreModule.getStore();
                                                        if (store) {
                                                            store.load();
                                                        }
                                                    },
                                                    errorHandler: function(errorString, exception) {
                                                        Ext.Msg.alert('Error', 'Failed to delete prefix: ' + errorString);
                                                    }
                                                };
                                                PrefixService.deletePrefix(record.get('id'), options);
                                            } catch (err) {
                                                Ext.Msg.alert('Error', 'Exception deleting prefix: ' + err);
                                            }
                                        }
                                    });
                                }
                            }]
                        }
                    ],
                    tbar: [{
                        text: 'Refresh',
                        iconCls: 'x-fa fa-refresh',
                        handler: function() {
                            var store = PrefixStoreModule.getStore();
                            if (store) {
                                store.load();
                            }
                        }
                    }]
                }
            ],
            listeners: {
                activate: function() {
                    var store = PrefixStoreModule.getStore();
                    if (store && !store.isLoading()) {
                        store.load();
                    }
                }
            }
        };
    }

    return {
        create: createTab
    };
})();
