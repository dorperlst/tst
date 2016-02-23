<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="assets/jquery.js" type="text/javascript"></script>
    <style type="text/css">
        #form1 {
            height: 516px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
  <script type="text/javascript">
      window.onload = function () {
          // For all modern browsers
          if (document.addEventListener) {
              document.getElementById('button1')
                      .addEventListener('click', clickHandler, false);
          }
          else
              // For Internet Explorer < 9
          {
              document.getElementById('button1')
                      .attachEvent('onclick', clickHandler);
          }

          function clickHandler() {
              alert('jQuery Tutorial');
          }
      };
</script>
<input type="button"  value="Click Me" id="button1" />
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:AdventureWorks2012ConnectionString %>" SelectCommand="SELECT * FROM [Address]"></asp:SqlDataSource>
        <asp:GridView ID="GridView1" runat="server">
        </asp:GridView>
        <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>



    
    </form>
</body>
</html>

 <script type="text/javascript">
        var privRun;
        $(document).ready(function () {

            $("#div1").click(function () {

                $.ajax({
                    type: "POST",
                    url: "default.aspx/getDetails",
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                        $.each(data.d, function (index) {
                            $("#div1").append(data.d[index].Started);
                        });

                    }

                });
            });
            function succeededAjaxFn(data) {

                 alert(data.d);
            }
            function failedAjaxFn() { }

            $('#div4').click(function () {
                $.ajax({
                    type: "GET", dataType: "json", cache: false, contentType: "application/json;charset=utf-8", async: true,
                    url: 'handlers/Handler.ashx',
                    data: { grouping: 'Test' },
                    success: function (data) {
                    }
                })
            });

           




            $('#div2').click(function () {
                var parameters = ["name", 'dd', "surname", 'fdfdfd', "age", '33'];
                PageMethod("GetMeAGUID", parameters, succeededAjaxFn, failedAjaxFn);
            });

            $("#div3").click(function () {
                var data = { Name: 'ww', Id: 5 };
                var json_data = JSON.stringify(data);
                var data2 = { Name: 'ww', Id: 5 };
                //ajax call
                $.ajax({
                    type: "POST",
                    url: "default.aspx/getCities",
                    data: json_data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(thrownError);
                    }
                }); //ajax call end

            });


        });

        function PageMethod(fn, paramArray, successFn, errorFn) {
            var pagePath = window.location.pathname;
            //-------------------------------------------------------------------------+
            // Create list of parameters in the form:                                  |
            // {"paramName1":"paramValue1","paramName2":"paramValue2"}                 |
            //-------------------------------------------------------------------------+
            var paramList = '';
            if (paramArray.length > 0) {
                for (var i = 0; i < paramArray.length; i += 2) {
                    if (paramList.length > 0) paramList += ',';
                    paramList += '"' + paramArray[i] + '":"' + paramArray[i + 1] + '"';
                }
            }
            paramList = '{' + paramList + '}';
            //Call the page method
            $.ajax({
                type: "POST",
                url: "default.aspx/GetMeAGUID",
                contentType: "application/json; charset=utf-8",
                data: paramList,
                dataType: "json",
                success: successFn,
                error: errorFn
            });
        }
        </script>