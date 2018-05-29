/*eslint-disable */
/*
  @author: GeoGebra - Dynamic Mathematics for Everyone, http://www.geogebra.org
  @license: This file is subject to the GeoGebra Non-Commercial License Agreement, see http://www.geogebra.org/license. For questions please write us at office@geogebra.org.
*/
var latestVersion = "5.0.381.0";
var isRenderGGBElementEnabled = false;
var scriptLoadStarted = false;
var html5AppletsToProcess = null;
var ggbHTML5LoadedCodebaseIsWebSimple = false;
var ggbHTML5LoadedCodebaseVersion = null;
var ggbHTML5LoadedScript = null;
var ggbCompiledResourcesLoadFinished = false;
var ggbCompiledResourcesLoadInProgress = false;
var ggbCompiledAppletsLoaded = false;
var GGBApplet = function() {
    "use strict";
    var applet = {};
    var ggbVersion = "5.0";
    var parameters = {};
    var views = null;
    var html5NoWebSimple = false;
    var html5NoWebSimpleParamExists = false;
    var appletID = null;
    var initComplete = false;
    var html5OverwrittenCodebaseVersion = null;
    var html5OverwrittenCodebase = null;
    for (var i = 0; i < arguments.length; i++) {
        var p = arguments[i];
        if (p !== null) {
            switch (typeof p) {
                case "number":
                    ggbVersion = p.toFixed(1);
                    break;
                case "string":
                    if (p.match(new RegExp("^[0-9]\\.[0-9]+$"))) {
                        ggbVersion = p;
                    } else {
                        appletID = p;
                    }
                    break;
                case "object":
                    if (typeof p.is3D !== "undefined") {
                        views = p;
                    } else {
                        parameters = p;
                    }
                    break;
                case "boolean":
                    html5NoWebSimple = p;
                    html5NoWebSimpleParamExists = true;
                    break;
            }
        }
    }
    if (views === null) {
        views = {
            is3D: false,
            AV: false,
            SV: false,
            CV: false,
            EV2: false,
            CP: false,
            PC: false,
            DA: false,
            FI: false,
            PV: false,
            macro: false
        };
        if (
            parameters.material_id !== undefined &&
            !html5NoWebSimpleParamExists
        ) {
            html5NoWebSimple = true;
        }
    }
    if (appletID !== null && parameters.id === undefined) {
        parameters.id = appletID;
    }
    var jnlpFilePath = "";
    var html5Codebase = "";
    var isHTML5Offline = false;
    var loadedAppletType = null;
    var html5CodebaseVersion = null;
    var html5CodebaseScript = null;
    var html5CodebaseIsWebSimple = false;
    var previewImagePath = null;
    var previewLoadingPath = null;
    var previewPlayPath = null;
    var fonts_css_url = null;
    var jnlpBaseDir = null;
    var preCompiledScriptPath = null;
    var preCompiledResourcePath = null;
    var preCompiledScriptVersion = null;
    if (parameters.height !== undefined) {
        parameters.height = Math.round(parameters.height);
    }
    if (parameters.width !== undefined) {
        parameters.width = Math.round(parameters.width);
    }
    var parseVersion = function(d) {
        return parseFloat(d) > 4 ? parseFloat(d) : 5;
    };
    applet.setHTML5Codebase = function(codebase, offline) {
        html5OverwrittenCodebase = codebase;
        setHTML5CodebaseInternal(codebase, offline);
    };
    applet.setJavaCodebaseVersion = function(version) {};
    applet.setHTML5CodebaseVersion = function(version, offline) {
        var numVersion = parseFloat(version);
        if (numVersion !== NaN && numVersion < 5) {
            console.log(
                "The GeoGebra HTML5 codebase version " +
                    numVersion +
                    " is deprecated. Using version " +
                    latestVersion +
                    " instead."
            );
            return;
        }
        html5OverwrittenCodebaseVersion = version;
        setDefaultHTML5CodebaseForVersion(version, offline);
    };
    applet.getHTML5CodebaseVersion = function() {
        return html5CodebaseVersion;
    };
    applet.getParameters = function() {
        return parameters;
    };
    applet.setJavaCodebase = function(codebase, offline) {};
    applet.setFontsCSSURL = function(url) {
        fonts_css_url = url;
    };
    applet.setGiacJSURL = function(url) {};
    applet.setJNLPFile = function(newJnlpFilePath) {
        jnlpFilePath = newJnlpFilePath;
    };
    applet.setJNLPBaseDir = function(baseDir) {};
    applet.inject = function() {
        function isOwnIFrame() {
            return (
                window.frameElement &&
                window.frameElement.getAttribute("data-singleton")
            );
        }
        var type = "auto";
        var container_ID = parameters.id;
        var container;
        var noPreview = false;
        for (var i = 0; i < arguments.length; i++) {
            var p = arguments[i];
            if (typeof p === "string") {
                p = p.toLowerCase();
                if (
                    p === "preferjava" ||
                    p === "preferhtml5" ||
                    p === "java" ||
                    p === "html5" ||
                    p === "auto" ||
                    p === "screenshot" ||
                    p === "prefercompiled" ||
                    p === "compiled"
                ) {
                    type = p;
                } else {
                    container_ID = arguments[i];
                }
            } else if (typeof p === "boolean") {
                noPreview = p;
            } else if (p instanceof HTMLElement) {
                container = p;
            }
        }
        continueInject();
        function continueInject() {
            if (!initComplete) {
                setTimeout(continueInject, 200);
                return;
            }
            type = detectAppletType(type);
            var appletElem = container || document.getElementById(container_ID);
            if (!appletElem) {
                console.log("possibly bug on ajax loading? ");
                return;
            }
            applet.removeExistingApplet(appletElem, false);
            if (parameters.width === undefined && appletElem.clientWidth) {
                parameters.width = appletElem.clientWidth;
            }
            if (parameters.height === undefined && appletElem.clientHeight) {
                parameters.height = appletElem.clientHeight;
            }
            if (!(parameters.width && parameters.height) && type === "html5") {
                delete parameters.width;
                delete parameters.height;
            }
            loadedAppletType = type;
            if (type === "screenshot") {
                injectScreenshot(appletElem, parameters);
            } else if (type === "compiled") {
                injectCompiledApplet(appletElem, parameters, true);
            } else {
                var playButton = false;
                if (
                    (parameters.hasOwnProperty("playButton") &&
                        parameters.playButton) ||
                    (parameters.hasOwnProperty("clickToLoad") &&
                        parameters.clickToLoad)
                ) {
                    playButton = true;
                } else if (
                    parameters.hasOwnProperty("playButtonAutoDecide") &&
                    parameters.playButtonAutoDecide
                ) {
                    playButton =
                        (!isInIframe() || isOwnIFrame()) && isMobileDevice();
                }
                if (playButton) {
                    loadedAppletType = "screenshot";
                    injectPlayButton(appletElem, parameters, noPreview, type);
                } else {
                    injectHTML5Applet(appletElem, parameters, noPreview);
                }
            }
        }
        return;
    };
    function isInIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
    function isMobileDevice() {
        if (
            parameters.hasOwnProperty("screenshotGenerator") &&
            parameters.screenshotGenerator
        ) {
            return false;
        }
        return Math.max(screen.width, screen.height) < 800;
    }
    applet.getViews = function() {
        return views;
    };
    applet.isJavaInstalled = function() {
        return false;
    };
    function pluginEnabled(name) {
        var plugins = navigator.plugins,
            i = plugins.length,
            regExp = new RegExp(name, "i");
        while (i--) {
            if (regExp.test(plugins[i].name)) {
                return true;
            }
        }
        return false;
    }
    var getTubeURL = function() {
        var tubeurl, protocol;
        if (parameters.tubeurl !== undefined) {
            tubeurl = parameters.tubeurl;
        } else if (
            window.location.host.indexOf("www.geogebra.org") > -1 ||
            window.location.host.indexOf("www-beta.geogebra.org") > -1 ||
            window.location.host.indexOf("www-test.geogebra.org") > -1 ||
            window.location.host.indexOf("alpha.geogebra.org") > -1 ||
            window.location.host.indexOf("beta.geogebra.org") > -1 ||
            window.location.host.indexOf("tube.geogebra.org") > -1 ||
            window.location.host.indexOf("tube-beta.geogebra.org") > -1 ||
            window.location.host.indexOf("cloud.geogebra.org") > -1 ||
            window.location.host.indexOf("cloud-beta.geogebra.org") > -1 ||
            window.location.host.indexOf("cloud-stage.geogebra.org") > -1 ||
            window.location.host.indexOf("stage.geogebra.org") > -1 ||
            window.location.host.indexOf("tube-test.geogebra.org") > -1
        ) {
            tubeurl = window.location.protocol + "//" + window.location.host;
        } else {
            if (window.location.protocol.substr(0, 4) === "http") {
                protocol = window.location.protocol;
            } else {
                protocol = "http:";
            }
            tubeurl = protocol + "//www.geogebra.org";
        }
        return tubeurl;
    };
    var fetchParametersFromTube = function(successCallback) {
        var tubeurl = getTubeURL();
        var api_request = {
                request: {
                    "-api": "1.0.0",
                    login: { "-type": "cookie", "-getuserinfo": "false" },
                    task: {
                        "-type": "fetch",
                        fields: {
                            field: [
                                { "-name": "id" },
                                { "-name": "geogebra_format" },
                                { "-name": "width" },
                                { "-name": "height" },
                                { "-name": "toolbar" },
                                { "-name": "menubar" },
                                { "-name": "inputbar" },
                                { "-name": "reseticon" },
                                { "-name": "labeldrags" },
                                { "-name": "shiftdragzoom" },
                                { "-name": "rightclick" },
                                { "-name": "ggbbase64" },
                                { "-name": "preview_url" }
                            ]
                        },
                        filters: {
                            field: [
                                {
                                    "-name": "id",
                                    "#text": "" + parameters.material_id + ""
                                }
                            ]
                        },
                        order: { "-by": "id", "-type": "asc" },
                        limit: { "-num": "1" }
                    }
                }
            },
            success = function() {
                var text = xhr.responseText;
                var jsondata = JSON.parse(text);
                var item = null;
                for (i = 0; i < jsondata.responses.response.length; i++) {
                    if (jsondata.responses.response[i].item !== undefined) {
                        item = jsondata.responses.response[i].item;
                    }
                }
                if (item === null) {
                    onError();
                    return;
                }
                if (item.geogebra_format !== "") {
                    ggbVersion = item.geogebra_format;
                }
                if (parameters.ggbBase64 === undefined) {
                    parameters.ggbBase64 = item.ggbBase64;
                }
                if (parameters.width === undefined) {
                    parameters.width = item.width;
                }
                if (parameters.height === undefined) {
                    parameters.height = item.height;
                }
                if (parameters.showToolBar === undefined) {
                    parameters.showToolBar = item.toolbar === "true";
                }
                if (parameters.showMenuBar === undefined) {
                    parameters.showMenuBar = item.menubar === "true";
                }
                if (parameters.showAlgebraInput === undefined) {
                    parameters.showAlgebraInput = item.inputbar === "true";
                }
                if (parameters.showResetIcon === undefined) {
                    parameters.showResetIcon = item.reseticon === "true";
                }
                if (parameters.enableLabelDrags === undefined) {
                    parameters.enableLabelDrags = item.labeldrags === "true";
                }
                if (parameters.enableShiftDragZoom === undefined) {
                    parameters.enableShiftDragZoom =
                        item.shiftdragzoom === "true";
                }
                if (parameters.enableRightClick === undefined) {
                    parameters.enableRightClick = item.rightclick === "true";
                }
                if (parameters.showToolBarHelp === undefined) {
                    parameters.showToolBarHelp = parameters.showToolBar;
                }
                if (parseFloat(item.geogebra_format) >= 5) {
                    views.is3D = true;
                }
                var previewUrl =
                    item.previewUrl === undefined
                        ? tubeurl + "/files/material-" + item.id + ".png"
                        : item.previewUrl;
                applet.setPreviewImage(
                    previewUrl,
                    tubeurl + "/images/GeoGebra_loading.png",
                    tubeurl + "/images/applet_play.png"
                );
                successCallback();
            };
        var url = tubeurl + "/api/json.php";
        var xhr = createCORSRequest("POST", url);
        var onError = function() {
            log(
                "Error: The request for fetching material_id " +
                    parameters.material_id +
                    " from tube was not successful."
            );
        };
        if (!xhr) {
            onError();
            return;
        }
        xhr.onload = success;
        xhr.onerror = onError;
        xhr.onprogress = function() {};
        if (xhr.setRequestHeader) {
            xhr.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
        }
        xhr.send(JSON.stringify(api_request));
    };
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest !== "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    }
    applet.isHTML5Installed = function() {
        if (isInternetExplorer()) {
            if (
                (views.is3D || html5CodebaseScript === "web3d.nocache.js") &&
                getIEVersion() < 11
            ) {
                return false;
            } else if (getIEVersion() < 10) {
                return false;
            }
        }
        return true;
    };
    applet.isCompiledInstalled = function() {
        if (isInternetExplorer()) {
            if (views.is3D && getIEVersion() < 11) {
                return false;
            } else if (getIEVersion() < 9) {
                return false;
            }
        }
        return true;
    };
    applet.getLoadedAppletType = function() {
        return loadedAppletType;
    };
    applet.setPreviewImage = function(
        previewFilePath,
        loadingFilePath,
        playFilePath
    ) {
        previewImagePath = previewFilePath;
        previewLoadingPath = loadingFilePath;
        previewPlayPath = playFilePath;
    };
    applet.removeExistingApplet = function(appletParent, showScreenshot) {
        var i;
        if (typeof appletParent === "string") {
            appletParent = document.getElementById(appletParent);
        }
        if (
            loadedAppletType === "compiled" &&
            window[parameters.id] !== undefined
        ) {
            if (typeof window[parameters.id].stopAnimation === "function") {
                window[parameters.id].stopAnimation();
            }
            if (typeof window[parameters.id].remove === "function") {
                window[parameters.id].remove();
            }
            if (ggbApplets !== undefined) {
                for (i = 0; i < ggbApplets.length; i++) {
                    if (ggbApplets[i] === window[parameters.id]) {
                        ggbApplets.splice(i, 1);
                    }
                }
            }
            window[parameters.id] = undefined;
        }
        loadedAppletType = null;
        for (i = 0; i < appletParent.childNodes.length; i++) {
            var tag = appletParent.childNodes[i].tagName;
            var className = appletParent.childNodes[i].className;
            if (appletParent.childNodes[i].className === "applet_screenshot") {
                if (showScreenshot) {
                    appletParent.childNodes[i].style.display = "block";
                    loadedAppletType = "screenshot";
                } else {
                    appletParent.childNodes[i].style.display = "none";
                }
            } else if (
                (tag === "APPLET" ||
                    tag === "ARTICLE" ||
                    tag === "DIV" ||
                    (loadedAppletType === "compiled" &&
                        (tag === "SCRIPT" || tag === "STYLE"))) &&
                className !== "applet_scaler prerender"
            ) {
                appletParent.removeChild(appletParent.childNodes[i]);
                i--;
            }
        }
        var appName = parameters.id !== undefined ? parameters.id : "ggbApplet";
        var app = window[appName];
        if (app) {
            if (
                typeof app === "object" &&
                typeof app.getBase64 === "function"
            ) {
                app.remove();
                window[appName] = null;
            }
        }
    };
    applet.refreshHitPoints = function() {
        if (parseVersion(ggbHTML5LoadedCodebaseVersion) >= 5) {
            return true;
        }
        var app = applet.getAppletObject();
        if (app) {
            if (typeof app.recalculateEnvironments === "function") {
                app.recalculateEnvironments();
                return true;
            }
        }
        return false;
    };
    applet.startAnimation = function() {
        var app = applet.getAppletObject();
        if (app) {
            if (typeof app.startAnimation === "function") {
                app.startAnimation();
                return true;
            }
        }
        return false;
    };
    applet.stopAnimation = function() {
        var app = applet.getAppletObject();
        if (app) {
            if (typeof app.stopAnimation === "function") {
                app.stopAnimation();
                return true;
            }
        }
        return false;
    };
    applet.setPreCompiledScriptPath = function(path, version) {
        preCompiledScriptPath = path;
        if (preCompiledResourcePath === null) {
            preCompiledResourcePath = preCompiledScriptPath;
        }
        preCompiledScriptVersion = version;
    };
    applet.setPreCompiledResourcePath = function(path) {
        preCompiledResourcePath = path;
    };
    applet.getAppletObject = function() {
        var appName = parameters.id !== undefined ? parameters.id : "ggbApplet";
        return window[appName];
    };
    applet.resize = function() {};
    var appendParam = function(applet, name, value) {
        var param = document.createElement("param");
        param.setAttribute("name", name);
        param.setAttribute("value", value);
        applet.appendChild(param);
    };
    var valBoolean = function(value) {
        return value && value !== "false";
    };
    var injectHTML5Applet = function(appletElem, parameters, noPreview) {
        if (parseVersion(html5CodebaseVersion) <= 4.2) {
            noPreview = true;
        }
        var loadScript = !isRenderGGBElementEnabled && !scriptLoadStarted;
        if (
            (!isRenderGGBElementEnabled && !scriptLoadStarted) ||
            (ggbHTML5LoadedCodebaseVersion !== html5CodebaseVersion ||
                (ggbHTML5LoadedCodebaseIsWebSimple &&
                    !html5CodebaseIsWebSimple))
        ) {
            loadScript = true;
            isRenderGGBElementEnabled = false;
            scriptLoadStarted = false;
        }
        var article = document.createElement("article");
        var oriWidth = parameters.width;
        var oriHeight = parameters.height;
        if (parameters.width !== undefined) {
            if (parseVersion(html5CodebaseVersion) <= 4.4) {
                if (valBoolean(parameters.showToolBar)) {
                    parameters.height -= 7;
                }
                if (valBoolean(parameters.showAlgebraInput)) {
                    parameters.height -= 37;
                }
                if (
                    parameters.width < 605 &&
                    valBoolean(parameters.showToolBar)
                ) {
                    parameters.width = 605;
                    oriWidth = 605;
                }
            } else {
                var minWidth = 100;
                if (
                    valBoolean(parameters.showToolBar) ||
                    valBoolean(parameters.showMenuBar)
                ) {
                    if (parameters.hasOwnProperty("customToolBar")) {
                        parameters.customToolbar = parameters.customToolBar;
                    }
                    minWidth = valBoolean(parameters.showMenuBar) ? 245 : 155;
                }
                if (oriWidth < minWidth) {
                    parameters.width = minWidth;
                    oriWidth = minWidth;
                }
            }
        }
        article.className = "notranslate";
        article.style.border = "none";
        article.style.display = "inline-block";
        for (var key in parameters) {
            if (
                parameters.hasOwnProperty(key) &&
                key !== "appletOnLoad" &&
                key !== "scale"
            ) {
                article.setAttribute("data-param-" + key, parameters[key]);
            }
        }
        applet.resize = function() {
            GGBAppletUtils.responsiveResize(appletElem, parameters);
        };
        if (typeof jQuery === "function") {
            jQuery(window).resize(function() {
                applet.resize();
            });
        } else {
            var oldOnResize = null;
            if (
                window.onresize !== undefined &&
                typeof window.onresize === "function"
            ) {
                oldOnResize = window.onresize;
            }
            window.onresize = function() {
                applet.resize();
                if (typeof oldOnResize === "function") {
                    oldOnResize();
                }
            };
        }
        if (!noPreview && parameters.width !== undefined) {
            if (!parameters.hasOwnProperty("showSplash")) {
                article.setAttribute("data-param-showSplash", "false");
            }
            var previewPositioner = appletElem.querySelector(
                ".applet_scaler.prerender"
            );
            var preRendered = previewPositioner !== null;
            if (!preRendered) {
                var previewContainer = createScreenShotDiv(
                    oriWidth,
                    oriHeight,
                    parameters.borderColor,
                    false
                );
                previewPositioner = document.createElement("div");
                previewPositioner.className = "applet_scaler";
                previewPositioner.style.position = "relative";
                previewPositioner.style.display = "block";
                previewPositioner.style.width = oriWidth + "px";
                previewPositioner.style.height = oriHeight + "px";
            } else {
                var previewContainer = previewPositioner.querySelector(
                    ".ggb_preview"
                );
            }
            if (window.GGBT_spinner) {
                window.GGBT_spinner.attachSpinner(previewPositioner, "66%");
            }
            if (parseVersion(html5CodebaseVersion) >= 5) {
                if (typeof parameters.appletOnLoad === "function") {
                    var oriAppletOnload = parameters.appletOnLoad;
                }
                parameters.appletOnLoad = function() {
                    var preview = appletElem.querySelector(".ggb_preview");
                    if (preview) {
                        preview.parentNode.removeChild(preview);
                    }
                    if (window.GGBT_spinner) {
                        window.GGBT_spinner.removeSpinner(previewPositioner);
                    }
                    if (window.GGBT_wsf_view) {
                        $(window).trigger("resize");
                    } else {
                        window.onresize();
                    }
                    if (typeof oriAppletOnload === "function") {
                        oriAppletOnload();
                    }
                };
                if (!preRendered) {
                    previewPositioner.appendChild(previewContainer);
                }
            } else {
                article.appendChild(previewContainer);
            }
            previewPositioner.appendChild(article);
            if (!preRendered) {
                appletElem.appendChild(previewPositioner);
            }
            setTimeout(function() {
                applet.resize();
            }, 1);
        } else {
            var appletScaler = document.createElement("div");
            appletScaler.className = "applet_scaler";
            appletScaler.style.position = "relative";
            appletScaler.style.display = "block";
            appletScaler.appendChild(article);
            appletElem.appendChild(appletScaler);
            applet.resize();
        }
        function renderGGBElementWithParams(article, parameters) {
            if (
                parameters &&
                typeof parameters.appletOnLoad === "function" &&
                typeof renderGGBElement === "function"
            ) {
                renderGGBElement(article, parameters.appletOnLoad);
            } else {
                renderGGBElement(article);
            }
            log(
                "GeoGebra HTML5 applet injected and rendered with previously loaded codebase.",
                parameters
            );
        }
        function renderGGBElementOnTube(a, parameters) {
            if (typeof renderGGBElement === "undefined") {
                if (html5AppletsToProcess === null) {
                    html5AppletsToProcess = [];
                }
                html5AppletsToProcess.push({ article: a, params: parameters });
                window.renderGGBElementReady = function() {
                    isRenderGGBElementEnabled = true;
                    if (
                        html5AppletsToProcess !== null &&
                        html5AppletsToProcess.length
                    ) {
                        html5AppletsToProcess.forEach(function(obj) {
                            renderGGBElementWithParams(obj.article, obj.params);
                        });
                        html5AppletsToProcess = null;
                    }
                };
                if (parseVersion(html5CodebaseVersion) < 5) {
                    a.className += " geogebraweb";
                }
            } else {
                renderGGBElementWithParams(a, parameters);
            }
        }
        if (loadScript) {
            scriptLoadStarted = true;
            if (parseVersion(html5CodebaseVersion) >= 4.4) {
                var f_c_u;
                if (fonts_css_url === null) {
                    f_c_u = html5Codebase + "css/fonts.css";
                } else {
                    f_c_u = fonts_css_url;
                }
                var fontscript1 = document.createElement("script");
                fontscript1.type = "text/javascript";
                fontscript1.innerHTML =
                    "\n" +
                    "//<![CDATA[\n" +
                    "WebFontConfig = {\n" +
                    "   loading: function() {},\n" +
                    "   active: function() {},\n" +
                    "   inactive: function() {},\n" +
                    "   fontloading: function(familyName, fvd) {},\n" +
                    "   fontactive: function(familyName, fvd) {},\n" +
                    "   fontinactive: function(familyName, fvd) {},\n" +
                    "   custom: {\n" +
                    '       families: ["geogebra-sans-serif", "geogebra-serif"],\n' +
                    '           urls: [ "' +
                    f_c_u +
                    '" ]\n' +
                    "   }\n" +
                    "};\n" +
                    "//]]>\n" +
                    "\n";
                appletElem.appendChild(fontscript1);
                if (!html5Codebase.requirejs) {
                    var fontscript2 = document.createElement("script");
                    fontscript2.type = "text/javascript";
                    fontscript2.src = html5Codebase + "js/webfont.js";
                    appletElem.appendChild(fontscript2);
                }
            }
            for (var i = 0; i < article.childNodes.length; i++) {
                var tag = article.childNodes[i].tagName;
                if (tag === "TABLE") {
                    article.removeChild(article.childNodes[i]);
                    i--;
                }
            }
            if (ggbHTML5LoadedScript !== null) {
                var el = document.querySelector(
                    'script[src="' + ggbHTML5LoadedScript + '"]'
                );
                if (el !== undefined) {
                    el.parentNode.removeChild(el);
                }
            }
            var script = document.createElement("script");
            var scriptLoaded = function() {
                renderGGBElementOnTube(article, parameters);
            };
            log(html5Codebase);
            script.src = html5Codebase + html5CodebaseScript;
            script.onload = scriptLoaded;
            ggbHTML5LoadedCodebaseIsWebSimple = html5CodebaseIsWebSimple;
            ggbHTML5LoadedCodebaseVersion = html5CodebaseVersion;
            ggbHTML5LoadedScript = script.src;
            log(
                "GeoGebra HTML5 codebase loaded: '" + html5Codebase + "'.",
                parameters
            );
            if (html5Codebase.requirejs) {
                window.require(
                    ["geogebra/runtime/js/web3d/web3d.nocache"],
                    scriptLoaded
                );
            } else {
                appletElem.appendChild(script);
            }
        } else {
            renderGGBElementOnTube(article, parameters);
        }
        parameters.height = oriHeight;
        parameters.width = oriWidth;
    };
    var injectCompiledApplet = function(appletElem, parameters, noPreview) {
        var appletObjectName = parameters.id;
        var viewContainer = document.createElement("div");
        viewContainer.id = "view-container-" + appletObjectName;
        viewContainer.setAttribute("width", parameters.width);
        viewContainer.setAttribute("height", parameters.height);
        viewContainer.style.width = parameters.width + "px";
        viewContainer.style.height = parameters.height + "px";
        if (parameters.showSplash === undefined) {
            parameters.showSplash = true;
        }
        var oldOnResize = null;
        if (
            window.onresize !== undefined &&
            typeof window.onresize === "function"
        ) {
            oldOnResize = window.onresize;
        }
        window.onresize = function() {
            var scale = GGBAppletUtils.getScale(parameters, appletElem);
            var scaleElem = null;
            for (var i = 0; i < appletElem.childNodes.length; i++) {
                if (
                    appletElem.childNodes[i].className.startsWith(
                        "applet_scaler"
                    )
                ) {
                    scaleElem = appletElem.childNodes[i];
                    break;
                }
            }
            if (scaleElem !== null) {
                scaleElem.parentNode.style.transform = "";
                if (!isNaN(scale) && scale !== 1) {
                    GGBAppletUtils.scaleElement(scaleElem, scale);
                    scaleElem.parentNode.style.width =
                        (parameters.width + 2) * scale + "px";
                    scaleElem.parentNode.style.height =
                        (parameters.height + 2) * scale + "px";
                } else {
                    GGBAppletUtils.scaleElement(scaleElem, 1);
                    scaleElem.parentNode.style.width =
                        parameters.width + 2 + "px";
                    scaleElem.parentNode.style.height =
                        parameters.height + 2 + "px";
                }
            }
            var appName =
                parameters.id !== undefined ? parameters.id : "ggbApplet";
            var app = window[appName];
            if (
                app !== undefined &&
                app !== null &&
                typeof app.recalculateEnvironments === "function"
            ) {
                app.recalculateEnvironments();
            }
            if (oldOnResize !== null) {
                oldOnResize();
            }
        };
        var viewImages = document.createElement("div");
        viewImages.id = "__ggb__images";
        var appletScaler;
        if (
            !noPreview &&
            previewImagePath !== null &&
            parseVersion(html5CodebaseVersion) >= 4.4 &&
            parameters.width !== undefined
        ) {
            var previewContainer = createScreenShotDiv(
                parameters.width,
                parameters.height,
                parameters.borderColor,
                false
            );
            var previewPositioner = document.createElement("div");
            previewPositioner.style.position = "relative";
            previewPositioner.className = "applet_scaler";
            previewPositioner.style.display = "block";
            previewPositioner.style.width = parameters.width + "px";
            previewPositioner.style.height = parameters.height + "px";
            previewPositioner.appendChild(previewContainer);
            appletElem.appendChild(previewPositioner);
            appletScaler = previewPositioner;
            setTimeout(function() {
                window.onresize();
            }, 1);
            if (typeof window.GGBT_ws_header_footer === "object") {
                window.GGBT_ws_header_footer.setWsScrollerHeight();
            }
        } else {
            appletScaler = document.createElement("div");
            appletScaler.className = "applet_scaler";
            appletScaler.style.position = "relative";
            appletScaler.style.display = "block";
            appletElem.appendChild(appletScaler);
            window.onresize();
        }
        if (
            !ggbCompiledResourcesLoadFinished &&
            !ggbCompiledResourcesLoadInProgress
        ) {
            var resource4 = document.createElement("script");
            resource4.type = "text/javascript";
            resource4.innerHTML =
                "\n" +
                "WebFontConfig = {\n" +
                "   loading: function() {},\n" +
                "   active: function() {},\n" +
                "   inactive: function() {},\n" +
                "   fontloading: function(familyName, fvd) {},\n" +
                "   fontactive: function(familyName, fvd) {" +
                "       if (!ggbCompiledAppletsLoaded) {" +
                "           ggbCompiledAppletsLoaded = true;" +
                "           " +
                "           setTimeout(function() {" +
                "               ggbCompiledResourcesLoadFinished = true;" +
                "               ggbCompiledResourcesLoadInProgress = false;" +
                "               if (window.ggbApplets != undefined) {" +
                "                   for (var i = 0 ; i < window.ggbApplets.length ; i++) {" +
                '                       window.ggbApplets[i].init({scale:window.ggbApplets[i].scaleParameter, url:window.ggbApplets[i].preCompiledScriptPath+"/", ss:' +
                (parameters.showSplash ? "true" : "false") +
                ", sdz:" +
                (parameters.enableShiftDragZoom ? "true" : "false") +
                ", rc:" +
                (parameters.enableRightClick ? "true" : "false") +
                ", sri:" +
                (parameters.showResetIcon ? "true" : "false") +
                "});" +
                "                   }" +
                "               }" +
                '               if (typeof window.ggbCompiledAppletsOnLoad == "function") {' +
                "                   window.ggbCompiledAppletsOnLoad();" +
                "               }" +
                "           },1);" +
                "       }" +
                "   },\n" +
                "   fontinactive: function(familyName, fvd) {},\n" +
                "   custom: {\n" +
                '       families: ["geogebra-sans-serif", "geogebra-serif"],\n' +
                '           urls: [ "' +
                preCompiledResourcePath +
                "/fonts/fonts.css" +
                '" ]\n' +
                "   }\n" +
                "};\n" +
                "\n";
            var resource5 = document.createElement("script");
            resource5.type = "text/javascript";
            resource5.src = preCompiledResourcePath + "/fonts/webfont.js";
            ggbCompiledResourcesLoadInProgress = true;
            appletScaler.appendChild(resource4);
            appletScaler.appendChild(resource5);
        }
        var appletStyle = document.createElement("style");
        appletStyle.innerHTML =
            "\n" +
            ".view-frame {\n" +
            "    border: 1px solid black;\n" +
            "    display: inline-block;\n" +
            "}\n" +
            "#tip {\n" +
            "    background-color: yellow;\n" +
            "    border: 1px solid blue;\n" +
            "    position: absolute;\n" +
            "    left: -200px;\n" +
            "    top: 100px;\n" +
            "};\n";
        appletScaler.appendChild(appletStyle);
        var script = document.createElement("script");
        var scriptLoaded = function() {
            window[
                appletObjectName
            ].preCompiledScriptPath = preCompiledScriptPath;
            window[appletObjectName].scaleParameter = parameters.scale;
            if (!noPreview) {
                appletScaler.querySelector(".ggb_preview").remove();
            }
            appletScaler.appendChild(viewContainer);
            appletScaler.appendChild(viewImages);
            if (ggbCompiledResourcesLoadFinished) {
                window[appletObjectName].init({
                    scale: parameters.scale,
                    url: preCompiledScriptPath + "/",
                    ss: parameters.showSplash,
                    sdz: parameters.enableShiftDragZoom,
                    rc: parameters.enableRightClick,
                    sri: parameters.showResetIcon
                });
                if (typeof window.ggbAppletOnLoad === "function") {
                    window.ggbAppletOnLoad(appletElem.id);
                }
                if (typeof parameters.appletOnLoad === "function") {
                    parameters.appletOnLoad(appletElem.id);
                }
            }
        };
        var scriptFile =
            preCompiledScriptPath +
            "/applet.js" +
            (preCompiledScriptVersion !== null &&
            preCompiledScriptVersion !== null
                ? "?v=" + preCompiledScriptVersion
                : "");
        script.src = scriptFile;
        script.onload = scriptLoaded;
        log("GeoGebra precompiled applet injected. Script=" + scriptFile + ".");
        appletScaler.appendChild(script);
    };
    var injectScreenshot = function(appletElem, parameters, showPlayButton) {
        var previewContainer = createScreenShotDiv(
            parameters.width,
            parameters.height,
            parameters.borderColor,
            showPlayButton
        );
        var previewPositioner = document.createElement("div");
        previewPositioner.style.position = "relative";
        previewPositioner.style.display = "block";
        previewPositioner.style.width = parameters.width + "px";
        previewPositioner.style.height = parameters.height + "px";
        previewPositioner.className =
            "applet_screenshot applet_scaler" +
            (showPlayButton ? " applet_screenshot_play" : "");
        previewPositioner.appendChild(previewContainer);
        var scale = GGBAppletUtils.getScale(
            parameters,
            appletElem,
            showPlayButton
        );
        if (showPlayButton) {
            appletElem.appendChild(getPlayButton());
            if (!window.GGBT_wsf_view) {
                appletElem.style.position = "relative";
            }
        } else if (window.GGBT_spinner) {
            window.GGBT_spinner.attachSpinner(previewPositioner, "66%");
        }
        appletElem.appendChild(previewPositioner);
        if (scale !== 1 && !isNaN(scale)) {
            GGBAppletUtils.scaleElement(previewPositioner, scale);
            previewPositioner.style.width = parameters.width + "px";
            previewPositioner.style.height = parameters.height + "px";
            previewPositioner.parentNode.style.width =
                parameters.width * scale + "px";
            previewPositioner.parentNode.style.height =
                parameters.height * scale + "px";
        }
        applet.resize = function() {
            resizeScreenshot(
                appletElem,
                previewContainer,
                previewPositioner,
                showPlayButton
            );
        };
        if (typeof jQuery === "function") {
            jQuery(window).resize(function() {
                applet.resize();
            });
        } else {
            var oldOnResize = null;
            if (
                window.onresize !== undefined &&
                typeof window.onresize === "function"
            ) {
                oldOnResize = window.onresize;
            }
            window.onresize = function() {
                applet.resize();
                if (typeof oldOnResize === "function") {
                    oldOnResize();
                }
            };
        }
        applet.resize();
    };
    function resizeScreenshot(
        appletElem,
        previewContainer,
        previewPositioner,
        showPlayButton,
        oldOnResize
    ) {
        if (!appletElem.contains(previewContainer)) {
            return;
        }
        if (
            typeof window.GGBT_wsf_view === "object" &&
            window.GGBT_wsf_view.isFullscreen()
        ) {
            if (appletElem.id !== "fullscreencontent") {
                return;
            }
            window.GGBT_wsf_view.setCloseBtnPosition(appletElem);
        }
        var scale = GGBAppletUtils.getScale(
            parameters,
            appletElem,
            showPlayButton
        );
        if (previewPositioner.parentNode !== null) {
            if (!isNaN(scale) && scale !== 1) {
                GGBAppletUtils.scaleElement(previewPositioner, scale);
                previewPositioner.parentNode.style.width =
                    parameters.width * scale + "px";
                previewPositioner.parentNode.style.height =
                    parameters.height * scale + "px";
            } else {
                GGBAppletUtils.scaleElement(previewPositioner, 1);
                previewPositioner.parentNode.style.width =
                    parameters.width + "px";
                previewPositioner.parentNode.style.height =
                    parameters.height + "px";
            }
        }
        if (
            typeof window.GGBT_wsf_view === "object" &&
            window.GGBT_wsf_view.isFullscreen()
        ) {
            GGBAppletUtils.positionCenter(appletElem);
        }
        if (typeof window.GGBT_ws_header_footer === "object") {
            window.GGBT_ws_header_footer.setWsScrollerHeight();
        }
        if (typeof oldOnResize === "function") {
            oldOnResize();
        }
    }
    applet.onExitFullscreen = function(fullscreenContainer, appletElem) {
        appletElem.appendChild(fullscreenContainer);
    };
    var injectPlayButton = function(appletElem, parameters, noPreview, type) {
        injectScreenshot(appletElem, parameters, true);
        var play = function() {
            var elems = [];
            for (i = 0; i < appletElem.childNodes.length; i++) {
                elems.push(appletElem.childNodes[i]);
            }
            if (window.GGBT_wsf_view) {
                var content = window.GGBT_wsf_view.renderFullScreen(
                    appletElem,
                    parameters.id
                );
                var container = document.getElementById("fullscreencontainer");
                var oldcontent = jQuery(appletElem).find(".fullscreencontent");
                if (oldcontent.length > 0) {
                    content.remove();
                    oldcontent.attr("id", "fullscreencontent").show();
                    jQuery(container).append(oldcontent);
                    window.onresize();
                } else {
                    injectHTML5Applet(content, parameters, false);
                }
                window.GGBT_wsf_view.launchFullScreen(container);
            } else {
                loadedAppletType = type;
                injectHTML5Applet(appletElem, parameters, false);
            }
            if (!window.GGBT_wsf_view) {
                for (i = 0; i < elems.length; i++) {
                    appletElem.removeChild(elems[i]);
                }
            }
        };
        var imgs = appletElem.getElementsByClassName("ggb_preview_play");
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].addEventListener("click", play, false);
            imgs[i].addEventListener("ontouchstart", play, false);
        }
        if (typeof window.ggbAppletPlayerOnload === "function") {
            window.ggbAppletPlayerOnload(appletElem);
        }
        if (isMobileDevice() && window.GGBT_wsf_view) {
            $(".wsf-element-fullscreen-button").remove();
        }
    };
    var getPlayButton = function() {
        var playButtonContainer = document.createElement("div");
        playButtonContainer.className = "ggb_preview_play icon-applet-play";
        if (!window.GGBT_wsf_view) {
            var css =
                "" +
                ".icon-applet-play {" +
                "   width: 100%;" +
                "   height: 100%;box-sizing: border-box;position: absolute;z-index: 1001;cursor: pointer;border-width: 0px;" +
                "   background-color: transparent;background-repeat: no-repeat;left: 0;top: 0;background-position: center center;" +
                '   background-image: url("' +
                getTubeURL() +
                '/images/worksheet/icon-start-applet.png");' +
                "}" +
                ".icon-applet-play:hover {" +
                'background-image: url("' +
                getTubeURL() +
                '/images/worksheet/icon-start-applet-hover.png");' +
                "}";
            var style = document.createElement("style");
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            document.getElementsByTagName("head")[0].appendChild(style);
        }
        return playButtonContainer;
    };
    var createScreenShotDiv = function(
        oriWidth,
        oriHeight,
        borderColor,
        showPlayButton
    ) {
        var previewContainer = document.createElement("div");
        previewContainer.className = "ggb_preview";
        previewContainer.style.position = "absolute";
        previewContainer.style.zIndex = "90";
        previewContainer.style.width = oriWidth - 2 + "px";
        previewContainer.style.height = oriHeight - 2 + "px";
        previewContainer.style.top = "0px";
        previewContainer.style.left = "0px";
        previewContainer.style.overflow = "hidden";
        previewContainer.style.backgroundColor = "white";
        var bc = "lightgrey";
        if (borderColor !== undefined) {
            if (borderColor === "none") {
                bc = "transparent";
            } else {
                bc = borderColor;
            }
        }
        previewContainer.style.border = "1px solid " + bc;
        var preview = document.createElement("img");
        preview.style.position = "relative";
        preview.style.zIndex = "1000";
        preview.style.top = "-1px";
        preview.style.left = "-1px";
        if (previewImagePath !== null) {
            preview.setAttribute("src", previewImagePath);
        }
        preview.style.opacity = 0.7;
        if (previewLoadingPath !== null) {
            var previewOverlay;
            var pWidth, pHeight;
            if (!showPlayButton) {
                previewOverlay = document.createElement("img");
                previewOverlay.style.position = "absolute";
                previewOverlay.style.zIndex = "1001";
                previewOverlay.style.opacity = 1;
                preview.style.opacity = 0.3;
                pWidth = 360;
                if (pWidth > oriWidth / 4 * 3) {
                    pWidth = oriWidth / 4 * 3;
                }
                pHeight = pWidth / 5.8;
                previewOverlay.setAttribute("src", previewLoadingPath);
                previewOverlay.setAttribute("width", pWidth);
                previewOverlay.setAttribute("height", pHeight);
                var pX = (oriWidth - pWidth) / 2;
                var pY = (oriHeight - pHeight) / 2;
                previewOverlay.style.left = pX + "px";
                previewOverlay.style.top = pY + "px";
                previewContainer.appendChild(previewOverlay);
            }
        }
        previewContainer.appendChild(preview);
        return previewContainer;
    };
    var detectAppletType = function(preferredType) {
        preferredType = preferredType.toLowerCase();
        if (
            preferredType === "html5" ||
            preferredType === "screenshot" ||
            preferredType === "compiled"
        ) {
            return preferredType;
        }
        if (
            preferredType === "prefercompiled" &&
            preCompiledScriptPath !== null
        ) {
            if (applet.isCompiledInstalled()) {
                return "compiled";
            }
        }
        return "html5";
    };
    var getIEVersion = function() {
        var a = navigator.appVersion;
        if (a.indexOf("Trident/7.0") > 0) {
            return 11;
        } else {
            return a.indexOf("MSIE") + 1 ? parseFloat(a.split("MSIE")[1]) : 999;
        }
    };
    var isInternetExplorer = function() {
        return getIEVersion() !== 999;
    };
    var modules = ["web", "webSimple", "web3d", "tablet", "tablet3d", "phone"];
    var setDefaultHTML5CodebaseForVersion = function(version, offline) {
        html5CodebaseVersion = version;
        if (offline) {
            setHTML5CodebaseInternal(html5CodebaseVersion, true);
            return;
        }
        var hasWebSimple = !html5NoWebSimple;
        if (hasWebSimple) {
            var v = parseVersion(html5CodebaseVersion);
            if (!isNaN(v) && v < 4.4) {
                hasWebSimple = false;
            }
        }
        var protocol, codebase;
        if (window.location.protocol.substr(0, 4) === "http") {
            protocol = window.location.protocol;
        } else {
            protocol = "http:";
        }
        var index = html5CodebaseVersion.indexOf("//");
        if (index > 0) {
            codebase = html5CodebaseVersion;
        } else if (index === 0) {
            codebase = protocol + html5CodebaseVersion;
        } else {
            codebase = "https://cdn.geogebra.org/apps/" + latestVersion + "/";
        }
        for (var key in modules) {
            if (
                html5CodebaseVersion.slice(modules[key].length * -1) ===
                    modules[key] ||
                html5CodebaseVersion.slice((modules[key].length + 1) * -1) ===
                    modules[key] + "/"
            ) {
                setHTML5CodebaseInternal(codebase, false);
                return;
            }
        }
        if (
            !GGBAppletUtils.isFlexibleWorksheetEditor() &&
            hasWebSimple &&
            !views.is3D &&
            !views.AV &&
            !views.SV &&
            !views.CV &&
            !views.EV2 &&
            !views.CP &&
            !views.PC &&
            !views.DA &&
            !views.FI &&
            !views.PV &&
            !valBoolean(parameters.showToolBar) &&
            !valBoolean(parameters.showMenuBar) &&
            !valBoolean(parameters.showAlgebraInput) &&
            !valBoolean(parameters.enableRightClick)
        ) {
            codebase += "webSimple/";
        } else {
            codebase += "web3d/";
        }
        setHTML5CodebaseInternal(codebase, false);
    };
    var setHTML5CodebaseInternal = function(codebase, offline) {
        if (codebase.requirejs) {
            html5Codebase = codebase;
            return;
        }
        if (codebase.slice(-1) !== "/") {
            codebase += "/";
        }
        html5Codebase = codebase;
        if (offline === null) {
            offline = codebase.indexOf("http") === -1;
        }
        isHTML5Offline = offline;
        html5CodebaseScript = "web.nocache.js";
        html5CodebaseIsWebSimple = false;
        var folders = html5Codebase.split("/");
        if (folders.length > 1) {
            if (!offline && folders[folders.length - 2] === "webSimple") {
                html5CodebaseScript = "webSimple.nocache.js";
                html5CodebaseIsWebSimple = true;
            } else if (modules.indexOf(folders[folders.length - 2]) >= 0) {
                html5CodebaseScript =
                    folders[folders.length - 2] + ".nocache.js";
            }
        }
        folders = codebase.split("/");
        html5CodebaseVersion = folders[folders.length - 3];
        if (html5CodebaseVersion.substr(0, 4) === "test") {
            html5CodebaseVersion =
                html5CodebaseVersion.substr(4, 1) +
                "." +
                html5CodebaseVersion.substr(5, 1);
        } else if (
            html5CodebaseVersion.substr(0, 3) === "war" ||
            html5CodebaseVersion.substr(0, 4) === "beta"
        ) {
            html5CodebaseVersion = "5.0";
        }
        var numVersion = parseFloat(html5CodebaseVersion);
        if (numVersion !== NaN && numVersion < 5) {
            console.log(
                "The GeoGebra HTML5 codebase version " +
                    numVersion +
                    " is deprecated. Using version " +
                    latestVersion +
                    " instead."
            );
            setDefaultHTML5CodebaseForVersion("5.0", offline);
        }
    };
    var log = function(text, parameters) {
        if (window.console && window.console.log) {
            if (
                !parameters ||
                typeof parameters.showLogging === "undefined" ||
                (parameters.showLogging && parameters.showLogging !== "false")
            ) {
                console.log(text);
            }
        }
    };
    if (parameters.material_id !== undefined) {
        fetchParametersFromTube(continueInit);
    } else {
        continueInit();
    }
    function continueInit() {
        var html5Version = ggbVersion;
        if (html5OverwrittenCodebaseVersion !== null) {
            html5Version = html5OverwrittenCodebaseVersion;
        } else {
            if (parseFloat(html5Version) < 5) {
                html5Version = "5.0";
            }
        }
        setDefaultHTML5CodebaseForVersion(html5Version, false);
        if (html5OverwrittenCodebase !== null) {
            setHTML5CodebaseInternal(html5OverwrittenCodebase, isHTML5Offline);
        }
        initComplete = true;
    }
    return applet;
};
var GGBAppletUtils = (function() {
    "use strict";
    function isFlexibleWorksheetEditor() {
        return window.GGBT_wsf_edit !== undefined;
    }
    function scaleElement(el, scale) {
        if (scale != 1) {
            el.style.transformOrigin = "0% 0% 0px";
            el.style.webkitTransformOrigin = "0% 0% 0px";
            el.style.transform = "scale(" + scale + "," + scale + ")";
            el.style.webkitTransform = "scale(" + scale + "," + scale + ")";
            el.style.maxWidth = "initial";
            if (el.querySelector(".ggb_preview") !== null) {
                el.querySelector(".ggb_preview").style.maxWidth = "initial";
            }
            if (el.querySelectorAll(".ggb_preview img")[0] !== undefined) {
                el.querySelectorAll(".ggb_preview img")[0].style.maxWidth =
                    "initial";
            }
            if (el.querySelectorAll(".ggb_preview img")[1] !== undefined) {
                el.querySelectorAll(".ggb_preview img")[1].style.maxWidth =
                    "initial";
            }
        } else {
            el.style.transform = "none";
            el.style.webkitTransform = "none";
        }
    }
    function getWidthHeight(
        appletElem,
        appletWidth,
        allowUpscale,
        noBorder,
        scaleContainerClass
    ) {
        var container = null;
        if (scaleContainerClass != undefined && scaleContainerClass != "") {
            var parent = appletElem.parentNode;
            while (parent != null) {
                if (
                    (" " + parent.className + " ").indexOf(
                        " " + scaleContainerClass + " "
                    ) > -1
                ) {
                    container = parent;
                    break;
                } else {
                    parent = parent.parentNode;
                }
            }
        }
        var myWidth = 0,
            myHeight = 0,
            windowWidth = 0,
            border = 0,
            borderRight = 0,
            borderLeft = 0,
            borderTop = 0;
        if (container) {
            myWidth = container.offsetWidth;
            myHeight = container.offsetWidth;
        } else {
            if (window.innerWidth && document.documentElement.clientWidth) {
                myWidth = Math.min(
                    window.innerWidth,
                    document.documentElement.clientWidth
                );
                myHeight = Math.min(
                    window.innerHeight,
                    document.documentElement.clientHeight
                );
                windowWidth = myWidth;
            } else if (typeof window.innerWidth === "number") {
                myWidth = window.innerWidth;
                myHeight = window.innerHeight;
                windowWidth = window.innerWidth;
            } else if (
                document.documentElement &&
                (document.documentElement.clientWidth ||
                    document.documentElement.clientHeight)
            ) {
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;
                windowWidth = document.documentElement.clientWidth;
            } else if (
                document.body &&
                (document.body.clientWidth || document.body.clientHeight)
            ) {
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
                windowWidth = document.documentElement.clientWidth;
            }
            if (appletElem) {
                var rect = appletElem.getBoundingClientRect();
                if (rect.left > 0) {
                    if (
                        rect.left <= myWidth &&
                        (noBorder === undefined || !noBorder)
                    ) {
                        if (document.dir === "rtl") {
                            borderRight = myWidth - rect.width - rect.left;
                            borderLeft = windowWidth <= 480 ? 10 : 30;
                        } else {
                            borderLeft = rect.left;
                            borderRight = windowWidth <= 480 ? 10 : 30;
                        }
                        border = borderLeft + borderRight;
                    }
                }
            }
            if (
                appletElem &&
                typeof window.GGBT_wsf_view === "object" &&
                window.GGBT_wsf_view.isFullscreen()
            ) {
                var appletRect = appletElem.getBoundingClientRect();
                if (
                    window.GGBT_wsf_view.getCloseBtnPosition() ===
                    "closePositionRight"
                ) {
                    border = 40;
                    borderTop = 0;
                } else if (
                    window.GGBT_wsf_view.getCloseBtnPosition() ===
                    "closePositionTop"
                ) {
                    border = 0;
                    borderTop = 40;
                }
            }
        }
        if (appletElem) {
            if (
                (allowUpscale === undefined || !allowUpscale) &&
                appletWidth > 0 &&
                appletWidth + border < myWidth
            ) {
                myWidth = appletWidth;
            } else {
                myWidth -= border;
            }
            if (
                typeof window.GGBT_wsf_view === "object" &&
                window.GGBT_wsf_view.isFullscreen() &&
                (allowUpscale === undefined || !allowUpscale)
            ) {
                myHeight -= borderTop;
            }
        }
        return { width: myWidth, height: myHeight };
    }
    function calcScale(
        parameters,
        appletElem,
        allowUpscale,
        showPlayButton,
        scaleContainerClass
    ) {
        if (parameters.isScreenshoGenerator) {
            return 1;
        }
        var ignoreHeight = showPlayButton !== undefined && showPlayButton;
        var noScaleMargin =
            parameters.noScaleMargin != undefined && parameters.noScaleMargin;
        var windowSize = getWidthHeight(
            appletElem,
            parameters.width,
            allowUpscale,
            (ignoreHeight && window.GGBT_wsf_view) || noScaleMargin,
            scaleContainerClass
        );
        var windowWidth = parseInt(windowSize.width);
        var appletWidth = parameters.width;
        var appletHeight = parameters.height;
        if (appletWidth === undefined) {
            var articles = appletElem.getElementsByTagName("article");
            if (articles.length === 1) {
                appletWidth = articles[0].offsetWidth;
                appletHeight = articles[0].offsetHeight;
            }
        }
        var xscale = windowWidth / appletWidth;
        var yscale = ignoreHeight ? 1 : windowSize.height / appletHeight;
        if (allowUpscale !== undefined && !allowUpscale) {
            xscale = Math.min(1, xscale);
            yscale = Math.min(1, yscale);
        }
        return Math.min(xscale, yscale);
    }
    function getScale(parameters, appletElem, showPlayButton) {
        var scale = 1,
            autoScale,
            allowUpscale = false;
        if (parameters.hasOwnProperty("allowUpscale")) {
            allowUpscale = parameters.allowUpscale;
        }
        if (parameters.hasOwnProperty("scale")) {
            scale = parseFloat(parameters.scale);
            if (isNaN(scale) || scale === null || scale === 0) {
                scale = 1;
            }
            if (scale > 1) {
                allowUpscale = true;
            }
        }
        if (
            appletElem &&
            typeof window.GGBT_wsf_view === "object" &&
            window.GGBT_wsf_view.isFullscreen()
        ) {
            allowUpscale = true;
        }
        if (
            !isFlexibleWorksheetEditor() &&
            !(
                parameters.hasOwnProperty("disableAutoScale") &&
                parameters.disableAutoScale
            )
        ) {
            autoScale = calcScale(
                parameters,
                appletElem,
                allowUpscale,
                showPlayButton,
                parameters.scaleContainerClass
            );
        } else {
            return scale;
        }
        if (
            allowUpscale &&
            (!parameters.hasOwnProperty("scale") || scale === 1)
        ) {
            return autoScale;
        } else {
            return Math.min(scale, autoScale);
        }
    }
    function positionCenter(appletElem) {
        var windowWidth = Math.min(
            window.innerWidth,
            document.documentElement.clientWidth
        );
        var windowHeight = Math.min(
            window.innerHeight,
            document.documentElement.clientHeight
        );
        var appletRect = appletElem.getBoundingClientRect();
        var calcHorizontalBorder = (windowWidth - appletRect.width) / 2;
        var calcVerticalBorder = (windowHeight - appletRect.height) / 2;
        if (calcVerticalBorder < 0) {
            calcVerticalBorder = 0;
        }
        appletElem.style.position = "relative";
        if (
            window.GGBT_wsf_view.getCloseBtnPosition() === "closePositionRight"
        ) {
            if (calcHorizontalBorder < 40) {
                appletElem.style.left = "40px";
            } else {
                appletElem.style.left = calcHorizontalBorder + "px";
            }
            appletElem.style.top = calcVerticalBorder + "px";
        } else if (
            window.GGBT_wsf_view.getCloseBtnPosition() === "closePositionTop"
        ) {
            if (calcVerticalBorder < 40) {
                appletElem.style.top = "40px";
            } else {
                appletElem.style.top = calcVerticalBorder + "px";
            }
            appletElem.style.left = calcHorizontalBorder + "px";
        }
    }
    function responsiveResize(appletElem, parameters) {
        var article = appletElem.getElementsByTagName("article")[0];
        if (article) {
            if (
                typeof window.GGBT_wsf_view === "object" &&
                window.GGBT_wsf_view.isFullscreen()
            ) {
                var articles = appletElem.getElementsByTagName("article");
                if (
                    articles.length > 0 &&
                    parameters.id !== articles[0].getAttribute("data-param-id")
                ) {
                    return;
                }
                window.GGBT_wsf_view.setCloseBtnPosition(appletElem);
            }
            var scale = getScale(parameters, appletElem);
            article.removeAttribute("data-param-scale");
            article.setAttribute("data-scalex", scale);
            article.setAttribute("data-scaley", scale);
            if (isFlexibleWorksheetEditor()) {
                article.setAttribute("data-param-scale", scale);
            }
            var scaleElem = null;
            for (var i = 0; i < appletElem.childNodes.length; i++) {
                if (
                    appletElem.childNodes[i].className !== undefined &&
                    appletElem.childNodes[i].className.startsWith(
                        "applet_scaler"
                    )
                ) {
                    scaleElem = appletElem.childNodes[i];
                    break;
                }
            }
            if (
                scaleElem !== null &&
                scaleElem.querySelector(".noscale") !== null
            ) {
                return;
            }
            if (
                scaleElem !== null &&
                !scaleElem.className.match(/fullscreen/)
            ) {
                scaleElem.parentNode.style.transform = "";
                if (!isNaN(scale) && scale !== 1) {
                    scaleElem.parentNode.style.width =
                        parameters.width * scale + "px";
                    scaleElem.parentNode.style.height =
                        parameters.height * scale + "px";
                    scaleElement(scaleElem, scale);
                } else {
                    scaleElement(scaleElem, 1);
                    scaleElem.parentNode.style.width = parameters.width + "px";
                    scaleElem.parentNode.style.height =
                        parameters.height + "px";
                }
            }
            if (
                typeof window.GGBT_wsf_view === "object" &&
                window.GGBT_wsf_view.isFullscreen()
            ) {
                positionCenter(appletElem);
            }
            var appName =
                parameters.id !== undefined ? parameters.id : "ggbApplet";
            var app = window[appName];
            if (
                app !== undefined &&
                app !== null &&
                typeof app.recalculateEnvironments === "function"
            ) {
                app.recalculateEnvironments();
            }
            if (window.GGBT_wsf_view && !window.GGBT_wsf_view.isFullscreen()) {
                window.GGBT_wsf_general.adjustContentToResize(
                    $(article).parents(".content-added-content")
                );
            }
        }
    }
    return {
        responsiveResize: responsiveResize,
        isFlexibleWorksheetEditor: isFlexibleWorksheetEditor,
        positionCenter: positionCenter,
        getScale: getScale,
        scaleElement: scaleElement
    };
})();
if (typeof define === "function" && define.amd) {
    define([], function() {
        return GGBApplet;
    });
}
