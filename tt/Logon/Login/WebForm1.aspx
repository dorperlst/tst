<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="Login.WebForm1" %>

<%@ Register src="Login.ascx" tagname="Login" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
    <script src="Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="Scripts/Login.js" type="text/javascript"></script>
<title>My Page</title>
</head>
<body>
 
    <uc1:Login ID="Login1" runat="server" />
 
</body>
</html>
