// ===== TAB 1: DROPDOWN COMPONENTS =====
var Tab1 = (function() {
    function createTab() {
        return {
            title: 'Tab 1: Dropdown',
            layout: 'vbox',
            items: [
                {
                    xtype: 'container',
                    html: '<h3>1. HTML Select Component</h3>',
                    height: 30
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    height: 40,
                    items: [
                        {
                            xtype: 'component',
                            html: '<label style="display: inline-block; width: 150px; font-weight: bold;">Department:</label>',
                            flex: 0
                        },
                        {
                            xtype: 'component',
                            html: '<select id="html-dept" style="width: 200px; padding: 5px;">' +
                                  '<option value="">Select Department</option>' +
                                  '<option value="CT">CT SCAN</option>' +
                                  '<option value="CYTO">CYTOLOGY</option>' +
                                  '<option value="XRAY">DIGITAL X-RAY</option>' +
                                  '<option value="HEMA">HAEMATOLOGY</option>' +
                                  '</select>',
                            flex: 1
                        }


                    ]
                },
                {
                    xtype: 'component',
                    html: '<hr/>',
                    height: 20
                },
                {
                    xtype: 'container',
                    html: '<h3>2. ExtJS ComboBox Component</h3>',
                    height: 30
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    height: 40,
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Department',
                            labelWidth: 150,
                            labelStyle: "font-weight:bold;",
                            store: StaticStores.getDepartmentStore(),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            width: 400,
                            flex: 0,
                            editable: true
                        }

                    ]
                },
                {
                    xtype: 'component',
                    html: '<hr/>',
                    height: 20
                },
                {
                    xtype: 'container',
                    html: '<p style="color: #666; font-size: 12px;"><strong>Note:</strong> Tab 1 demonstrates two HTML dropdowns and two ExtJS ComboBox components with static hardcoded values. You can select values from each dropdown.</p>',
                    height: 50
                }
            ]
        };
    }

    return {
        create: createTab
    };
})();
