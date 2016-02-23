using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using MathServiceTestApp1.ServiceReference1;
using MathServiceTestApp1.webServiceReference;
namespace MathServiceTestApp1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }


        private void btnCalc_Click2(object sender, EventArgs e)
        {
            MathServiceTestApp1.webServiceReference.HelloWebServiceSoapClient
          client = new HelloWebServiceSoapClient();
          
            txtResult.Text = client.GetMessage(txtNum1.Text);
        }
        private void btnCalc_Click(object sender, EventArgs e)
        {
            MathServiceClient loClient = new MathServiceClient();

            Int32 loNum1 = Convert.ToInt32(txtNum1.Text.Trim());
            Int32 loNum2 = Convert.ToInt32(txtNum2.Text.Trim()); ;

            if (cboOperation.Text == "Add")
            {
                txtResult.Text = loClient.tstAdd(loNum1, loNum2).ToString();
            }
            else if (cboOperation.Text == "Subtract")
            {
                txtResult.Text = loClient.Subtract(loNum1, loNum2).ToString();
            }
            else if (cboOperation.Text == "Multiply")
            {
                txtResult.Text = loClient.Multiply(loNum1, loNum2).ToString();
            }
            else
            {
                txtResult.Text = loClient.Divide(loNum1, loNum2).ToString();
            }
        }
    }
}
