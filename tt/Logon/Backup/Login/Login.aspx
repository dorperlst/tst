<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Login.Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
</head>
<body>

   	<form action="" method="post">
        <div  align="center" style="padding-top: 3px; padding-bottom: 5px"> 
            <input id="userName" type="text" placeholder="Name" />
        </div>

        <div align="center" style="padding-top: 10px; padding-bottom: 5px"> 
            <input id="userPassword" type="text" placeholder="Password" />
       	</div>
                 
        <div align="center" style="margin-bottom: 20px"> 
            <input type="submit" id="btnLogin" name="send" value="Sign in"/>
        </div> 
              
	</form>
  
</body>
</html>
   <script src="Scripts/jquery-1.4.1.js" type="text/javascript"></script>
   <script src="Scripts/Login.js" type="text/javascript"></script>