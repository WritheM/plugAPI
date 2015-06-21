//# sourceMappingURL=./room.js.map
require('source-map-support').install();
/*The MIT License
===============

Copyright (c) 2014 Chris Vickery, Thomas "TAT" Andresen and other contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.*/
var util=require("util"),songHistory=[],that=null,User=function(a){this.avatarID=a.avatarID?a.avatarID:"";this.badge=a.badge?a.badge:0;this.blurb=a.blurb?a.blurb:void 0;this.ep=a.ep?a.ep:void 0;this.gRole=null!==a.gRole?a.gRole:0;this.grab=1===grabs[a.id];this.id=a.id?a.id:-1;this.ignores=a.ignores?a.ignores:void 0;this.joined=a.joined?a.joined:"";this.language=a.language?a.language:"";this.level=a.level?a.level:0;this.notifications=a.notifications?a.notifications:void 0;this.pVibes=a.pVibes?a.pVibes:
void 0;this.pw=a.pw?a.pw:void 0;this.role=a.role?a.role:0;this.slug=a.slug?a.slug:void 0;this.status=a.status?a.status:0;this.username=a.username?a.username:"";this.vote=void 0!==votes[a.id]?-1===votes[a.id]?-1:1:0;this.xp=a.xp?a.xp:0;this.guest=a.guest?a.guest:!1};User.prototype.toString=function(){return this.username};
var cacheUsers={},booth={currentDJ:-1,isLocked:!1,shouldCycle:!0,waitingDJs:[]},fx=[],grabs={},meta={description:"",favorite:!1,hostID:-1,hostName:"",id:-1,name:"",population:0,slug:"",welcome:""},mutes={},playback={historyID:"",media:{author:"",cid:"",duration:-1,format:-1,id:-1,image:"",title:""},playlistID:-1,startTime:""},mySelf={},role=0,users=[],votes={};setInterval(function(){for(var a in mutes)mutes.hasOwnProperty(a)&&0<mutes[a]&&mutes[a]--},1E3);var Room=function(){that=this};
Room.prototype.usersToArray=function(a){var b,c;c=[];for(var d in a)a.hasOwnProperty(d)&&(b=this.getUser(a[d]),null!=b&&c.push(b));return c};
Room.prototype.getPermissions=function(a){var b=this.getSelf(),c={canModChat:!1,canModMute:!1,canModBan:!1,canModStaff:!1};0===a.gRole&&(5===b.gRole?(c.canModChat=!0,c.canModBan=!0):(c.canModChat=1<b.role&&Math.max(b.role,b.gRole)>a.role,c.canModBan=b.role>a.role));5===b.gRole?c.canModStaff=!0:5!==a.gRole&&(c.canModStaff=Math.max(b.role,b.gRole)>Math.max(a.role,a.gRole));c.canModMute=!(0<a.role||0<a.gRole);return c};
Room.prototype.registerUserExtensions=function(a){User.prototype.addToWaitList=function(){a.moderateAddDJ(this.id)};User.prototype.removeFromWaitList=function(){a.moderateRemoveDJ(this.id)};User.prototype.moveInWaitList=function(b){a.moderateMoveDJ(this.id,b)}};Room.prototype.getPermissionsID=function(a){return this.getPermissions(this.getUser(a))};Room.prototype.haveRoomPermission=function(a,b){var c=this.getUser(a);return!(null==c||c.role<b)};
Room.prototype.haveGlobalPermission=function(a,b){var c=this.getUser(a);return!(null==c||c.gRole<b)};Room.prototype.isAmbassador=function(a){a||(a=mySelf.id);return this.haveGlobalPermission(a,2)&&!this.isAdmin(a)};Room.prototype.isAdmin=function(a){a||(a=mySelf.id);return this.haveGlobalPermission(a,5)};Room.prototype.isStaff=function(a){a||(a=mySelf.id);return this.haveRoomPermission(a,1)};Room.prototype.isDJ=function(a){a||(a=mySelf.id);return booth.currentDJ===a};
Room.prototype.isInWaitList=function(a){a||(a=mySelf.id);return 0<this.getWaitListPosition(a)};Room.prototype.reset=function(){booth={currentDJ:-1,isLocked:!1,shouldCycle:!0,waitingDJs:[]};fx=[];grabs={};meta={description:"",favorite:!1,hostID:-1,hostName:"",id:-1,name:"",population:0,guests:0,slug:"",welcome:""};mutes={};playback={historyID:"",media:{author:"",cid:"",duration:-1,format:-1,id:-1,image:"",title:""},playlistID:-1,startTime:""};role=0;users=[];votes={}};
Room.prototype.addUser=function(a){a.id!==mySelf.id&&(1==a.guest?meta.guests++:(null===this.getUser(a.id)&&users.push(a),meta.population++,delete cacheUsers[booth.currentDJ]))};Room.prototype.removeUser=function(a){if(a!==mySelf.id)if(0==a)meta.guests--;else for(var b in users)if(users.hasOwnProperty(b)&&users[b].id==a){cacheUsers[a]=users.splice(b,1);meta.population--;break}};
Room.prototype.updateUser=function(a){for(var b in users)if(users.hasOwnProperty(b)&&users[b].id===a.i){for(var c in a)a.hasOwnProperty(c)&&"i"!=c&&(users[b][c]=a[c]);break}};Room.prototype.isMuted=function(a){return null!=mutes[a]&&0<mutes[a]};Room.prototype.setSelf=function(a){mySelf=a};Room.prototype.setRoomData=function(a){booth=a.booth;fx=a.fx;grabs=a.grabs;meta=a.meta;mutes=a.mutes;playback=a.playback;mySelf.role=a.role;users=a.users;votes=a.votes};
Room.prototype.setBoothLocked=function(a){booth.isLocked=a};Room.prototype.setDJs=function(a){booth.waitingDJs=a};Room.prototype.setMedia=function(a,b){votes={};grabs={};playback.media=a;playback.startTime=b};
Room.prototype.advance=function(a){1>songHistory.length?setImmediate(this.advance,a):(songHistory[0].room=this.getRoomScore(),this.setMedia(a.media,a.startTime),this.setDJs(a.djs),booth.currentDJ=a.currentDJ,playback.historyID=a.historyID,playback.playlistID=a.playlistID,a={id:a.historyID,media:a.media,room:{name:meta.name,slug:meta.slug},score:{positive:0,listeners:null,grabs:0,negative:0,skipped:0},timestamp:a.startTime,user:{id:a.currentDJ,username:null===this.getUser(a.currentDJ)?"":this.getUser(a.currentDJ).username}},
50<songHistory.unshift(a)&&songHistory.splice(50,songHistory.length-50),cacheUsers={})};Room.prototype.muteUser=function(a){switch(a.d){case "o":mutes[a.i]=0;break;case "s":mutes[a.i]=900;break;case "m":mutes[a.i]=1800;break;case "l":mutes[a.i]=2700}};Room.prototype.setGrab=function(a){grabs[a]=1};Room.prototype.setVote=function(a,b){votes[a]=b};Room.prototype.setEarn=function(a){mySelf.xp=a.xp;mySelf.ep=a.ep;mySelf.level=a.level};
Room.prototype.getSelf=function(){return null!=mySelf?new User(mySelf):null};Room.prototype.getUser=function(a){if(!a||a===mySelf.id)return this.getSelf();for(var b in users)if(users.hasOwnProperty(b)&&users[b].id===a)return new User(users[b]);return null};Room.prototype.getUsers=function(){return this.usersToArray([mySelf.id].concat(function(){var a=[],b;for(b in users)users.hasOwnProperty(b)&&a.push(users[b].id);return a}()))};
Room.prototype.getDJ=function(){if(0<booth.currentDJ){var a=this.getUser(booth.currentDJ);if(null!==a)return a;if(void 0!==cacheUsers[booth.currentDJ])return new User(cacheUsers[booth.currentDJ])}return null};Room.prototype.getDJs=function(){return this.usersToArray([booth.currentDJ].concat(booth.waitingDJs))};Room.prototype.getWaitList=function(){return this.usersToArray(booth.waitingDJs)};
Room.prototype.getWaitListPosition=function(a){if(booth.currentDJ===a)return 0;a=null==booth.waitingDJs?-1:booth.waitingDJs.indexOf(a);return 0>a?-1:a+1};Room.prototype.getAdmins=function(){var a=[],b;b=[mySelf].concat(users);for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];5==d.gRole&&a.push(d.id)}return this.usersToArray(a)};Room.prototype.getAmbassadors=function(){var a=[],b;b=[mySelf].concat(users);for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];5>d.gRole&&1<d.gRole&&a.push(d.id)}return this.usersToArray(a)};
Room.prototype.getAudience=function(){var a=[],b;b=[mySelf].concat(users);for(var c in b)if(b.hasOwnProperty(c)){var d=b[c].id;0>this.getWaitListPosition(d)&&a.push(d)}return this.usersToArray(a)};Room.prototype.getStaff=function(){var a=[],b;b=[mySelf].concat(users);for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];0<d.role&&a.push(d.id)}return this.usersToArray(a)};Room.prototype.getHost=function(){return this.getUser(meta.hostID)};Room.prototype.getMedia=function(){return playback.media};
Room.prototype.getStartTime=function(){return playback.startTime};Room.prototype.getHistoryID=function(){return playback.historyID};Room.prototype.getHistory=function(){return songHistory};Room.prototype.setHistory=function(a,b){a||(songHistory=b)};Room.prototype.setCycle=function(a){booth.shouldCycle=a};Room.prototype.getBoothMeta=function(){return util._extend({},booth)};Room.prototype.getRoomMeta=function(){return util._extend({},meta)};
Room.prototype.getRoomScore=function(){var a={positive:0,listeners:Math.max(this.getUsers().length-1,0),grabs:0,negative:0,skipped:0},b,c=votes;for(b in c)if(c.hasOwnProperty(b)){var d=c[b];0<d?a.positive++:0>d&&a.negative++}c=grabs;for(b in c)c.hasOwnProperty(b)&&0<c[b]&&a.grabs++;return a};module.exports=Room;
