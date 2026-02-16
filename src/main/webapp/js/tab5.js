// ===== TAB 5: EXCEL UPLOAD & DOWNLOAD =====
var Tab5 = (function() {
    function createTab() {
        return {
            title: 'Tab 5: Excel',
            layout: 'fit',
            items: [{
                xtype: 'grid',
                store: PrefixStoreModule.getStore(),
                columns: [
                    { text: 'ID', dataIndex: 'id', width: 60 },
                    { text: 'Prefix Name', dataIndex: 'prefixName', flex: 1 },
                    { text: 'Gender', dataIndex: 'gender', flex: 1 },
                    { text: 'Prefix Of', dataIndex: 'prefixOf', flex: 1.5 }
                ],
                tbar: [
                    {
                        text: 'Download Data',
                        iconCls: 'x-fa fa-download',
                        handler: function() {
                            window.location = '/FinalProject/api/excel/download';
                        }
                    },
                    {
                        text: 'Download Template',
                        iconCls: 'x-fa fa-file-excel-o',
                        handler: function() {
                            window.location = '/FinalProject/api/excel/template';
                        }
                    },
                    '-',
                    {
                        xtype: 'filefield',
                        name: 'excelFile',
                        buttonText: 'Upload Excel',
                        buttonOnly: true,
                        hideLabel: true,
                        listeners: {
                            change: function(field, value) {
                                var fileInput = field.fileInputEl.dom;
                                if (fileInput.files.length > 0) {
                                    var formData = new FormData();
                                    formData.append('file', fileInput.files[0]);

                                    Ext.Msg.wait('Uploading Excel file...', 'Please wait');
                                    fetch('/FinalProject/api/excel/upload', {
                                        method: 'POST',
                                        body: formData
                                    })
                                    .then(response => response.text())
                                    .then(data => {
                                        Ext.Msg.close();
                                        Ext.Msg.alert('Success', 'Excel uploaded successfully! New records have been added.');
                                        PrefixStoreModule.getStore().load();
                                        field.reset();
                                    })
                                    .catch(error => {
                                        Ext.Msg.close();
                                        Ext.Msg.alert('Error', 'Failed to upload Excel file: ' + error);
                                    });
                                }
                            }
                        }
                    },
                    '->',
                    {
                        text: 'Refresh',
                        iconCls: 'x-fa fa-refresh',
                        handler: function() {
                            PrefixStoreModule.getStore().load();
                        }
                    }
                ]
            }],
            listeners: {
                activate: function() {
                    PrefixStoreModule.getStore().load();
                }
            }
        };
    }

    return {
        create: createTab
    };
})();
