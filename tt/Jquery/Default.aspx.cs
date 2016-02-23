using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Data;
using System.Web.Script.Serialization;
using System.Web.Script.Services;

public partial class _Default : System.Web.UI.Page
{


    protected void tt(out int ind)
    {
        ind = 0;
        int tmp = ind;
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        //string[] MyArray = new string[1];
        //MyArray[0] = "My Value";
        //Singleton.Instance.addUser("sss", "sss");
        //Singleton.Instance.addUser("www", "www");
        //List<Singleton.User> user = Singleton.Instance.users;
    }

    [WebMethod]
    public static string GetMeAGUID(string name, string surname, string age)
    {
        var poo = int.Parse(age);
        return string.Format(
            "Hey, {0} {1}. How is it goin over there? u are {2} years old and here is a Guid for you : {3}",
            name, surname, poo.ToString(), Guid.NewGuid()
            );
    }

    //[WebMethod]
    //[ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
    //public static List<Details> getDetails()
    //{
    //    try
    //    {
    //        ClassLibrary1.Class1 bl = new ClassLibrary1.Class1();
    //        List<Details> list = new List<Details>();
    //        DataTable dt = bl.RunsTableAdapter();
    //        int i = 0;
    //        foreach (DataRow row in dt.Rows)
    //        {
    //            i++;
    //            if (i > 20)
    //                break;
    //            Details detailsNode = new Details();
    //            detailsNode.Started = row["Started"].ToString();
    //            detailsNode.Id = row["Id"].ToString();
    //            list.Add(detailsNode);
    //        }
    //        return list;
    //    }
    //    catch (Exception ex)
    //    {
    //        return null;

    //    }
    //}

}


