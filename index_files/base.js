// toplam session süresi
var secs = 1800;


$(document).ready(function () {



    $("#loading").show();


    //Sayfa içi yardımlar
    if ($('span.help-inline').length) {
        $('span.help-inline').each(function () {
            var b = $(this);
            var a = $('<i class="fa fa-question-circle" title="Yardım"></i> ');
            $(a).popover({
                placement: 'right',
                offset: 15,
                trigger: 'click',
                delay: { show: 350, hide: 500 },
                html: true,
                content: b.html()
            }).css("cursor", "pointer");

            b.html(a);

        });
    }


    //    YukleniyorGoster = 1;

    //    $('#ctl00_up1').beginRequest(function () {
    //        if ($("#yukleniyor").length == 0 && YukleniyorGoster == 1)
    //            $("body").append('<div id="yukleniyor"><div>Yükleniyor lütfen bekleyiniz</div></div>');
    //        else
    //            YukleniyorGoster = 1;
    //    });

    /*atama planlama için */

    $('#ToggleDivAtamaPlan').hide();

    $('#ctl00_CPH_rgPlan_GridData').height($(window).height() - 160);
    $('#ctl00_CPH_RadGrid1_GridData').height($(window).height() - 200);

    //$('#ctl00_up1').panelUpdated(function () {
    secs = 1800;
    $('#ctl00_CPH_rgPlan_GridData').height($(window).height() - 180);
    $('#ctl00_CPH_RadGrid1_GridData').height($(window).height() - 200);
    $('#ToggleDivAtamaPlan').hide();
    //});


    //Select elements located outside the update panel
    //$('#ctl00_up1').panelReady(function () {
    // $('#ctl00_CPH_rgPlan_GridData').height($(window).height() - 160);
    //Select elements inside the update panelt


    //        $(".ExportToExcel").click(function (e) {
    //            YukleniyorGoster = 0;
    //        });

    //        $(window).bind('beforeunload', function () {
    //            if ($("#yukleniyor").length == 0 && YukleniyorGoster == 1)
    //                $("body").append('<div id="yukleniyor"><div>Yükleniyor lütfen bekleyiniz</div></div>');
    //            else
    //                YukleniyorGoster = 1;
    //        });   

    var yukleniyorGoster = 1;

    $(".ExportToExcel").click(function (e) {
        yukleniyorGoster = 0;
    });

    $('.preventLoading').click(function () {
        yukleniyorGoster = 0;
    });

    $(window).bind('beforeunload', function () {
        if (yukleniyorGoster == 1)
            $("#loading").show();//.fadeIn();//.show("slide", { direction: "up" }, 500);
        else
            yukleniyorGoster = 1;
    });
    $(window).load(function () {
        $("#loading").fadeOut("slow");
    });

    $("input.uppercase").on('keyup', function (e) {
        $(this).val($(this).val().turkishToUpper());
    });

    $("input.uppercase").on('blur', function (e) {
        $(this).val($(this).val().turkishToUpper());
    });


    /*  gridViewToolTip classlı objelerin title elemanını tooltip yapar */
    $(".gridViewToolTip").tooltip({
        track: true,
        content: function () {
            return $(this).prop('title');
        },
        open: function (event, ui) {
            ui.tooltip.css({ "min-width": "500px" });
        },
        position: {
            my: "right-15 center",
            at: "right center"
        }
    });

    $(".uyariToolTip").tooltip({
        track: true,
        open: function (event, ui) {
            ui.tooltip.css({ "width": "auto", "white-space": "nowrap" });
        },
        position: {
            my: "right-15 center",
            at: "right center"
        },

    });

    // atama planlama için
    $('#lnkGosterGizleAtamaPlan').click(function () {
        $('#ToggleDivAtamaPlan').toggle('0', function () {

        });
    });

    $('a.PopupAciklamaGoster').click(function (e) {
        var icerik = $(this).attr('data-icerik');

        e.preventDefault();

        $('#dialogContainer').append('<div id="dialogPopupAciklamaGoster">' + icerik + '</div>');

        $('#dialogPopupAciklamaGoster').dialog({
            autoOpen: true,
            width: 'auto',
            height: 'auto',
            modal: true,
            show: 'fade',
            hide: 'fade',
            zIndex: 9999,
            closeText: 'Kapat',
            open: function (event, ui) {
                $(this).parent().find('.ui-dialog-title').append("<span class=\"msg_Uyari\"> Uyarı </span>");
            }
        });

    });

    $("table.form input[type='text'],table.form input[type='password'], table.form select, table.form textarea").focus(function (event) {
        event.preventDefault();
        $(this).addClass("focused");
    });
    $("table.form input[type='text'],table.form input[type='password'], table.form select, table.form textarea").blur(function (event) {
        event.preventDefault();
        $(this).removeClass("focused");
    });

    /*
    Class olarak seperator verilen text kutuları için 1000 lik ayıracı ekler.
    */
    $("input.seperator").priceFormat({
        prefix: '',
        centsSeparator: '',
        thousandsSeparator: '.',
        centsLimit: 0
    });

    /*
    Link icin popup classı verilirse, bağlantı adresini popup içinde açar.
    <a class="class1 popup" href="~/Klasor/Dosya.aspx"></a>
    */
    $("a.popup").click(function (event) {
        event.preventDefault();
        window.open($(this).attr("href"), $(this).attr("rel"), "scrollbars=yes,menubar=0,resizable=1,width=350,height=400");
    });

    $("input.readOnly").keypress(function (event) {
        event.preventDefault();
        return false;
    });

    var ibanlength = 0;
    $("div.iban input").keydown(function (e) {
        if (e.which == 8 || e.which == 0) {
            ibanlength = $(this).val().length;
        }
    }).keyup(function (e) {
        var a = $(this);
        if (e.which != 9 && e.which != 37 && e.which != 39) {
            if (e.which == 8 || e.which == 0) {
                if (ibanlength == 0) {
                    a.prev().val(a.prev().val()).focus();
                }
            } else {
                if (a.attr("maxlength") == a.val().length) {
                    a.next().focus();
                }
            }
        }
    });


    $("a.popupbig").click(function (event) {
        event.preventDefault();
        window.open($(this).attr("href"), $(this).attr("rel"), "scrollbars=yes,menubar=0,resizable=1,width=600,height=550");
    });
    /*
    Print classı verilen butonlara basıldığında yazdırma ekranını açar. (CTRL+P)
    */
    $(".print").click(function (event) {
        event.preventDefault();
        window.print();
    });

    /*
    printPreview classı verilen butonlara basıldığında, önizleme ekranını açar. (CTRL+P)
    */
    $(".printPreview").click(function (event) {
        event.preventDefault();

        $('link[@rel*=style][title]').each(function (i) {
            if (this.getAttribute('media') == "screen") {
                this.media = "print";
            } else {
                this.media = "screen";
            }
        });
    });

    /*
    int classı verilen text alanları için sadece sayı girilmesini sağlar.
    TODO: ctrl kodu da eklenecek
    */
    $("input.int").keypress(function (e) {
        if ((e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) || (e.which == 17 || e.which == 78)) {
            return false;
        }
    });

    /*
    float classı verilen text alanları için sadece ondalık girilmesini sağlar.
    */
    $("input.float").keypress(function (e) {
        if (e.which == 44 && this.value.indexOf(',') == '-1') {
            return true;
        } else if (e.which != 8 & e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });


    /*
    Tüm MultiLine Textboxlarda karakter kısıtlaması yapar.
    */
    //$("textarea").keyup(function (e) {

    //    if ($(this).attr("maxlength") == undefined || $(this).attr("maxlength") == -1) {
    //    } else {
    //        if (this.value.length > $(this).attr("maxlength"))
    //            this.value = this.value.substring(0, $(this).attr("maxlength"));

    //        if ($(this).next().attr("id") === $(this).attr("id") + "_sayac")
    //            $(this).next().remove();

    //        $(this).after("<span style='font-size:10px' id='" + $(this).attr("id") + "_sayac'>" + " " + ($(this).attr("maxlength") - this.value.length) + "</span>");
    //    }
    //});

    $("textarea").keyup(function (e) {
        if ($(this).attr("maxlength") == undefined || $(this).attr("maxlength") == -1) {
        } else {
            if (this.value.length > $(this).attr("maxlength"))
                this.value = this.value.substring(0, $(this).attr("maxlength"));

            if ($(this).next().attr("id") === $(this).attr("id") + "_sayac")
                $(this).next().remove();

            var position = $(this).position();
            var uyari = ($(this).attr("maxlength") - this.value.length) == 0 ? 'error' : 'highlight';

            var x = $(this).offset().left;
            var y = $(this).offset().top + $(this).height() + 10;
            $(this).after('<div class="ui-state-' + uyari + ' ui-corner-all" style="white-space:nowrap !important; left:' + x + 'px top:' + y + 'px  font-size: 10px; width:160px; position: absolute; height:20px; z-index:999999;" id="' + $(this).attr("id") + '_sayac">' + '<p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>Kalan Karakter:<strong>' + ($(this).attr("maxlength") - this.value.length) + '</strong></p></div>');
            $(this).focusin(function () {
                $('#' + $(this).attr("id") + "_sayac").fadeIn(500);
            });

            $(this).focusout(function () {
                $('#' + $(this).attr("id") + "_sayac").fadeOut(50);
            });
        }
    });


    $(".infoBubble").hover(
    function () {
        this.bilgi = this.title;
        var genislikBB = this.bilgi.length;
        genislikBB = genislikBB * 6;
        $(this).append(
     "<div class='toolTipWrapper'>"
        + "<div class='toolTipTop'></div>"
        + "<div style=' width:" + genislikBB + "px' max-width:350px' class='toolTipMid'>"
          + this.bilgi
        + "</div>"
        + "<div class='toolTipBtm'></div>"
      + "</div>"
    );
        this.title = "";
        this.width = $(this).width();
        $(this).find(".toolTipWrapper").css({ left: this.width - 22 })
        $(".toolTipWrapper").fadeIn(300);
    },
    function () {
        $(".toolTipWrapper").fadeOut(100);
        $(this).children().remove();
        this.title = this.bilgi;
    });



    /*
    topMenu classı verilen unordered list için menu oluşturur.
    */

    //    $('.sf-menu').superfish({
    //        onShow: function(){$(this).find('.menuSubBackgroundContainer').css({ display: 'block' });},
    //        delay: 800
    //    });


    $("input.aboneNo").on('keypress', function (e) {
        var a = $(this);
        AboneNoOnKeyPress(a[0], a.next().attr("id"));
    }).on('blur', function (e) {
        var a = $(this);
        AboneNoOnBlur(a[0], a.next().attr("id"));
    });

    $('ul.sf-menu').supersubs().superfish({
        delay: 500,
        animation: { opacity: 'show', height: 'show' },
        speed: 'fast',
        autoArrows: true,
        dropShadows: true
    });

    $("#topmenu li a").click(function () {
        if ($(this).attr("href") != "#") {
            $('ul.sf-menu').hideSuperfishUl();
        }
    });

    //if ($('#topmenu').length > 0) {
    //    var height = $('#topmenu').height();
    //    if (height > 30) {
    //        var liHtml = $('#topmenu ul').html();
    //        var liSonuc = "";
    //        liSonuc = "<li><a href=\"\#\">Tüm Menüler</a><ul>" + liHtml + "</ul></li>";
    //        $('#topmenu ul').html("" + liSonuc + "");
    //        $('ul.sf-menu').supersubs({
    //            minWidth: 15,
    //            maxWidth: 25,
    //            extraWidth: 1,
    //            autoArrows: true
    //        }).superfish();
    //    }
    //}

    /*
    Tarih classı verilen textbox üzerinde tarih seçimi etkinleştirir.
    */



    $('input.tarih, input.tarih2').datepicker(
        {
            dateFormat: "dd.mm.yy",
            beforeShow: function () {
                $('#ui-datepicker-div').css("z-index", 3115);
            },
            changeMonth: true,
            changeYear: true,
            yearRange: '1900:2050',
            onSelect: function () {
            }
        });

    /*
    Tarih aralığı seçimi için tarih1 ve tarih2 classlı iki textbox kullanılarak, kontrol ediliyor.
    */
    $('input.tarih1').datepicker(
        {
            dateFormat: "dd.mm.yy",
            changeMonth: true,
            changeYear: true,
            onClose: function (dateText, inst) {
                $('#' + $(this).attr("id").replace('Bas', 'Son')).datepicker('option', 'minDate', $.datepicker.parseDate('dd.mm.yy', dateText));
            },
            onSelect: function (dateText, inst) {
                $('#' + $(this).attr("id").replace('Bas', 'Son')).val("");
            }
        });


    $('input.tarih, input.tarih1, input.tarih2').mask("99.99.9999");
    $('input.telefon').mask("(999) 999-99-99");
    $('input.kredikartino').mask("9999-9999-9999-9999");
    $('input.kredikarticcv').mask("999");
    $('input.kredikartitarih').mask("99/99");


    $('#kkKlavyeGoster').click(function () {
        $('#divSanalKlavye').toggle("slide", { direction: "down" }, 1000);
    });

    $('.kkTus').click(function () {

        var deger = $(this).val();

        if (deger == '<-') {
            $('input.kredikartino').val($('input.kredikartino').val().substring(0, $('input.kredikartino').val().length - 1));
        }
        else if ($('input.kredikartino').val().length < 16) {
            $('input.kredikartino').val($('input.kredikartino').val() + deger);
        }
    });


    $(".sadeceUyaridaOnay").click(function (e) {
        if ($(this).attr("uyari") == undefined)
            return true;
        if (confirm($(this).attr("uyari") == "" ? "Bu Kaydı Silmek İstediğinize Emin misiniz?" : $(this).attr("uyari"))) {
            return true;
        } else
            return false;
    });

    /*
    Onay classı verilen objelerin click eventinde objenin uyari özelliğini soru olarak gösterir.
    */
    $(".onay2").click(function (e) {
        if (confirm($(this).attr("uyari") == undefined || $(this).attr("uyari") == "" ? "Bu Kaydı Silmek İstediğinize Emin misiniz?" : $(this).attr("uyari"))) {
            return true;
        } else
            return false;
    });

    if ($('#dialogYonlendir').length) {
        debugger;
        var sinif = $('#dialogYonlendir').attr("class");
        var baslik = $('#dialogYonlendir').attr("title");
        var EscKapat = $('#dialogYonlendir').attr("EscKapat") == 'False' ? false : true;
        var Modal = $('#dialogYonlendir').attr("Modal") == 'False' ? false : true;
        var KapatGoster = $('#dialogYonlendir').attr("KapatGoster") == 'False' ? false : true;
        var btnKapat = $('#dialogYonlendir').attr("btnKapat");
        var parentYonlendir = $('#dialogYonlendir').attr("parentYonlendir") == 'False' ? false : true;

        $('#dialogYonlendir').dialog({
            autoOpen: true,
            width: 400,
            modal: Modal,
            zIndex: 30000,
            show: 'fade',
            hide: 'fade',
            position: 'center',
            closeOnEscape: EscKapat,
            open: function (event, ui) {
                if (!KapatGoster) {
                    $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
                }
                $(this).parent().find('.ui-dialog-title').remove();
                $(this).parent().find('.ui-dialog-titlebar').append("<span class='" + sinif + "'>" + baslik + "</span>");

            },
            dialogClass: 'fixed-dialog-yonlendir',
            close: function (event, ui) {
                if (btnKapat != undefined) {
                    $('#' + btnKapat).click();
                }
            },
            buttons: {
                "Tamam": function () {
                    $(this).dialog("close");
                    $('#dialogYonlendir').remove();
                    var url = $('#hdnUrl').val();
                    if (parentYonlendir)
                        window.top.location.href = url;
                    else
                        window.location.href = url;
                }
            }
        });
    }

    if ($('#dialogEvetHayirIptal').length) {

        var sinif = $('#dialogEvetHayirIptal').attr("class");
        var baslik = $('#dialogEvetHayirIptal').attr("title");
        var EscKapat = $('#dialogEvetHayirIptal').attr("EscKapat") == 'False' ? false : true;
        var Modal = $('#dialogEvetHayirIptal').attr("Modal") == 'False' ? false : true;
        var KapatGoster = $('#dialogEvetHayirIptal').attr("KapatGoster") == 'False' ? false : true;
        var btnKapat = $('#dialogEvetHayirIptal').attr("btnKapat");

        $('#dialogEvetHayirIptal').dialog({
            autoOpen: true,
            width: 400,
            modal: Modal,
            zIndex: 30000,
            show: 'fade',
            hide: 'fade',
            closeOnEscape: EscKapat,
            open: function (event, ui) {
                if (!KapatGoster) {
                    $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
                }
                $(this).parent().find('.ui-dialog-title').remove();
                $(this).parent().find('.ui-dialog-titlebar').append("<span class='" + sinif + "'>" + baslik + "</span>");
            },
            dialogClass: 'fixed-dialog',
            close: function (event, ui) {
                if (btnKapat != undefined) {
                    $('#' + btnKapat).click();
                }
            },
            buttons: {
                "Evet": function () {
                    $(this).dialog("close");
                    $('#dialogEvetHayirIptal').remove();
                    var butonAdi = $('#hdnEvet').val();
                    $('#' + butonAdi).click();
                    $('#hdnEvet').val('');
                },
                "Hayır": function () {
                    $(this).dialog("close");
                    $('#dialogEvetHayirIptal').remove();
                    var butonAdi = $('#hdnHayir').val();
                    $('#' + butonAdi).click();
                    $('#hdnHayir').val('');
                },
                "İptal": function () {
                    $(this).dialog("close");
                    $('#dialogEvetHayirIptal').remove();
                    var butonAdi = $('#hdnIptal').val();
                    $('#' + butonAdi).click();
                    $('#hdnIptal').val('');
                }
            }
        });
    }

    if ($('#dialogEvetHayir').length) {

        var sinif = $('#dialogEvetHayir').attr("class");
        var baslik = $('#dialogEvetHayir').attr("title");
        var EscKapat = $('#dialogEvetHayir').attr("EscKapat") == 'False' ? false : true;
        var Modal = $('#dialogEvetHayir').attr("Modal") == 'False' ? false : true;
        var KapatGoster = $('#dialogEvetHayir').attr("KapatGoster") == 'False' ? false : true;
        var btnKapat = $('#dialogEvetHayir').attr("btnKapat");

        $('#dialogEvetHayir').dialog({
            autoOpen: true,
            width: 400,
            modal: Modal,
            zIndex: 30000,
            show: 'fade',
            hide: 'fade',
            closeOnEscape: EscKapat,
            open: function (event, ui) {
                if (!KapatGoster) {
                    $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
                }
                $(this).parent().find('.ui-dialog-title').remove();
                $(this).parent().find('.ui-dialog-titlebar').append("<span class='" + sinif + "'>" + baslik + "</span>");
            },
            dialogClass: 'fixed-dialog',
            close: function (event, ui) {
                if (btnKapat != undefined) {
                    $('#' + btnKapat).click();
                }
            },
            buttons: {
                "Evet": function () {
                    $(this).dialog("close");
                    $('#dialogEvetHayir').remove();
                    var butonAdi = $('#hdnEvet').val();
                    $('#' + butonAdi).click();
                    $('#hdnEvet').val('');
                },
                "Hayır": function () {
                    $(this).dialog("close");
                    $('#dialogEvetHayir').remove();
                    var butonAdi = $('#hdnHayir').val();
                    $('#' + butonAdi).click();
                    $('#hdnHayir').val('');
                }
            }
        });
    }

    $(".onay").click(function (e) {

        try {
            var OnayUyari = $(this).attr("uyari") == undefined || $(this).attr("uyari") == "" ? "Bu Kaydı Silmek İstediğinize Emin misiniz?" : $(this).attr("uyari");

            $('#ctl00_dialogContainer').append('<div id="dialogUyari">' + OnayUyari + '</div>');

            e.preventDefault(); //butonun postback yapması engelleniyor;

            var postBack = $(this).attr("href"); //grid butonun postback yapma işlemi alınıyor;
            var butonName = $(this).attr("name");// butonon adı alınıyor.

            $('#dialogUyari').dialog({
                autoOpen: true,
                width: 400,
                modal: true,
                position: 'center',
                show: 'fade',
                hide: 'fade',
                zIndex: 9999,
                open: function (event, ui) {
                    $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
                    $(this).parent().find('.ui-dialog-title').append("<span class=\"msg_Uyari\"> Uyarı </span>");
                },
                buttons: {
                    "Evet": function () {
                        $(this).dialog("close");
                        $('#dialogUyari').remove();
                        if (postBack == undefined) {//Butonlarda href attribute yok o yuzden
                            __doPostBack(butonName, "");
                        }
                        else {
                            window.location.href = postBack;
                        }
                    },
                    "Hayır": function () {
                        $(this).dialog("close");
                        $('#dialogUyari').remove();
                        return false;
                    }
                }
            });
        } catch (e) {
            if (confirm($(this).attr("uyari") == undefined || $(this).attr("uyari") == "" ? "Bu Kaydı Silmek İstediğinize Emin misiniz?" : $(this).attr("uyari"))) {
                return true;
            } else
                return false;
        }
    });

    $(".onayValid").click(function (e) {
        var ret = true;
        if (typeof (Page_ClientValidate) == 'function') {
            Page_ClientValidate();
            ret = Page_IsValid;
        }
        if (ret) {

            try {
                var OnayUyari = $(this).attr("uyari") == undefined || $(this).attr("uyari") == "" ? "Bu Kaydı Silmek İstediğinize Emin misiniz?" : $(this).attr("uyari");

                $('#ctl00_dialogContainer').append('<div id="dialogUyari">' + OnayUyari + '</div>');

                e.preventDefault(); //butonun postback yapması engelleniyor;

                var postBack = $(this).attr("href"); //grid butonun postback yapma işlemi alınıyor;
                var butonName = $(this).attr("name");// butonon adı alınıyor.

                $('#dialogUyari').dialog({
                    autoOpen: true,
                    width: 400,
                    modal: true,
                    show: 'fade',
                    hide: 'fade',
                    zIndex: 9999,
                    open: function (event, ui) {
                        $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
                        $(this).parent().find('.ui-dialog-title').append("<span class=\"msg_Uyari\"> Uyarı </span>");
                    },
                    buttons: {
                        "Evet": function () {
                            $(this).dialog("close");
                            $('#dialogUyari').remove();
                            if (postBack == undefined) {//Butonlarda href attribute yok o yuzden
                                __doPostBack(butonName, "");
                            }
                            else {
                                window.location.href = postBack;
                            }
                        },
                        "Hayır": function () {
                            $(this).dialog("close");
                            $('#dialogUyari').remove();
                            return false;
                        }
                    }
                });
            } catch (e) {
                if (confirm($(this).attr("uyari") == undefined || $(this).attr("uyari") == "" ? "Bu Kaydı Silmek İstediğinize Emin misiniz?" : $(this).attr("uyari"))) {
                    return true;
                } else
                    return false;
            }
        }
    });

    /*
    Link icin modalize classı verilirse, bağlantı adresini modal içinde açar.
    <a class="class1 modalize" href="~/Klasor/Dosya.aspx"></a>
    */

    //$("input.modalize, a.modalize").colorbox({ width: "80%", height: "95%", iframe: true, overlayClose: false, opacity: 0.5 });
    //$("input.modalizeGenis, a.modalizeGenis").colorbox({ width: "98%", height: "99%", iframe: true, overlayClose: false, opacity: 0.5 });

    //$("a.modalize.refreshparent").colorbox({ onClosed: function () { $($get("ctl00_PersonelGenelArama1_btnRefresh")).click(); } });

    //$("td.modalize").colorbox({ width: "80%", height: "95%", iframe: true, overlayClose: false, opacity: 0.5, href: $(this).next().next().attr("href") });


    function QueryStringDegerGetir(href, parametreAdi) {
        var match = RegExp('[?&]' + parametreAdi + '=([^&]*)').exec(href);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    $("input.modalize, a.modalize, input.modalizeGenis, a.modalizeGenis,input.modalizeAuto, a.modalizeAuto").click(function (e) {

        e.preventDefault();

        var href = $(this).attr("href");
        // var baslik = $(this).html();
        var baslik = '';

        var refresParent = $(this).hasClass("refreshparent");

        var genislik, yukseklik;

        genislik = QueryStringDegerGetir(href, "genislik");
        yukseklik = QueryStringDegerGetir(href, "yukseklik");

        if (genislik == null || yukseklik == null) {

            if ($(this).hasClass("modalizeGenis")) {
                genislik = $(window).width() / 100 * 50;
                yukseklik = $(window).height() / 100 * 50;
            }
            else if ($(this).hasClass("modalize")) {
                genislik = $(window).width() / 100 * 80;
                yukseklik = $(window).height() / 100 * 90;
            }
            else {
                genislik = 'auto';
                yukseklik = 'auto';
            }
        }

        $('#dialogContainer').append('<div id="dialogModalize"><div id="divIframe" style="width:99%;height:99%;text-align:center;"><iframe frameBorder="0" src="' + href + '" width="100%" height="100%"></iframe></div></div>');

        $("#dialogModalize").dialog({
            autoOpen: true,
            zIndex: 9999,
            show: 'fade',
            hide: 'fade',
            closeText: 'Kapat',
            closeOnEscape: true,
            width: genislik,
            height: yukseklik,
            modal: true,
            draggable: true,
            open: function (event, ui) {
                $(this).parent().find('.ui-dialog-title').append("<span> " + baslik + " </span>");
            },
            close: function () {
                $(this).dialog("close");
                $('#divIframe').remove();
                if (refresParent) {
                    $($get("ctl00_PersonelGenelArama1_btnRefresh")).click();
                }
            }
        }).parent().appendTo($("form"));
    });

    $("a.modalClose").click(function (event) {
        event.preventDefault();
        $.modal.close();
    });

    $("#accordion").accordion({
        collapsible: true,
        navigation: true,
        heightStyle: "content",
        activate: function (event, ui) {
            var index = $(this).accordion("option", "active");
            $('#accordionDegisHV').val(index);
        },
        active: parseInt($('#accordionDegisHV').val())
    });

    $(".accordion").accordion({
        collapsible: true,
        navigation: true,
        heightStyle: "content",
        activate: function (event, ui) {
            var index = $(this).accordion("option", "active");
            $('#accordionDegisHV').val(index);
        },
        active: parseInt($('#accordionDegisHV').val())
    });

    if ($('.wzb').length > 0) {
        var wzIndex = $('#wizardStepDegisHV').val();
        $('.wzb').each(function (index) {
            if (index == wzIndex) {
                $(this).removeClass('btn-default').addClass('btn-warning').removeAttr('disabled');
            }
            else {
                $(this).removeClass('btn-warning').addClass('btn-default').attr('disabled', 'disabled');
            }
        });
    }


    /*
    Tabs id'li div classı içerisindeki yapıyı tablı hale getirir. TabDegis fonksiyonu ile kod tarafından otomatik olarak tab değiştirilebilir.
    Araçlardaki TabDegis fonksiyonu ile kullanılır.  
    */


    //Tabs içinde olduğunda çalışmıyodu o yüzden tabs metodundan önceye koyuldu.
    $(".cokluSecim").each(function (i) {
        var a = $(this);
        var genislik = $(this).width();
        $(this).dropdownchecklist({
            emptyText: "Lütfen Seçiniz.",
            maxDropHeight: 250,
            firstItemChecksAll: true
        });
    });

    $(".multiselect").each(function (i) {
        var filtreAcik = false;
        if ($(this).attr("FiltreAcik") != undefined) {
            filtreAcik = $(this).attr("FiltreAcik");
        }
        $(this).multiselect({
            header: filtreAcik == "True" ? true : false,
            noneSelectedText: "Lütfen Seçiniz.",
            checkAllText: "Tümünü Seç",
            uncheckAllText: "Seçimleri Temizle",
            minWidth: parseInt($(this).width()),
            selectedText: "# adet seçildi",
            selectedList: parseInt($(this).width() / 150),
            open: function () {
                $(this).multiselect("widget").find("input[type='search']:first").focus();
            },
        }).multiselectfilter({ label: "Ara:", placeholder: "Yazmaya Başlayın" });
    });

    $(".singleselect").each(function (i) {

        var state = 'enable';
        if ($(this).attr("state") != undefined) {
            state = $(this).attr("state") == "True" ? true : false;
        }
        $(this).multiselect({
            header: true,
            multiple: false,
            noneSelectedText: "Lütfen Seçiniz.",
            checkAllText: "Tümünü Seç",
            uncheckAllText: "Seçimleri Temizle",
            minWidth: parseInt($(this).width()),
            selectedText: "# adet seçildi",
            selectedList: parseInt($(this).width() / 150),
            open: function () {
                $(this).multiselect("widget").find("input[type='search']:first").focus();
            },
        }).multiselectfilter({ label: "Ara:", placeholder: "Yazmaya Başlayın" });

        $(this).multiselect(state ? 'enable' : 'disable');
    });

    $("#tabs").tabs({
        active: $("#tabDegisHV").val(),
        activate: function (event, ui) {
            $("#tabDegisHV").val(ui.newTab.index());
        }
    });

    $(".tabs").tabs({
        active: $("#tabDegisHV").val(),
        activate: function (event, ui) {
            $("#tabDegisHV").val(ui.newTab.index());
        }
    });

    if ($('#tabs').length > 0) {

        $('#tabs').each(function (index) {

            $('#' + $(this).attr('id') + ' ul li a').removeAttr('disabled')

            $("#tabs").tabs({
                active: $("#tabDegisHV").val(),
                activate: function (event, ui) {
                    $("#tabDegisHV").val(ui.newTab.index());
                }
            });

            if ($(this).attr('data-disabled') != undefined && $(this).attr('data-disabled') == "true")
                $('#' + $(this).attr('id') + ' ul li a').attr("disabled", "disabled");
        });
    }

    if ($('#dialog').length) {

        var sinif = $('#dialog').attr("class");
        var baslik = $('#dialog').attr("title");
        var EscKapat = $('#dialog').attr("EscKapat") == 'False' ? false : true;
        var Modal = $('#dialog').attr("Modal") == 'False' ? false : true;
        var KapatGoster = $('#dialog').attr("KapatGoster") == 'False' ? false : true;
        var btnKapat = $('#dialog').attr("btnKapat");

        $('#dialog').dialog({
            autoOpen: true,
            width: 400,
            modal: Modal,
            zIndex: 9999,
            show: 'fade',
            hide: 'fade',
            closeText: 'Kapat',
            closeOnEscape: EscKapat,
            open: function (event, ui) {
                if (!KapatGoster) {
                    $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
                }
                $(this).parent().find('.ui-dialog-title').remove();
                $(this).parent().find('.ui-dialog-titlebar').append("<span class='" + sinif + "'>" + baslik + "</span>");


                //var win = $(window);
                //$(this).parent().css({
                //    position: 'absolute',
                //    left: (win.width() - $(this).parent().outerWidth()) / 2,
                //    top: (win.height() - $(this).parent().outerHeight()) / 2
                //});
            },


            dialogClass: 'fixed-dialog',

            close: function (event, ui) {
                $('#' + btnKapat).click();
            },
            buttons: {
                "Tamam": function () {
                    $(this).dialog("close");
                    $('#dialog').remove();
                }
            },

        });



        
    }

    

    if ($('#dialogOtomatikKapat').length) {

        var sinif = $('#dialogOtomatikKapat').attr("class");
        var baslik = $('#dialogOtomatikKapat').attr("title");
        var EscKapat = $('#dialogOtomatikKapat').attr("EscKapat") == 'False' ? false : true;
        var Modal = $('#dialogOtomatikKapat').attr("Modal") == 'False' ? false : true;
        var KapatGoster = $('#dialogOtomatikKapat').attr("KapatGoster") == 'False' ? false : true;
        var btnKapat = $('#dialogOtomatikKapat').attr("btnKapat");
        var OtomatikKapatSaniye = $('#dialogOtomatikKapat').attr("OtomatikKapatSaniye");
        var KapatParentMi = $('#dialogOtomatikKapat').attr("KapatParentMi") == 'False' ? false : true;

        $('#dialogOtomatikKapat').dialog({
            autoOpen: true,
            width: 400,
            modal: Modal,
            zIndex: 9999,
            show: 'fade',
            hide: 'fade',
            closeText: 'Kapat',
            closeOnEscape: EscKapat,
            open: function (event, ui) {
                if (!KapatGoster) {
                    $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
                }
                $(this).parent().find('.ui-dialog-title').remove();
                $(this).parent().find('.ui-dialog-titlebar').append("<span class='" + sinif + "'>" + baslik + "</span>");
            },
            dialogClass: 'fixed-dialog',
            close: function (event, ui) {
                if (KapatParentMi)
                    $(parent.document).find('#' + btnKapat).click();
                else
                    $('#' + btnKapat).click();
            }
        });

        if (OtomatikKapatSaniye > 0)
            setTimeout(function () { $('#dialogOtomatikKapat').dialog('close'); }, OtomatikKapatSaniye * 1000);
    }

    if ($('.inputDialog').length) {

        $('.inputDialog').each(function (index) {

            var sinif = $(this).attr("class");
            var baslik = $(this).attr("title");
            var EscKapat = $(this).attr("EscKapat") == 'False' ? false : true;
            var Modal = $(this).attr("Modal") == 'False' ? false : true;
            var KapatGoster = $(this).attr("KapatGoster") == 'False' ? false : true;
            var btnKapat = $(this).attr("btnKapat");
            var genislik = $(this).attr("width");
            var yukseklik = $(this).attr("height");

            $(this).dialog({
                autoOpen: true,
                width: genislik,
                height: yukseklik,
                modal: Modal,
                zIndex: 9999,
                closeText: 'Kapat',
                closeOnEscape: EscKapat,
                open: function (event, ui) {
                    if (!KapatGoster) {
                        $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
                    }
                    $(this).parent().find('.ui-dialog-title').remove();
                    $(this).parent().find('.ui-dialog-titlebar').append("<span class='" + sinif + "'>" + baslik + "</span>");

                },
                dialogClass: 'fixed-dialog',
                close: function (event, ui) {
                    $('#' + btnKapat).click();
                }
            }).parent().appendTo($("form"));
        });
    }

    /*
    Resim göstermek için kullanılır.
    */

    if ($('#resimDialog').length) {
        var genislik = parseInt($('#resimDialog').attr('genislik') == undefined ? 425 : $('#resimDialog').attr('genislik'));
        $('#resimDialog').dialog({
            autoOpen: true,
            zIndex: 9999,
            closeOnEscape: true,
            width: genislik,
            show: 'fade',
            hide: 'fade',
            dialogClass: 'fixed-dialog',
        });
    }

    if ($('#sayfaDialog').length) {

        var sinif = $('#sayfaDialog').attr("class");
        var baslik = $('#sayfaDialog').attr("title");
        var url = $('#sayfaDialog').attr('url');
        var genislik = $('#sayfaDialog').attr('width');
        var yukseklik = $('#sayfaDialog').attr('height');
        var EscKapat = $('#sayfaDialog').attr("EscKapat") == 'False' ? false : true;
        var Modal = $('#sayfaDialog').attr("Modal") == 'False' ? false : true;
        var KapatGoster = $('#sayfaDialog').attr("KapatGoster") == 'False' ? false : true;
        var btnKapat = $('#sayfaDialog').attr("btnKapat");

        $('#sayfaDialog').dialog({
            autoOpen: true,
            width: genislik,
            height: yukseklik,
            modal: Modal,
            zIndex: 9999,
            closeText: 'Kapat',
            closeOnEscape: EscKapat,
            open: function (event, ui) {
                if (!KapatGoster) {
                    $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
                }

                $(this).html('<div id="divIframe" style="width:99%;height:99%;"><iframe id="ifrmPopup" style="width:100%;height:100%" frameBorder="0"></iframe></div>');
                $('#ifrmPopup').attr("src", url);
                $(this).parent().find('.ui-dialog-title').remove();
                $(this).parent().find('.ui-dialog-titlebar').append("<span class='" + sinif + "'>" + baslik + "</span>");
            },
            dialogClass: 'fixed-dialog',
            close: function (event, ui) {
                $('#divIframe').remove();
                if (btnKapat != undefined)
                    $($get(btnKapat)).click();
            }
        }).parent().appendTo($("form"));;
    }

    /*
    classı required olan tüm inputların en az 1 karakter girilmesi zorunlu hale gelir.
    */
    $("input.required").blur(function () {
        if ($(this).val().length < 1) {
            if ($(this).next("span.err").length) {
                $(this).next("span.err").show();
                $(this).next("span.err").effect("highlight", {}, 1000);
            }
            else {
                $(this).after(" <span class='err'>Bu alan zorunludur!</span>");
                $(this).next("span.err").effect("highlight", {}, 1000);
            }
        }
        else
            $(this).next("span.err").fadeOut(800);
    });

    /*
    check classı verilen objelerin click eventinde sayfadaki reguired classlı objelerden doldurulmamış olanları kontrol eder.
    */
    $(".check").click(function (e) {
        var valid = true;

        $(".required").each(function (i) {
            if ($(this).val().length < 1) {
                if ($(this).next("span.err").length) {
                    $(this).next("span.err").show();
                    $(this).next("span.err").effect("highlight", {}, 1000);
                }
                else {
                    $(this).after(" <span class='err'>Bu alan zorunludur!</span>");
                    $(this).next("span.err").effect("highlight", {}, 1000);
                }
                valid = false;
            }
        });
        if (!valid) {
            e.preventDefault();
            alert("Doldurulması gereken boş alanlar var!");
        }
    });

    /*
    cbSec classı verilen checkboxların tümünü seçip, seçimi kaldırmak için kullanılıyor.
    Bunun için tumuSec isimli class işlemi yapacak checkbox a ekleniyor.
    */
    $(".tumuSec").on("click", (function (e) {
        if ($(".tumuSec input").is(':checked')) {
            $(".cbSec input:enabled").prop('checked', true);
        }
        else {
            $(".cbSec input").prop('checked', false);
        }
    }));

    $(".cbSec input").on("click", (function (e) {
        var cbAdet = 0;
        var isaretli = 0;
        var isaretsiz = 0;
        $(".cbSec input").each(function (i) {
            cbAdet++;
            if ($(this).is(':checked')) {
                isaretli++;
            }
            else {
                isaretsiz++;
            }
        });
        if (cbAdet == isaretli) {
            $('.tumuSec input').prop('checked', true);
        }
        else {
            $('.tumuSec input').prop('checked', false);
        }
    }));



    if ($('div.calendar_top strong').length) {
        startTime();
    }

    $("input.autoComplete").each(function (i) {
        var a = this;


        $(this).autocomplete({
            minLength: 2,
            delay: 800,
            autoFocus: true,
            source: "/AutoCompleteHandler.ashx" + "?cmd=" + $(a).data("fonksiyon"),
            focus: function (event, ui) {
                return false;
            },
            select: function (event, ui) {
                var label = $("<span></span>").html(ui.item.label).text();
                $(a).val(label);
                $("#" + $(a).data("deger")).val(ui.item.value);
                $(a).attr('readonly', 'readonly').addClass('ac_locked');

                if ($(a).data("degerauto") == "True") {
                    __doPostBack($(a).data("sorgu"), '');
                }
                return false;
            }
        }).data("uiAutocomplete")._renderItem = function (ul, item) {
            return $("<li>")
            .append("<a>" + item.label + "<br/><small>" + item.desc + "</small></a>")
            .appendTo(ul);
        };

    });


    $("input.autoComplete").each(function (i) {
        var a = this;
        $(a).css("width", $(a).parent().parent().width() - 37);
    });

    $("div.autoCompleteBox").resize(function (e) {
        var a = this;
        $(a).children().children().next().css("width", $(a).width() - 37);
    });

    $(".SSSAccordion").accordion({
        collapsible: true,
        active: false,
        clearStyle: true
    });

    $(".CollapsedAccordion").accordion({
        active: false,
        collapsible: true

    });
    //temizleme butonları
    $(".btn_autoCompleteClear").click(function (e) {
        e.preventDefault();
        $("#" + $(this).data("sorgu")).val("").removeAttr('readonly').removeClass('ac_locked');
        $("#" + $(this).data("deger")).val("");

        if ($(this).data("degerauto") == "True")
            __doPostBack($(this).data("sorgu"), '');
    });


    $(".btnKadroSecClear").click(function (e) {
        e.preventDefault();
        $("#" + $(this).data("kadroid")).val("");
        $("#" + $(this).data("kadrobilgi")).val("");
        $("#" + $(this).data("lblkadrobilgi")).html("");
        $(this).hide();
    });


    $(".password_strength").passStrength({
        shortPass: "top_shortPass", //optional
        badPass: "top_badPass", 	//optional
        goodPass: "top_goodPass", 	//optional
        strongPass: "top_strongPass", //optional
        baseStyle: "top_testresult", //optional
        userid: "#ctl00_CPH_txtKullaniciAdi", 	//required override
        messageloc: 1			//before == 0 or after == 1
    });

    $(".password_strength2").passStrength({
        shortPass: "top_shortPass", //optional
        badPass: "top_badPass", 	//optional
        goodPass: "top_goodPass", 	//optional
        strongPass: "top_strongPass", //optional
        baseStyle: "top_testresult", //optional
        userid: "#ctl00_CPH_txtKullaniciAdi", 	//required override
        messageloc: 1			//before == 0 or after == 1
    });


    $("#kisayollar").niceScroll();
    $('#duyurular').SetScroller({ velocity: 50, direction: 'vertical' }).niceScroll();

    if ($(".YanipSon").length > 0) {
        setInterval(function () {
            $(".YanipSon").fadeOut().fadeIn();
        }, 1500);
    }

    $("#tblGenelArama .enterlistele").keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            $("#ctl00_PersonelGenelArama1_btnListele").click();
        }
    });

    $("#tblGenelArama .ImageTemizle").dblclick(function (e) {
        e.preventDefault();
        $("#ctl00_PersonelGenelArama1_btnTemizle").click();
    });



    Gostergeler = new Array(16);
    for (i = 0; i < Gostergeler.length; ++i)
        Gostergeler[i] = new Array(10);

    Gostergeler[1][1] = "1320";
    Gostergeler[1][2] = "1380";
    Gostergeler[1][3] = "1440";
    Gostergeler[1][4] = "1500";
    Gostergeler[2][1] = "1155";
    Gostergeler[2][2] = "1210";
    Gostergeler[2][3] = "1265";
    Gostergeler[2][4] = "1320";
    Gostergeler[2][5] = "1380";
    Gostergeler[2][6] = "1440";
    Gostergeler[3][1] = "1020";
    Gostergeler[3][2] = "1065";
    Gostergeler[3][3] = "1110";
    Gostergeler[3][4] = "1155";
    Gostergeler[3][5] = "1210";
    Gostergeler[3][6] = "1265";
    Gostergeler[3][7] = "1320";
    Gostergeler[3][8] = "1380";
    Gostergeler[4][1] = "915";
    Gostergeler[4][2] = "950";
    Gostergeler[4][3] = "985";
    Gostergeler[4][4] = "1020";
    Gostergeler[4][5] = "1065";
    Gostergeler[4][6] = "1110";
    Gostergeler[4][7] = "1155";
    Gostergeler[4][8] = "1210";
    Gostergeler[4][9] = "1265";
    Gostergeler[5][1] = "835";
    Gostergeler[5][2] = "865";
    Gostergeler[5][3] = "895";
    Gostergeler[5][4] = "915";
    Gostergeler[5][5] = "950";
    Gostergeler[5][6] = "985";
    Gostergeler[5][7] = "1020";
    Gostergeler[5][8] = "1065";
    Gostergeler[5][9] = "1110";
    Gostergeler[6][1] = "760";
    Gostergeler[6][2] = "785";
    Gostergeler[6][3] = "810";
    Gostergeler[6][4] = "835";
    Gostergeler[6][5] = "865";
    Gostergeler[6][6] = "895";
    Gostergeler[6][7] = "915";
    Gostergeler[6][8] = "950";
    Gostergeler[6][9] = "958";
    Gostergeler[7][1] = "705";
    Gostergeler[7][2] = "720";
    Gostergeler[7][3] = "740";
    Gostergeler[7][4] = "760";
    Gostergeler[7][5] = "785";
    Gostergeler[7][6] = "810";
    Gostergeler[7][7] = "835";
    Gostergeler[7][8] = "865";
    Gostergeler[7][9] = "895";
    Gostergeler[8][1] = "660";
    Gostergeler[8][2] = "675";
    Gostergeler[8][3] = "690";
    Gostergeler[8][4] = "705";
    Gostergeler[8][5] = "720";
    Gostergeler[8][6] = "740";
    Gostergeler[8][7] = "760";
    Gostergeler[8][8] = "785";
    Gostergeler[8][9] = "810";
    Gostergeler[9][1] = "620";
    Gostergeler[9][2] = "630";
    Gostergeler[9][3] = "645";
    Gostergeler[9][4] = "660";
    Gostergeler[9][5] = "675";
    Gostergeler[9][6] = "690";
    Gostergeler[9][7] = "705";
    Gostergeler[9][8] = "720";
    Gostergeler[9][9] = "740";
    Gostergeler[10][1] = "590";
    Gostergeler[10][2] = "600";
    Gostergeler[10][3] = "610";
    Gostergeler[10][4] = "620";
    Gostergeler[10][5] = "630";
    Gostergeler[10][6] = "645";
    Gostergeler[10][7] = "660";
    Gostergeler[10][8] = "675";
    Gostergeler[10][9] = "690";
    Gostergeler[11][1] = "560";
    Gostergeler[11][2] = "570";
    Gostergeler[11][3] = "580";
    Gostergeler[11][4] = "590";
    Gostergeler[11][5] = "600";
    Gostergeler[11][6] = "610";
    Gostergeler[11][7] = "620";
    Gostergeler[11][8] = "630";
    Gostergeler[11][9] = "645";
    Gostergeler[12][1] = "545";
    Gostergeler[12][2] = "550";
    Gostergeler[12][3] = "555";
    Gostergeler[12][4] = "560";
    Gostergeler[12][5] = "570";
    Gostergeler[12][6] = "580";
    Gostergeler[12][7] = "590";
    Gostergeler[12][8] = "600";
    Gostergeler[12][9] = "610";
    Gostergeler[13][1] = "530";
    Gostergeler[13][2] = "535";
    Gostergeler[13][3] = "540";
    Gostergeler[13][4] = "545";
    Gostergeler[13][5] = "550";
    Gostergeler[13][6] = "555";
    Gostergeler[13][7] = "560";
    Gostergeler[13][8] = "570";
    Gostergeler[13][9] = "580";
    Gostergeler[14][1] = "515";
    Gostergeler[14][2] = "520";
    Gostergeler[14][3] = "525";
    Gostergeler[14][4] = "530";
    Gostergeler[14][5] = "535";
    Gostergeler[14][6] = "540";
    Gostergeler[14][7] = "545";
    Gostergeler[14][8] = "550";
    Gostergeler[14][9] = "555";
    Gostergeler[15][1] = "500";
    Gostergeler[15][2] = "505";
    Gostergeler[15][3] = "510";
    Gostergeler[15][4] = "515";
    Gostergeler[15][5] = "520";
    Gostergeler[15][6] = "525";
    Gostergeler[15][7] = "530";
    Gostergeler[15][8] = "535";
    Gostergeler[15][9] = "540";


    $("input.Derece").keypress(function (e) {
        if ((e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) || (e.which == 17 || e.which == 78)) {
            return false;
        }
        else {
            if ((e.which == 48) && $(this).val().length == 0) //ilk hanede sıfır yazılmayacak
                return false;
        }

        if ($(this).val() == "1" && (e.which < 48 || e.which > 53) && e.which != 8 && e.which != 0)
            return false;

        if ($(this).val().length != 0 && $(this).val() != "1" && (e.which >= 48 && e.which <= 57))
            return false;

        //GostergeYaz($(this).attr('id'));
    });

    $("input.Kademe").keypress(function (e) {
        if ((e.which != 8 && e.which != 0 && (e.which < 49 || e.which > 57)) || (e.which == 17 || e.which == 78)) {
            return false;
        }

        //GostergeYaz($(this).attr("id").replace('Kademe', 'Derece'));
    });

    $("input.Derece").blur(function (e) {
        GostergeYaz($(this).attr('id'));
    });

    $("input.Kademe").blur(function (e) {
        GostergeYaz($(this).attr("id").replace('Kademe', 'Derece'));
    });

    function GostergeYaz(obj) {

        if ($('#' + obj).val() == "" || $('#' + obj.replace('Derece', 'Kademe')).val() == "")
            $('#' + obj.replace('Derece', 'Gosterge')).val("");
        else
            $('#' + obj.replace('Derece', 'Gosterge')).val(Gostergeler[$('#' + obj).val()][$('#' + obj.replace('Derece', 'Kademe')).val()]);

    }

    $("#sessionTimer").click(function (event) {
        event.preventDefault();
        $(this).hide("slow");
    });


    var $sort = this;
    var $table = $('table.sorttable');
    var $rows = $('tbody > tr.sort', $table);
    $rows.sort(function (a, b) {
        var keyA = $('td:eq(0)', a).text();
        var keyB = $('td:eq(0)', b).text();
        if ($($sort).hasClass('asc')) {
            return (parseInt(keyA) > parseInt(keyB)) ? 1 : 0;
        } else {
            return (parseInt(keyA) > parseInt(keyB)) ? 1 : 0;
        }
    });
    $.each($rows, function (index, row) {
        $table.append(row);
    });

});



//});

//CountBack();

//function CountBack() {

//    secs = secs - 1;
//    $("#sessionTimer p").html("Oturum <b>" + secs + "</b> saniye sonra otomatik olarak kapatılacak.");
//    // 300. ve 150. saniyede oturum kapanıyor geri sayımı 
//    if (secs == 300 || secs == 150)
//        $("#sessionTimer").show("slow");

//    // 60 saniye kala dialog göster.
//    if (secs == 60) {

//        $("#sessionTimerMsg").dialog({
//            modal: false,
//            title: "Uyarı",
//            zIndex: 30000,
//            buttons: {
//                Tamam: function () {
//                    $(this).dialog("close");
//                }
//            }
//        });

//    }

//    if (secs > 0)
//        setTimeout("CountBack()", 1000);
//    else
//        window.location = "/Login.aspx?Cikis=1&Gonderen=JS";
//}


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    $('div.calendar_top strong').html(h + ":" + m + ":" + s);
    t = setTimeout('startTime()', 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function copyToClipboard(s) {
    if (window.clipboardData && clipboardData.setData) {
        clipboardData.setData("Text", s);
    }
    else {
        // You have to sign the code to enable this or allow the action in about:config by changing
        user_pref("signed.applets.codebase_principal_support", true);
        netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

        var clip = Components.classes['@mozilla.org/widget/clipboard;[[[[1]]]]'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip) return;

        // create a transferable
        var trans = Components.classes['@mozilla.org/widget/transferable;[[[[1]]]]'].createInstance(Components.interfaces.nsITransferable);
        if (!trans) return;

        // specify the data we wish to handle. Plaintext in this case.
        trans.addDataFlavor('text/unicode');

        // To get the data from the transferable we need two new objects
        var str = new Object();
        var len = new Object();

        var str = Components.classes["@mozilla.org/supports-string;[[[[1]]]]"].createInstance(Components.interfaces.nsISupportsString);

        var copytext = meintext;

        str.data = copytext;

        trans.setTransferData("text/unicode", str, copytext.length * [[[[2]]]]);

        var clipid = Components.interfaces.nsIClipboard;

        if (!clip) return false;

        clip.setData(trans, null, clipid.kGlobalClipboard);
    }
}

function AboneNoOnKeyPress(control1, control2) {
    var Input1 = control1; //  $find(control1);

    var input2 = document.getElementById(control2);
    var aboneno = Input1.value;
    var abonetipi = input2.value;

    if (aboneno.indexOf('G') != -1) {
        aboneno = aboneno.replace('G', '');
    }

    var uzunluk = 0;
    var ozelkaraktervarmi = 0;
    var ozelkarakter = "";
    var Input3 = "";
    if (abonetipi == 1) {
        uzunluk = 11;
    }
    if (abonetipi == 2) {
        uzunluk = 10;
    }
    if (abonetipi == 5) {
        uzunluk = 11;
    }
    if (abonetipi == 4) {
        uzunluk = 11;
    }

    if (uzunluk == 0) {
        alert("TextBox maxlenght 0 dır. Base.js abonetipi ayarı yapın!");
    }

    var start = Input1.selectionStart;
    var end = Input1.selectionEnd;
    if (Input1.selectionEnd - Input1.selectionStart > 0) {

    } else
        if (aboneno.length == uzunluk) {
            event.returnValue = false;
            return;
        }

    if (!(event.keyCode == 45 || event.keyCode == 46 || event.keyCode == 48 || event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51 || event.keyCode == 52 || event.keyCode == 53 || event.keyCode == 54 || event.keyCode == 55 || event.keyCode == 56 || event.keyCode == 57 || event.keyCode == 71 || event.keyCode == 78)) {
        event.returnValue = false;
        return;
    }

    event.returnValue = true;
}

function AboneNoOnBlur(control1, control2) {
    var Input1 = control1; //  $find(control1);

    var input2 = document.getElementById(control2);
    var aboneno = Input1.value;
    var abonetipi = input2.value;

    var uzunluk = 0;
    var ozelkaraktervarmi = 0;
    var ozelkarakter = "";
    var Input3 = "";
    if (abonetipi == 1) {
        uzunluk = 11;
    }
    if (abonetipi == 2) {
        uzunluk = 10;
        ozelkaraktervarmi = 1;
        ozelkarakter = "G";
    }
    if (abonetipi == 5) {
        uzunluk = 11;
        //ozelkaraktervarmi = 1;
        //ozelkarakter = "N";
    }

    if (aboneno.length > 0 && aboneno != 0) {
        if (aboneno.length == 11) {
            if (ozelkarakter != "") {
                if (aboneno.indexOf(ozelkarakter) != -1) {
                    aboneno = aboneno.substring(1, aboneno.length);
                } else {
                    aboneno = aboneno.substring(0, aboneno.length - 1);
                }
            }
        }

        if (aboneno.indexOf(ozelkarakter) != -1) {
            aboneno = aboneno.replace(ozelkarakter, '');
        }
        var result = uzunluk - (aboneno.length);

        for (var i = 0; i < result; i++) {
            Input3 = Input3 + "0";
        }

        if (abonetipi == 1) {
            aboneno = aboneno.replace("N", '');
            aboneno = aboneno.replace("G", '');
        }

        Input3 = ozelkarakter + Input3 + aboneno;
        Input1.value = Input3;
    }
    return;
}

function PopupDialogAc(href, baslik, genislik, yukseklik) {

    if (genislik == -1 || yukseklik == -1) {
        genislik = $(window).width() / 100 * 95;
        yukseklik = $(window).height() / 100 * 95;
    }

    $('#ctl00_dialogContainer').append('<div id="dialogModalize"><div id="divIframe" style="width:99%;height:99%;"><iframe src="' + href + '" width="100%" height="100%"></iframe></div></div>');

    $("#dialogModalize").dialog({
        autoOpen: true,
        zIndex: 9999,
        show: 'fade',
        hide: 'fade',
        closeText: 'Kapat',
        closeOnEscape: true,
        width: genislik,
        height: yukseklik,
        modal: true,
        draggable: false,
        open: function (event, ui) {
            $(this).parent().find('.ui-dialog-title').append("<span> " + baslik + " </span>");
        },
        close: function () {
            $(this).dialog("close");
            $('#divIframe').remove();
            if (refresParent) {
                $($get("ctl00_PersonelGenelArama1_btnRefresh")).click();
            }
        }
    }).parent().appendTo($("form"));
}
String.prototype.turkishToUpper = function () {
    var string = this;
    var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
    string = string.replace(/(([iışğüçö]))/g, function (letter) { return letters[letter]; });
    return string.toUpperCase();
};

