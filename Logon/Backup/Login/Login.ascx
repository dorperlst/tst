<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Login.ascx.cs" Inherits="Login.Login1" %>
   
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
