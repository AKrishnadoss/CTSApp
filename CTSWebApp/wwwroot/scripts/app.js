
function onLoginClick(){
    window.location = "/logon/login";
}

function onLogoutClick(){
    console.log('logout clicked');
    var tokenElement = $("#hdnToken");
    tokenElement.text("");
    var emailElement = $("#hdnEmail");
    emailElement.text("");
    var userNameElement = $("#hdnUserName");
    userNameElement.text("");

    var loggedInAs = $("#loggedInAs");
    loggedInAs.text("");
    $("#loginLink").show();
    $("#logoutLink").hide();

    localStorage.clear();
    window.location = "/";
}

/*
$('#menuBar .navbar-nav a').on('click', function () {
    $('#menuBar .navbar-nav').find('li.active').removeClass('active');
    $(this).parent('li').addClass('active');
});

*/