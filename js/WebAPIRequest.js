/*
    Méthodes d'accès aux services Web API_Server/bookmarks
 */

//const apiBaseURL= "http://localhost:5000/";
const apiBaseURL= "https://pool-tranquil-child.glitch.me/";

function getBearerAuthorizationToken(){
    return { 'Authorization' : 'Bearer ' + retrieveAccessToken() };
}

function retrieveAccessToken(){
    return localStorage.getItem('access_Token');
} 

function eraseAccessToken(){
    return localStorage.removeItem('access_Token');
} 

function storeAccessToken(token){
    localStorage.setItem('access_Token', token);
} 

function storeLoggedUsername(username){
    localStorage.setItem('username', username);
} 

function retrieveLoggedUsername(){
    return localStorage.getItem('username');
} 

function storeLoggedUserEmail(email){
    localStorage.setItem('useremail', email);
} 

function retrieveLoggedUserEmail(){
    return localStorage.getItem('useremail');
} 

function storeLoggedUserId(id){
    localStorage.setItem('userid', id);
} 

function retrieveLoggedUserId(){
    return localStorage.getItem('userid');
} 

function deconnect(){
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    localStorage.removeItem('useremail');
    eraseAccessToken();

}


function webAPI_GET_ALL(queryString, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "api/bookmarks" + queryString,
        type: 'GET',
        contentType:'text/plain',
        data:{},
        success: data => { successCallBack(data); console.log("webAPI_GET_ALL - success", data); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_GET_ALL - error");
        }
    });
}

function webAPI_GET( id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "api/bookmarks/" + id,
        type: 'GET',
        contentType:'text/plain',
        data:{},
        success: data  => { successCallBack(data); console.log("webAPI_GET - success", data);},
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_GET - error");
        }
    });
}

function webAPI_POST( data , successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "api/bookmarks",
        type: 'POST',
        contentType:'application/json',
        headers: getBearerAuthorizationToken(),
        data: JSON.stringify(data),
        success: (data) => {successCallBack();  console.log("webAPI_POST - success", data); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_POST - error");
        }
    });
}

function webAPI_Register( data , successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "accounts/register",
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data),
        success: (data) => {successCallBack();  console.log("webAPI_Register - success", data); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_Register - error");
        }
    });
}

function webAPI_ChangeProfil( data , successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "accounts/change",
        type: 'PUT',
        contentType:'application/json',
        headers: getBearerAuthorizationToken(),
        data: JSON.stringify(data),
        success: function (response){
            console.log(response);
            storeLoggedUsername(response.Name);
            storeLoggedUserEmail(response.Email);
            successCallBack();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_ChangeProfil - error");
        }
    });
}

function webAPI_Login( data , successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "token",
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data),
       success: function (response){
           console.log(response);
           storeAccessToken(response.Access_token);
           storeLoggedUsername(response.UserName);
           storeLoggedUserEmail(response.UserEmail);
           storeLoggedUserId(response.UserId);
           successCallBack();
       },
       error: function(jqXHR, textStatus, errorThrown) {
           errorCallBack(jqXHR,status);
            console.log("LOGIN_ERROR_WEBAPI")
       }
    });
}


function webAPI_PUT(data, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "api/bookmarks/" + data.Id,
        type: 'PUT',
        contentType:'application/json',
        headers: getBearerAuthorizationToken(),
        data: JSON.stringify(data),
        success:(s) => {successCallBack();  console.log("webAPI_PUT - success", s); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_PUT - error");
        }
    });
}

function webAPI_DELETE( id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "api/bookmarks/" + id,
        contentType:'text/plain',
        headers: getBearerAuthorizationToken(),
        type: 'DELETE',
        success:() => {successCallBack();  console.log("webAPI_DELETE - success"); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_DELETE - error");
        }
    });
}

function webAPI_DeleteAccount( id, successCallBack, errorCallBack) {
    console.log()
    $.ajax({
        url: apiBaseURL + "accounts/remove/" + id,
        contentType:'text/plain',
        headers: getBearerAuthorizationToken(),
        type: 'DELETE',
        success:() => {successCallBack();  console.log("webAPI_DELETEAccount - success"); },
        error: function(jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_DELETEAccount - error");
        }
    });
}


