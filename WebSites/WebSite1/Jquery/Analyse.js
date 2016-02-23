// <reference path="jquery.js" />
/// <reference path="user.js" />
var ex;
var privRun;
var xhr;
var xhr2;
var xhr3;
var xhr4;
var xhr5;
var xhr6;
function AnalizeInit(e) {
    ex = e;
    var proId = $("#Hidden1").attr('proId');
    var rowInd = $("#Hidden1").attr('rowInd');
    privRun = $("#Hidden1").attr('privRun');
    getUsername(false);
    var demoMode = $("#Hidden1").attr('demoMode');
    if (demoMode != "True") {
        getUsername(false);
        if ($('#nameDiv2').attr("userId") == "")
            window.location.href = "index.aspx";
    }
    else {
        $('#nameDiv2').hide();
        $('#Logout').parent().parent().parent().hide();
    }
    getInfoCookie();
    $("#SelectUsers").attr("first", "true");
    var AccountType = $('#nameDiv2').attr("AccountType");

    var userId = $('#nameDiv2').attr("userId");
    var isCategory = $("#Hidden1").attr('isCategory');
    var combine = $("#Hidden1").attr('combine');

    init(proId, rowInd);
    $("#analysenav li").first().click();
    if ($("#Hidden1").attr("locale") == "he_IL")
        hebClick();
    else
        engClick();
    
    GetCategoryProjectsByUser();
    if ($("#select_stats_panel").attr("first") != "true") {
        $("#select_stats_panel").attr("first", "true");
        $("#select_stats_panel .stats").click(Sonana.openStatsPopup);
        $("#select_stats_popup .close").click(Sonana.closeStatsPopup);
    }

    var position = $("#AnalyseInfo").position();
    $("#AnalyseInfo").attr("baseTop", position.top);

    $('#CommonInterestsExport').click(function (e) {
        exportInfluanceInfoStatistics('exportStats', 'Excel');
        e.preventDefault();
        return false;
    });

    $('#PdfCommonInterestsExport').click(function (e) {
        exportInfluanceInfoStatistics('exportStats', 'Pdf');
        e.preventDefault();
        return false;
    });

    $('.selectTimeLine').change(function (e) {
        if ($(this).val() == "Select Period")
            $('.divSelectPeriod').show();
        else
            $('.divSelectPeriod').hide();
        e.preventDefault();
        return false;
    });


    $('.Target').click(function (e) {

        var runId = "";
        var entityid = "";
        var entitytype = "";
        var scoreImage = "";
        var url = "";
        var actionId = "";
        var SelectUsers=$("#SelectUsers").val();
        var curtable= "#tblInfluencesBody tr.active";
        if (SelectUsers == "All")
            curtable = "#ActiveTable tr.active"

        $(curtable).each(function (i) {
            if (scoreImage == "")
                scoreImage = $(this).attr('activeScoreImg');
            else
                scoreImage += "," + $(this).attr('activeScoreImg');

            if (url == "")
                url = $(this).attr('url');
            else
                url += "," + $(this).attr('url');

            if (actionId == "")
                actionId = '0';
            else
                actionId += "," + '0';

            if (runId == "")
                runId = $("#analysenav .selected").attr('runId');
            else
                runId += "," + $("#analysenav .selected").attr('runId');

            if (entityid == "")
                entityid = $(this).attr('entityid');
            else
                entityid += "," + $(this).attr('entityid');

            if (entitytype == "")
                entitytype = changeType($(this).attr('entitytype'));
            else
                entitytype += "," + changeType($(this).attr('entitytype'));
        });

        $.ajax({
            type: "GET", dataType: "json", cache: false, contentType: "application/json;charset=utf-8", async: true,
            url: 'handlers/MonitorHandler.ashx',
            data: { grouping: 'InsertTarget', runId: runId, entityid: entityid, entitytype: entitytype, scoreImage: scoreImage, url: url, actionId: actionId },
            success: function (data) {
                $(".submenu").hide();

                $(curtable).each(function (i) {
                   $(this).addClass('target');
                });



            }
        })
        return false;
    });

    function changeType(type) {

        if (type == "1")
            type = "User";
        else if (type == "4")
            type = "Page";

        else if (type == "3")
            type = "Event";
        else if (type == "2")
            type = "Group";
        else if (type == "5")
            type = "Company";
        return type;
    }
    $('.RequestFriendship').click(function (e) {
        $(".darkpopup").hide();
        $(".root").hide();
        $(".submenu").hide();
        var AgentId = $("#Hidden1").attr('AgentId');
        if (AgentId == "") {
            $("#userSettings").attr("actionName", "request_friendship");
            showPopUp("#userSettings");
        }
        else {
            showPopUp("#request_friendship");
        }
        var name = $(this).parent().attr("name");
        if (name == "CommonInterests")
            fillFriendsUser("common");
        else
            if (name == "users")
                fillFriendsUser("users");
            else
                if (name == "stats")
                    fillFriendsUser("stats");
        e.preventDefault();
        return false;
    });

    $('.SndMsg').click(function (e) {
        $(".submenu").hide();
        $(".darkpopup").hide();
        $(".root").hide();
        var name = $(this).parent().attr("name");
        if (name == "CommonInterests")
            fillMsgUser("common");
        else if (name == "users")
            fillMsgUser("users");
        else if (name == "stats")
            fillMsgUser("stats");
        var AgentId = $("#Hidden1").attr('AgentId');
        if (AgentId == "") {
            $("#userSettings").attr("actionName", "SndMsg");
            showPopUp("#userSettings");
        }
        else {
            $("#sendamessageFB_LK_popup").find("span").first().html('Select the recipient');
            $("#ULmsgUsers .selected").each(function (i) {
                $(this).removeClass('selected');
            });
            if (name == "users") {
                var activeTable = "#tblInfluencesBody .active";
                if ($("#SelectUsers").val() == "All")
                    activeTable = "#tblActiveBody .active";
                $(activeTable).each(function (i) {
                    var index = $(this).attr('rowNum');
                    var intInd = parseInt(index);
                    $("#ULmsgUsers").find("li img").eq(intInd).click();
                });
            }
            showPopUp("#sendamessageFB_LK_popup");
        }
        return false;
    });

    $('#lnkAddArticle').click(function (e) {
        showPopUp("#addArticle_popup");
    });

    $('#LnkSndMsg').click(function (e) {
        e.preventDefault();
        var myClass = $(this).attr('class');
        if (myClass == 'btn disable')
            return false;
        sendMsg(e);
        return false;
    });

    
    $('#BtnReRun').click(function (e) {
        e.preventDefault();
        $('#analyse_settings_popup').hide();
        var top = $(window).scrollTop();
        $("#analysepopup").css("top", (top + 20) + "px").show();
        $("#linkRun2").attr("class", "linkRun active");
        $("#Selectlevel").val($("#analysepopup").attr("level"));
        if ($("#analysepopup").attr("IncludeLastLevelFriends") == "True")
            $('#chkLastLevel').attr('checked', true);
        else
            $('#chkLastLevel').attr('checked', false);
        $('#influencesNum').val("20");
        $("#analysepopup").attr("TimeLinePeriod");
        $('#analysepopup').attr("reRun", "true");
        return false;
    });

    $('#SelectUsers').change(function () {
        SelectUserschange();
    });

    $('#activelink_analysis').click(function (e) {

        var influenceOnly = $("#InfoDiv").attr('influenceOnly');
        var clicked = $("#framediv").attr('clicked');
        if (clicked != 'true') {
            $("#framediv").attr('clicked', 'true');
            loadLinkAnalysis(influenceOnly);
        }
        e.preventDefault();
        return false;
    });

    $('#exportExcel').click(function (e) {
        if ($(this).attr("class") == "exportExcel disable") {
            e.preventDefault();
            return false;
        }
        exportExcel('Friends', 'Excel');
        return false;
    });

    $('#exportPdf').click(function (e) {
        if ($(this).attr("class") == "exportExcel disable") {
            e.preventDefault();
            return false;
        }
        exportExcel('Friends', 'Pdf');
        return false;
    });

    $('#ExportAll').click(function (e) {
        exportInfluanceInfoStatistics('All', 'Excel');
        return false;
    });

    $('#PdfExportAll').click(function (e) {
        exportInfluanceInfoStatistics('All', 'Pdf');
        return false;
    });

    $('#exportCommon').click(function (e) {
        if ($(this).attr("class") == "exportExcel disable") {
            e.preventDefault();
            return false;
        }
        exportExcel('Common', 'Excel');
        return false;
    });

    $('#ExportToWord').click(function (e) {
        exportWord();
        return false;
    });

    $('#btnAddRelatedArticle').click(function (e) {
        var RelatedArticle = $('#RelatedArticle').val()
        var runId = $("#analysenav .selected").attr('runId');
        updateRelatedArticle($("#analysenav .selected").attr('proid'), RelatedArticle, runId);
        $('#addArticle_popup').hide();
        return false;
    });

    $('#submitProChange').click(function (e) {
        var runId = $("#analysenav .selected").attr('runId');
        var selectedPro = $("#SpanProject").attr("selectedPro");
        if (selectedPro == undefined)
            selectedPro = 0;
        updateProjectSetting(selectedPro, $("#analysenav .selected").attr('proid'), runId);
        $('#analyse_settings_popup').hide();
        return false;
    });

    String.prototype.killWhiteSpace = function () {
        return this.replace(/\s/g, '');
    };

    $('#DeleteProject').click(function (e) {
        var proId = $("#analysenav li.selected").attr('proid');
        var firstproId = $("#analysenav li").first().attr('proid');
        var answer;
        if (proId == firstproId && $("#analysenav li").size() > 1)
            answer = confirm("this project and all related projects will be delete continue ?")
        else
            answer = confirm("Delete this project ?")
        if (answer) {
            deleteProject(proId);
            if (proId == firstproId)
                window.location.href = "Reports.aspx";
            else {
                $("#analyse_settings_popup").hide();
                $("#analysenav li.selected").remove()
                $("#analysenav li").first().click();
            }
        }
        return false;
    });

    var hostname = window.location.hostname;
    var link = "http://" + hostname;
    var picture = "http://" + hostname + "/assets/img/sonana-facebook-icon.png";

    $('.ShareScore').click(function (e) {
        FB.ui({
            method: 'feed',
            name: 'Sonana - Social Networks Analysis',
            link: link,
            caption: currentScore,
            picture: picture
        }, function (response) { });
        return false;
    });

    function SelectUserschange() {
        var runId = $("#analysenav .selected").attr('runId');
        var EntityId = $("#analysenav .selected").attr('EntityId');
        var entityTypeId = $("#analysenav .selected").attr('entityTypeId');
        var influenceOnly = $("#analysenav .selected").attr('influenceOnly');
        var Select = $("#SelectUsers").val();
        $(".Target").hide();
        $("#userFilter").val('');
        if ($("#SelectUsers").attr("activeload") != "true")
            loadPopular(runId, EntityId, entityTypeId, influenceOnly, Select);
        if (Select == "Active") {
            $("#InfluenceTable").hide();
            $("#ActiveTable").show();
        }
        else {
            $("#InfluenceTable").show();
            $("#ActiveTable").hide();
        }
        if ($("#SelectUsers").val() == "Active") {
            $("#tblActiveBody tr.active").click();
            $("#InfluenceTable").show();
            $("#ActiveTable").hide()
        }
        else {
            $("#InfluenceTable tr.active").click();
            $("#InfluenceTable").hide();
            $("#ActiveTable").show();
        }
    }

    function deleteProject(proId) {
        $.ajax({
            type: "GET", dataType: "json", cache: false, contentType: "application/json;charset=utf-8", async: true,
            url: 'handlers/runHandler.ashx',
            data: { grouping: 'deleteProject', privRun: privRun, proId: proId },
            success: function (data) {
            }
        })
    }

    function updateRelatedArticle(proId, RelatedArticle, runId) {
        $.ajax({
            type: "GET", dataType: "json", cache: false, contentType: "application/json;charset=utf-8", async: true,
            url: 'handlers/Analyse.ashx',
            data: { grouping: 'updateRelatedArticle', privRun: privRun, proId: proId, RelatedArticle: RelatedArticle, runId: runId },
            success: function (data) {
                var TableNewsearcrelatedArticle = $("#TableNewsearch").attr('relatedArticle');
                if (RelatedArticle == '') {
                    $("#sectionRelatedArticlepPanel").hide();
                    $("#DivRelatedArticle").hide();
                    $("#TableNewsearch").attr('relatedArticle', RelatedArticle);
                }
                else if (TableNewsearcrelatedArticle != RelatedArticle) {
                    $("#sectionRelatedArticlepPanel").show();
                    $("#DivRelatedArticle").show();
                    $("#TableNewsearch").attr('relatedArticle', RelatedArticle);
                    googleSearch('', '', RelatedArticle, 0, '#TableNewsearchBody');
                    $("#RelatedArticleHeader").html("Articles about :" + RelatedArticle);
                }
            }
        })
    }

    function updateProjectSetting(selectedPro, proId, runId) {
        $.ajax({
            type: "GET", dataType: "json", cache: false, contentType: "application/json;charset=utf-8", async: true,
            url: 'handlers/runHandler.ashx',
            data: { grouping: 'updateProjectSetting', privRun: privRun, proId: proId, selectedPro: selectedPro, runId: runId },
            success: function (data) {

            }
        })
    }

    $('#Print').click(function (e) {
        $("#fullwidth").css("background-color", "white");
        $("#export_to_popup").hide();
        $('#newanalyse_leftnav').hide();
        $('#newanalyse').css('margin', '0');
        $('#newanalyse').css('width', '100%');
        $('#fullwidth').css('width', '90%');

        $("#analysenav li").each(function (index) {
            if ($(this).attr('class') != 'selected')
                $(this).hide();
        });
        $(".right").hide();
        $("#interess_panelHr").hide();
        if ($("#ULTypes li").size() == 0) {
            $("#select_stats_panel").hide();
            $("#statsHr").hide();
            $('#interess_contentHR').hide();
        }
        if ($("#paths").css('display') == 'none') {
            $("#finder").hide();
            $('#path-section-pointer').hide();
            $("#pathHr").hide();
        }
        if ($("#link_analysis").css('display') == 'none') {
            $("#link_analysisSection").hide();
        }
        $(".info").hide();
        $("#tableDiv").attr('class', 'printheader');
        var myind = 1;
        var index = 0;
        var tblActiveBodyid = '';
        var tablesNum = 0;
        var th1width = "75.5%";
        var th2width = "25%";
        var level = $("#runInfo").attr('level');
        if (level == '0') {
            th1width = "80%";
            th2width = "20%";
        }
        var curTable = "";
        if ($("#SelectUsers").val() == "Active") {
            curTable = "#tblInfluencesBody tr";
        }
        else {
            $("#SelectUsers").attr("activeload", "true");
            curTable = "#tblActiveBody tr";
        }
        $(curTable).each(function (index) {
            index++;
            if (index == myind * 18) {
                myind++;
                tblActiveBodyid = "tblActiveBody" + myind;
                var headerTRid = "headerTR" + myind;
                $("#mainTbl").append("<div class='row printTbl' style='page-break-before:always'><div class='table' ><table   cellpadding='0' cellspacing='0' width='100%'><thead><tr ><th width='" + th1width + "%'>FACEBOOK</th><th width='" + th2width + "'>SCORE</th></tr></thead></table><div ><table cellpadding='0' cellspacing='0' width='100%'><tbody class='tbodyprint' ></tbody></table></div></div></div>");
                $("#mainTbl").append("<div class='row printTbl' style='margin-top:0px;' ><div class='table' style='margin-top:0px;' ><table   cellpadding='0' cellspacing='0' width='100%'><thead><tr id='" + headerTRid + "'></tr></thead></table><div ><table cellpadding='0' cellspacing='0' width='100%'><tbody class='tbodyprint' id='" + tblActiveBodyid + "'></tbody></table></div></div></div>");
                headerTRid = "#" + headerTRid;
                var socialnetwork = $("#analysenav .selected").attr('socialnetwork');

                if (socialnetwork == "Twitter") {
                    $(headerTRid).html("<th width='35.1%'>NAME</th><th width='12%'>FOLLOWERS</th><th width='12%'>TWEETS</th><th width='12%'>REPLIES</th><th width='12%'>RETWEETS</th><th   width='11%'>FAVORITES</th><th width='10%'>INFLUENCE</th><th width='12%'>ACTIVE</th> ");
                }
                if (level == '0') {
                    $(headerTRid).html("<th width='44%'>NAME</th><th width='12%'>POSTS</th><th width='10%'>COMMNETS</th><th id='ThShare' width='10%'>SHARE</th><th width='10%'>LIKES</th><th   width='10%'>INFLUENCE</th><th>ACTIVE</th> ");
                }
                else
                    $(headerTRid).html("<th width='23.5%'>NAME</th><th width='11%'>USERS</th><th width='11%'>POSTS</th><th width='11%'>COMMNETS</th>><th id= width='11%'>SHARES</th><th width='11%'>LIKES</th><th   width='11%'>INFLUENCE</th><th  width='11%'>ACTIVE</th> ");
                tblActiveBodyid = "#" + tblActiveBodyid;
            }
            if (index > 18) {
                var tr = $(this).clone();
                $(tblActiveBodyid).append(tr);
                $(this).hide();
            }
        });
        if ($("#SelectUsers").val() == "Active")
            $("#tblActiveBody").css("width", "100%");
        else
            $("#tblInfluencesBody").css("width", "100%");
        $("#headerTbl").css("width", "100%");
        $("#Table1").css("width", "100%");
        window.print();
        printTimeout = setTimeout(function () { initPrintPage() }, 500);
        return false;
    });

    var printTimeout;
    function initPrintPage() {
        $("#fullwidth").css("background-color", "#777777;");
        $('#newanalyse_leftnav').show();
        $('#newanalyse').css('margin', 'auto');
        $('#newanalyse').css('width', '80%');
        $('#fullwidth').css('width', '100%');
        $("#analysenav li").each(function (index) {
            $(this).show();
        });
        $(".right").show();
        $("#interess_panelHr").show();
        $("#select_stats_panel").show();
        $('#interess_contentHR').show();
        $("#finder").show();
        $('#path-section-pointer').show();
        $("#link_analysisSection").show();
        $(".info").show();
        var curTable = "";
        if ($("#SelectUsers").val() == "Active") {
            curTable = "#tblInfluencesBody tr";
        }
        else {
            $("#SelectUsers").attr("activeload", "true");
            curTable = "#tblActiveBody tr";
        }

        $(curTable).each(function (index) {
            $(this).show();
        });
        $("#statsHr").show();
        $("#tableDiv").attr('class', 'overflow');
        $('.printTbl').remove();
        clearTimeout(printTimeout);
    }

    $('#ExportToPDF').click(function (e) {
        exportPDF();
        return false;
    });

    $('#userFilter').keyup(function () {
        var filtername = $('#userFilter').val().toLowerCase();
        var curTable = "";
        if ($("#SelectUsers").val() == "Active") {
            curTable = "#tblInfluencesBody tr";
        }
        else {
            $("#SelectUsers").attr("activeload", "true");
            curTable = "#tblActiveBody tr";
        }

        $(curTable).each(function () {
            var LiEntityName = $(this).attr("entityname").toLowerCase();
            if (LiEntityName.indexOf(filtername) == -1) {
                $(this).removeClass('active');
                $(this).hide();
            }
            else
                $(this).show();
        })
        if (tblInfluencesBody.offsetHeight > tableDiv.offsetHeight) {
            $("#tblInfluencesBody").css("width", "99%");
            $("#headerTbl").css("width", "98.5%");
            $("#Table1").css("width", "98.5%");
        }
        else {
            $("#tblInfluencesBody").css("width", "100%");
            $("#headerTbl").css("width", "100%");
            $("#Table1").css("width", "100%");
        }
    });

    $(".linkRun").click(function (e) {
        if ($("#nameDiv2").attr("credit") == "0" && $('#nameDiv2').attr("accounttype") == "Basic") {
            $("#errMsg").html('No more credits left &nbsp;&nbsp;<a href="PlanPrices.aspx" title="Plans & Prices">Get credits</a>');
            e.preventDefault();
            $("#analysepopup").hide();
            return false;
        }
        e.preventDefault();
        if ($("#tblActiveBody .active").size == 0)
            return;
        var Selectlevel = $("#Selectlevel").val();
        var selectTimeLine = $("#selectTimeLine").val();
        var FromDate = "", ToDate = ""; ;
        if (selectTimeLine == "Select Period") {
            FromDate = $("#txtFromDate").val();
            ToDate = $("#txtToDate").val();
            if (FromDate == "" || ToDate == "") {
                if (ToDate == "")
                    $(".emptyToDate").html('*');
                if (FromDate == "")
                    $(".emptyFromDate").html('*');
                return;
            }
        }
        var chkLastLevel = $('#chkLastLevel').attr('checked')
        var chkInfluence = $('#chkInfluence').attr('checked')
        var influencesNum = $("#influencesNum").val();
        $("#analysepopup").hide();
        var socialnetwork = $("#analysenav .selected").attr('socialnetwork');
        if ($("#analysepopup").attr("reRun") == "true") {
            var EntitysNames = $("#analysenav li.selected").attr('name');
            var TxtTerms = $("#analysenav li.selected").attr('entitytypeid') + "," + $("#analysenav li.selected").attr('entityid');
            var proid = $("#analysenav li.selected").attr('proid');

            reRun(influencesNum, chkLastLevel, Selectlevel, selectTimeLine, TxtTerms, EntitysNames, chkInfluence, socialnetwork, proid, FromDate, ToDate)
            if ($("#linkRun2").attr('href') != '' && $("#linkRun2").attr('href') != undefined)
                window.location.href = $("#linkRun2").attr('href');
        }
        else {
            var curTable = "";
            if ($("#SelectUsers").val() == "Active")
                curTable = "#tblInfluencesBody .active";
            else
                curTable = "#tblActiveBody .active";
            $(curTable).each(function () {
                var TxtTerms = "";
                var EntitysNames = "";
                var resualtUrls = "";
                var twitterTxtTerms = "";
                var twitterEntitysNames = "";
                var twitterresualtUrls = "";
                var LiType = $(this).attr("entitytype");
                var LiEntityId = $(this).attr("entityid");
                var LiEntityName = $(this).attr("entityname");
                if (TxtTerms == "")
                    TxtTerms += LiType;
                else
                    TxtTerms += "," + LiType;
                if (EntitysNames == "")
                    EntitysNames += LiEntityName;
                else
                    EntitysNames += "," + LiEntityName;
                TxtTerms += "," + LiEntityId;
                var parentproid = $("#analysenav .selected").attr('proId');
                if (TxtTerms != "") {
                    var socialnetwork = $("#analysenav .selected").attr('socialnetwork');
                    influenceRun(influencesNum, chkLastLevel, Selectlevel, selectTimeLine, TxtTerms, EntitysNames, chkInfluence, socialnetwork, parentproid, FromDate, ToDate)
                    e.preventDefault();
                }
            })
        }
    });
}

function fillFriendsUser(type) {
    $("#ULfriendship").empty();
    var lifriendshipid = "";
    $("#ULfriendship").attr("type", type)
    if (type == "users") {
        var entityid = $("#analysenav .selected").attr('EntityId');
        var pageName = $("#analysenav .selected").attr('name');
        var ind = 0;
        var Img = $("#entityImg").attr('src');
        $("#ULfriendship").prepend(" <li ><img style='width:33px;height:32px' src='" + Img + "'  /><span title='" + pageName + "' class='username'>" + pageName + "</span><i class='red'></i><a NameID=''  username='" + pageName + "' userId='" + entityid + "'  href='#' class='btn'>+ Add friend</a></li> ");
        var curTable = "";
        if ($("#SelectUsers").val() == "Active") {
            curTable = "#tblInfluencesBody tr";
        }
        else {
            $("#SelectUsers").attr("activeload", "true");
            curTable = "#tblActiveBody tr";
        }

        $(curTable).each(function (i) {
            ind++;
            lifriendshipid = "liFriendshipid" + ind;
            var NameID = $(this).attr('NameID');
            var entityname = $(this).attr('entityname');
            var smallimagepath = $(this).attr('smallimagepath');
            var myclass = $(this).attr('myclass');
            entityid = $(this).attr('entityid');
            $("#ULfriendship").append(" <li  ><img style='width:33px;height:32px' src='" + smallimagepath + "'  /><span title='" + entityname + "' class='username'>" + entityname + "</span><i class='" + myclass + "'></i><a id=" + lifriendshipid + " NameID='" + NameID + "'  username='" + entityname + "' userId='" + entityid + "'  href='#' class='btn friendBtn'>+ Add friend</a></li> ");
        });

    }
    else if (type == "common") {
        $("#resTypeTable li").each(function (i) {
            ind++;
            lifriendshipid = "liFriendshipid" + ind;
            var NameID = $(this).attr('nameId');
            var entityname = $(this).attr('entityName');
            var smallimagepath = $(this).attr('smallimagepath');
            var scoreImg = $(this).attr('scoreImg');
            entityid = $(this).attr('entityid');
            var myImgDisplay = "", myclass = "";
            if (scoreImg != "") {
                if (scoreImg.indexOf("blue") != -1) {
                    myImgDisplay = "<i class='blue'></i>";
                }
                else if (scoreImg.indexOf("yellow") != -1)
                    myImgDisplay = "<i class='orange'></i>";
                else myImgDisplay = "<i class='red'></i>";
            }
            $("#ULfriendship").append(" <li  ><img style='width:33px;height:32px' src='" + smallimagepath + "'  /><span title='" + entityname + "' class='username'>" + entityname + "</span>" + myImgDisplay + "<a id=" + lifriendshipid + " NameID='" + NameID + "'  username='" + entityname + "' userId='" + entityid + "'  href='#' class='btn friendBtn'>+ Add friend</a></li> ");
        });
    }
    else if (type == "stats") {
        $("#userInfoList li").each(function (i) {
            ind++;
            lifriendshipid = "liFriendshipid" + ind;
            var NameID = "";
            var entityname = $(this).attr('entityName');
            var smallimagepath = $(this).attr('imgPath');
            var scoreImg = $(this).attr('scoreImg');
            entityid = $(this).attr('entityid');
            var myImgDisplay = "", myclass = "";
            if (scoreImg != "") {
                if (scoreImg.indexOf("blue") != -1) {
                    myImgDisplay = "<i class='blue'></i>";
                }
                else if (scoreImg.indexOf("yellow") != -1)
                    myImgDisplay = "<i class='orange'></i>";
                else myImgDisplay = "<i class='red'></i>";
            }
            $("#ULfriendship").append(" <li  ><img style='width:33px;height:32px' src='" + smallimagepath + "'  /><span title='" + entityname + "' class='username'>" + entityname + "</span>" + myImgDisplay + "<a id=" + lifriendshipid + " NameID='" + NameID + "'  username='" + entityname + "' userId='" + entityid + "'  href='#' class='btn friendBtn'>+ Add friend</a></li> ");
        });
    }
    $(".friendBtn").click(function (e) {
        var myClass = $(this).attr('class');
        if (myClass == 'btn disable')
            return false;
        $(this).addClass('disable');
        e.preventDefault();
        var myId = $(this).attr('id');
        friendRequest(e, myId);
    });

}

function fillMsgUser(type) {
    $("#ULmsgUsers").empty();
    $("#ULmsgUsers").attr("type", type)
    if (type == "users") {
        var entityid = $("#analysenav .selected").attr('EntityId');
        var pageName = $("#analysenav .selected").attr('name');
        var Img = $("#entityImg").attr('src');
        $("#ULmsgUsers").prepend("<li  style='padding-bottom:11px;' nameid=''  username='" + pageName + "' userid='" + entityid + "'><a href='#'><img style='width:33px;height:32px' src='" + Img + "'><span style='margin-top:11px;height:17px' title='" + pageName + "' class='username'>" + pageName + "</span> <i   class='red'></i></a></li>");
        var activeTable = "#tblInfluencesBody tr";
        if ($("#SelectUsers").val() == "All")
            activeTable = "#tblActiveBody tr";
        $(activeTable).each(function (i) {
            var NameID = $(this).attr('NameID');
            var entityname = $(this).attr('entityname');
            var smallimagepath = $(this).attr('smallimagepath');
            var myclass = $(this).attr('myclass');
            entityid = $(this).attr('entityid');
            $("#ULmsgUsers").append(" <li id='msgUsers" + i + "'  NameID='" + NameID + "'  username='" + entityname + "' userId='" + entityid + "'><a href='#'><img style='width:33px;height:32px' src='" + smallimagepath + "'/><span title='" + entityname + "' class='username'>" + entityname + "</span><i class='" + myclass + "'></i></a></li>");
        });
    }
    else if (type == "common") {
        $("#resTypeTable li").each(function (i) {
            var NameID = $(this).attr('nameId');
            var entityname = $(this).attr('entityName');
            var smallimagepath = $(this).attr('smallimagepath');
            var scoreImg = $(this).attr('scoreImg');
            entityid = $(this).attr('entityid');
            var myImgDisplay = "", myclass = "";
            if (scoreImg != "") {
                if (scoreImg.indexOf("blue") != -1)
                    myImgDisplay = "<i class='blue'></i>";
                else if (scoreImg.indexOf("yellow") != -1)
                    myImgDisplay = "<i class='orange'></i>";
                else myImgDisplay = "<i class='red'></i>";
            }
            $("#ULmsgUsers").append(" <li  NameID='" + NameID + "'  username='" + entityname + "' userId='" + entityid + "'><a href='#'><img style='width:33px;height:32px' src='" + smallimagepath + "'/><span title='" + entityname + "' class='username'>" + entityname + "</span>" + myImgDisplay + "</a></li>");
        });
    }
    else if (type == "stats") {
        $("#userInfoList li").each(function (i) {
            var NameID = "";
            var entityname = $(this).attr('entityName');
            var smallimagepath = $(this).attr('imgPath');
            var scoreImg = $(this).attr('scoreImg');
            entityid = $(this).attr('entityid');
            var myImgDisplay = "", myclass = "";
            if (scoreImg != "") {
                if (scoreImg.indexOf("blue") != -1)
                    myImgDisplay = "<i class='blue'></i>";
                else if (scoreImg.indexOf("yellow") != -1)
                    myImgDisplay = "<i class='orange'></i>";
                else myImgDisplay = "<i class='red'></i>";
            }
            $("#ULmsgUsers").append(" <li  NameID='" + NameID + "'  username='" + entityname + "' userId='" + entityid + "'><a href='#'><img style='width:33px;height:32px' src='" + smallimagepath + "'/><span title='" + entityname + "' class='username'>" + entityname + "</span>" + myImgDisplay + "</a></li>");
        });
    }
    $(".kindofselect ul li a").click(Sonana.selectKindOfSelect);
}

function BuildInfoTypes(EntityId, Entitytype) {
    $("#box1").empty()
    xhr3 = $.ajax({
        type: "GET", dataType: "json", cache: true, contentType: "application/json;charset=utf-8", url: 'handlers/Analyse.ashx', async: true,
        data: { grouping: 'BuildInfoTypes', privRun: privRun, EntityId: EntityId, Entitytype: Entitytype }, success: function (data) {
            var mysize = $("#TypesDataBody tr").size();
            var ind = 0;
            var AccountType = $('#nameDiv2').attr("AccountType");
            $('#statisticsLoading').hide();
            $.each(data, function (index) {
                ind++;
                var myId = "TypesDataBody" + index;
                var name = data[index].value;
                name = name.substring(0, 15);
                if (name == 'Sex')
                    name = "Gender";
                var curClass = "checkbox";
                var spanStyle = "";
                var spanTitle = data[index].value;
                var checked = "";
                $("#box1").append("  <div   isInfoParam='" + data[index].isInfoParam + "' id=" + myId + " style ='width:151px;height: 19px; overflow: hidden ' title='" + spanTitle + "' class='" + curClass + "'><div style ='float:left' class='el'> <input type='checkbox' style ='float:left' name='select' value='all'" + checked + "></div> <span style=" + spanStyle + " > " + name + " &nbsp; &nbsp;</span> </div>");
                myId = '#' + myId;
                $(myId).attr("name", data[index].value);
                $(myId).attr("TypesDataId", data[index].id);
            });

            $("#box1 .checkbox").click(Sonana.clickCheckbox);
            $("#select_stats_popup .checkbox").click(Sonana.checkSelectStatsPopupCheckboxes);

            var myheight = $("#box1").attr('height');
            $('#showActive').click(function (e) {
                offset = 0;
                ind = 0;
                $('#chart_sample').show();
                $('#divStats').show();
                $('#ULTypes').html('');
                $("#select_stats_popup .checked").each(function (index) {
                    var curId = "ULTypes" + index;
                    var name = $(this).attr('name');
                    var TypesDataId = $(this).attr('TypesDataId');
                    var myname = name;
                    if (myname == 'Sex')
                        myname = 'Gender';
                    var isInfoParam = $(this).attr('isInfoParam');
                    $('#ULTypes').append(" <li id=" + curId + "   ><a href='#' title='" + myname + "'>" + myname + "</a></li>");
                    curId = '#' + curId;
                    $(curId).attr('TypesDataId', TypesDataId);
                    $(curId).attr('name', name);
                    $(curId).attr('isInfoParam', isInfoParam);
                    $(curId).click(function (e) {

                        $(".selectedInfo").each(function () {
                            $(this).removeClass("selectedInfo");
                        });
                        $(this).addClass('selectedInfo');
                        var tmp = $("#hiddeninteress_content").attr('clicked')
                        if (tmp == 'true') {
                            e.preventDefault();
                            return false;
                        }
                        $("#hiddeninteress_content").attr('clicked', 'true');
                        var TypesDataId = $(curId).attr("TypesDataId");
                        var curname = $(curId).attr("name")
                        $("#hiddeninteress_content").attr('curname', curname);
                        var isInfoParam = $(curId).attr("isInfoParam")
                        GetInfluanceInfoStatistics(curname, TypesDataId, isInfoParam);
                        e.preventDefault();
                    });
                });

                var curline = $("#leftStats").attr("line");
                var curlineInt = parseInt(curline);

                $("#ULTypes li").each(function (e) {
                    if (offset < $(this).offset().top) {
                        offset = $(this).offset().top;
                        ind++;
                    }
                    $(this).attr("line", ind);
                });
                if (curlineInt > 1)
                    $("#leftStats").show();
                else
                    $("#leftStats").hide();

                if (ind > 1 && curlineInt < ind)
                    $("#rightStats").show();
                else
                    $("#rightStats").hide();

                $("#rightStats").attr("maxline", ind);
                var p;
                var length = 0;

                $("#ULTypes li").each(function (e) {
                    if (curlineInt != $(this).attr("line")) {
                        $(this).hide();
                    }
                    else {
                        $(this).show();
                        p = $(this).offset();
                        length = $(this).width();
                    }
                });

                if ($("#rightStats").attr("maxline") > 1 && curlineInt < $("#rightStats").attr("maxline")) {
                    var pos = p.left + length - 20;
                    $("#rightStats").offset({ left: pos })
                }
                $("#ULTypes li").first().click();
                $('#select_stats_popup').hide();
                e.preventDefault();
            });
            AccountType = $('#nameDiv2').attr("AccountType");
        }
    })
}

function GetEntityCommonConnectionsUsersByCommonInterestId(EntityId, entityTypeId, userId) {

    $("#CommonInterestsLoading").show();
    var runId = $("#analysenav .selected").attr('runId');
    $("#resTypeTable").empty();
    xhr2 = $.ajax({
        type: "GET", dataType: "json", cache: true, contentType: "application/json;charset=utf-8", url: 'handlers/Analyse.ashx', async: true,
        data: { grouping: 'GetEntityCommonConnectionsUsersByCommonInterestId', privRun: privRun, EntityId: EntityId, entityTypeId: entityTypeId, userId: userId, runId: runId }, success: function (data) {
            var ind = 0;
            $.each(data, function (index) {
                var scoreImg = ''
                $("#hiddenSelectActive option").each(function () {
                    if (data[index].userId == $(this).val())
                        scoreImg = $(this).attr('scoreImg');
                });
                var myImgDisplay = '';
                if (scoreImg != '') {
                    myImgDisplay = "<img height='15px' style=' padding: 0px; margin: 0px;'height:15px;width:15px' src=" + scoreImg + " />";
                }
                else {
                    myImgDisplay = "";
                }
                var liId = "resTypeTable" + index;

                var url = "http://www.facebook.com/profile.php?id=" + data[index].userId;
                var socialnetwork = $("#analysenav .selected").attr('socialnetwork');
                if (socialnetwork == "Twitter")
                    url = "https://twitter.com/" + data[index].nameId;
                $("#resTypeTable").append(" <li nameId='" + data[index].nameId + "'  scoreImg='" + scoreImg + "'  entityName='" + data[index].name + "'  SmallImagePath='" + data[index].SmallImagePath + "'  entityid=" + data[index].userId + " url='" + url + "' id=" + liId + " imgUrl=" + data[index].SmallImagePath + "><table><tr><td><a class='commonLilink' href='#' title='" + data[index].name + "' > " + data[index].name + " </a></td><td>" + myImgDisplay + "</td></tr></table></li>");
                liId = '#' + liId;

                $(liId).click(function (e) {
                    var linkId = "#" + $(this).attr("id") + " a";
                    $("#resTypeTable .active").removeClass("active");
                    $(linkId).addClass("active");
                    var imgUrl = $(this).attr('imgUrl');
                    $("#restypeImg").attr('src', imgUrl);
                    var myUrl = $(this).attr('url');
                    $("#lnkrestype").attr('href', myUrl);
                    e.preventDefault();
                });

            });

            $("#resTypeTable li").first().click();
            var type = $("#ULfriendship").attr("type")
            if (type == "common") {
                fillFriendsUser("common"); ;
            }
            type = $("#ULmsgUsers").attr("type");
            if (type == "common")
                fillMsgUser(type)
            $("#CommonInterestsLoading").hide();

        }
    })
}


function LoadPr30Tbl(EntityId, entityTypeId, ConnectionType) {
    $("#Pr30Tbl").empty();
    $("#hiddeninteress_content").empty();
    $("#CommonInterestsLoading").show();
    var runId = $("#analysenav .selected").attr('runId');
    xhr = $.ajax({
        type: "GET", dataType: "json", cache: true, contentType: "application/json;charset=utf-8", url: 'handlers/Analyse.ashx', async: true,
        data: { grouping: 'LoadCommon', privRun: privRun, EntityId: EntityId, entityTypeId: entityTypeId, runId: runId, ConnectionType: ConnectionType }, success: function (data) {
            var ind = 0;
            $('#interess_panel').show();
            $('#interess_content').show();

            $('#interess_chart').show();
            if (data.length > 0) {
                drawChart3(data);
                $.each(data, function (index) {
                    $("#hiddeninteress_content").append(" <option  nameId=" + data[index].nameId + " typeid=" + data[index].typeid + " userid=" + data[index].userId + "   img=" + data[index].SmallImagePath + "  totalgroup=" + data[index].totalgroup + "   value='" + data[index].name + "'>" + data[index].name + "</option>");
                });
                $('#lnkinterestImg').show();
                $('#resTypeTable').show();
                $('#restypeImg').show();
                var EntityId = $("#analysenav .selected").attr('EntityId');
                var entityTypeId = $("#analysenav .selected").attr('entityTypeId');
                var img = $(this).attr("img");
                var url = "";
                $('#interestImg').attr('src', data[0].SmallImagePath);
                $("#interess_content .half h5 .counter").html(data[0].totalgroup);
                $("#interess_content .half h5 .interess").html(data[0].name);
                var userId = data[0].userId;
                var typeid = data[0].typeid;
                var socialnetwork = $("#analysenav .selected").attr('socialnetwork');
                if (socialnetwork == "Twitter")
                    url = "https://twitter.com/" + data[0].nameId;

                else if ((typeid == "Page") || typeid == "4" || typeid == "3" || (typeid == "Group")) {
                    url = "http://www.facebook.com/group.php?gid=" + userId;
                }
                else {
                    url = "http://www.facebook.com/profile.php?id=" + userId;
                }
                $("#lnkinterestImg").attr("href", url);
                GetEntityCommonConnectionsUsersByCommonInterestId(EntityId, entityTypeId, userId)
            }
            else {

                $('#lnkinterestImg').hide();
                $('#commonH5').html('');
                $('#commonCounter').html('');

                $('#interess_chart').html("<div align='center' style='width:70%;color:red'>No Data</div>");
                $('#resTypeTable').hide();
                $('#restypeImg').hide();
            }
            $("#CommonInterestsLoading").hide();
        }
    })
}

function exportInfluanceInfoStatistics(grouping, exportType) {

    var names = '';
    var isInfoParams = ''
    $("#select_stats_popup .checked").each(function (index) {
        var name = $(this).attr('name');
        var isInfoParam = $(this).attr('isInfoParam');
        if (names == '')
            names = name;
        else
            names += "," + name;
        if (isInfoParams == '')
            isInfoParams = isInfoParam;
        else
            isInfoParams += "," + isInfoParam;

    });
    var socialnetwork = $("#analysenav .selected").attr('socialnetwork');
    var EntityId = $("#analysenav .selected").attr('EntityId');
    var entityTypeId = $("#analysenav .selected").attr('entityTypeId');
    var runId = $("#analysenav .selected").attr('runId');
    var SelectUsers = $("#SelectUsers").val();
    var href = 'Handlers/ExportToExcelHandler.ashx?EntityId=' + EntityId + '&entityTypeId=' + entityTypeId + '&names=' + names + '&SelectUsers=' + SelectUsers + '&runId=' + runId + '&isInfoParams=' + isInfoParams + '&grouping=' + grouping + '&socialnetwork=' + socialnetwork + "&privRun=" + privRun + "&exportType=" + exportType;
    window.location.href = href;
}

function GetInfluanceInfoStatistics(name, TypesDataId, isInfoParam) {
    var EntityId = $("#analysenav .selected").attr('EntityId');
    var entityTypeId = $("#analysenav .selected").attr('entityTypeId');
    $.ajax({
        type: "GET", dataType: "json", cache: true, contentType: "application/json;charset=utf-8", url: 'handlers/Analyse.ashx', async: true,
        data: { grouping: 'GetEntityInfoStatistics', privRun: privRun, name: name, TypesDataId: TypesDataId, isInfoParam: isInfoParam, EntityId: EntityId, entityTypeId: entityTypeId }, success: function (data) {
            ind = 0;
            $("#hiddeninteress_content").attr('clicked', 'false');
            drawChart2(data);
            var Total = 0;
            $("#hiddenSElectInfo").empty();
            $.each(data, function (index) {
                var rowId = "option" + index;
                $("#hiddenSElectInfo").append("<option infoName=" + name + " isInfoParam=" + isInfoParam + " Entityid=" + data[index].id + "  value='" + data[index].value + "'    id=" + rowId + "></option>");
            });
            if (data.length > 0) {
                $("#select_stats_panel .half h5 .counter").html(data[0].totalGroup);
                $("#select_stats_panel .half h5 .interess").html(data[0].value);
                var curname = $("#hiddeninteress_content").attr('curname');
                $("#userInfoListImg").show();
                GetCat2(data[0].id, curname, isInfoParam);
            }
            else {
                $("#select_stats_panel .half h5 .counter").html('');
                $("#select_stats_panel .half h5 .interess").html('');
                $("#userInfoList").empty();
                $("#userInfoListImg").hide();

            }
        }
    })
}


function GetCat2(liSelectedId, infoType, isprminfo) {
    var tmp = 0;
    var entityTypeId = $("#analysenav .selected").attr('entityTypeId');
    var EntityId = $("#analysenav .selected").attr('EntityId');
    $.ajax({
        type: "GET", dataType: "json", cache: true, contentType: "application/json;charset=utf-8", url: 'handlers/Analyse.ashx', async: true,
        data: { grouping: 'GetEntitiesConnectionsByInfoType', privRun: privRun, liSelectedId: liSelectedId, infoType: infoType, isprminfo: isprminfo, entityTypeId: entityTypeId, EntityId: EntityId },
        success: function (data) {
            $("#userInfoList").empty();
            $.each(data, function (index) {
                var scoreImg = ''
                $("#hiddenSelectActive option").each(function () {
                    if (data[index].EntityId == $(this).val())
                        scoreImg = $(this).attr('scoreImg');
                });
                var myImgDisplay = '';
                if (scoreImg != '') {
                    myImgDisplay = "<img height='15px' style=' padding: 0px; margin: 0px;'height:15px;width:15px' src=" + scoreImg + " />";
                }
                else {
                    myImgDisplay = "";
                }
                var myname = data[index].EntityName.substring(0, 15);
                var myId = "userInfoList" + index;
                $("#userInfoList").append("   <li scoreImg='" + scoreImg + "' entityname='" + data[index].EntityName + "' entityId='" + data[index].EntityId + "' imgPath='" + data[index].ImagePath + "'  id=" + myId + "> <table style='padding: 0px; margin: 0px;height:17px;width:100%'><tr ><td style='width:80%;' overflew:hidden'><a style='float:left' href='#' title='User' >" + myname + "</a></td><td><a style='padding: 0px; margin: 0px;height:15px;float:left'>" + myImgDisplay + " </a></td></tr></table> </li> ");
                myId = '#' + myId;
                $(myId).click(function (e) {

                    var linkId = "#" + $(this).attr("id") + " a";
                    $("#userInfoList .active").removeClass("active");
                    // var ww = $("#resTypeTable li").first();
                    $(linkId).addClass("active");
                    var entityId = ($(this).attr('entityId'));
                    url = "http://www.facebook.com/profile.php?id=" + entityId;
                    var imgPath = $(this).attr("imgPath");
                    $("#userInfoListImg").attr('src', imgPath);
                    $("#userInfoListHref").attr('href', url);
                    e.preventDefault();
                });
            });
            $("#userInfoList li").first().click();
            if (data.length > 0) {
                $("#Hidden1").attr('more', data[0].more);
            }
            var type = $("#ULfriendship").attr("type")
            if (type == "stats") {
                fillFriendsUser("stats"); ;
            }
            type = $("#ULmsgUsers").attr("type");
            if (type == "common") {
                fillMsgUser(type)
            }
        }
    })
}

function engClick() {

    $(".langHeb").attr("Class", "langEng");
    $("#divTour").attr("Lang", "Eng");
    $("#divTour").removeClass("Heb");
    $("#divTour").addClass("Eng");
    $(".close").html("Close");
    $("#tourBack").html("Back");
    $("#tourNext").parent().removeClass("left");
    $("#tourNext").parent().addClass("right");
    $("#tourBack").parent().removeClass("right");
    $("#tourBack").parent().addClass("left");
    var curInfo = $("#tourBack").attr("value");
    var curInfoInt = parseInt(curInfo);

}

function hebClick() {

    $(".langEng").attr("Class", "langHeb");
    $("#divTour").attr("Lang", "Heb");
    $("#divTour").removeClass("Eng");
    $("#divTour").addClass("Heb");
    $(".close").html("סגור");
    $("#tourBack").html("הקודם");
    $("#tourNext").parent().removeClass("right");
    $("#tourNext").parent().addClass("left");
    $("#tourBack").parent().removeClass("left");
    $("#tourBack").parent().addClass("right");
    var curInfo = $("#tourBack").attr("value");
    var curInfoInt = parseInt(curInfo);

}

function tourMove(curInfo, curInfonext) {

    $("#divTourScoreImage").hide();
    $(".headerinfo2").hide();
    $("#divDontShow").hide();
    $("#tourBack").attr("value", curInfonext);
    $(".tourInfo").hide();
    $('#divTour').removeClass('top');
    $('#divTour').removeClass('bottom');
    $("#divTour").removeClass("first");
    $("#divTour").removeClass("rightArrow");
    $("#divTour").removeClass("leftArrow");
    $("#divTour").removeClass("down");
    var Lang = $("#divTour").attr("Lang");
    $(".tourInfo").hide();
    $("#divTour").removeClass("first");

    if (curInfo == "0") {
        $("#tourback").hide();
        $("#divTour").addClass("first");
        $("#divTour").css({ width: 600 });
        if (Lang == 'Heb') {
            if ($("#Hidden1").attr("gender") == "male")
                $("#headerInfo").text("	ברוך הבא  למערכת SONANA! ");
            else if ($("#Hidden1").attr("gender") == "female")
                $("#headerInfo").text("	 ברוכה הבאה למערכת SONANA! ");
            else
                $("#headerInfo").text("	ברוך/ ברוכה הבא/ה למערכת SONANA! ");

            $("#tourNext").html("מה הציון ההשפעה שלי?");

            $("#info1").show();
        }
        else {
            if ($('#Hidden1').attr("privRun") == "1") {
                $("#headerInfo").html("The system is scanning your profile");
                $("#info1Eng").show();
                $("#tourNext").html("What's my Sonana Page Rank?");
            }
            else {
                $("#headerInfo").text("	The system is analyzing the requested page ");
                $("#info1EngUser").show();
                $("#tourNext").html("What is the Page Score?");
            }
            $("#divTour").css({ width: 820 });
        }
        var leftpos = $(window).width() / 2 - $("#divTour").width() / 2;
        var p = $("#pageInfo2").offset();
        var topDiv = p.top + 50;
        $("#divTour").offset({ top: topDiv, left: leftpos });
        Sonana.scrollTo(p.top - 200);
        if ($("#divTour").attr("showTour") == "true")
            $("#tourNext").hide();
        else
            $("#tourNext").show();
    }
    else if (curInfo == "1") {
        $('#divTour').addClass('up');
        if (($("#SelectUsers").val() == "Active" && $("#tblInfluencesBody tr").size() == 0) || ($("#SelectUsers").val() == "All" && $("#tblActiveBody tr").size() == 0)) {
            if (Lang == 'Heb') {
                $("#headerInfo").text("	הדוח שלך מוכן! ");
                $("#infoEmpty").show();
                $("#tourNext").html(" ספר לי עוד! ");
                $("#divTour").css({ width: 650 });
            }
            else {
                $("#divTour").css({ width: 670 });
                $("#headerInfo").text("	Your report is ready! ");
                $("#infoEmptyEng").show();
                $("#tourNext").html("Tell me more!");
            }
        }
        else {
            if (Lang == 'Heb') {
                $("#info3").show();
                $("#headerInfo").text("	הדוח שלך מוכן! ");
                $("#tourNext").html("מה הפעילות שלי?");
                $("#divTour").css({ width: 700 });
            }
            else {
                $("#divTour").css({ width: 770 });
                $("#info3Eng").show();
                if ($('#Hidden1').attr("privRun") == "1") {
                    $("#spanProfile").html("Your rating reflects your impact on Facebook, the quality of your profile ");
                    $("#spanRelationships").html("and the relationships that you have with other influencers.");
                    $("#headerInfo").text("	Your report is ready! ");
                    $("#spanScore").html("Your Sonana score is:");
                    $("#spanRated").html("You are rated as:");
                    $("#tourNext").html("What's my activity?");
                }
                else {

                    $("#spanProfile").html("The rating reflects the page impact on Facebook, the quality of the profile");
                    $("#spanRelationships").html("and the engagement with members and influencers.");
                    $("#spanScore").html("Sonana score is:");
                    $("#headerInfo").text("	The report is ready! ");
                    $("#spanRated").html("The page is rated as:");
                    $("#tourNext").html("What is the page activity?");
                }
                $("#headerinfo2").html("Follow the instructions to uncover the full experience and reveal all of the information.");
                $(".headerinfo2").show();
            }
        }
        var p = $("#diagnosisDiv").offset();
        topDiv = p.top + $("#diagnosisDiv").height();
        leftpos = p.left - $("#divTour").width() / 2 - 100;
        $("#divTour").offset({ top: topDiv, left: leftpos });
        $("#divTour").addClass("rightArrow");
        $("#divTour").addClass("arrow_box");

        Sonana.scrollTo(p.top - 50);
    }
    else if (curInfo == "2") {
        $('#divTour').addClass('up');
        if (Lang == 'Heb') {
            $("#divTour").css({ width: 540 });
            $("#headerInfo").text(" הנה הפעילות שלך בתקופת החיפוש");
            $("#infoRank").show();
            $("#tourNext").html(" הראה לי את הפוסטים הכי מדוברים ");
        }
        else {
            $("#divTour").css({ width: 725 });
            if ($('#Hidden1').attr("privRun") == "1") {
                $("#headerInfo").text("	Following is a summary of your activities during the search period ");
                $("#RankEng").show();
                $("#tourNext").html("Show my highest ranking Posts");
            }
            else {
                $("#headerInfo").text("	Following is a summary of the activities in the page during the search period ");
                $("#divTour").css({ width: 820 });
                $("#RankEngUser").show();
                $("#tourNext").html("Show the highest ranking Posts");
            }
        }

        var p = $("#infoChart1").offset();
        var topDiv = p.top + $("#infoChart1").height();
        var leftpos = p.left - $("#infoChart1").width() / 2 - 100;
        $("#divTour").offset({ top: topDiv, left: leftpos });
        $("#divTour").addClass("arrow_box");
        Sonana.scrollTo(p.top - 50);
    }
    else if (curInfo == "3") {
        $("#divTour").css({ width: 770 });
        $('#divTour').addClass('down');
        if (Lang == 'Heb') {
            $("#infoPost").show();
            $("#headerInfo").text(" כאן ניתן לראות אילו פוסטים עוררו הכי הרבה תגובות");
            $("#tourNext").html(" ספר לי על המשפיעים אצלי ");

        }
        else {
            if ($('#Hidden1').attr("privRun") == "1") {
                $("#headerInfo").text(" This is where you can see the posts that generated the most reactions ");
                $("#tourNext").html("Tell me about my Influencers!");
                $("#infoPostEng").show();
            }
            else {
                $("#headerInfo").text(" This is where the posts that generated the most reactions are presented ");
                $("#tourNext").html("Go to Influencers");
                $("#infoPostEngUser").show();
            }
            $("#divTour").css({ width: 770 });
        }
        var p = $("#PostsDiv").offset();
        var topDiv = p.top - $("#divTour").height() - $("#pr30_usersHead").height() - 10;
        var leftpos = p.left + ($("#PostsDiv").width() / 2) - $("#divTour").width() / 2 - 60;
        $("#divTour").offset({ top: topDiv, left: leftpos });
        $("#divTour").addClass("arrow_box");
        Sonana.scrollTo(p.top - $("#divTour").height() - 100);
    }
    else if (curInfo == "4") {
        $('#divTour').addClass('down');
        if (Lang == 'Heb') {
            $("#divTour").css({ width: 577 });
            $("#headerInfo").text(" סוננה ניתחה את המשפיעים והפעילים בפרופיל שלך ");
            $("#infoInfluencers").show();
            $("#tourNext").html(" כן – הראה לי עוד נתונים ");
        }
        else {

            if ($('#Hidden1').attr("privRun") == "1") {
                $("#headerInfo").text(" Sonana analyzed the influencers and active friends on your profile");
                $("#tourNext").html("Yes – show me more!");
                $("#infoInfluencersEng").show();
            }
            else {
                $("#headerInfo").text(" Sonana analyzed the influencers and active friends in the page");
                $("#tourNext").html("Show Influencers common interests");
                $("#infoInfluencersEngUser").show();
            }
            $("#divTour").css({ width: 785 });

        }
        var p = $("#TrTop").offset();
        var topDiv = p.top - $("#divTour").height() - $("#TrTop").height() - 15;
        var leftpos = p.left + ($("#TrTop").width() / 2) - $("#divTour").width() / 2;
        p = $("#divTblFriends").offset();
        $("#divTour").offset({ top: topDiv, left: leftpos });
        $("#divTour").addClass("arrow_box");
        Sonana.scrollTo(topDiv - 150);
    }
    else if (curInfo == "5") {
        $('#divTour').addClass('down');
        if (Lang == 'Heb') {
            $("#divTour").css({ width: 770 });
            $("#headerInfo").text("  אלו הם הקבוצות, הדפים ותחומי העניין בהם ניתן למצוא את החברים הפעילים שלך  ");
            $("#infoInteress").show();
            $("#tourNext").html(" הראה לי את מפת המשפיעים שלי ");
        }
        else {
            if ($('#Hidden1').attr("privRun") == "1") {
                $("#headerInfo").text(" These are the groups, pages and areas of interest of your active friends");
                $("#tourNext").html("Show me my Influencers Map!");
            }
            else {
                $("#headerInfo").text(" These are the groups, pages and areas of interest of the page Influencers");
                $("#tourNext").html("Show Influencers Link Analysis");
            }
            $("#infoInteressEng").show();
            $("#divTour").css({ width: 770 });
        }
        var p = $("#interess_panel").offset();
        var topDiv = p.top;
        var leftpos = p.left + ($("#interess_chart").width() / 2) - $("#divTour").width() / 2 + 100;
        $("#divTour").offset({ top: topDiv - 70, left: leftpos + 150 });
        $("#divTour").addClass("arrow_box");
        Sonana.scrollTo(p.top - 200);
    }
    else if (curInfo == "6") {
        $("#link_analysis").show();
        $('#divTour').addClass('down');
        var p = $("#link_analysis").offset();
        var topDiv = p.top - 307;
        if (Lang == 'Heb') {
            $("#divTour").css({ width: 670 });
            $("#headerInfo").text('זו "מפת קשרי המשפיעים" שלך ');
            $("#InfoAnaliseRun").show();
            $("#tourNext").html(" ספר לי עוד! ");
            topDiv = p.top - 273;
        }
        else {
            if ($('#Hidden1').attr("privRun") == "1") {
                $("#headerInfo").text('This is your "link analysis"');
                $("#InfoAnaliseRunEng").show();
            }
            else {
                $("#headerInfo").text('This is the Influencers "link analysis"');
                $("#InfoAnaliseRunEngUser").show();
            }
            $("#divTour").css({ width: 670 });
            $("#tourNext").html("Tell me more!");
        }
        var leftpos = p.left + ($("#link_analysis").width() / 2) - $("#divTour").width() / 2;
        $("#divTour").offset({ top: topDiv, left: leftpos });
        $("#divTour").addClass("arrow_box");
        $("#divTour").addClass("leftArrow");
        Sonana.scrollTo(p.top - 310);
        $("#activelink_analysis").click();
    }

    else if (curInfo == "7") {
        $("#divDontShow").show();
        $("#divTour").addClass("first");
        if (Lang == 'Heb') {
            $("#headerInfo").text(" ניתן לנתח כל דף/פרופיל/קבוצה שנרצה!! ");
            $("#MoreInfo").show();
            $("#tourNext").html(" סיום ");
            $("#divTour").css({ width: 730 });
        }
        else {
            if ($('#Hidden1').attr("privRun") == "1") {

                $("#headerInfo").text(" Analyze any page/profile/group that you want to!!");
                $("#MoreInfoEng").show();
            }
            else {
                $("#headerInfo").text("Additional features available on a paid version");
                $("#MoreInfoEngUser").show();
            }
            $("#tourNext").html("Finish");
            $("#divTour").css({ width: 910 });
        }
        var leftpos = $(window).width() / 2 - $("#divTour").width() / 2;
        var p = $("#newanalyse").offset();
        var topDiv = p.top;
        $("#divTour").offset({ top: topDiv + 57, left: leftpos });
        $("#divTour").addClass("arrow_box");
        p = $("#sonana").offset();
        Sonana.scrollTo(p.top);
    }
    else if (curInfo == "8") {
        $("#tourBack").hide();
        $("#tourNext").hide();
        $("#divTour").addClass("rightArrow");
        $("#divTour").css({ width: 300 });
        if (Lang == 'Heb') {
            $("#headerInfo").text("צריך עזרה שוב?");
            $("#infoFinish").show();
        }
        else {
            $("#headerInfo").text("Need help again?");
            $("#infoFinishEng").show();
        }
        var p = $("#AnalyseInfo").offset();
        var topDiv = p.top;
        $("#divTour").offset({ top: topDiv + 57, left: p.left - 210 });
        $("#divTour").addClass("arrow_box");
        p = $("#sonana").offset();
        Sonana.scrollTo(p.top + 30);
        setTimeout(function () { $("#divTour .close").click(); return true; }, 6500);
    }
}

function loadLinkAnalysis(InfluanceOnly) {
    var SelectUsers = $("#SelectUsers").val();
    var Entitytype = $("#analysenav .selected").attr('entityTypeId');
    var EntityId = $("#analysenav .selected").attr('EntityId');
    var runId = $("#analysenav .selected").attr('runId');
    var level = $("#runInfo").attr('level');
    if (Entitytype == '7' || Entitytype == 'CSV') // 
        SelectUsers = "Influencers";
    var rowNum = $("#analysenav .selected").attr('rowInd');
    var proId = $("#Hidden1").attr('proId');
    var TimeLinePeriod = $("#analysepopup").attr("TimeLinePeriod");
    var activeUsersNum = $("#Hidden1").attr('activeUsersNum');
    var socialnetwork = $("#analysenav .selected").attr('socialnetwork');
    $("#LinkAnalysisloading").show();
    $("#frameAnalysis").attr("src", "");
    $.ajax({
        type: "GET", dataType: "json", cache: true, contentType: "application/json;charset=utf-8",
        url: 'handlers/Analyse.ashx',
        data: { grouping: 'loadLinkAnalysis', privRun: privRun, runId: runId, EntityId: EntityId, entityTypeId: Entitytype, InfluanceOnly: InfluanceOnly, SelectUsers: SelectUsers, rowNum: rowNum, proId: proId, socialnetwork: socialnetwork, TimeLinePeriod: TimeLinePeriod, activeUsersNum: activeUsersNum },
        success: function (data) {
            $("#framediv").attr('clicked', 'false');
            $("#link_analysis").show();
            $("#frameAnalysis").attr("src", "Handlers/Flex/AnaTxtFlexLA.html");
            $("#LinkAnalysisloading").hide();
        }
    })
}
var t = 0;
function loadPopular(runId, EntityId, Entitytype, InfluanceOnly, SelectUsers) {
    $('#loadingFriends').show();
    var activeAvgScore = $("#Hidden1").attr('activeAvgScore');
    var socialnetwork = $("#analysenav .selected").attr('socialnetwork');
    var score = $("#analysenav .selected").attr('score');
    if ($("#SelectUsers").val() == "All")
        curTable = "#tblActiveBody";
    else
        curTable = "#tblInfluencesBody";
    if (SelectUsers == "Active" && (Entitytype == '7' || Entitytype == 'CSV')) // 
        SelectUsers = "Influencers";
    $(curTable).empty();
    var activeUsersNum = $("#Hidden1").attr('activeUsersNum');
    var TimeLinePeriod = $("#Hidden1").attr('TimeLinePeriod');
    var isCategory = $("#Hidden1").attr('isCategory');
    var combine = $("#Hidden1").attr('combine');
    if ((isCategory == "true" || combine == "true") && $("#analysenav .selected").attr('rowInd') == "-1")
        TimeLinePeriod = $("#analysenav .selected").attr('TimeLinePeriod');


    if ($("#SelectUsers").attr("first") != "false")
        $("#finder").html("<select id='DDL2' class='userDropdown'></select><img src='assets/img/big-blue-right-arrow.png' /> <select id='DDL1' class='userDropdown'></select><a id='LnkFindPath' href='#' class='find'>Find</a> <img id='pathLoading' style='display:none' src='assets/img/loading.gif' />");
    rowNum = 0;
    $.ajax({
        type: "GET", dataType: "json", cache: true, contentType: "application/json;charset=utf-8", async: true,
        url: 'handlers/Analyse.ashx',
        data: { grouping: 'loadPopular', privRun: privRun, runId: runId, EntityId: EntityId, SelectUsers: SelectUsers, Entitytype: Entitytype, InfluanceOnly: InfluanceOnly, socialnetwork: socialnetwork, activeAvgScore: activeAvgScore, TimeLinePeriod: TimeLinePeriod, activeUsersNum: activeUsersNum },
        success: function (data) {
            $("#mainTbl").show();
            var socialnetwork = $("#analysenav .selected").attr('socialnetwork');
            var level = $("#runInfo").attr('level');
            if (socialnetwork == "Twitter") {
                $("#TrTop").html(" <th colspan='6' style='border-bottom: solid 1px #333333' width='78%'>TWITTER</th><th colspan='2' width='22.5%'style='border-bottom: solid 1px #333333' >SCORE</th>");
                $("#headerTR").html("<th id='ThName' width='23.5%'>NAME</th><th id='Thfacebook' width='11%'>FOLLOWERS</th><th id='Thposts' width='11%'>TWEETS</th><th id='ThComments' width='11%'>REPLIES</th><th id='ThShare' width='11%'>RETWEETS</th><th id='ThLikes' width='11%'>FAVORITES</th><th id='ThIfluencesScoring' width='11%'>INFLUENCE</th><th id='ThIActiveScoring' width='11%'>ACTIVE</th> ");
            }
            else if (level == '0') {
                $("#TrTop").html(" <th colspan='5' style='border-bottom: solid 1px #333333' >FACEBOOK</th><th colspan='2' style='border-bottom: solid 1px #333333' >SCORE</th>");
                $("#headerTR").html("<th id='ThName' width='40%'>NAME</th><th id='Thposts' width='12%'>POSTS</th><th id='ThComments' width='10%'>COMMNETS</th><th id='ThShare' width='10%'>SHARE</th><th id='ThLikes' width='10%'>LIKES</th><th id='ThIfluencesScoring' width='10%'>INFLUENCE</th><th id='ThIActiveScoring'>ACTIVE</th> ");
                $("#hiddenThfacebook").remove();
                $("#optionInfluence").remove();
                $("#InfluenceTable").hide();
                $("#ActiveTable").show();
            }
            else {
                $("#TrTop").html("<th style='border-bottom: solid 1px #333333'  colspan='6'>FACEBOOK</th><th style='border-bottom: solid 1px #333333' colspan='2' >SCORE</th>");
                $("#headerTR").html("<th id='ThName' width='23.5%'>NAME</th><th id='Thfacebook' width='11%'>USERS</th><th id='Thposts' width='11%'>POSTS</th><th id='ThComments' width='11%'>COMMNETS</th><th id='ThShare' width='11%'>SHARES</th><th id='ThLikes' width='11%'>LIKES</th><th id='ThIfluencesScoring' width='11%'>INFLUENCE</th><th id='ThIActiveScoring' width='11%'>ACTIVE</th>  ");
            }
            $('#headerTR th').click(function (e) {
                $(".thActive").removeClass("thActive");
                $(this).addClass("thActive");
                var thname = $(this).attr("id");
                thSortClick(thname);
            });
            var myind = 1;
            var tt = "";
            var tt2 = "";
            var curTable = "";
            if ($("#SelectUsers").val() == "Active") {
                curTable = "#tblInfluencesBody";
            }
            else {
                $("#SelectUsers").attr("activeload", "true");
                curTable = "#tblActiveBody";
            }
            var maxScoreName = '';
            var maxScoreGender = '';
            var maxActiveScore = 0;
            $.each(data, function (index) {
                var myId = "tblActiveTr" + index;
                if ((data[index].EntityTypeId == "-1" && $("#SelectUsers").val() == "Active") || (data[index].EntityTypeId == "-1" && level == 0) || (data[index].EntityTypeId == "-1" && $("#analysenav .selected").attr('socialnetwork') == "Twitter")) {

                }
                else {
                    var url = "";
                    if ($("#analysenav .selected").attr('socialnetwork') == "Twitter") {
                        url = "https://twitter.com/" + data[index].NameID;
                    }
                    else {
                        if ((data[index].EntityTypeId == "Page") || data[index].EntityTypeId == "4" || data[index].EntityTypeId == "3" || (data[index].EntityTypeId == "Group")) {
                            url = "http://www.facebook.com/group.php?gid=" + data[index].EntityID;
                        }
                        else {
                            url = "http://www.facebook.com/profile.php?id=" + data[index].EntityID;
                        }
                    }
                    var myid = "aId" + index;
                    var namelength = 11;
                    var curTable = "";
                    if ($("#SelectUsers").val() == "Active") {
                        if (data[index].EntityID != $("#InfoDiv").attr('EntityId') && parseInt(data[index].activeScore) > maxActiveScore) {
                            maxActiveScore = data[index].activeScore;
                            maxScoreName = data[index].Name;
                            maxScoreGender = data[index].Gender;
                        }
                        curTable = "#tblInfluencesBody";
                    }
                    else {
                        $("#SelectUsers").attr("activeload", "true");
                        curTable = "#tblActiveBody";
                    }
                    if ($(curTable).attr("pagesource") == "Analyse") {
                        namelength = 16;
                        if ($("#runInfo").attr('level') == "0")
                            namelength = 38;
                    }
                    var name = data[index].Name.substring(0, namelength);
                    if (data[index].Name.length > namelength)
                        name = name + "...";
                    if (data[index].EntityID != $("#InfoDiv").attr('EntityId') && data[index].EntityTypeId != "-1") {
                        var socialnetwork = $("#analysenav .selected").attr('socialnetwork');

                        var commentLink = '';
                        var postlink = '';
                        if (socialnetwork == "Twitter") {
                            if (data[index].Posts != '0')
                                postlink = "<a action='Tweet' style='width:80%;cursor: hand; cursor: pointer;width:108px; color: blue ;text-decoration: none;' class='posts' herf='#' >" + data[index].Posts + "</a>";
                            else
                                postlink = data[index].Posts;
                            if (data[index].Comments != '0')
                                commentLink = "<a  action='Reply' style='width:80%;cursor: hand; cursor: pointer;width:108px; color: blue ;text-decoration: none;' class='posts' herf='#' >" + data[index].Comments + "</a>";
                            else
                                commentLink = data[index].Comments;
                        }
                        else {
                            if (data[index].Posts != '0')
                                postlink = "<a action='Post' style='width:80%;cursor: hand; cursor: pointer;width:108px; color: blue ;text-decoration: none;' class='posts' herf='#' >" + data[index].Posts + "</a>";
                            else
                                postlink = data[index].Posts;
                            if (data[index].Comments != '0')
                                commentLink = "<a  action='Comment' style='width:80%;cursor: hand; cursor: pointer;width:108px; color: blue ;text-decoration: none;' class='posts' herf='#' >" + data[index].Comments + "</a>";
                            else
                                commentLink = data[index].Comments;
                        }
                        var InfluencesScoreImageHtml = "";
                        if (data[index].InfluencesScoreImage != '')
                            InfluencesScoreImageHtml = " <img  src='" + data[index].InfluencesScoreImage + "'/>";
                        var myclass = '';
                        if (data[index].activeScoreImg == 'assets/img/sonana-icon.png')
                            myclass = 'red';
                        else if (data[index].activeScoreImg == 'assets/img/sonana-icon-blue.png')
                            myclass = 'blue';
                        else
                            myclass = 'orange';
                        friendBtnId = 'friendBtn' + index;
                        $("#ULfriendship").append(" <li ><img style='width:33px;height:32px' src='" + data[index].SmallImagePath + "'  /><span title='" + data[index].Name + "' class='username'>" + data[index].Name + "</span><i class='" + myclass + "'></i><a NameID='" + data[index].NameID + "'  username='" + data[index].Name + "' userId='" + data[index].EntityID + "' id=" + friendBtnId + " href='#' class='btn'>+ Add friend</a></li> ");
                        friendBtnId = '#' + friendBtnId;
                        $(friendBtnId).click(function (e) {
                            var myClass = $(this).attr('class');
                            if (myClass == 'btn disable')
                                return false;
                            $(this).addClass('disable');
                            e.preventDefault();
                            var myId = $(this).attr('id');
                            friendRequest(e, myId);
                        });
                        rowNum++;
                        if (socialnetwork == "Twitter") {
                            $(curTable).append("<tr rowNum=" + rowNum + " EntityName='" + data[index].Name
                            + "' EntityId='" + data[index].EntityID + "' SmallImagePath='" + data[index].SmallImagePath + "' NameID='" + data[index].NameID + "' myclass=" + myclass
                            + " EntityType=" + data[index].EntityTypeId + " ><td width='23.5%'><div style='width:95%' class='checkbox'><div class='el'><input type='checkbox' name='select' value=''></div><span style='width:85%'  title='" + data[index].Name + "'   ><a href='" + url + "' target='_blank'><img style='width:42px;height:33px;border-style: none' src='" + data[index].SmallImagePath + "'/></a> "
                            + name + " </span></div></td><td width='11%'>"
                            + data[index].Friends + "</td> <td width='11%'>"
                            + postlink + "</td><td  width='11%'>"
                            + commentLink + "</td><td width='11%'>"
                            + data[index].Share + "</td> <td width='11%'>" +
                                +data[index].Likes + "</td><td width='11%;'><span style='display:none'>" + data[index].InfluencesScore + "</span>" + InfluencesScoreImageHtml + "</td> <td width='12%' ><span style='display:none'>" + data[index].activeScore + "</span><img  src='" + data[index].activeScoreImg + "'/></td> </tr>")
                        }
                        else {

                            var tdClass = '';
                            if (data[index].TargetId != '' && data[index].TargetId != undefined)
                                tdClass = 'target'
                            if (level == '0') {
                                if (rowNum == 1) {
                                    $(".tourMostActive").html(" &nbsp;" + data[index].Name);
                                    if (data[index].Gender == "Male")
                                        $("#mostInfluenceSpan").html('הוא נמצא כחבר המשפיע ביותר שלך. ');
                                    else if (data[index].Gender == "Female")
                                        $("#mostInfluenceSpan").html('היא נמצאה כחברה המשפיעה ביותר שלך. ');

                                }

                                $(curTable).append("<tr class=" + tdClass + " url=" + url + " activeScoreImg=" + data[index].activeScoreImg + "       RunsSource=" + data[index].RunsSource + "    TargetId=" + data[index].TargetId + "  rowNum=" + rowNum + " EntityName='" + data[index].Name
                                + "' EntityId='" + data[index].EntityID + "' SmallImagePath='" + data[index].SmallImagePath + "' NameID='" + data[index].NameID + "' myclass=" + myclass
                                + " EntityType=" + data[index].EntityTypeId + " ><td  width='40%'><div class='checkbox'><div class='el'><input type='checkbox' name='select' value=''></div><span title='" + data[index].Name + "'   ><a href='" + url + "' target='_blank'><img style='width:42px;height:33px;border-style: none' src='" + data[index].SmallImagePath + "'/></a> "
                                + name + " </span></div></td> <td width='12%'>"
                                + postlink + "</td><td  width='10%'>"
                                + commentLink + "</td><td width='10%'>"
                                + data[index].Share + "</td><td width='10%'>" +
                                +data[index].Likes + "</td> <td width='10%;'><span style='display:none'>" + data[index].InfluencesScore + "</span>" + InfluencesScoreImageHtml + "</td><td  ><span style='display:none'>" + data[index].activeScore + "</span><img  src='" + data[index].activeScoreImg + "'/></td> </tr>")
                            }
                            else {
                                if (rowNum == 1) {
                                    $(".tourMostActive").html("  &nbsp; " + data[index].Name);
                                    if (data[index].Gender == "Male") {
                                        $("#mostInfluenceSpan").html('הוא נמצא כחבר המשפיע ביותר שלך. ');
                                        $("#mostInfluenceSpanEng").html('He appears to be your most influential friend. ');
                                    }
                                    else if (data[index].Gender == "Female") {
                                        $("#mostInfluenceSpanEng").html('she appears to be your most influential friend. ');
                                        $("#mostInfluenceSpan").html('היא נמצאה כחברה המשפיעה ביותר שלך. ');
                                    }
                                }
                                $(curTable).append("<tr class=" + tdClass + " url=" + url + " activeScoreImg=" + data[index].activeScoreImg + "  RunsSource=" + data[index].RunsSource + "  TargetId=" + data[index].TargetId + "   rowNum=" + rowNum + " EntityName='" + data[index].Name
                                + "' EntityId='" + data[index].EntityID + "' SmallImagePath='" + data[index].SmallImagePath + "' NameID='" + data[index].NameID + "' myclass=" + myclass
                                + " EntityType=" + data[index].EntityTypeId + " ><td  width='23.5%'><div class='checkbox'><div class='el'><input type='checkbox' name='select' value=''></div><span title='" + data[index].Name + "'   ><a href='" + url + "' target='_blank'><img style='width:42px;height:33px;border-style: none' src='" + data[index].SmallImagePath + "'/></a>"
                                + name + " </span></div></td><td width='11%'>"
                                + data[index].Friends + "</td><td width='11%'>"
                                + postlink + "</td><td width='11%'>"
                                + commentLink + "</td><td width='11%'>"
                                + data[index].Share + "</td><td width='11%'>" +
                                +data[index].Likes + "</td><td width='11%'><span style='display:none'>" + data[index].InfluencesScore + "</span>" + InfluencesScoreImageHtml + "</td><td width='11%' ><span style='display:none'>" + data[index].activeScore + "</span><img  src='" + data[index].activeScoreImg + "'/></td> </tr>");
                            }
                        }
                    }
                    myid = '#' + myId;
                    var myname = data[index].Name.substring(0, 12);
                    if ($("#SelectUsers").attr("first") != "false") {
                        var influencenum = data.length - 1;
                        $("#hiddenSelectActive").append("<option value= " + data[index].EntityID + " scoreImg=" + data[index].InfluencesScoreImage + "></option>");
                        $("#DDL2").append(" <option value=" + data[index].EntityID + " data-image=" + data[index].SmallImagePath + " style='height: 38px'>" + myname + "</option>");
                        $("#DDL1").append(" <option value=" + data[index].EntityID + " data-image=" + data[index].SmallImagePath + " style='height: 38px'>" + myname + "</option>");
                    }
                }
            });
            Sonana.init();
            $(".SpanActive").html(maxScoreName);
            if (maxScoreGender == "Male") {
                $("#spanActiveGender").html("&nbsp; היה הכי פעיל בדף שלך .");
            }
            else
                if (maxScoreGender == "Female")
                    $("#spanActiveGender").html("&nbsp;היתה הכי פעילה בדף שלך.");

            $('#loadingFriends').hide();
            $('.posts').click(function (e) {
                e.preventDefault();
                var action = $(this).attr('action');
                var entityId = $(this).parent().parent().attr('entityId');
                var runId = $("#analysenav .selected").attr('runId');
                setPostsEntities(entityId, runId, action);
                return false;
            });

            if ($("#SelectUsers").val() == "Active") {
                var tblSize = $("#tblInfluencesBody tr").size();
                $("#SelectUsers option:selected").text(tblSize + ' Influencers ');
                $("#InfluanceNum").html(tblSize + '  Influencers ');
                $("#influenceFound").text(tblSize);
                $(".infoUserNum").html(" יש " + tblSize + " משפיעני פייסבוק אצלך בפרופיל תכף נספר לך מי הם.");
                $(".infoUserNumEng").html(" You have " + tblSize + " Facebook influencers on your profile - we will soon tell you who they are");
                $(".infoUserNumEngUser").html(" Sonana found " + tblSize + " Facebook influencers in this page ");

            }
            if (level == "0") {
                $("#influenceTD").remove();
                $("#InfluanceNumTD").remove();
            }
            if ($("#SelectUsers").attr("first") != "false") {
                $('#LnkFindPath').click(function (e) {
                    FindPaths();
                    e.preventDefault();
                    return false;
                });
                try {
                    $(".userDropdown").msDropDown();

                }
                catch (e) {
                    alert(e.message);
                }

                $("#SelectUsers").attr("first", "false");
            }
            if ($("#SelectUsers").val() == "All") {
                $("#InfluenceTable").hide();
                $("#ActiveTable").show();
                if (tblActiveBody.offsetHeight > tableDiv.offsetHeight) {
                    $("#tblActiveBody").css("width", "99%");
                    $("#headerTbl").css("width", "98.5%");
                    $("#Table1").css("width", "98.5%");
                }
            }
            else {
                $("#ActiveTable").hide();
                $("#InfluenceTable").show();
                if (tblInfluencesBody.offsetHeight > tableDiv.offsetHeight) {
                    $("#tblInfluencesBody").css("width", "99%");
                    $("#headerTbl").css("width", "98.5%");
                    $("#Table1").css("width", "98.5%");
                }
                else {
                    $("#tblInfluencesBody").css("width", "100%");
                    $("#headerTbl").css("width", "100%");
                    $("#Table1").css("width", "100%");
                }
            }
            if ($("#SelectUsers").val() == "All") {
                $("#tblInfluencesBody tr").each(function (index) {
                    var entityId = $(this).attr('entityid');
                    var ttt = $(this).find("td:eq(6)").html();

                    $("#tblActiveBody tr").each(function (index) {
                        var curentityId = $(this).attr('entityid');
                        if (curentityId == entityId) {
                            $(this).find("td:eq(6)").html(ttt);
                        }
                    });
                });

                $("#tblActiveBody .checkbox").click(Sonana.clickCheckbox);
                $("#tblActiveBody .checkbox").click(Sonana.checkIfRowsSelected);
                $("#tblActiveBody tr").click(Sonana.selectRowNewAnalyseUsersTable);
                var table2 = $("#ActiveTable").stupidtable({
                    "int-desc": function (a, b) {
                        return parseInt(b, 10) - parseInt(a, 10);
                    }
                });
                table2.on("aftertablesort", function (event, data) {
                    var dir = $.fn.stupidtable.dir;
                    $(".arrow").remove();
                    var arrow;
                    if ($(".thActive").attr('id') == "ThName")
                        arrow = data.direction === dir.ASC ? "&uarr;" : "&darr;";
                    else
                        arrow = data.direction === dir.ASC ? "&darr;" : "&uarr;";
                    $(".thActive").append('<span style="float:right;left:3px;" class="arrow">&nbsp;&nbsp;' + arrow + '</span>')
                });
            }
            else {
                var table = $("#InfluenceTable").stupidtable({
                    "int-desc": function (a, b) {
                        return parseInt(b, 10) - parseInt(a, 10);
                    }
                });
                table.on("aftertablesort", function (event, data) {
                    var dir = $.fn.stupidtable.dir;
                    $(".arrow").remove();
                    var arrow;
                    if ($(".thActive").attr('id') == "ThName")
                        arrow = data.direction === dir.ASC ? "&uarr;" : "&darr;";
                    else
                        arrow = data.direction === dir.ASC ? "&darr;" : "&uarr;";
                    $(".thActive").append('<span style="float:right;left:3px;" class="arrow">&nbsp;&nbsp;' + arrow + '</span>')
                });
                $("#tblInfluencesBody .checkbox").click(Sonana.clickCheckbox);
                $("#tblInfluencesBody .checkbox").click(Sonana.checkIfRowsSelected);
                $("#tblInfluencesBody tr").click(Sonana.selectRowNewAnalyseUsersTable);
            }

            var AccountType = $('#nameDiv2').attr("AccountType");
            var InfoCookie = $('#nameDiv2').attr("getInfoCookie");
            if (InfoCookie != "true" && AccountType == "Basic") {
                if ($("#divTour").attr("showTour") == "true") {
                    $("#divTour").attr("showTour", "false");
                    $("#divTourScoreImage").show();
                    $("#tourNext").show();
                    $("#divTour").show()
                    tourMove(1, 1);

                }
            }
        }
    })
}

function thSortClick(thname) {
    var hiddenTHName = '';
    if ($("#SelectUsers").val() == "All")
        hiddenTHName = "#hidden" + thname;
    else
        hiddenTHName = "#hiddenInfluence" + thname;
    $(hiddenTHName).click();
}

function setPostsEntities(EntityId, runId, action) {
    $("#frameAnalysis").attr("src", "");
    $.ajax({
        type: "GET", dataType: "json", cache: false, contentType: "application/json;charset=utf-8",
        url: 'handlers/Posts.ashx',
        data: { grouping: 'setPostsEntities', privRun: privRun, runId: runId, EntityId: EntityId },
        success: function (data) {
            var SelectUsers = $("#SelectUsers").val();
            var rowind = $("#analysenav .selected").attr('rowind')
            var proid = $("#analysenav .selected").attr('proid')
            var categoryPro = 0;
            var isCategory = $("#Hidden1").attr('isCategory');
            if (isCategory == "true")
                categoryPro = $("#Hidden1").attr('proId');
            var privRun = $("#Hidden1").attr('privRun');
            if (privRun == undefined || privRun == "")
                privRun = "0";

            if ($("#Hidden1").attr('combine') != "true")
                window.location.href = "Posts.aspx?rowInd=" + rowind + "&proId=" + proid + "&action=" + action + "&SelectUsers=" + SelectUsers + "&categoryPro=" + categoryPro + "&privRun=" + privRun;
            else
                window.location.href = "Posts.aspx?rowInd=" + rowind + "&proId=" + proid + "&action=" + action + "&SelectUsers=" + SelectUsers + "&categoryPro=" + categoryPro + "&privRun=" + privRun + "&prosId=" + $("#Hidden1").attr('proId');
        }
    })
}
var combinefirst = true;
function getCombineRow(isCategory) {

    $("#pageInfo2").show();
    $("#aboutthird").show();
    if (!combinefirst)
        return;
    combinefirst = false;
    var proId = "";
    proId = $("#Hidden1").attr('proid');

    $.ajax({
        type: "GET", dataType: "json", cache: true, contentType: "application/json;charset=utf-8", async: false,
        url: 'handlers/Analyse.ashx',
        data: { grouping: 'getCombineRow', privRun: privRun, proId: proId, isCategory: isCategory },
        success: function (data) {

            if (data.length > 0) {
                var name = data[0].ProjectName;
                if (isCategory != "true")
                    name = "Sonana Reports";
                $("#analysenav").prepend(" <li id='combine'  FriendsNum =" + data[0].FriendsNum + "   ScoreImage=" + data[0].ScoreImage + "  Score=" + data[0].Score + " TimeLinePeriod='" + data[0].TimeLinePeriod + "'  Image='" + data[0].Image + "'  url='" + data[0].url + "'  EntityName='" + data[0].EntityName + "' Friends='" + data[0].Friends + "' name='" + data[0].ProjectName + "' style='padding: 4px 8px;margin:0px ' runId=" + data[0].RunId + "  entityTypeId=" + data[0].EntityTypeId + " EntityId=" + data[0].EntityId + "    proId=" + data[0].ProId + " rowind='-1'><a href='#' title='Project Summary'><table ><tr><td>Project Summary</td> </tr></table></a></li>");

                $('#combine').click(function () {
                    if (xhr != undefined)
                        xhr.abort();
                    if (xhr2 != undefined)
                        xhr2.abort();
                    if (xhr3 != undefined)
                        xhr3.abort();
                    if (xhr4 != undefined)
                        xhr4.abort();
                    if (xhr5 != undefined)
                        xhr5.abort();
                    if (xhr6 != undefined)
                        xhr6.abort();
                    $('#divProjectName').html(" " + $("#combine").attr('name'));
                    $('#divProjectName').show();
                    $('#tdImg').hide();
                    $('#tdAbout').hide();
                    $('#tdRank').hide();
                    $('#tdCombine').show();
                    var entityid = $("#combine").attr('entityid'); ;
                    var res = entityid.split(",");
                    var url = $("#combine").attr('url'); ;
                    var resurl = url.split(",");
                    var entityname = $("#combine").attr('entityname'); 
                    var resEntityname = entityname.split(",");
                    var Image = $("#combine").attr('Image'); ;
                    var resImage = Image.split(",");
                    var entitytypeid = $("#combine").attr('entitytypeid'); ;
                    var resentitytypeid = entitytypeid.split(",");
                    var TimeLinePeriod = $("#combine").attr('TimeLinePeriod'); ;
                    var resTimeLinePeriod = TimeLinePeriod.split(",");
                    var Friends = $("#combine").attr('FriendsNum'); ;
                    var resFriends = Friends.split(",");
                    var Score = $("#combine").attr('Score'); ;
                    var resScore = Score.split(",");
                    var ScoreImage = $("#combine").attr('ScoreImage'); ;
                    var resScoreImage = ScoreImage.split(",");
                    $('#combineAbout').show();
                    $('#combineAbout').html('');
                    $('#pageInfo2').html("");
                    var infoId = "infoCombine";
                    var infoIdind = 0;
                    var myhtml = "";
                    $('#tblCombineBody').html("<tr><td><h6>Name</h6></br></td><td><h6>Time Period</h6></br></td><td><h6>Users</h6></br></td><td><h6>Score</h6></br></td>><td><h6>Type</h6></br></td></tr>");
                    for (var i = 0; i < res.length; i++) {
                        if (resFriends[i] != "")
                            resFriends[i] += " Users";
                        if (resentitytypeid[i] == "1")
                            resentitytypeid[i] = "User";
                        else if (resentitytypeid[i] == "4")
                            resentitytypeid[i] = "Page";

                        else if (resentitytypeid[i] == "3")
                            resentitytypeid[i] = "Event";
                        else if (resentitytypeid[i] == "2")
                            resentitytypeid[i] = "Group";
                        else if (resentitytypeid[i] == "5")
                            resentitytypeid[i] = "Company";
                        $('#tblCombineBody').append("<tr><td><table><tr><td><a target='_blank'  href='" + resurl[i] + "'  ><img style='width:42px;height:33px;border-style: none' src='" + resImage[i] + "'> </a></td><td><span title='" + resEntityname[i] + "' >  " + resEntityname[i].substring(0, 20) + " </span></td></tr></table> </td> <td >" + resTimeLinePeriod[i] + "  </td><td>" + resFriends[i] + "</td><td> <span class='sonanaScore " + resScoreImage[i] + "' style='height: 20px;margin-top: 6px;width:50px;color:black;'>" + resScore[i] + " &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;</span></td><td >" + resentitytypeid[i] + "  </td></tr>");
                    }
                    $(".Articles-section").parent().hide();
                    $("#ULAddtoProject").hide();
                    $('#BtnRss').hide();
                    $('#linkMonitor').hide();
                    $("#interess_chart").hide();
                    $('#ShareScore').hide();
                    $('#sectionArticlepPanel').hide();
                    $('#DivSearch').hide();
                    $("#newanalyse_leftnav").show();
                    initAcountType();
                    var AccountType = $('#nameDiv2').attr("AccountType");
                    var combine = $("#Hidden1").attr("combine");
                    if (AccountType != "Basic") {

                        $('#export').show();
                        if (isCategory == "true") {
                            $('.pr03').attr("href", "pr30.aspx?rowInd=-1&proId=" + $("#Hidden1").attr('proid') + "&categoryPro=" + $("#Hidden1").attr('proId') + "&privRun=" + privRun);
                            $('.pr03').show();
                        }
                         
                    }
                    var name = data[0].ProjectName;
                    if ($('#Hidden1').attr("isCategory") != "true")
                        name = "Sonana Reports";

                    $('#runInfo').html("Project name: " + name + " " + data[0].reportsNum + " reports");
                    $("#pagenameSpan").html("");
                    var totalActive = $(this).attr('totalActive');
                    var totalFriendsNum = $(this).attr('totalFriendsNum');
                    $("#InfoDiv").html("<article><div class=''>  <div class='row informations'> <table style='height: 30px'><tbody><tr><td  valign='middle'>   <img id='projectScoreImage' style='display:none;height: 16px;width:16px' src=''></td> <td id='tdScoring' style='display:none' valign='middle'>   Scoring&nbsp;&nbsp; </td><td><img src='img/i-active-users.png'> </td><td><span id='activeUsersLbl'> Active Users </span> &nbsp;&nbsp; </td><td><img src='img/i-users.png'> </td><td><span id='usersLbl'>  </span> &nbsp;&nbsp; </td> <td id='influenceTD' valign='middle'>    <img src='img/i-infolines.png'> </td> <td  id='InfluanceNumTD' valign='middle'> <span id='InfluanceNum'>  </span>  &nbsp;&nbsp;&nbsp; </td><td id='infoDivTd' valign='middle'>  </td><td id='InfoDivType' valign='middle'>Project</td></tr></tbody></table></div> </div> </article>");
                    $("#tourBack").attr("value", "0");
                    $("#divTour").hide();
                    $("#ULCommon li.selected").removeClass("selected");
                    $("#SelectUsers").attr("first", "true");
                    $("#SelectUsers").attr("activeload", "false");
                    $("#SelectUsers").html("<option id='optionInfluence' value='Active' selected='selected' name='Active'> </option> <option id='optionActive' value='All' name='All'></option>");
                    clearTimeout(myTimeout);
                    clearTimeout(myTimeout2);
                    var proId = $("#Hidden1").attr('proId');
                    var rowind = $(this).attr('rowind');
                    $("#analysenav li").each(function (index) {
                        $(this).removeClass('selected');
                    });
                    $(this).attr('class', 'selected');
                    $("#SelectUsers").val('Active');
                    $("#InfluenceTable").show();
                    $("#ActiveTable").hide()
                    var socialnetwork = 'Facebook';
                    var EntityId = $(this).attr('EntityId');
                    var entityTypeId = $(this).attr('EntityTypeId');
                    var influenceOnly = 'true';
                    var runId = $(this).attr('runId');
                    $("#usersLbl").html($(this).attr('Friends'))
                    var selectedusers = "Active";
                    $("#InfluenceTable").hide();
                    $("#ActiveTable").show();
                    GetTotalActivitiesByRunIds(runId, socialnetwork);
                    loadPopular(runId, EntityId, entityTypeId, influenceOnly, $("#SelectUsers").val());
                    BuildInfoTypes(EntityId, entityTypeId);
                    LoadPr30Tbl(EntityId, entityTypeId, "Likes");
                    xhr4 = GetPostsByProfileId(0, runId, 0, 0, '');
                    $('#chart_sample').hide();
                    $('#divStats').hide();
                    $('#ULTypes').html('');

                });
            }
        }
    })
}

var initFirst = true;

var offset = -1;
var RunningTimeout;
var myTimeout;
var myTimeout2;
function init(proId, rowInd) {

    $("#link_analysis").hide();
    var projectName = "";
    $("#paths").hide();
    $('#divStats').hide();
    var isCategory = $("#Hidden1").attr('isCategory');
    $.ajax({
        type: "GET", dataType: "json", cache: true, contentType: "application/json;charset=utf-8", async: false,
        url: 'handlers/Analyse.ashx',
        data: { grouping: 'init', privRun: privRun, proId: proId, rowInd: rowInd, isCategory: isCategory },
        success: function (data) {

            var myproId = $("#Hidden1").attr('proId');
            if (data.length == 1 && data[0].userId == "-1") {
                Logout();
                return;
            }
            var isCategory = $("#Hidden1").attr('isCategory');
            var combine = $("#Hidden1").attr('combine');
            if (isCategory == "true" || combine == "true")
                getCombineRow(isCategory);

            $('.paths').hide();
            $("#processingDiv").hide();
            if (data.length == 0) {

                $("#AnalyseInfo").hide();
                $("#linkMonitor").hide();
                var isCategory = $("#Hidden1").attr('isCategory');
                if (isCategory == "true") {
                    var href = 'ProjectCategory.aspx';
                    window.location.href = href; ;
                }
                $('#processingDiv').show();
                clearTimeout(myTimeout2);
                clearTimeout(myTimeout);
                $('.pr03').attr("href", "#");
                $("#InfoDiv").hide();
                $("#mainDiv").hide();
                $('#entityImg').hide();
                $("#entityImg").attr('src', '');
                $("#infoChart1").hide();
                $("#postSection").hide();

                myTimeout2 = setTimeout(function () { checkStatus(myproId, 0) }, 5000);
            }
            else
                if (data.length <= rowInd) {
                    $('#processingDiv').show();
                    clearTimeout(myTimeout2);
                    clearTimeout(myTimeout);
                    $('.pr03').attr("href", "#");
                    $('.pr03').attr("class", "pr03");
                    $("#InfoDiv").hide();
                    $("#mainDiv").hide();
                    $("#postSection").hide();
                    myTimeout2 = setTimeout(function () { checkStatus(myproId, rowInd) }, 5000);
                    $('#pageInfo2').html('');
                    $('.analyse').attr('class', 'analyse');
                    $('#entityImg').hide();
                    $("#entityImg").attr('src', '');
                    $("#infoChart1").hide();
                    $("#pagenameSpan").html("<h6>" + $("#analysenav .selected").attr('name') + "</h6>")
                    return;
                }

            if (combine != "true" && isCategory != "true" && ($("#analysenav li").size() == (data.length) || $("#analysenav li.selected").size() == 0)) {
                $("#analysenav").html('');
                $("#infoChart1").show();
                $("#InfoDiv").show();
            }
            var isrunning = false;

            if ($("#Hidden1").attr("gender") == "male") {
                $('#infoInfluencersGender').html(' האם אתה מכיר את');
                $('#SpanActiveGender').html('  נסה בעצמך...&nbsp;');
            }
            else if ($("#Hidden1").attr("gender") == "female") {
                $('#infoInfluencersGender').html('   האם את מכירה את &nbsp;');
                $('#SpanActiveGender').html(' נסי בעצמך...&nbsp;');
            }

            $.each(data, function (index) {

                var influenceOnly = $("#InfoDiv").attr('influenceOnly');
                var myproId = $("#Hidden1").attr('proId');
                var name = data[index].Name.substring(0, 22);
                var curID = 'analysenav' + index;
                var trStatus = 'trStatus' + index;
                var tdSetting = "<i></i>";
                if (data[index].status != "Finished") {
                    tdSetting = "";
                    if (index != rowInd)
                        isrunning = true;
                }
                var AccountType = $('#nameDiv2').attr("AccountType");
                if (AccountType == "Basic")
                    tdSetting = "";

                if ($("#analysenav li").size() <= (data.length) || $("#analysenav li.selected").size() == 0) {
                    if (index == rowInd) {
                        $("#RelatedArticle").val(data[index].relatedArticle);
                        if (data[index].relatedArticle != "") {
                            $("#DivRelatedArticle").show();
                            $("#sectionRelatedArticlepPanel").show();
                            $("#RelatedArticleHeader").html("Articles about :" + data[index].relatedArticle);
                        }
                        else {
                            $("#DivRelatedArticle").hide();
                            $("#sectionRelatedArticlepPanel").hide();
                        }
                        if (data[index].parentProId == '' || data[index].parentProId == "0") {
                            $("#DivRelatedArticle").attr('relatedArticle', data[index].relatedArticle);
                            $("#divRelatedArticleSettings").show();
                            $("#hrRelatedArticle").show();
                            $("#divMoveToProject").show();
                            $("#SpanProject").attr("selectedPro", data[index].myProjectName)
                        }
                        else {
                            $("#DivRelatedArticle").attr('relatedArticle', '');
                            $("#hrRelatedArticle").hide();
                            $("#divMoveToProject").hide();
                        }
                    }
                    $("#analysenav").append(" <li  url ='" + data[index].url + "'   FriendsNum ='" + data[index].FriendsNum + "'   TimeLinePeriod ='" + data[index].TimeLinePeriod + "'   finished='" + data[index].finished + "'   level='" + data[index].level + "'   Image='" + data[index].Image + "'   MonitorId='" + data[index].MonitorId + "'   DerivedProjectId='" + data[index].DerivedProjectId + "'   Gender='" + data[index].Gender + "'  ProjCategoryId='" + data[index].ProjCategoryId + "'  SocialNetwork='" + data[index].SocialNetwork + "'    parentProId='" + data[index].parentProId + "'   name='" + data[index].Name + "' style='padding: 4px 8px;margin:0px ' status=" + data[index].status + " runId=" + data[index].runId + " influenceOnly=" + data[index].influenceOnly + " entityTypeId=" + data[index].Entitytype + " EntityId=" + data[index].EntityId + " id=" + curID + " status=" + data[index].status + " proId=" + data[index].proId + " rowind=" + index + "   class='analysenavLi'><a href='#' title='" + data[index].Name + "'><table ><tr id=" + trStatus + "><td>" + data[index].Name.substring(0, 20) + "</td><td> " + tdSetting + " </td> </tr></table></a></li>");
                    $("#InfoDiv").html("<article><div class=''>  <div class='row informations'> <table style='height: 30px'><tbody><tr><td  valign='middle'>   <img id='projectScoreImage' style='display:none;height: 16px;width:16px' src=''></td> <td  valign='middle'>   Scoring&nbsp;&nbsp; </td><td><img src='img/i-active-users.png'> </td><td><span id='activeUsersLbl'> Active Users </span> &nbsp;&nbsp; </td><td><img src='img/i-users.png'> </td><td><span id='usersLbl'>  </span> &nbsp;&nbsp; </td> <td id='influenceTD' valign='middle'>    <img src='img/i-infolines.png'> </td> <td  id='InfluanceNumTD' valign='middle'> <span id='InfluanceNum'>  </span>  &nbsp;&nbsp;&nbsp; </td><td id='infoDivTd' valign='middle'>  </td><td id='InfoDivType' valign='middle'></td></tr></tbody></table></div> </div> </article>");
                    var runId = $("#analysenav .selected").attr('runId');
                }
                curID = '#' + curID;
                var curTdStatus = "";
                if (data[index].status == 'Running') {
                    curTdStatus = "TdStatus" + index;
                    trStatus = '#' + trStatus;
                    $(trStatus).append("<td id='" + curTdStatus + "' style='width:20px'> <img style='width: 15px;'  alt='' src='assets/img/loading.gif'>  </td>");
                }
                $(curID).attr("TdStatus", curTdStatus);

            });

            if (isrunning == true) {

                clearTimeout(RunningTimeout);
                RunningTimeout = setTimeout(function () { chkRunningTabs() }, 10000);
            }
            offset = 0;
            var ind = 0;
            var curline = $("#left").attr("line");
            var curlineInt = parseInt(curline);

            $("#analysenav li").each(function (e) {
                if (offset < $(this).offset().top) {
                    offset = $(this).offset().top;
                    ind++;
                }
                $(this).attr("line", ind);
            });
            if (curlineInt > 1)
                $("#left").show();
            else
                $("#left").hide();

            if (ind > 1 && curlineInt < ind)
                $("#right").show();
            else
                $("#right").hide();
            $("#right").attr("maxline", ind);
            $("#analysenav li").each(function (e) {
                if (curlineInt != $(this).attr("line"))
                    $(this).hide();
                else
                    $(this).show();
            });
            $("#analysenav li i").click(function (e) {
                e.preventDefault();
                $(".selectTimeLine").val("Last Month");
                $(".divSelectPeriod").hide();
                $(".emptyToDate").html('&nbsp;');
                $(".emptyFromDate").html('&nbsp;');
                $("#analyse_settings_popup").show();
                e.preventDefault();
                return false;
            });
            $("#aboutthird").show();

            if (initFirst) {
                initFirst = false;
                $('.analysenavLi').click(function (e) {
                    if (xhr != undefined)
                        xhr.abort();
                    if (xhr2 != undefined)
                        xhr2.abort();
                    if (xhr3 != undefined)
                        xhr3.abort();
                    if (xhr4 != undefined)
                        xhr4.abort();
                    if (xhr5 != undefined)
                        xhr5.abort();
                    if (xhr6 != undefined)
                        xhr6.abort();
                    $('#divProjectName').hide();
                    clearTimeout(myTimeout);
                    clearTimeout(myTimeout2);
                    var proId = $("#Hidden1").attr('proId');
                    var rowind = $(this).attr('rowind');
                    $(".selected").removeClass('selected');
                    $(this).attr('class', 'selected');
                    $("#projectScoreImage").hide();
                    $("#activeUsersLbl").html("Active Users");
                    $("#usersLbl").html("Users");
                    $('#about').parent().show();
                    $("#ULAddtoProject").show();
                    $('#entityImg').show();
                    $('#ShareScore').show();
                    $('#diagnosisDiv').parent().show();
                    $('#sectionArticlepPanel').show();
                    $('#DivSearch').show();
                    $('#sectionRelatedArticlepPanel').hide();
                    $("#tourBack").attr("value", "0");
                    $("#divTour").hide();
                    $("#ULCommon li.selected").removeClass("selected");
                    $("#interess_chart").hide();
                    $("#SelectUsers").attr("first", "true");
                    $("#SelectUsers").attr("activeload", "false");
                    $("#SelectUsers").html("<option id='optionInfluence' value='Active' selected='selected' name='Active'> </option> <option id='optionActive' value='All' name='All'></option>");
                    $("#ULAddtoProject").hide();
                    $("#SelectUsers").val('Active');
                    $("#InfluenceTable").show();
                    $("#ActiveTable").hide();
                    $("#tdScoring").show();
                    $('#pageInfo2').html('');
                    $('#tblInfluencesBody').html('');
                    $('#combineAbout').hide();
                    $('.postLoading').show();
                    $('#tdCombine').hide();
                    $('#tdImg').show();
                    $('#tdAbout').show();
                    $('#tdRank').show();
                    $("#select_stats_popup").hide();
                    if ($(this).attr('rowind') == '0') {
                        $("#Hidden1").attr('privRun', $("#linkMonitor").attr('privRun'));
                    }
                    else {
                        $("#Hidden1").attr('privRun', '0')
                    }

                    if ($(this).attr('MonitorId') != "" && $(this).attr('MonitorId') != "0") {
                        $('#linkMonitor a').attr('href', "Monitor.aspx?MonitorId=" + $(this).attr('MonitorId') + "&proId=" + proId);
                        $('#linkMonitor').show();
                        $('#BtnRss').attr("class", "BtnRssActive");
                        $('#BtnRss').attr("title", "Remove from Monitor");
                    }
                    else {
                        $('#linkMonitor').hide();
                        $('#BtnRss').attr("title", "Add To Monitor");
                        $('#BtnRss').attr("class", "BtnRss");
                    }

                    var SocialNetwork = $(this).attr('SocialNetwork');
                    if (SocialNetwork == "Facebook") {

                        var currentEntityId = parseInt($('#Hidden1').attr("currentEntityId"));
                        var currnt = parseInt($(this).attr('EntityId'));

                        if (currentEntityId == currnt) {
                            $('#linkMonitor').hide();
                            getAbout(currentEntityId, $(this).attr('entityTypeId'));
                            $('#divAbout').show();
                            $('#pageInfo2').hide();
                        }
                        else {
                            $("#statsHr").show();
                            $("#select_stats_panel").show();
                            $('#divAbout').hide();
                            $('#pageInfo2').show();
                            var FileName = $(this).attr('EntityId') + ".html";
                            var tt = 'Content/' + FileName + ' .timelineReportContent_timelineNoSubheaderReport';
                            $('<div id="info22" class="infoDiv" style="text-decoration:none;" />').load(tt, function () {
                                $(this).appendTo('#pageInfo2');
                            });
                            if ($('#pageInfo2').html() == "") {
                                $('#pageInfo2').html('');
                                tt = 'Content/' + FileName + ' .detailframe';
                                $('<div id="info2" class="infoDiv" style="text-decoration:none;" />').load(tt, function () {
                                    $(this).appendTo('#pageInfo2');
                                });
                            }
                        }
                    }

                    if ($(this).attr("status") == 'Running') {
                        $(".ShareScore").hide();
                        $("#pageInfo2").html('');
                        $("#AnalyseInfo").hide();
                        $("#newanalyse_leftnav").hide();
                        $('.exportExcel').hide();
                        $('#linkMonitor').hide();
                        $('.pr03').hide();
                        var myPro = $(this).attr('proId');
                        var myrowInd = $(this).attr('rowInd');
                        var status = $("#analysenav .selected").attr('status');
                        $('.pr03').attr("href", "#");
                        $('.pr03').attr("class", "pr03");
                        $('#BtnRss').hide();
                        $('#processingDiv').show();
                        $("#mainDiv").hide();
                        $("#infoChart1").hide();
                        $('#entityImg').hide();
                        $("#entityImg").attr('src', $(this).attr('Image'));
                        $("#pagenameSpan").html("<h6>" + $(this).attr('name') + "</h6>")
                        $("#InfoDiv").hide();
                        checkStatus(myPro, rowInd)
                    }
                    else {

                        $(".ShareScore").show();
                        $('#BtnRss').show();
                        $('#export').show();
                        $('.exportExcel').show();
                        $("#newanalyse_leftnav").show();
                        $("#AnalyseInfo").show();
                        if ($(this).attr('entityTypeId') == "7" || $(this).attr('entityTypeId') == 'CSV') { //CSV Group
                            $(this).attr('entityTypeId', "7");
                            $("#postSection").hide();
                            $("#sectionArticlepPanel").hide();
                            $("#DivSearch").hide();
                        }
                        $("#infoChart1").show();
                        if ($(this).attr('level') == 0) {
                            $('#interess_content').hide();
                            $('#interess_contentHR').hide();
                            $('#interess_panel').hide();
                            $('#path-section-pointer').hide();
                            $('#finder').hide();
                            $('#select_stats_panel').hide();
                            $('#pathHr').hide();
                        }

                        $('#entityImg').show();
                        if (SocialNetwork != "Twitter")
                            $("#imgLink").attr('href', $(this).attr('url'));
                        $("#mainDiv").show();
                        var imgNetwork = "img/i-facebook.png";
                        var isCategory = $("#Hidden1").attr('isCategory');
                        if (SocialNetwork == "Twitter") {
                            $(".dropdown").hide();
                            $(".pr03").hide();
                            $("#PostHref a").html("More tweets and retweets");
                            $("#hPosts").html("Best Tweets:");
                            imgNetwork = "img/twitter.png";
                        }
                        else {
                            $(".dropdown").show();
                        }
                        $(".pr03").hide();
                        var entType = getType($(this).attr('entityTypeId'));
                        $("#InfoDivType").html(entType);
                        $("#InfoDivType").html($(this).attr('entityTypeId'));
                        $("#infoDivTd").html("<img src=" + imgNetwork + ">");
                        $("#usersLbl").html($(this).attr('FriendsNum') + ' Users');
                        $("#usersLbl").attr('FriendsNum', $(this).attr('FriendsNum'));
                        $("#InfoDiv").attr('influenceOnly', $(this).attr('influenceOnly'));
                        $("#InfoDiv").attr('entityTypeId', $(this).attr('entityTypeId'));
                        $("#entityImg").attr('src', $(this).attr('Image'));
                        $("#InfoDiv").attr('rowInd', rowInd);
                        $("#Hidden1").attr('runId', $(this).attr('runId'));
                        var proId = $(this).attr('proId');
                        $("#InfoDiv").attr('proId', proId);
                        var categoryPro = 0;

                        if (isCategory == "true")
                            categoryPro = $("#Hidden1").attr('proId');
                        $("#pagenameSpan").html("<h6>" + $(this).attr('name') + "</h6>")
                        $("#InfoDiv").attr('runId', $(this).attr('runId'));
                        $("#InfoDiv").attr('EntityId', $(this).attr('EntityId'));
                        $("#pagenameSpan").attr("name", $(this).attr('name'));
                        $("#spanTitleName").html("<strong>" + $(this).attr('name') + "</strong> <a href='#' title='New Project' class='newproject'>Add project</a> ");
                        $("#analysepopup").attr("level", $(this).attr('level'));
                        $("#analysepopup").attr("TimeLinePeriod", $(this).attr('TimeLinePeriod'));
                        $("#Hidden1").attr('TimeLinePeriod', $(this).attr('TimeLinePeriod'));
                        $("#analysepopup").attr("influenceOnly", $(this).attr('influenceOnly'));
                        $('#runInfo').html("<a style='cursor: default;' > Report update:" + $(this).attr('finished') + " Level: " + $(this).attr('level') + " Time Period:" + $(this).attr('TimeLinePeriod') + "</a>");
                        $("#runInfo").attr('level', $(this).attr('level'));
                        initAcountType()
                    }

                    var socialnetwork = $("#analysenav .selected").attr('socialnetwork');
                    if ($("#analysenav .selected").attr('status') != 'Running') {
                        var EntityId = $("#analysenav .selected").attr('EntityId');
                        var entityTypeId = $("#analysenav .selected").attr('entityTypeId');
                        var influenceOnly = $("#analysenav .selected").attr('influenceOnly');
                        var runId = $("#analysenav .selected").attr('runId');
                        var level = $("#runInfo").attr('level');
                        var ProjCategoryId = $("#analysenav .selected").attr('ProjCategoryId');
                        if (ProjCategoryId == "" || ProjCategoryId == "0")
                            $("#RemoveFromProject").hide();
                        else
                            $("#RemoveFromProject").show();
                        if (level != '0') {
                            var selectedusers = "Active";
                            $("#InfluenceTable").hide();
                            $("#ActiveTable").show();
                            GetTotalActivitiesByRunIds(runId, socialnetwork);
                            loadPopular(runId, EntityId, entityTypeId, influenceOnly, selectedusers);
                            BuildInfoTypes(EntityId, entityTypeId);
                            if (socialnetwork == "Twitter")
                                LoadPr30Tbl(EntityId, entityTypeId, "");
                            else
                                LoadPr30Tbl(EntityId, entityTypeId, "Likes");
                        }
                        else {
                            GetTotalActivitiesByRunIds(runId, socialnetwork);
                            $("#InfluenceTable").show();
                            $("#ActiveTable").hide();
                            loadPopular(runId, EntityId, entityTypeId, influenceOnly, 'All');
                        }
                        $('#chart_sample').hide();
                        $('#divStats').hide();
                        $('#ULTypes').html('');
                        initArticle();
                        if ($("#analysenav .selected").attr('entitytypeid') != "CSV" && $("#analysenav .selected").attr('entitytypeid') != "7") {
                            if (socialnetwork == "Twitter")
                                xhr4 = GetTweetsByProfileId(0, runId, 0, 0);
                            else
                                xhr4 = GetPostsByProfileId(0, runId, 0, 0, '');
                        }
                    }
                });
            }
        }
    })
}

function initAcountType() {

    var AccountType = $('#nameDiv2').attr("AccountType");
    if (AccountType == "Basic") {
        $('#linkMonitor').hide();
        $(".analyse").attr("title", "Actions available in advanced account");
        $('#BtnRss').attr("class", "BtnRssdisable");
        $('#BtnRss').attr("title", "Actions available in advanced account");
        $('.pr03').attr("href", "#");
        $('.pr03').attr("class", "pr03");
        $(".exportExcel").attr("class", "exportExcel disable");
        $(".download").attr("class", "download disable");
        $(".account").attr("class", "account disable");
        $(".dropdownImg").attr("src", "assets/img/arrow_gray.png");
        $('.disable').attr("title", "Actions available in in advanced account");
        $('.pr03').attr("title", "Actions available in in advanced account");
        $('#pathHr').hide();
        $('#pathSection').hide();
        $('.path-section').hide();
        $('#newanalyse_rightnav').show();
        $('#lnkAddArticle').show();
    }
    else {
        $('#newanalyse_rightnav').hide();
        $('.pr03').attr("class", "pr03 active");
    }


}

function getType(type) {

    if (type == "1")
        return "User";
    if (type == "4")
        return "Page";

    if (type == "3")
        return "Event";
    if (type == "2")
        return "Group";
    if (type == "5")
        return "Company";
    if (type == "6")
        return "Industry";
}

function chkRunningTabs() {

    var currentProjects = "";
    $("#analysenav li").each(function (index) {
        if ($(this).attr('class') != 'selected' && $(this).attr('status') != "Finished") {
            if (currentProjects == "")
                currentProjects = $(this).attr('proid');
            else
                currentProjects = currentProjects + "," + $(this).attr('proid')
        }
    });
    clearTimeout(RunningTimeout);
    if (currentProjects != "") {
        $.ajax({
            type: "GET", dataType: "json", cache: false, contentType: "application/json;charset=utf-8", async: true,
            url: 'handlers/Analyse.ashx',
            data: { grouping: 'chkRunningTabs', privRun: privRun, currentProjects: currentProjects },
            success: function (data) {
                var running = false;
                $.each(data, function (index) {
                    var currentPro = data[index].Id;
                    var currentStatus = data[index].data;
                    if (currentStatus != "Finished")
                        running = true;
                    $("#analysenav li").each(function (i) {
                        var TdStatus = $(this).attr("TdStatus");
                        TdStatus = "#" + TdStatus;
                        if (currentPro == $(this).attr('proid') && currentStatus != "Running" && $(this).attr('status') != "Finished") {
                            $(this).attr('status', "Finished")
                            $(TdStatus).remove();
                        }
                    });
                });
                if (running)
                    RunningTimeout = setTimeout(function () { chkRunningTabs() }, 10000);
            }
        })
    }
}

function initArticle() {
    var relatedArticle = $("#DivRelatedArticle").attr('relatedArticle');
    var TableNewsearcrelatedArticle = $("#TableNewsearch").attr('relatedArticle');
    if (relatedArticle != '' && TableNewsearcrelatedArticle != relatedArticle) {
        $("#TableNewsearch").attr('relatedArticle', relatedArticle);
        googleSearch('', '', relatedArticle, 0, '#TableNewsearchBody');
    }
    var pageName = $("#pagenameSpan").attr("name");
    $("#ArticleHr").html(' Articles about : ' + pageName);
  //  xhr6 = googleSearch('', '', pageName, 0, '#SearchTablebody');
    $(".Articles-section").parent().show();
}

function checkStatus(projId, rowInd) {

    $.ajax({
        type: "GET", dataType: "json", cache: false, contentType: "application/json;charset=utf-8",
        url: 'handlers/Analyse.ashx',
        data: { grouping: 'checkRunningStatus', privRun: privRun, projId: projId, rowInd: rowInd },
        success: function (data) {

            var AccountType = $('#nameDiv2').attr("AccountType");
            if ($("#divTour").attr("showTour") != "true") {
                var InfoCookie = $('#nameDiv2').attr("getInfoCookie");
                if (($('#Hidden1').attr("ProjectsNum") == "1" || $('#Hidden1').attr("privRun") == "1") && InfoCookie != "true") {
                    $("#tourNext").hide();
                    $("#tourBack").attr("value", "0");
                    $("#tourBack").hide();
                    $("#divTourScoreImage").hide();
                    $("#divTour").show();
                    $("#divTour").attr("running", "true");
                    var p = $(".content").offset();
                    var topDiv = $("#fbpages_panel").height() + 100;
                    $("#divTour").attr("showTour", "true");
                    if ($("#Hidden1").attr("locale") == "he_IL")
                        hebClick();
                    else
                        engClick();
                    tourMove(0, 0);
                }
            }
            clearTimeout(myTimeout);
            clearTimeout(myTimeout2);
            $.each(data, function (index) {
                if (data[index].data == 'Running')
                    myTimeout = setTimeout(function () { checkStatus(projId, rowInd) }, 5000);
                else {
                    $("#divTour").hide();
                    initFirst = true;
                    AnalizeInit(ex);

                }
            });
        }
    })
}


function exportWord() {
    $.ajax({
        type: "GET", dataType: "json", cache: false, contentType: "application/json;charset=utf-8", async: true,
        url: 'handlers/Analyse.ashx',
        data: { grouping: 'ExportWord', privRun: privRun },
        success: function (data) {
            var href = 'Handlers/ExportToWordHandler.ashx';
            window.location.href = href;
        }
    })
}
var totalActive = 0, totalFriendsNum = 0;
var currentScore = '';
var currnetDescription = '';
function GetTotalActivitiesByRunIds(runId, socialnetwork) {
    var TimeLinePeriod = $("#analysepopup").attr("TimeLinePeriod");
    var FriendsNum = $("#usersLbl").attr('FriendsNum');

    xhr5 = $.ajax({
        type: "GET", dataType: "json", cache: true, contentType: "application/json;charset=utf-8", async: true,
        url: 'handlers/Analyse.ashx',
        data: { grouping: 'GetTotalActivitiesByRunIds', privRun: privRun, runId: runId, socialnetwork: socialnetwork, TimeLinePeriod: TimeLinePeriod, FriendsNum: FriendsNum },
        success: function (data) {
            $.each(data, function (index) {

                $("#projectScoreImage").attr('src', data[index].ScoreImage);
                $("#projectScoreImage").attr("score", data[index].score);

                var cr = "'";
                if ($("#analysenav .selected").attr('id') != "combine") {
                    $("#diagnosisDiv").html("<ul style='padding-left:10px;'><li><span style='float:left'>•  &nbsp;&nbsp;	Sonana" + cr + "s Page Rank : " + data[index].score + " &nbsp;&nbsp;</span></li><li> &nbsp;&nbsp;<img id='diagnosisDivImage' style='float:left;height: 17px;width:17px' src='" + data[index].ScoreImage + "'></li><li style='padding-top:5px;'> <span>•  &nbsp;&nbsp;	Page Activity Score : " + data[index].ActivityScore + "</span></li><li style='padding-top:5px;'><span>•   &nbsp;&nbsp;	Posting Reactions Score  : " + data[index].PostsReactionScore + "</span></li><li style='padding-top:5px;'>  <span>•  &nbsp;&nbsp;	Engagement Score  : " + data[index].EngagementScore + "</span></li></ul>");
                    $("#projectScoreImage").show();
                }
                $("#divTourScoreImage").attr('src', data[index].ScoreImage);
                $("#Hidden1").attr('activeAvgScore', data[index].avgScore);
                var Subscriber = 0;
                var intSubscriber = parseInt(Subscriber);
                var Posts = data[index].Posts;
                var intPosts = parseInt(Posts);
                var likes = data[index].Likes;
                var intlikes = parseInt(likes);
                var Active = data[index].Users;
                var intActive = parseInt(Active);
                var comments = data[index].Comments;
                var share = data[index].Shares;
                var intShare = parseInt(share);
                var intComments = parseInt(comments);
                var socialnetwork = $("#analysenav .selected").attr('socialnetwork');
                $("#activeUsersLbl").html(intActive + ' Active Users');
                $("#spnUser").html(intActive + ' Users');
                $("#Hidden1").attr('activeUsersNum', Active);
                if (intActive >= 100)
                    $("#optionActive").text('100 Most Active');
                else
                    $("#optionActive").text(Active + '  Most Active');
                totalActive += intActive;
                totalFriendsNum += parseInt($("#usersLbl").attr('FriendsNum'));
                var usersLbl = $("#usersLbl").attr('FriendsNum');
                var result = parseInt(intActive / usersLbl * 100)
                $("#infoRank").html(Posts + " פוסטים  <br/><br/> " + likes + " לייקים <br/><br/> " + comments + " תגובות  <br/><br/>" + share + " שיתופים <br/><br/>   <span class='infoUserNum'  > </span>   <br/><br/> <span style='font-weight: bold; color: black;'>מה היו הנושאים בפעילות שעוררו עניין?  </span>");
                $("#RankEng").html(Posts + " Posts  <br/><br/> " + likes + " Likes <br/><br/>" + comments + " Comments <br/><br/> " + share + " Shares<br/><br/>   <span  class='infoUserNumEng'  > </span>   <br/><br/><span style='font-weight: bold; color: black;'>What posts in my activity generated the most reactions? </span>");
                $("#RankEngUser").html(Posts + " Posts  <br/><br/> " + likes + " Likes <br/><br/>" + comments + " Comments <br/><br/> " + share + " Shares<br/><br/>   <span  class='infoUserNumEngUser'  > </span>   <br/><br/><span style='font-weight: bold; color: black;'>What posts in my activity generated the most reactions? </span>");

                drawChart(intlikes, intPosts, intSubscriber, intComments, socialnetwork, intShare);

                var curScore = parseFloat(data[index].score);
                $("#influenceHeb").html("&nbsp;" + curScore + "&nbsp;");
                $("#influenceEng").html("&nbsp;" + curScore);


                var name = $("#analysenav .selected").attr('name');
                var Description = name + "is rated as:";
                if ($("#Hidden1").attr('privRun') == "1" || $("#Hidden1").attr('privRun') == "true")
                    Description = "I am rated as: ";

                if (curScore > 6.6) {
                    $("#ratedEng").html("&nbsp;" + "Opinion Leader");
                    $("#ratedHeb").html("&nbsp;" + "מוביל דעה");
                    currnetDescription = Description + '<b>  Opinion Leader' + '<b/>';
                }
                else if (curScore > 4.4) {
                    $("#ratedEng").html("&nbsp;" + "Influencer");
                    $("#ratedHeb").html("&nbsp;" + "משפיע");
                    currnetDescription = Description + '<b> Influencer' + '<b/>';
                }
                else if (curScore > 2.2) {
                    $("#ratedEng").html("&nbsp;" + "Active");
                    $("#ratedHeb").html("&nbsp;" + "פעיל");
                    currnetDescription = Description + '<b> Active' + '<b/>';
                }
                else {
                    $("#observer").html("&nbsp;" + "Observer");
                    $("#ratedHeb").html("&nbsp;" + "צופה");
                    currnetDescription = Description + '<b> Observer' + '<b/>';
                }
                if ($("#Hidden1").attr('privRun') == "1" || $("#Hidden1").attr('privRun') == "true")
                    currentScore = 'My Sonana Score is: <b>' + curScore + '<b/>';
                else {
                    currentScore = 'I analyzed the page: ' + name + ' , and it Sonana score is: <b>' + curScore + '<b/>';
                }
            });
        }
    })
}

function getTwitterProfileById(EntityId, runId) {
    $.ajax({
        type: "GET", dataType: "json", cache: false, contentType: "application/json;charset=utf-8", async: true,
        url: 'handlers/Analyse.ashx',
        data: { grouping: 'getTwitterProfileById', privRun: privRun, EntityId: EntityId, runId: runId },
        success: function (data) {
            $("#pageInfo2").html("");
            $("#pageInfo2").show();

            $.each(data, function (index) {
                $("#pageInfo2").html(" <strong>@" + data[index].ScreenName + "</strong><br/>" + data[index].Header + "<br/>" + data[index].Location + " - " + "<a target='_blank' href=" + data[index].WebSite + "> " + data[index].WebSite + " </a><br/> <br/><strong>" + data[index].Tweets + "</strong><span> Tweets</span>&nbsp;&nbsp;<strong>" + data[index].Following + "</strong><span> Following </span>&nbsp;&nbsp<strong>" + data[index].Followers + "</strong><span style='font-size: 15px;'> Followers </span>");
                $("#imgLink").attr('href', data[index].Url);
            });
        }
    })
}

function exportPDF() {
    $.ajax({
        type: "GET", dataType: "json", cache: false, contentType: "application/json;charset=utf-8", async: true,
        url: 'handlers/Analyse.ashx',
        data: { grouping: 'ExportPdf', privRun: privRun },
        success: function (data) {
            window.open('Pdf/myPdf.pdf', '_blank')
        }
    })
}

function getAbout(EntityId, entityTypeId) {
    $.ajax({
        type: "GET", dataType: "json", cache: true, contentType: "application/json;charset=utf-8",
        url: 'handlers/Analyse.ashx',
        data: { grouping: 'getAbout', privRun: privRun, EntityId: EntityId, entityTypeId: entityTypeId },
        success: function (data) {
            $("#ulAbout").html('');
            $.each(data, function (index) {
                var paramValue = data[index].paramValue;
                if (data[index].paramValue.length > 100) {
                    paramValue = paramValue.substring(0, 100);
                    paramValue += "...";
                }
                $("#ulAbout").append("<li><div title='" + data[index].paramValue + "' style='padding-bottom: 5px;'><span style='font-size:15px;float:left'>•  &nbsp;&nbsp; " + data[index].paramName + " : </span><br/>&nbsp;&nbsp;" + paramValue + "</div></li>");
            });
        }
    })
}

function exportExcel(grouping, exportType) {
    var socialnetwork = $("#analysenav .selected").attr('socialnetwork');
    var runId = $("#analysenav .selected").attr('runId');
    var EntityId = $("#analysenav .selected").attr('EntityId');
    var entityTypeId = $("#analysenav .selected").attr('entityTypeId');
    var SelectUsers = $("#SelectUsers").val();
    if (SelectUsers == "Active" && (entityTypeId == '7' || entityTypeId == 'CSV')) //  // CSV Upload
        SelectUsers = "Influencers";
    var TimeLinePeriod = $("#Hidden1").attr('TimeLinePeriod');
    var isCategory = $("#Hidden1").attr('isCategory');
    var combine = $("#Hidden1").attr('combine');
    if (isCategory == "true" || combine == "true")
        TimeLinePeriod = $("#analysenav .selected").attr('TimeLinePeriod');

    var influenceOnly = $("#analysenav .selected").attr('influenceOnly');
    var ConnectionType = $("#ULCommon li.selected").attr('connectiontype');
    var href = 'Handlers/ExportToExcelHandler.ashx?runId=' + runId + '&EntityId=' + EntityId + '&entityTypeId=' + entityTypeId + '&SelectUsers=' + SelectUsers + '&grouping=' + grouping + '&socialnetwork=' + socialnetwork + '&ConnectionType=' + ConnectionType + "&privRun=" + privRun + "&exportType=" + exportType;
    window.location.href = href;
}
