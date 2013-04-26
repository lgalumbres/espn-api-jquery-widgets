espn-api-jquery-widgets
=======================

A widget library that uses jQuery and utilizes the ESPN APIs to create a series of widgets such as news tiles, athletes and teams widget.

Still a work in progress. Current only contains a working news tiles widget and a athletes widget in progress. 

Usage
-----

See html files in /samples directory.

```shell

<link rel="stylesheet" type="text/css" href="css/ui-lightness/jquery-ui-1.7.2.custom.css">
<link rel="stylesheet" type="text/css" href="css/ui.tilenews.css">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.ui.core.js"></script>
<script type="text/javascript" src="js/jquery.ui.widget.js"></script>
<script type="text/javascript" src="js/jquery.ui.tilenews.js"></script>

<script type="text/javascript">
   $(document).ready(function() {
      $("#container").tilenews({ 
         api_key : "{api-key}",  
         sport : "baseball", 
         league : "mlb" 
      });
   });
</script>

.....

<body>
   <div id="container">
   </div>
</body>

```