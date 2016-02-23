<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="jquery.WebForm1" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <script src="Scripts/jquery-1.4.1.js"></script>
    <script src="Scripts/jquery-ui-1.11.4/jquery-ui.js"></script>
    <link href="Scripts/jquery-ui-1.11.4/jquery-ui.css" rel="stylesheet" />

    <script type="text/javascript">
        $(document).ready(function () {

            $('#btnSubmit').click(function () {
                var result = $('input[type="radio"]:checked');
                if (result.length > 0) {
                    $('#divResult').html(result.val() + " is checked");
                }
                else {
                    $('#divResult').html("No radio button checked");
                }
            });


            $('.displayTooltip').each(function (index, element) {
                getTooltip($(this).attr('id'))
            });

            function getTooltip(myid) {

                var returnValue = '';

                //$.ajax({
                //    type: "POST",
                //    url: "http://localhost:53564/TooltipService.asmx/GetTooltip",
                //    data: '{"fieldName":' + JSON.stringify(myid) + '}',
                    
                //    contentType: "application/json; charset=utf-8",
                    
                //    success: function (msg) {
                //        returnValue = data.TooltipText;
                //    },
                //    error: function (e) {
                //        alert(e)
                //    }
                //});

                $.ajax({
                    url: "http://localhost:53564/TooltipService.asmx/GetTooltip",
                    type: "POST",


                    dataType: "json", cache: false, contentType: "application/json;charset=utf-8", 
                   
                    data: '{"fieldName":' + JSON.stringify(myid) + '}',
                    success: function (data) {
                                returnValue = data.TooltipText;
                            },
                            error: function (e) {
                                var t = 0;
                            }
                 
                });



                //$.ajax({
                //    type: "GET", dataType: "json", cache: false, contentType: "application/json;charset=utf-8", async: true,
                //    url: 'Handlers/Handler.ashx',
                //    data: { grouping: 'Login', fieldName: 'firstName' },
 
                //    success: function (data) {
                //         returnValue = data.TooltipText;
                //                    },
                //                    error: function (e) {
                //                        var t = 0;
                //                    }
                //})
                return returnValue;
            }
        });
    </script>
</head>
<body style="font-family: Arial">
    <form id="form1" runat="server">

        <div>

            <input type="radio" name="gender" value="Male">Male
    <input type="radio" name="gender" value="Female">Female
    <br />
            <br />
            <input id="btnSubmit" type="submit" value="submit" />
            <br />
            <br />
            <div id="divResult">
            </div>

        </div>
        <div>
            <table>
                <tr>
                    <td>First Name</td>
                    <td>
                        <input id="firstName" class="displayTooltip" title="" value="קקקק" type="text" />
                    </td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>
                        <input id="lastName" class="displayTooltip" title="" type="text" value="לליחיחי" />
                    </td>
                </tr>
                <tr>
                    <td>Department</td>
                    <td>
                        <input id="department" class="displayTooltip" title="" type="text" value="דדדד" />
                    </td>
                </tr>
            </table>

        </div>
    </form>
</body>
</html>
