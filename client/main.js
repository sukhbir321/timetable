Template.form.events({
    'change #depttInForm':function(){
        var deptt = $('#depttInForm').val();
        Session.set('DEPARTMENT_NAME',  deptt);
    }
})

Template.formTemplate.events({
    'submit .form': function(event, template) {
        event.preventDefault(); // prevent page reload
        var firstname = event.target.teachername.value;
        var deptt=Session.get('DEPARTMENT_NAME');
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
        var deptt=Session.get('DEPARTMENT_NAME');
        var shortname=event.target.shortname.value;
        var year = event.target.year.value;
        var teacher = event.target.teacherName.value;
        Meteor.call('subject',name,deptt,code,shortname, year, teacher);
        console.log(name);
        console.log(deptt);
        console.log(code);
        console.log(shortname);

    }
});
Template.subject.helpers({
    subjectData:function(){
        return subject.find();
    },
    teachersData:function(){
        var deptt = Session.get('DEPARTMENT_NAME');
        var tchr = teacher.find({department: deptt});
        console.log(tchr.fetch());
        return tchr;
    }
});

Template.room.events({
    'submit #form': function(event, template) {
        event.preventDefault(); // prevent page reload
        var number = event.target.roomnumber.value;
        var deptt=Session.get('DEPARTMENT_NAME');
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
