Meteor.methods({
    'teacher':function(firstname,deptt,code,shortname){
        var existing = teacher.find({shortname: shortname}).fetch();
        if(existing.length){
            teacher.update({_id:existing[0]._id}, {$set:{name:firstname,
                                                         department: deptt,
                                                         code: code,
                                                         shortname: shortname}});
        }else{
            teacher.insert({
                name: firstname,
                department:deptt,
                code:code,
                shortname:shortname
            });
        }
    }
});

Meteor.methods({
    'subject':function(name,deptt,code,shortname, year, teacher){
        var existing = subject.find({shortname: shortname}).fetch();
        if(existing.length){
            subject.update({_id:existing[0]._id}, {$set:{name:name,
                                                         department: deptt,
                                                         code: code,
                                                         shortname: shortname,
                                                         year: year,
                                                         teacher: teacher}});
        }else{
            subject.insert({
                name:name,
                department:deptt,
                code:code,
                shortname:shortname,
                year: year,
                teacher: teacher
            });
        }
    }
});