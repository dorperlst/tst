<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm2.aspx.cs" Inherits="jquery.WebForm2" %>

<!DOCTYPE html>
<html>
<head>
    <title></title>
     <script src="Scripts/jquery-1.4.1.js"></script>
    <script src="Scripts/jquery-ui-1.11.4/jquery-ui.js"></script>
    <link href="Scripts/jquery-ui-1.11.4/jquery-ui.css" rel="stylesheet" />
    <style>
        .containerDiv {
            background-color: red;
            color: white;
            font-weight: bold;
            margin: 5px;
        }
    </style>
    
    <script type="text/javascript">
        $(document).ready(function () {
            alert($('div.containerDiv').length);
            $('div').wrap('<div class="containerDiv"></div>');
            alert($('div.containerDiv').length);
        });
    </script>
</head>
<body style="font-family:Arial">
    <div id="div1">
        DIV 1
    </div>
    <div id="div2">
        DIV 2
    </div>
    <div id="div3">
        DIV 3
    </div>
</body>
</html>