Template.formTemplate.events({
    'submit .form': function(event, template) {
        event.preventDefault(); // prevent page reload
        var firstname = event.target.teachername.value;
	var deptt=event.target.deptt.value;
        var code=event.target.code.value;
        var shortname=event.target.shortname.value;
	Meteor.call('teacher',firstname,deptt,code,shortname);
console.log(firstname);
console.log(deptt);
console.log(code);
console.log(shortname);

 }

});
Template.formTemplate.helpers({
teacherData:function(){
return teacher.find();
}
});
Template.subject.events({
    'submit .form': function(event, template) {
        event.preventDefault(); // prevent page reload
        var name = event.target.subjectname.value;
        var code=event.target.code.value;
        var deptt=event.target.deptt.value;
        var shortname=event.target.shortname.value;
	Session.set('deptt', deptt);
Meteor.call('subject',name,deptt,code,shortname);
console.log(name);
console.log(deptt);
console.log(code);
console.log(shortname);

 }

});
Template.subject.helpers({
subjectData:function(){
return subject.find();
}
});

Template.room.events({
    'submit #form': function(event, template) {
        event.preventDefault(); // prevent page reload
        var number = event.target.roomnumber.value;
 var deptt=event.target.deptt.value;
var type=event.target.type.value;
   Meteor.call('room',number,deptt,type);     
console.log(number);
console.log(deptt);
console.log(type);
 }

});

Template.room.helpers({
roomData:function(){
return room.find();
}
});


Template.sr.events({
'submit .form':function(event,template){
event.preventDefault();
var subject=event.target.subject.value;
var type=event.target.type.value;
var room=event.target.room.value;
Meteor.call('sr',subject,type,room);
console.log(subject);
console.log(type);
console.log(room);
}
});
Template.sr.helpers({
srData:function(){
return sr.find();
}
});

Template.ts.events({
'submit .form':function(event,template){
event.preventDefault();
var teacher=event.target.teacher.value;
var code=event.target.code.value;
var subject=event.target.subject.value;
Meteor.call('ts',teacher,code,subject);
console.log(teacher);
console.log(code);
console.log(subject);
}
});

Template.ts.helpers({
tsData:function(){
return ts.find();
}
});

Template.roomalot.events({
'submit .form':function(event,template){
event.preventDefault();
var type=$('#type'+this._id).val();
var subject=$('#subject'+this._id).val();
var values = {type:type, subject:subject};
    var id = this._id;
    Meteor.call('roomalot.update',id, values);
}
});


Template.calldeptt.helpers({
'roominfo':function()
{
return room.find().fetch();

}
});
 
Template.calltype.helpers({
'typeinfo':function()
{
return room.find().fetch();
}
});
 
Template.calltype.helpers({
'typeinfo':function()
{
return roomalot.find().fetch();
}
});

Template.calldeptt.helpers({
'roominfo':function()
{
return subject.find().fetch();
}
});
Template.callcode.helpers({
'roominfo':function()
{
return subject.find().fetch();
}
});
Template.callshortname.helpers({
'roominfo':function()
{
return subject.find().fetch();
}
});
Template.createTimeTable.events({
'click #submit':function(){
var choosendeptt=$('#teacherTextbox').val();
Session.set('choosendeptt', choosendeptt);
},

'click #createBtn':function(){
	 timetabl=  { monday: [], tuesday: [], wednesday: [], thrusday: [], friday: [] };
	var mondays = $(".monday input");
	var i=0;
	mondays.each(function(){ 
		var val = $(this).val();
		timetabl.monday[i] = val;
		i++;
	});


	var tuesdays = $(".tuesday input");
	var i=0;
	tuesdays.each(function(){ 
		var val = $(this).val();
		timetabl.tuesday[i] = val;
		i++;
	});


	var wednesdays = $(".wednesday input");
	var i=0;
	wednesdays.each(function(){ 
		var val = $(this).val();
		timetabl.wednesday[i] = val;
		i++;
	});

	var thursdays = $(".thrusday input");
	var i=0;
	thursdays.each(function(){ 
		var val = $(this).val();
		timetabl.thrusday[i] = val;
		i++;
	});


	var fridays = $(".friday input");
	var i=0;
	fridays.each(function(){ 
		var val = $(this).val();
		timetabl.friday[i] = val;
		i++;
	});

	var data = { department: "", year: "", timetable : timetabl };
	data.department = $("#deptt").val();
	data.year = $('#year').val();
	
	var existing = timetable.find({department:data.department, year:data.year}).fetch();

	if(existing.length){
		timetable.update({_id:existing[0]._id}, {$set:{timetable:data.timetable}});
	} else{
		timetable.insert(data);
	}
	
}

});
Template.createTimeTable.helpers({
'sTeacherData':function(){
var a= Session.get('choosendeptt');
return teacher.find({department:a});
}
});

Template.showTimeTable.events({
	
});
