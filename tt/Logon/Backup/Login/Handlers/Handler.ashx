<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using System.Collections.Generic;

 
public class Handler : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    HttpContext loginContext = null;
    System.Web.Script.Serialization.JavaScriptSerializer ser = new System.Web.Script.Serialization.JavaScriptSerializer();
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        loginContext = context;
        string grouping = loginContext.Request.Params["grouping"].ToString();
        switch (grouping)
        {
            case "Login":
                Login();
                break;
        }
    }
    
    private void Login()
    {
        string userName = loginContext.Request["userName"].ToString();
        string userPassword = loginContext.Request["userPassword"].ToString();
        var Res = "false";
        loginContext.Response.Write(ser.Serialize(Res));
    }
    
    public bool IsReusable {
        get {
            return false;
        }
    }

}