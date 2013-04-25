/**
 * Created by JetBrains WebStorm.
 * User: Aisha
 * Date: 8/12/12
 * Time: 2:11 PM
 * To change this template use File | Settings | File Templates.
 */

var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
    dbVersion = "2.0";

if ('webkitIndexedDB' in window) {
    window.IDBKeyRange = window.webkitIDBKeyRange;
}

if(!indexedDB)
    alert("IndexedDB not supported, This Application cannot Start");

var dbReq = indexedDB.open( "Address Book");

var db;



dbReq.onsuccess = function ( evt ) {
    console.log("success");

    db = evt.target.result;

    if(db.version!=dbVersion){
        var verReq = db.setVersion(dbVersion);
        verReq.onsuccess = function(){
            db.createObjectStore('members',{keyPath:'id'});
        }
    }



}

function setRecord(userObj){
    var trans = db.transaction(['members'], "readwrite");
    var objStoreHandle = trans.objectStore('members');
    userObj.id = Date.now();
    var putReq = objStoreHandle.put(userObj);
    putReq.onsuccess = function(){
        console.log(userObj);
        console.log('Adress is successfully saved');
    };

}

function getRecord(){

    var trans = db.transaction(['members'], "readonly");
    var objStoreHandle = trans.objectStore('members');

    var outDiv = document.getElementById('showObjs');
    outDiv.innerHTML = "";

    var cursorRequest = objStoreHandle.openCursor( IDBKeyRange.lowerBound(0) );
    cursorRequest.onsuccess = function( evt ) {
        if(!evt.target.result) {
            return;
        }

        var addrObj = evt.target.result.value;

        outDiv.innerHTML+=
            "\n\n<h1>Name:"+addrObj.name+"</h1>"+
            "\nAddress:"+addrObj.address+
            "\n<br/>Number:"+addrObj.number;

        //evt.target.result.continue();
    };

}













