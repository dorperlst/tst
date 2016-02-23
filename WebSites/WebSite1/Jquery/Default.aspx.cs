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

    public string CS = "Data Source=LAPTOP-A21AF34N;Initial Catalog=AdventureWorks2012;Integrated Security=True";
    protected void tt(out int ind)
    {
        ind = 0;
        int tmp = ind;
    }
    protected void Page_Load(object sender, EventArgs e)
    {


        linq();
        //string[] MyArray = new string[1];
        //MyArray[0] = "My Value";
        //Singleton.Instance.addUser("sss", "sss");
        //Singleton.Instance.addUser("www", "www");
        //List<Singleton.User> user = Singleton.Instance.users;
    }


    public void linq()
    {
        dc mydc = new dc();
        //List<Person> list = mydc.getPeople();
        //GridView1.DataSource = list;
        //GridView1.DataBind();

        int [] numbers = new int[] { 2,4,8,1,3,55,33,22,66,35,53,14,17};

        var result =
               from n in numbers
               where n > 20
               select n;


        var result2 =

                numbers.Where((n) => n < 20).Select(n => n);


        foreach (int num in result2)
        {
            Label1.Text += " " + num.ToString();
        
        }



        //GridView1.DataSource = result.ToList();
        //GridView1.DataBind();

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


