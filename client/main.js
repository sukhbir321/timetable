Template.navigation.events({
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