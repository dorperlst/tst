jQuery(document).ready(function ($) {
    $('#btnLogin').click(function (e) {
        e.preventDefault();
        var userName = $('#userName').val();
        var userPassword = $('#userPassword').val();
        var strength = CheckPassword(userPassword);

        $.ajax({
            type: "GET", dataType: "json", cache: false, contentType: "application/json;charset=utf-8", async: true,
            url: 'handlers/Handler.ashx',
            data: { grouping: 'Login', userName: userName, userPassword: userPassword },
            success: function (data) {
                //                $.each(data, function (index) {
                //                    
                //                });
                // alert(data);
                //                if (data == "false")
                //                    window.location.href = "WebForm1.aspx";
            }
        })
    });
});


function CheckPassword(password) {
    var strength = new Array();
    strength[0] = "Blank";
    strength[1] = "Very Weak";
    strength[2] = "Weak";
    strength[3] = "Medium";
    strength[4] = "Strong";
    strength[5] = "Very Strong";
    var score = 1;

    if (password.length < 1)
        return strength[0];
    if (password.length < 4)
        return strength[1];
    if (password.length >= 8)
        score++;
    if (password.length >= 10)
        score++;
    if (password.match(/\d+2/))
        score++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/))
        score++;
    if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,£,(,)]/))
        score++;
    return strength[score];

}
