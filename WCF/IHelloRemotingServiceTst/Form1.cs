using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.Remoting.Channels;
using System.Runtime.Remoting.Channels.Tcp;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HelloRemotingServiceClient
{
    public partial class Form1 : Form
    {
        IHelloRemotingService.IHelloRemtingService client;
        public Form1()
        {
            InitializeComponent();
            TcpChannel channel = new TcpChannel();
            ChannelServices.RegisterChannel(channel,true);
            client = (IHelloRemotingService.IHelloRemtingService)Activator.GetObject(
              typeof(IHelloRemotingService.IHelloRemtingService),
              "tcp://localhost:8080/GetMessage");
        }

        private void button1_Click(object sender, EventArgs e)
        {
            label1.Text = client.GetMessage(textBox1.Text);
        }
    }
}
