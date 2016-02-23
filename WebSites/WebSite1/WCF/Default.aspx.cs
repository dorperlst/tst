using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WCF_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        HelloService.HelloServiceClient client = new
            HelloService.HelloServiceClient("NetTcpBinding_IHelloService");
        Label1.Text = client.GetMessage(TextBox1.Text);
    }
}