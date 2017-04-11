var webMetotlarUrl = "/WebServisler/AutoComplete.asmx";
$(function () {
    $(".kredikartino").blur(function (e) {
        var krediKartiNo = $(this).val();
        BankaAdiGetir(krediKartiNo);
        alert(bankaAdi);
    });
});


function BankaAdiGetir(krediKartiNo) {
    var bankaAdi = krediKartiNo;
    $.ajax({
        type: "POST",
        url: webMetotlarUrl + "/BankaAdiGetir",
        data: "{'krediKartiNo':'" + krediKartiNo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            return msg.d;
        },
        error: function (err) {
            return '';
        }
    });
}