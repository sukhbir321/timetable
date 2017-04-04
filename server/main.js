Meteor.methods({
'teacher':function(firstname,deptt,code,shortname){
teacher.insert({
        name: firstname,
        department:deptt,
        code:code,
        shortname:shortname
    });
console.log(firstname);
console.log(deptt);
console.log(code);
console.log(shortname);
}
});
Meteor.methods({
'subject':function(name,deptt,code,shortname, year, teacher){
subject.insert({
        name:name,
        department:deptt,
        code:code,
        shortname:shortname,
        year: year,
        teacher: teacher
    });
console.log(name);
console.log(deptt);
console.log(code);
console.log(shortname);
}
});
Meteor.methods({
'room':function(number,deptt,type){
room.insert({
        room:number,
        department:deptt,
        type:type
    });
console.log(number);
console.log(deptt);
console.log(type);

}
});
Meteor.methods({
'sr':function(subject,type,room){
sr.insert({
subject:subject,
type:type,
room:room
});
console.log(subject);
console.log(type);
console.log(room);
}
});
Meteor.methods({
'ts':function(teacher,code,subject){
ts.insert({
teacher:teacher,
code:code,
subject:subject
});
console.log(teacher);
console.log(code);
console.log(subject);
}
});

Meteor.methods({
'roomalot':function(type,subject){
roomalot.insert({
type:type,
subject:subject
});
console.log(type);
console.log(subject);
}
});
Meteor.methods({
 'roomalot.update'(idji, valuesji) {
	Pulley.update(idji,{$set:valuesji});
   }
});
