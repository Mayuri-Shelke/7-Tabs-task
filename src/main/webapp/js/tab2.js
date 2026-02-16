// ===== TAB 2: POPUP WITH HTML EDITOR =====
var Tab2 = (function() {
    function showPatientPopup() {
        Ext.create('Ext.window.Window', {
            title: 'Patient Details',
            width: 800,
            height: 600,
            layout: 'border',
            modal: true,
            resizable: true,
            items: [
                {
                    region: 'north',
                    height: 220,
                    bodyPadding: 20,
                    scrollable: true,
                    style: 'background-color: white;',
                    html: '<table style="width:100%; border-collapse: separate; border-spacing: 0 10px; font-family: sans-serif; font-size: 13px;">' +
                          '<tr><td style="width:120px;"><b>Name</b></td><td style="width:20px;">:</td><td>CT SCAN</td></tr>' +
                          '<tr><td><b>MRN</b></td><td>:</td><td>CYTOLOGY</td></tr>' +
                          '<tr><td><b>Date Of Birth</b></td><td>:</td><td>DIGITAL XRAY</td></tr>' +
                          '<tr><td><b>Age</b></td><td>:</td><td>FLUID EXAMINATION</td></tr>' +
                          '<tr><td><b>Gender</b></td><td>:</td><td>GASTROENTEROLOGY INVESTIGATION</td></tr>' +
                          '<tr><td><b>Address</b></td><td>:</td><td>HAEMATOLOGY</td></tr>' +
                          '<tr><td><b>Reg Date</b></td><td>:</td><td>HARMONES</td></tr>' +
                          '<tr><td><b>Status</b></td><td>:</td><td>HISTOPATHOLOGY</td></tr>' +
                          '</table>'
                },
                {
                    region: 'center',
                    xtype: 'htmleditor',
                    title: 'Text Editor',
                    margin: '5 0 0 0',
                    value: 'CT SCAN, CYTOLOGY, DIGITAL X-RAY, FLUID EXAMINATION, GASTROENTEROLOGY INVESTIGATION, HAEMATOLOGY, HARMONES, HISTOPATHOLOGY, IMMUNO ASSAYS'
                }
            ],
            buttons: [
                {
                    text: 'Close',
                    handler: function() {
                        this.up('window').close();
                    }
                }
            ]
        }).show();
    }

    function createTab() {
        return {
            title: 'Tab 2: Popup',
            layout: 'vbox',
            items: [
                {
                    xtype: 'component',
                    html: '<h3>Click the button below to open a Patient Details popup with HTML Editor</h3>',
                    height: 40
                },
                {
                    xtype: 'button',
                    text: 'Open Patient Details',
                    iconCls: 'x-fa fa-folder-open',
                    scale: 'medium',
                    margin: '20',
                    handler: showPatientPopup
                },
                {
                    xtype: 'component',
                    html: '<p style="color: #666; margin-top: 30px;"><strong>Features:</strong>' +
                          '<ul>' +
                          '<li>Modal popup with patient details</li>' +
                          '<li>Rich text HTML editor with formatting toolbar (Bold, Italic, Underline, Lists, etc.)</li>' +
                          '<li>Close button to dismiss the popup</li>' +
                          '</ul></p>',
                    flex: 1
                }
            ]
        };
    }

    return {
        create: createTab
    };
})();
