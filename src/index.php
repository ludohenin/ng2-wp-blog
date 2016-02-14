<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><%= APP_TITLE %></title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <!-- inject:css -->
  <!-- endinject -->
</head>
<body>

  <app>Loading...</app>

  <!-- shims:js -->
  <!-- endinject -->

  <script>System.config(<%= JSON.stringify(SYSTEM_CONFIG) %>)</script>
  <!-- libs:js -->
  <!-- endinject -->

  <script src="<%= APP_CONFIG.DISQUS_SRC %>"></script>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  </script>

  <script>
    System.import('bootstrap')
      .catch(function (e) {
        console.error(e,
          'Report this error at https://github.com/ludohenin/ng2-wp-blog/issues');
      });
  </script>

</body>
</html>
