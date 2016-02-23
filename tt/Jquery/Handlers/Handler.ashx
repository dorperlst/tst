<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        context.Response.Write("Hello World");
        string grouping = context.Request.Params["grouping"].ToString();
        switch (grouping)
        {
            case "updateRelatedArticle":
                int i = 0;
                break;
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}