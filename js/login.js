function SearchString(source, arguments) {
    var arrChars = ['-', '/', '\\', '*', '\'', '\"', '{', '}', '[', ']', '(', ')', '#', '+', '&'];
    var sText1 = document.getElementById('txtKullaniciAdi').value;
    var sText2 = document.getElementById('txtSifre').value;
    var flag = false;
    for (var i = 0; i < arrChars.length; i++) {
        if (sText1.indexOf(arrChars[i]) != -1)
        { flag = true; }
        if (sText2.indexOf(arrChars[i]) != -1)
        { flag = true; }
    }
    if (flag) {
        arguments.IsValid = false;
        alert('Geçersiz karakter - / \\ * \" \' { } [ ] ( ) # + & kullandınız!!');
    }
}