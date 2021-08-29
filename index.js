var test = JSON.parse(localStorage.getItem('userList'));
var d;
if(test == null){
    test = [];}

    
var fname = document.getElementById("firstname").value;
var lname = document.getElementById('lastname').value;
var eml = document.getElementById('email').value;
var loc = document.getElementById('location').value;
var phn = document.getElementById('phone').value;
var communication = document.getElementById('communication').value;
var permanent = document.getElementById('permanent').value;
var english =document.getElementById('english').value;
var science =document.getElementById('science').value;
var computers =document.getElementById('computers').value;
var hardware = document.getElementById('hardware');

function dltObj() {
    if (document.getElementById("removee")) {
        document.querySelector("#removee").remove();
    }
}

function register() {

    var fname = document.getElementById("firstname").value;
    var lname = document.getElementById('lastname').value;
    var eml = document.getElementById('email').value;
    var loc = document.getElementById('location').value;
    var phn = document.getElementById('phone').value;
    var communication = document.getElementById('communication').value;
    var permanent = document.getElementById('permanent').value;
    var english =document.getElementById('english').value;
    var science =document.getElementById('science').value;
    var computers =document.getElementById('computers').value;
    var hardware = document.getElementById('hardware');

    if (fname === "") {
        document.getElementById('form1').insertAdjacentHTML("afterEnd", "<p id='removee' style='color:red'>Firstname cannot be empty</p>");
    } else if (lname === "") {
        document.getElementById('form2').insertAdjacentHTML("afterEnd", "<p id='removee' style='color:red'>Lastname cannot be empty</p>");
    } else if (eml === ""){
        document.getElementById('form3').insertAdjacentHTML('afterEnd', "<p id='removee' style='color:red'>Email cannot be empty</p>");
    } else if (loc === ""){
        document.getElementById('form4').insertAdjacentHTML('afterEnd', "<p id='removee' style='color:red'>Location cannot be empty</p>");
    } else if (phn === ""){
        document.getElementById('form5').insertAdjacentHTML('afterEnd', "<p id='removee' style='color:red'>Phone cannot be empty</p>");
    } else if (communication === ""){
        document.getElementById('form6').insertAdjacentHTML('afterEnd', "<p id='removee' style='color:red'>Communication Address cannot be empty</p>");
    } else if (permanent === ""){
        document.getElementById('form7').insertAdjacentHTML('afterEnd', "<p id='removee' style='color:red'>Permanent Address cannot be empty</p>");
    } else if (english === ""){
        document.getElementById('form8').insertAdjacentHTML('afterEnd', "<p id='removee' style='color:red'>English Marks cannot be empty</p>");
    } else if (science === ""){
        document.getElementById('form9').insertAdjacentHTML('afterEnd', "<p id='removee' style='color:red'>Science Marks cannot be empty</p>");
    } else if (computers === ""){
        document.getElementById('form10').insertAdjacentHTML('afterEnd', "<p id='removee' style='color:red'>computers Marks cannot be empty</p>");
    } else if (hardware === ""){
        document.getElementById('form11').insertAdjacentHTML('afterEnd', "<p id='removee' style='color:red'>Hardware Marks cannot be empty</p>");
    }else {
        var userobj = {
            firstname: fname,
            lastname: lname,
            email: eml,
            location: loc,
            phone: phn,
            address: {
                communication: communication,
                permanent: permanent
            },
            marks: {
                english: english,
                science: science,
                computers: computers,
                hardware: hardware
            }
        }
        test.push(userobj);
        localStorage.setItem('userList', JSON.stringify(test));
        loctable();
        regForm.reset();
    }
}

function loctable() {
    if (localStorage.userList) {
        var htm = "<table class='classoftable' border='1' style='border-collapse:collapse;' cellpadding='5'>";
        $(document).ready(function () {
            $("#dropdown").change(function () {
                if ($("#dropdown").val()>0){
                    htm = '';
                    jQuery('#data').html(htm);
                    htm += '<tr ><th >Firstname</th><th >Lastname</th><th >Email</th>'
                    htm += '<th >Location</th><th >Phone</th><th >Communication Address</th><th >Permanent Address</th>'
                    htm += '<th >Action 1</th><th >Action2</th><th >Action 3</th>'

                    for (var i = 0; i < $("#dropdown").val(); i++) {
                        htm += '<tr id="tr_' + i + '"><td >' + test[i].firstname + '</td>';
                        htm += '<td >' + test[i].lastname + '</td>';
                        htm += '<td >' + test[i].email + '</td>';
                        htm += '<td >' + test[i].location + '</td>';
                        htm += '<td >' + test[i].phone + '</td>';
                        htm += '<td >' + test[i].address.communication + '</td>';
                        htm += '<td >' + test[i].address.permanent + '</td>';
                        htm += '<td ><a href="#" id="edit_' + i + '" style="color: darkred">Edit</a></td>';
                        htm += '<td ><a href="#" id="view_' + i + '" style="color: darkred">View</a></td>';
                        htm += '<td ><a href="#" id="delete_' + i + '" style="color: darkred">Delete</a></td>';
                        htm += '</tr>';
                    }

                    htm += '</table>';
                    jQuery('#data').html(htm);
                    $(".classoftable").show();
                }
                else {
                    $(".classoftable").hide();
                }
            });
            $("#dropdown").change();
        });
    }
    else {

        jQuery.ajax({
            "type": "GET",
            "url": "content.json",
            "datatype": "JSON",
            "success": function (data) {
                localStorage.setItem("userList", JSON.stringify(data));
            },
            "error": function () {
                alert('Error happened while making server request!!!');
            }
        });
    }
}

$(document).ready(function()
    {
        $('#search').keyup(function()
        {
            searchTable($(this).val());
        });
    }
);

function searchTable(inputVal)   
{
    var table = $('#data');
    table.find('tr').each(function(index, row)
    {
        var allCells = $(row).find('td');
        if(allCells.length > 0)
        {
            var found = false;
            allCells.each(function(index, td)
            {
                var regExp = new RegExp(inputVal, 'i');
                if(regExp.test($(td).text()))
                {
                    found = true;
                    return false;
                }
            });
            if(found == true)$(row).show();else $(row).hide();
        }
    });
}


jQuery(document).on('click', 'a[id^="edit_"]', function () {

    $("#inputsubmit").hide();
    $("#inputupdate").show();
    var idSplit = jQuery(this).attr('id').split('_'),
        trId = 'tr_' + idSplit[1];
    d=idSplit[1];

    for(var i=0;i<test.length;i++) {
        if (i == d) {

            $("#firstname").val(test[d].firstname);
            $("#lastname").val(test[d].lastname);
            $("#email").val(test[d].email);
            $("#location").val(test[d].location);
            $("#phone").val(test[d].phone);
            $("#communication").val(test[d].address.communication);
            $("#permanent").val(test[d].address.permanent);
            $("#english").val(test[d].marks.english);
            $("#science").val(test[d].marks.science);
            $("#computers").val(test[d].marks.computers);
            $("#hardware").val(test[d].marks.hardware);
        }
    }
});

$("#inputupdate").click(function(){

    test[d].firstname = $("#firstname").val();
    test[d].lastname = $("#lastname").val();
    test[d].email = $("#email").val();
    test[d].phone = $("#phone").val();
    test[d].address.communication = $("#communication").val();
    test[d].address.permanent = $("#permanent").val();
    test[d].marks.english = $("#english").val();
    test[d].marks.science = $("#science").val();
    test[d].marks.computers = $("#computers").val();
    test[d].marks.hardware = $("#hardware").val();

    localStorage.setItem("userList", JSON.stringify(test));
    loctable();
    regForm.reset();
    $("#inputupdate").hide();
    $("#inputsubmit").show();
});

jQuery(document).on('click', 'a[id^="view_"]', function (event) {

    event.preventDefault();


    var idSplit = jQuery(this).attr('id').split('_'),
        trId = 'tr_' + idSplit[1];
    d=idSplit[1];

    if (test[d] != '') {
        var htm1 = "<table border='1' style='border-collapse:collapse;'>";
        htm1 += '<tr ><th >Marks</th></tr>';

        htm1 += '<td >' + '<strong>English:</strong>' + test[d].marks.english + "<br>";
        htm1 += '<strong>Science:</strong>' + test[d].marks.science + "<br>";
        htm1 += '<strong>Computers:</strong>' + test[d].marks.computers + "<br>";
        htm1 += '<strong>Hardware:</strong>' + test[d].marks.hardware + "<br>";
        htm1 += '</td>' + '</tr>';
        htm1 += '</table>';

        jQuery('#' + trId).after('<tr><td colspan="7">'+htm1+'</td></tr>');
        test[d] = '';
    }

    else {
        jQuery('#' + trId).next().toggle(htm1);
    }

});


jQuery(document).on('click', 'a[id^="delete_"]', function (event) {

    event.preventDefault();

    var idSplit = jQuery(this).attr('id').split('_'),
        trId = 'tr_' + idSplit[1];


    jQuery('#' + trId).closest('tr').remove();
    test.splice(idSplit[1],1)
    localStorage.setItem("userList", JSON.stringify(test));
    loctable();
});

