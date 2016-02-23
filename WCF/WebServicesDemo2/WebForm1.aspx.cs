using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebServicesDemo2
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            HelloWebService dd = new HelloWebService();
            Label1.Text = dd.GetMessage(TextBox1.Text);


            //HelloWebService. client = new
            //HelloWebService.HelloWebServiceSoapClient();

            //Label1.Text = client.GetMessage(TextBox1.Text);
        }
    }
}


