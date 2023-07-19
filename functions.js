// Swatch Applet
$(document).ready(function() {
    function generateRandomString(length) {

        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }
    var string = generateRandomString(10);
    $("#random_string").text(string);
    var whichTheme = localStorage.getItem("theme");
    var activeTheme = localStorage.getItem("activeTheme");
    var savedTheme = localStorage.getItem("savedTheme");
    var activeLogo = localStorage.getItem("activeLogo");
    var activeThemeType = localStorage.getItem("themeType");
    // If no theme is detected (for example, a new visitor), then set this to default
    if (!whichTheme) {
        // dark-mode media query matched or not
        let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
        //var override = getUrlParameter('override');

        if (matched) {
            // Offer the NORD theme by default
            whichTheme = "nord";
            activeTheme = "/assets/customcss/nord.css?version=" + string;
            //$("link[rel=stylesheet]").attr('href' , thishref + "?version=" + string + "");
        } else {
            // Leave the default theme intact
            whichTheme = "default";
            activeTheme = "/assets/customcss/flatly.css?version=" + string;
        }
        // See if override has been enabled
        if (whichTheme === 'default') {
            // Sudonix is overriding operating system settings and will force dark scheme
            activeTheme = "/assets/customcss/flatly.css?version=" + string;
        } else {
            // Nothing to do :)
        }
    }
    if (whichTheme) {
        $.get(activeTheme, function(css) {
            $('<style type="text/css"></style>')
                .html(css)
                .appendTo("head");
        });
        // Check to see if we're using a light theme - if so, add orange gradient to slogan
        if (activeThemeType === "dim") {
            // The string contains any of the substrings
            $('#siteSlogan').addClass("slogan-gradient-dark");
            $('#siteSlogan').removeClass("slogan-gradient");
        }
        if (activeThemeType === "dark") {
            // The string contains any of the substrings
            $('#siteSlogan').addClass("slogan-gradient-dark");
            $('#siteSlogan').removeClass("slogan-gradient");
        }
        if (activeThemeType === "light") {
            // The string contains any of the substrings
            $('#siteSlogan').removeClass("slogan-gradient-dark");
            $('#siteSlogan').addClass("slogan-gradient");
        }
    } else {}
    $(document).ready(function() {
        $("body").on("click change", "#theme li", function() {
            var string = generateRandomString(10);
            $("#random_string").text(string);
            var thishref = $(this).attr('rel') + '?version=' + string;
            $.get(thishref, function(css) {
                $('<style type="text/css"></style>')
                    .html(css)
                    .appendTo("head");
            });
            // Check to see if we're using a light theme - if so, add orange gradient to slogan
            var newThemeType = $(this).attr("theme-type");
            if (newThemeType === "dim") {
                // The string contains any of the substrings
                $('#siteSlogan').removeClass("slogan-gradient");
                $('#siteSlogan').addClass("slogan-gradient-dark");
            }
            if (newThemeType === "dark") {
                // The string contains any of the substrings
                $('#siteSlogan').removeClass("slogan-gradient");
                $('#siteSlogan').addClass("slogan-gradient-dark");
            }
            if (newThemeType === "light") {
                // The string contains any of the substrings
                $('#siteSlogan').removeClass("slogan-gradient-dark");
                $('#siteSlogan').addClass("slogan-gradient");
            }

            var selected = "logo"; //$(this).attr("id");
            var theTheme = $(this).attr("rel");
            var theID = $(this).attr("id");
            if (selected === 'default') {
                localStorage.setItem("theme", selected);
                localStorage.setItem("activeLogo", selected);
                localStorage.setItem("activeTheme", "/assets/customcss/flatly.css?version=" + string);
                localStorage.setItem("themeType", newThemeType);
                //location.reload();
            } else {
                localStorage.setItem("theme", selected);
                localStorage.setItem("savedTheme", theID);
                localStorage.setItem("activeLogo", selected);
                localStorage.setItem("activeTheme", theTheme);
                localStorage.setItem("themeType", newThemeType);
            }
            return false;
        });
    });
});
