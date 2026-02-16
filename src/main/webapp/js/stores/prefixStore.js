// ===== SHARED GLOBAL STORE FOR PREFIX DATA =====
var PrefixStoreModule = (function() {
    var store = Ext.create('Ext.data.Store', {
        storeId: 'prefixStore',
        fields: ['id', 'prefixName', 'gender', 'prefixOf'],
        autoLoad: false,
        pageSize: 15,
        proxy: {
            type: 'ajax',
            url: '/FinalProject/api/prefix/list',
            reader: {
                type: 'json',
                rootProperty: 'data',
                totalProperty: 'total'
            },
            listeners: {
                exception: function(proxy, response, operation) {
                    console.error('Proxy exception:', response.status, response.statusText);
                }
            }
        },
        listeners: {
            load: function(store, records, successful) {
                if (!successful) {
                    console.warn('Could not load prefix data from API - using sample data');
                    store.loadData([
                        {id: 1, prefixName: 'Mr.', gender: 'Male', prefixOf: 'S/O'},
                        {id: 2, prefixName: 'Mrs.', gender: 'Female', prefixOf: 'W/O'},
                        {id: 3, prefixName: 'Ms.', gender: 'Female', prefixOf: 'D/O'},
                        {id: 4, prefixName: 'Dr.', gender: 'Other', prefixOf: 'S/O'}
                    ]);
                } else {
                    console.log('Loaded ' + records.length + ' prefix records from API');
                }
            }
        }
    });

    return {
        getStore: function() {
            return store;
        }
    };
})();
