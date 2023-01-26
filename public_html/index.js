/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var SDBName = "SCHOOL-DB";
var SRelationName = "STUDENT";
var connToken = "90932306|-31949271008866443|90954152";

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}
function resetForm() {
    
    $("#rollno").val("");
    $("#SName").val("");
    $("#clss").val("");
    $("#date").val("");
    $("#address").val("");
    $("#enrldt").val("");
    $("#rollno").prop("disabled", false);
    $("#Save").prop("disabled", true);
    $("#Change").prop("disabled", true);
    $("#Reset").prop("disabled", true);
    $("#rollno").focus();
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return;
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, SDBName, SRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollno").focus();
}
    function validateData() {
    var rollno, SName,clss, date, address, enrldt;
    rollno = $("#rollno").val();
    SName = $("#SName").val();
    clss = $("#clss").val();
    date = $("#date").val();
    address = $("#address").val();
    enrldt = $("#enrldt").val();

    if (rollno === "") {
        alert("Rollno is missing");
        $("rollno").focus();
        return "";
    }
    if (SName === "") {
        alert("Name is missing");
        $("SName").focus();
        return "";
    }
    if (clss === "") {
        alert("Class is missing");
        $("clss").focus();
        return "";
    }
    if (date === "") {
        alert("BirthDate missing");
        $("date").focus();
        return "";

    }
    if (address === "") {
        alert("Address missing");
        $("address").focus();
        return "";
    }
    if (enrldt === "") {
        alert("Enrollment Date is missing");
        $("enrldt").focus();
        return "";
    }
    var jsonStrObj = {
        RollNo: rollno,
        FullName: SName,
        Class: clss,
        BirthDate: date,
        Address: address,
        EnrollmentDate: enrldt
    };
    return JSON.stringify(jsonStrObj);

}
function  getrollnoAsJsonObj() {
    var rollno = $("#rollno").val();
    var jsonStr = {
        RollNo:  rollno
    };
    return JSON.stringify(jsonStr);
}
function getRollno() {

    var rollnoJsonObj = getrollnoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, SDBName, SRelationName, rollnoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#Save").prop("disabled", false);
        $("#Reset").prop("disabled", false);
        $("#SName").focus();

    } else if (resJsonObj.status === 200) {
        $("#rollno").prop("disable", true);
        fillData(resJsonObj);
        $("#Change").prop("disabled", false);
        $("#Reset").prop("disabled", false);
        $("#SName").focus();
    }
}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#SName").val(record.FullName);
    $("#clss").val(record.Class);
    $("#date").val(record.BirthDate);
    $("#address").val(record.Address);
    $("#enrldt").val(record.EnrollmentDate);
}

function changeData() {
    $("#Change").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, SDBName, SRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#rollno").focus();
}
function  getRollnoAsJsonObj() {
    var rollno = $("#rollno").val();
    var jsonStr = {
        RollNo: rollno
    };
    return JSON.stringify(jsonStr);
}
