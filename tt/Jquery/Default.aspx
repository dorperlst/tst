<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="assets/jquery.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="div1">
        sadasdsadsadsad
    </div>
    <br />
      <div id="div2">
        wwwwwwwwwwwwww
    </div>

  <div id="div4">
        handler
    </div>




    
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