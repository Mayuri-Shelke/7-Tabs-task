<!DOCTYPE html>
<html>
<head>
    <title>Mednet Labs - Training Assignment Application</title>

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/classic/theme-triton/resources/theme-triton-all.css">
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/ext-all.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/classic/theme-triton/theme-triton.js"></script>

    <script type='text/javascript' src='dwr/engine.js'></script>
    <script type='text/javascript' src='dwr/util.js'></script>
    <script type='text/javascript' src='dwr/interface/PrefixService.js'></script>

    <!-- DWR Configuration -->
    <script type="text/javascript">
        // Disable DWR debug mode to prevent console errors
        if (typeof dwr !== 'undefined' && dwr.engine) {
            dwr.engine.setLogEnabled(false);
            dwr.engine.defaultErrorHandler = function(errorString, exception) {
                // Suppress undefined errors - they're not critical
                if (errorString && errorString !== 'undefined') {
                    console.warn('DWR Error: ' + errorString);
                }
            };
        }
    </script>

    <style type="text/css">
        html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        .tab-title { font-weight: bold; color: #333; }
        .search-panel { background: #f0f0f0; padding: 10px; margin-bottom: 10px; }
    </style>


    <script type="text/javascript" src="js/stores/staticStores.js"></script>
    <script type="text/javascript" src="js/stores/prefixStore.js"></script>
    <script type="text/javascript" src="js/utils/searchHelper.js"></script>
    <script type="text/javascript" src="js/tab1.js"></script>
    <script type="text/javascript" src="js/tab2.js"></script>
    <script type="text/javascript" src="js/tab3.js"></script>
    <script type="text/javascript" src="js/tab4.js"></script>
    <script type="text/javascript" src="js/tab5.js"></script>
    <script type="text/javascript" src="js/tab6.js"></script>
    <script type="text/javascript" src="js/tab7.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</head>
<body></body>
</html>