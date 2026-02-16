// ===== TAB 3: LIST WITH PAGING & SEARCH =====
var Tab3 = (function() {
    function getSampleData() {
        return [
            { name: 'Ms. ABEENA JOSEPH', staffCode: 'M11352', userType: 'Staff', phone: '0000000000', dept: 'NURSING', status: 'Confirmed', joiningDate: '01-01-2022' },
            { name: 'Dr. ABHIJITH PB', staffCode: 'M11326', userType: 'Doctor', phone: '0000000000', dept: 'RADIATION ONCOLOGY', status: 'Confirmed', joiningDate: '19-01-2022' },
            { name: 'Mr. ABHIJITH VP', staffCode: 'S53011', userType: 'Staff', phone: '0000000000', dept: 'OUTSOURCE MAINTENANCE', status: 'Trainee', joiningDate: '-' },
            { name: 'Dr. ABHISHEK JAIN', staffCode: 'S50001', userType: 'Doctor', phone: '0000000000', dept: 'ULTRASOUND', status: 'Confirmed', joiningDate: '01-01-2022' },
            { name: 'Dr. ABHISHEK VAIDYA', staffCode: 'CONSAB3461', userType: 'Consultant', phone: '9960880354', dept: 'SURGICAL ONCOLOGY', status: 'Confirmed', joiningDate: '-' },
            { name: 'Mr. ABHISHEK VAIDYA1', staffCode: 'CONSAB34611', userType: 'Consultant', phone: '9960880354', dept: 'SURGICAL ONCOLOGY', status: 'Confirmed', joiningDate: '-' },
            { name: 'Mr. ABHISHEK VAIDYA2', staffCode: 'CONSAB34612', userType: 'Consultant', phone: '9960880354', dept: 'SURGICAL ONCOLOGY', status: 'Confirmed', joiningDate: '-' },
            { name: 'Mrs. ABIGAIL GUPTA', staffCode: '112345678', userType: 'Consultant', phone: '1234123412', dept: 'NURSING', status: 'Regular', joiningDate: '03-09-2023' },
            { name: 'Mr. ABIN DEV T', staffCode: 'M11535', userType: 'Staff', phone: '0000000000', dept: 'INSURANCE', status: 'Confirmed', joiningDate: '05-08-2022' },
            { name: 'Mr. ABIN JOSE', staffCode: '007', userType: 'Staff', phone: '0000000000', dept: 'PHYSIOTHERAPY', status: 'Confirmed', joiningDate: '15-07-2021' },
            { name: 'Mr. ABIN JOSE2', staffCode: '00722', userType: 'Staff', phone: '0000000000', dept: 'PHYSIOTHERAPY', status: 'Confirmed', joiningDate: '15-07-2021' },
            { name: 'Mr. ABIN K', staffCode: 'S50005', userType: 'Staff', phone: '0000000000', dept: 'ATTENDER', status: 'Probationary', joiningDate: '-' },
            { name: 'Mr. ABIN SURI', staffCode: 'M12', userType: 'Staff', phone: '0000000000', dept: 'RADIOLOGY', status: 'Confirmed', joiningDate: '-' },
            { name: 'Mr. ABINAAA2 DEV T', staffCode: 'M11535222', userType: 'Staff', phone: '0000000000', dept: 'INSURANCE', status: 'Trainee', joiningDate: '05-08-2022' },
            { name: 'Dr. ABRAHAM KHAN', staffCode: 'M11738', userType: 'Staff', phone: '0000000000', dept: 'PATHOLOGY', status: 'Contract', joiningDate: '01-02-2023' },
            { name: 'Ms. ZARA ALI', staffCode: 'Z100', userType: 'Staff', phone: '1234567890', dept: 'IT', status: 'Confirmed', joiningDate: '01-05-2023' },
            { name: 'Dr. YASH MALHOTRA', staffCode: 'Y200', userType: 'Doctor', phone: '9876543210', dept: 'CARDIOLOGY', status: 'Confirmed', joiningDate: '10-06-2022' },
            { name: 'Mr. XAVIER P', staffCode: 'X300', userType: 'Consultant', phone: '5555555555', dept: 'NEUROLOGY', status: 'Contract', joiningDate: '20-08-2023' },
            { name: 'Mrs. VIJAYALAKSHMI', staffCode: 'V400', userType: 'Staff', phone: '4444444444', dept: 'NURSING', status: 'Confirmed', joiningDate: '12-12-2021' },
            { name: 'Dr. UMA SHANKAR', staffCode: 'U500', userType: 'Doctor', phone: '3333333333', dept: 'ORTHO', status: 'Confirmed', joiningDate: '14-02-2022' },
            { name: 'Mr. TARUN KUMAR', staffCode: 'T600', userType: 'Staff', phone: '2222222222', dept: 'PHARMACY', status: 'Trainee', joiningDate: '01-11-2023' },
            { name: 'Ms. SARA JONES', staffCode: 'S700', userType: 'Staff', phone: '1111111111', dept: 'FRONT OFFICE', status: 'Confirmed', joiningDate: '05-05-2022' },
            { name: 'Dr. RAHUL DRAVID', staffCode: 'R800', userType: 'Doctor', phone: '0000000000', dept: 'PEDIATRICS', status: 'Confirmed', joiningDate: '09-09-2021' },
            { name: 'Mr. QUINCY ADAMS', staffCode: 'Q900', userType: 'Consultant', phone: '9999999999', dept: 'UROLOGY', status: 'Regular', joiningDate: '01-01-2024' },
            { name: 'Mrs. PRIYA SHARMA', staffCode: 'P1000', userType: 'Staff', phone: '8888888888', dept: 'HR', status: 'Confirmed', joiningDate: '15-03-2023' },
            { name: 'Dr. OMAR ABDULLAH', staffCode: 'O1100', userType: 'Doctor', phone: '7777777777', dept: 'ENT', status: 'Confirmed', joiningDate: '18-04-2022' }
        ];
    }

    function createTab() {
        return {
            title: 'Tab 3: List',
            layout: 'fit',
            items: [{
                xtype: 'grid',
                id: 'patientListGrid',
                store: Ext.create('Ext.data.Store', {
                    storeId: 'patientListStore',
                    fields: ['name', 'staffCode', 'userType', 'phone', 'dept', 'status', 'joiningDate'],
                    pageSize: 10,
                    proxy: {
                        type: 'memory',
                        enablePaging: true,
                        reader: { type: 'json' }
                    },
                    data: getSampleData()
                }),
                tbar: [
                    'Search Name:',
                    {
                        xtype: 'textfield',
                        id: 'searchName',
                        width: 150,
                        emptyText: 'Enter name...',
                        enableKeyEvents: true,
                        listeners: {
                            keyup: function() { SearchHelper.performSearch(); }
                        }
                    },
                    '-',
                    'Search Code:',
                    {
                        xtype: 'textfield',
                        id: 'searchCode',
                        width: 120,
                        emptyText: 'Enter code...',
                        enableKeyEvents: true,
                        listeners: {
                            keyup: function() { SearchHelper.performSearch(); }
                        }
                    },
                    '-',
                    'User Type:',
                    {
                        xtype: 'combobox',
                        id: 'searchType',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['type'],
                            data: [
                                {'type': 'Staff'},
                                {'type': 'Doctor'},
                                {'type': 'Consultant'}
                            ]
                        }),
                        displayField: 'type',
                        valueField: 'type',
                        width: 120,
                        emptyText: 'All Types',
                        queryMode: 'local',
                        editable: true,
                        listeners: {
                            change: function() { SearchHelper.performSearch(); }
                        }
                    },
                    '->',
                    {
                        text: 'Clear Filters',
                        iconCls: 'x-fa fa-eraser',
                        handler: function() {
                            Ext.getCmp('searchName').reset();
                            Ext.getCmp('searchCode').reset();
                            Ext.getCmp('searchType').reset();
                            SearchHelper.performSearch();
                        }
                    }
                ],
                columns: [
                    { text: 'Name', dataIndex: 'name', flex: 2, minWidth: 200 },
                    { text: 'Code', dataIndex: 'staffCode', flex: 1, minWidth: 100 },
                    { text: 'User Type', dataIndex: 'userType', flex: 1, minWidth: 80 },
                    { text: 'Phone', dataIndex: 'phone', flex: 1, minWidth: 100 },
                    { text: 'Department', dataIndex: 'dept', flex: 1.5, minWidth: 150 },
                    { text: 'Status', dataIndex: 'status', flex: 1, minWidth: 80 },
                    { text: 'Joining Date', dataIndex: 'joiningDate', flex: 1, minWidth: 100 }
                ],
                bbar: {
                    xtype: 'pagingtoolbar',
                    store: 'patientListStore',
                    displayInfo: true,
                    displayMsg: 'Displaying records {0} - {1} of {2}',
                    emptyMsg: "No records to display"
                }
            }]
        };
    }

    return {
        create: createTab
    };
})();
