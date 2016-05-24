contextPath = '/hr-client';
appModel = 'jetty'; //tomcat or jetty
var role = 'customer';

function serialize($context) {
    return $context.serialize();
}

function ajaxSend(url, method, data, key, redirect, func, errFunc){
    $.ajax({
        url: url,
        data: data,
        dataType: "json",
        cache: false,
        type: method,
        beforeSend: function(request) {
            request.setRequestHeader("key", role);
        },
        error: function () {
            console.log('failed to get AJAX data .');
            errFunc();
        },
        success: function (result) {
//            alert(result);
            func(result);
            if(redirect)
                window.location.href = redirect;
        }
    });
}

// function for get a cookie value by using its name
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}


// get input array from any form using form ID
function getElements(formId) {
    var form = document.getElementById(formId);
    var elements = new Array();
    var tagElements = form.getElementsByTagName('input');
    alert(tagElements.length)
    for (var j = 0; j < tagElements.length; j++){
        elements.push(tagElements[j]);

    }
    return elements;
}

//get [name,value] array from a element
function inputSelector(element) {
    if (element.checked)
        return [element.name, element.value];
}

function input(element) {
    switch (element.type.toLowerCase()) {
        case 'submit':
        case 'hidden':
        case 'password':
        case 'text':
            return [element.name, element.value];
        case 'checkbox':
        case 'radio':
            return inputSelector(element);
    }
    return false;
}

//combine URL
function serializeElement(element) {
    var method = element.tagName.toLowerCase();
    var parameter = input(element);

    if (parameter) {
        var key = encodeURIComponent(parameter[0]);
        if (key.length == 0) return;

        if (parameter[1].constructor != Array)
            parameter[1] = [parameter[1]];

        var values = parameter[1];
        var results = [];
        for (var i=0; i<values.length; i++) {
            results.push(key + '=' + encodeURIComponent(values[i]));
        }
        return results.join('&');
    }
}

//
function serializeForm(formId) {
    var elements = getElements(formId);
    var queryComponents = new Array();

    for (var i = 0; i < elements.length; i++) {
        var queryComponent = serializeElement(elements[i]);
        if (queryComponent)
            queryComponents.push(queryComponent);
    }

    return queryComponents.join('&');
}

