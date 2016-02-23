<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using System.Collections.Generic;
using jquery;
using System.Data.SqlClient;
 
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
  
       public Tooltip GetTooltip(string fieldName)
        {
            string cs = "Data Source=LAPTOP-A21AF34N;Initial Catalog=jquery;Integrated Security=True";
            Tooltip tooltip = new Tooltip();
             SqlConnection con = new SqlConnection(
             "Data Source=LAPTOP-A21AF34N;Initial Catalog=jquery;Integrated Security=True");

            
                SqlCommand cmd = new SqlCommand("spGetTooltip", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                SqlParameter parameter = new SqlParameter();
                parameter.ParameterName = "@FieldName";
                parameter.Value = fieldName;
                cmd.Parameters.Add(parameter);

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    tooltip.FieldName = rdr["FieldName"].ToString();
                    tooltip.TooltipText = rdr["TooltipText"].ToString();
                }
                con.Close();

            return tooltip;
       }
    
    
    private void Login()
    {

         jquery.TService.TooltipServiceSoapClient client = new jquery.TService.TooltipServiceSoapClient();
 
         var Res =GetTooltip("firstName");
         loginContext.Response.Write(ser.Serialize(Res));
    }
    
    public bool IsReusable {
        get {
            return false;
        }
    }

}