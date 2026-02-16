// ===== HELPER FUNCTION: UNIFIED SEARCH =====
var SearchHelper = (function() {
    function performSearch() {
        var nameVal = Ext.getCmp('searchName').getValue();
        var codeVal = Ext.getCmp('searchCode').getValue();
        var typeVal = Ext.getCmp('searchType').getValue();

        var grid = Ext.getCmp('patientListGrid');
        var store = grid.getStore();

        store.clearFilter();

        if (!nameVal && !codeVal && !typeVal) {
            return;
        }

        store.filterBy(function(record) {
            var matchName = true;
            var matchCode = true;
            var matchType = true;

            if (nameVal) {
                matchName = record.get('name').toLowerCase().indexOf(nameVal.toLowerCase()) !== -1;
            }
            if (codeVal) {
                matchCode = record.get('staffCode').toLowerCase().indexOf(codeVal.toLowerCase()) !== -1;
            }
            if (typeVal) {
                matchType = record.get('userType') === typeVal;
            }

            return matchName && matchCode && matchType;
        });

        if (store.currentPage > 1) {
            store.loadPage(1);
        }
    }

    return {
        performSearch: performSearch
    };
})();
