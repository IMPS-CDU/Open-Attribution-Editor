/*
 * Project:			Open Attribution Builder 					
 * File:			/scripts/script.js
 * Description:		Javascript for Open Attribution Builder
 * License:         MIT 
 *                  Managed by Washington State Board for Community and Technical Colleges 
 * Libs:            jQuery 
 * Created On:		31-Dec-2014 
 *
    Copyright © 2015 Washington State Board for Community and Technical Colleges 
 
    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:
 
    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.
 
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
*/

//  Page-level vars
var by;
var is_licensed_under;
var derivative_text;
var commaproject;
var commaOrganization;


function unHighlight() {
    titleOutput.removeAttribute("class");
    authorOutput.removeAttribute("class");
    lincenseOutput.removeAttribute("class");
    derivativeOutput.removeAttribute("class");
    organizationOutput.removeAttribute("class");
    projectOutput.removeAttribute("class");    
}

function SelectAll(id) {
    var output_html = document.getElementById(id);
    output_html.focus();
    output_html.select();
}


function SelectText(element) {
    var doc = document;
    var text = doc.getElementById(element);
    if (doc.body.createTextRange) { // ms
        var range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}


function isValidURL(id) {
    // Check for scheme and that no spaces or dbl quotes are present
    // Add "http://" if no prefix supplied at all
    // Allow scheme-independent URLs
    var re = /^((ftp:|http:|https:)?\/\/)?[^ "]+$/;
    if (re.test(id.value))
    {
        re = /^(ftp:|http:|https:)?\/\//;
        if(!re.test(id.value)) {            
            id.value = "http://" + id.value;          
        }
        return true;
     }
     else
         return false
}

function onloadform()
                    {
    var AtributionForm = document.getElementById("AtributionForm");
    AtributionForm.reset();
    titleOutput = document.createElement('a');
    authorOutput = document.createElement('a');
    lincenseOutput = document.createElement('a');
    derivativeOutput = document.createElement('a');
    organizationOutput = document.createElement('a');
    projectOutput = document.createElement('a');
    by = document.createTextNode("");
    commaproject = document.createTextNode("");
    commaOrganization = document.createTextNode("");
    is_licensed_under = document.createTextNode("");
    derivative_text = document.createTextNode("");
    
    output.innerHTML = "";
    output.appendChild(titleOutput);
    output.appendChild(by);
    output.appendChild(authorOutput);
    output.appendChild(commaproject);
    output.appendChild(projectOutput);
    output.appendChild(commaOrganization);
    output.appendChild(organizationOutput);
    output.appendChild(is_licensed_under);
    output.appendChild(lincenseOutput);
    output.appendChild(derivative_text);
    output.appendChild(derivativeOutput);
    output.style.display = 'none';
}

function onchangevalue(item) {
    unHighlight();
    $('#output').show();    

    if (titleOutput.innerHTML == "")
        titleOutput.innerHTML = '"' + "This work" + '"'; // <a>INNER_TEXT</a> 
    if (item.id == "titleTextBox") {
        titleOutput.setAttribute("class", "highlight");
        titleOutput.innerHTML = '"' + item.value + '"'; // <a>INNER_TEXT</a>
    }
    if (item.id == "authornameTextBox") {

        if (organizationOutput.innerHTML != "")
            commaOrganization.nodeValue = ", ";
        if (projectOutput.innerHTML != "")
            commaproject.nodeValue = ", ";
        by.nodeValue = " by ";
        authorOutput.setAttribute("class", "highlight");
        authorOutput.innerHTML = item.value; // <a>INNER_TEXT</a>
    }
    if (item.id == "OrganizationTextBox") {
        if (authorOutput.innerHTML != "" || projectOutput.innerHTML != "")
            commaOrganization.nodeValue = ", ";
        else
            commaOrganization.nodeValue = "";
        by.nodeValue = " by ";
        organizationOutput.setAttribute("class", "highlight");
        organizationOutput.innerHTML = item.value; // <a>INNER_TEXT</a>
    }
    if (item.id == "ProjectTextBox") {

        if (authorOutput.innerHTML != "")
            commaproject.nodeValue = ", ";
        else
            commaproject.nodeValue = "";

        if (organizationOutput.innerHTML != "")
            commaOrganization.nodeValue = ", ";
        else
            commaOrganization.nodeValue = "";

        by.nodeValue = " by ";
        projectOutput.setAttribute("class", "highlight");
        projectOutput.innerHTML = item.value; // <a>INNER_TEXT</a>
    }

}

function changeTitle()
{
    unHighlight();    
    var title = document.getElementById("titleTextBox");
    var titleURL = document.getElementById("titleURLTextBox");
    //  titleOutput = document.createElement('a');
    if (title.value.length > 0)
    {
        titleOutput.innerHTML = '"' + title.value + '"'; // <a>INNER_TEXT</a>
    }
    else
        titleOutput.innerHTML = '"' + "This work" + '"';
    if (isValidURL(titleURL) && titleURL.value.length > 0) {
            $('#ItemUrlPrompt').hide(); 
            titleOutput.href = titleURL.value; // Instead of calling setAttribute 
            titleOutput.target = '_blank';
        }
        else {
            if(titleURL.value.length > 0) $('#ItemUrlPrompt').show();
            titleOutput.removeAttribute("href");
            titleOutput.removeAttribute("target");
            titleURL.focus();
            titleURL.select();
        }
}


function changeAuthor()
{
    unHighlight();
    var authorName = document.getElementById("authornameTextBox");
    var authorURL = document.getElementById("authorURLTextBox");
    if (authorName.value.length > 0)
    {
        authorOutput.innerHTML = authorName.value; // <a>INNER_TEXT</a> 
        if (organizationOutput.innerHTML != "")
                commaOrganization.nodeValue = ", ";
        if (projectOutput.innerHTML != "")
            commaproject.nodeValue = ", ";
        // <a>INNER_TEXT</a>
        if (isValidURL(authorURL) && authorURL.value.length > 0) {
            $('#AuthorUrlPrompt').hide();
            authorOutput.href = authorURL.value; // Insted of calling setAttribute 
            authorOutput.target = '_blank';
        }
        else {
            if(authorURL.value.length > 0) $('#AuthorUrlPrompt').show();
            authorOutput.removeAttribute("href");
            authorOutput.removeAttribute("target");
            authorURL.focus();
            authorURL.select();
        }
        by.nodeValue = " by ";
    }
    else {
        by.nodeValue = "";
        authorOutput.innerHTML = "";
        authorOutput.removeAttribute("href");
        authorOutput.removeAttribute("target");
    }
}


function changeLicense()
{
    unHighlight();
    window.getSelection().removeAllRanges();  // clear any text selection on page - usually text attribution

    var license = document.getElementById("LicenseListBox");
    var version = document.getElementById("VersionDropDown");
    LicenceIndex = license.options[license.selectedIndex].index;
     var versionValue = version.options[version.selectedIndex].value;
    if (LicenceIndex < 7 && LicenceIndex != 0)
        version.disabled = false;
    else {
        version.disabled = true;
        version.selectedIndex = 0;
    }

    var LicenseSelected = license.options[license.selectedIndex].value;
    if (LicenceIndex != 0)
    {
        if (version.disabled == true)
            versionValue = "";
        is_licensed_under.nodeValue = " is licensed under "
        var addURL = LicenseSelected.substring(3, LicenseSelected.length) + "/" + versionValue;
        var LicenseURL = "http://creativecommons.org/licenses/" + addURL.toLocaleLowerCase();
        if (LicenceIndex == 7)
        {
            is_licensed_under.nodeValue = " is in the "
            LicenseURL = "https://wiki.creativecommons.org/Public_domain";
        }
        if (LicenceIndex == 8)
        {
            is_licensed_under.nodeValue = " is in the "
            LicenseURL = "http://creativecommons.org/publicdomain/zero/1.0/";
        }

        lincenseOutput.href = LicenseURL; // Insted of calling setAttribute
        lincenseOutput.target = '_blank';
        lincenseOutput.innerHTML = (license.options[license.selectedIndex].value + " " + versionValue).trim();
       
    }
    else
    {
        lincenseOutput.removeAttribute("href");
        lincenseOutput.removeAttribute("target");// Insted of calling setAttribute
        lincenseOutput.innerHTML = "";
    }
}


function changeDerivative()
{
    unHighlight();    
    var derivative = document.getElementById("DerivativeCheckBox");
    var derivativeURL = document.getElementById("DerivativeTextBox");
    if (derivative.checked)
        derivativeURL.disabled = false;
    else {
        derivativeURL.value = "";
        derivativeURL.disabled = true;
    }

    if (derivative.checked)
    {
                if (derivativeURL.value.length > 0 && isValidURL(derivativeURL)) {
                    $('#DerivUrlPrompt').hide();
                    derivativeOutput.href = derivativeURL.value; // Insted of calling setAttribute 
                    derivativeOutput.target = '_blank';
                    derivativeOutput.innerHTML = "original work"; // <a>INNER_TEXT</a> 
                    derivative_text.nodeValue = " / A derivative from the ";                                                             
                }
        else {
                    $('#DerivUrlPrompt').show();
                    derivativeOutput.removeAttribute("href");
                    derivativeOutput.removeAttribute("target");
                    derivativeOutput.innerHTML = "";
                    derivative_text.nodeValue = "";
                    derivativeURL.focus();
                    derivativeURL.select();
                }
    }
    else
    {
        derivativeOutput.removeAttribute("href");
        derivativeOutput.removeAttribute("target");
        derivativeOutput.innerHTML = "";
        derivative_text.nodeValue = "";
    }
}




function changeProject()
{
    unHighlight();    
    var ProjectName = document.getElementById("ProjectTextBox");
    var ProjectURL = document.getElementById("ProjectURLTextBox");
    if (ProjectName.value.length > 0) {
        if (authorOutput.innerHTML != "")
            commaproject.nodeValue = ", ";
        else
            commaproject.nodeValue = "";

        if (organizationOutput.innerHTML != "")
            commaOrganization.nodeValue = ", ";
        else
            commaOrganization.nodeValue = "";

        projectOutput.innerHTML = ProjectName.value; // <a>INNER_TEXT</a> 
        // <a>INNER_TEXT</a>
        if (isValidURL(ProjectURL) && ProjectURL.value.length > 0) {
            $('#ProjectUrlPrompt').hide();
            projectOutput.href = ProjectURL.value; // Insted of calling setAttribute 
            projectOutput.target = '_blank';
        }
        else {
            if (ProjectURL.value.length > 0) $('#ProjectUrlPrompt').show();
            projectOutput.removeAttribute("href");
            projectOutput.removeAttribute("target");
            ProjectURL.focus();
            ProjectURL.select();
        }
    }
    else {
        commaproject.nodeValue = "";
        projectOutput.innerHTML = "";
        projectOutput.removeAttribute("href");
        projectOutput.removeAttribute("target");
    }
}

function changeOrganization() {
    unHighlight();
    var OrganizationName = document.getElementById("OrganizationTextBox");
    var OrganizationURL = document.getElementById("OrganizationURLTextBox");
    if (OrganizationName.value.length > 0) {
        if (authorOutput.innerHTML != "" || projectOutput.innerHTML != "")
            commaOrganization.nodeValue = ", ";
        else
            commaOrganization.nodeValue = "";
        organizationOutput.innerHTML = OrganizationName.value; // <a>INNER_TEXT</a> 
        // <a>INNER_TEXT</a>
        if (isValidURL(OrganizationURL) && OrganizationURL.value.length > 0) {
            $('#OrgUrlPrompt').hide();
            organizationOutput.href = OrganizationURL.value; // Insted of calling setAttribute 
            organizationOutput.target = '_blank';            
        }
        else {
            if (OrganizationURL.value.length > 0) $('#OrgUrlPrompt').show();
            organizationOutput.removeAttribute("href");
            organizationOutput.removeAttribute("target");
            OrganizationURL.focus();
            OrganizationURL.select();
        }
    }
    else {
        commaOrganization.nodeValue = "";
        organizationOutput.innerHTML = "";
        organizationOutput.removeAttribute("href");
        organizationOutput.removeAttribute("target");
    }
}

function checkInput(form)
{
    handleLicensePrompt();

    var title = document.getElementById("titleTextBox");
    if (title.value.length == 0)
    {
        titleOutput.innerHTML = '"' + "This work" + '"'; // <a>INNER_TEXT</a> 
    }
    var output_html = document.getElementById("output-html");
    var outputappend = output.innerHTML.replace(" class=" + '"' + "highlight" + '"', "");
    var find = "<a></a>";
    var re = new RegExp(find, 'g');
    outputappend = outputappend.replace(re, '');
    output_html.value = outputappend;
}

function handleLicensePrompt() {
    if ($("#LicenseListBox")[0].selectedIndex == 0) {
        // No license selected
        $('#LicensePrompt').show();
    }
    else {
        // hide prompt
        $('#LicensePrompt').hide();
    }
}




// initial page setup
$(document).ready(function () {
    // hide all hide class containers
    $('#collapsible-panels .hide').hide();
    $('.popup').hide();

    // append click event to the a element
    $('#collapsible-panels .collapsecontent').on('click', function (e) {
        // slide down the corresponding div if hidden, or slide up if shown
        //  alert($(this).parent().attr('id'));

        // TODO: Need to base this on IDs - currently depends on a specific level of divs
        $(this).parent().closest('div').next('#collapsible-panels .hide').slideToggle('slow');
        // set the current item as active
        $(this).toggleClass('active');
        e.preventDefault();
    });

    var counter = 0;
    var temp_id=null;
    $('.tooltip_display').click(function () {
        var $this = $(this);
        var id_value = $(this).attr('id');
        if (temp_id != id_value)
            $('.closeButton').click();
        temp_id = id_value;
        $.ajax({
            type: "GET",
            url: "helpdata.xml",
            dataType: "xml",
            success: function (xml) {
                $(xml).find('Header').each(function () {
                    var id = $(this).attr('id');
                    var title = $(this).find('content').text();
                    if (id == id_value) {
                        counter = counter + 1;
                        $('#' + id_value + '_popup').html(title);
                    }
                });
            }
        });
        if (counter % 2 == 0)
        $('#popup_' + id_value).html(function ()
            {
            $('#popup_' + id_value).css({
                    left: $this.position() + '20px',
                    top: $this.position() + '20px'
                }).show(500)
            }).fadeIn("slow");
        else {
            var container = $('.popup');
            container.hide(500);
            container.fadeOut("slow");
        } 
    });    

    $('.closeButton').click(function () {
        var container = $('.popup');
        counter = 0;
        container.hide(500);
        container.fadeOut("slow");
    });    

});
