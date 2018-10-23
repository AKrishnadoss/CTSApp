$(document).ready(function () {

    var btnCancel = $("#btnCancel");
    btnCancel.on("click", function () {
        console.log("Cancel clicked");
        window.location = "/";
    });

});