// ===== MAIN APPLICATION ENTRY POINT =====
Ext.onReady(function() {
    // Create the main tab panel with all tabs
    Ext.create('Ext.tab.Panel', {
        renderTo: document.body,
        width: '100%',
        height: '100%',
        defaults: { bodyPadding: 20 },
        items: [
            Tab1.create(),
            Tab2.create(),
            Tab3.create(),
            Tab4.create(),
            Tab5.create(),
            Tab6.create(),
            Tab7.create()
        ]
    });
});
