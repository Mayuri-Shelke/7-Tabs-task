// ===== TAB 7: PDF GENERATION (PUPPETEER) =====
var Tab7 = (function() {
    function createTab() {
        return {
            title: 'Tab 7: Puppeteer PDF',
            layout: 'vbox',
            bodyPadding: 20,
            items: [
                {
                    xtype: 'component',
                    html: '<h2>PDF Generation using Puppeteer</h2>' +
                          '<p>This tab demonstrates PDF generation from HTML using Puppeteer (Node.js library).</p>' +
                          '<p><strong>Puppeteer</strong> is a Node.js library that provides a high-level API to control Chrome or Chromium over the DevTools Protocol.</p>' +
                          '<p style="color: #666;"><em>Click the button below to generate and download a PDF that includes the database table (prefix_master).</em></p>',
                    height: 150
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    height: 60,
                    margin: '20 0 0 0',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Generate & Download PDF',
                            iconCls: 'x-fa fa-file-pdf-o',
                            scale: 'large',
                            width: 250,
                            handler: function() {
                                Ext.Msg.wait('Generating PDF...', 'Please wait');
                                window.location = '/FinalProject/api/pdf/generate';
                                setTimeout(function() {
                                    Ext.Msg.close();
                                }, 2000);
                            }
                        },
                        {
                            xtype: 'container',
                            width: 20
                        },
                        {
                            xtype: 'button',
                            text: 'Download Existing PDF',
                            iconCls: 'x-fa fa-download',
                            scale: 'large',
                            width: 250,
                            handler: function() {
                                window.location = '/FinalProject/api/pdf/download';
                            }
                        }
                    ]
                },
                {
                    xtype: 'component',
                    html: '<hr style="margin-top: 30px;"/>' +
                          '<h4>Features:</h4>' +
                          '<ul style="margin-left: 20px;">' +
                          '<li>HTML to PDF conversion using Puppeteer</li>' +
                          '<li>Generate PDF with database table (prefix_master)</li>' +
                          '<li>Download pre-generated PDF files</li>' +
                          '<li>Dynamic content rendering</li>' +
                          '</ul>',
                    flex: 1
                }
            ]
        };
    }

    return {
        create: createTab
    };
})();
