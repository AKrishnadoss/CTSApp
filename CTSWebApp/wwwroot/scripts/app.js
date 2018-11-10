
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
    var expiresByElement = $("#hdnExpires");
    expiresByElement.text("");

    var loggedInAs = $("#loggedInAs");
    loggedInAs.text("");
    $("#loginLink").show();
    $("#logoutLink").hide();

    localStorage.clear();
    window.location = "/";
}
