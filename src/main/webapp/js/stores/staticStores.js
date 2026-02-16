// ===== STATIC DATA STORES =====
var StaticStores = (function() {
    var departmentStore = Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data: [
            {"abbr": "CT", "name": "CT SCAN"},
            {"abbr": "CYTO", "name": "CYTOLOGY"},
            {"abbr": "XRAY", "name": "DIGITAL X-RAY"},
            {"abbr": "HEMA", "name": "HAEMATOLOGY"},
            {"abbr": "NURSING", "name": "NURSING"},
            {"abbr": "RADIOLOGY", "name": "RADIOLOGY"}
        ]
    });

    var genderStore = Ext.create('Ext.data.Store', {
        fields: ['code', 'name'],
        data: [
            {"code": "Male", "name": "Male"},
            {"code": "Female", "name": "Female"},
            {"code": "Other", "name": "Other"}
        ]
    });

    var prefixOfStore = Ext.create('Ext.data.Store', {
        fields: ['code', 'name'],
        data: [
            {"code": "S/O", "name": "Son Of"},
            {"code": "D/O", "name": "Daughter Of"},
            {"code": "W/O", "name": "Wife Of"},
            {"code": "M/O", "name": "Mother Of"},
            {"code": "F/O", "name": "Father Of"},
            {"code": "H/O", "name": "Husband Of"},
            {"code": "I/O", "name": "In-laws Of"}
        ]
    });

    return {
        getDepartmentStore: function() { return departmentStore; },
        getGenderStore: function() { return genderStore; },
        getPrefixOfStore: function() { return prefixOfStore; }
    };
})();
