Template.createTimeTable.events({
    'click #submit':function(){
        var choosendeptt=$('#teacherTextbox').val();
        Session.set('choosendeptt', choosendeptt);
    },

    'click #nextBtn':function(){
        var left = $(".columns-wrapper").css('left');
        if(left == '-1200px' ){
            $('.columns-wrapper').css('left', '0px');
        }else{
            var newleft = parseInt(left) - 300;
            $('.columns-wrapper').css('left', newleft+'px');        
        }

    },

    'click #createBtn':function(){
        timetabl =  { monday: [], tuesday: [], wednesday: [], thrusday: [], friday: [] };
        var mondays = $(".monday select");
        var i=0;
        mondays.each(function(){ 
            var val = $(this).val();
            timetabl.monday[i] = val;
            i++;
        });


        var tuesdays = $(".tuesday select");
        var i=0;
        tuesdays.each(function(){ 
            var val = $(this).val();
            timetabl.tuesday[i] = val;
            i++;
        });


        var wednesdays = $(".wednesday select");
        var i=0;
        wednesdays.each(function(){ 
            var val = $(this).val();
            timetabl.wednesday[i] = val;
            i++;
        });

        var thursdays = $(".thrusday select");
        var i=0;
        thursdays.each(function(){ 
            var val = $(this).val();
            timetabl.thrusday[i] = val;
            i++;
        });


        var fridays = $(".friday select");
        var i=0;
        fridays.each(function(){ 
            var val = $(this).val();
            timetabl.friday[i] = val;
            i++;
        });

        var data = { department: "", year: "", timetable : timetabl };
        data.department = Session.get('DEPARTMENT_NAME');
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
    'sSubjectData':function(){
        var a= Session.get("DEPARTMENT_NAME");
        return subject.find({department:a});
    },
});

Template.showTimeTable.events({
    'click #showBtn':function(){
        var year = $('#yearinShow').val();
        var deptt = Session.get("DEPARTMENT_NAME");

        var show = timetable.find({department: deptt, year: year}).fetch()[0];

        var tableString = "<p>Monday</p><table><tr>";
        var teachers = teacher.find({department: deptt}).fetch();
        for(tchr of teachers){
            var name = tchr.shortname;
            tableString += "<td>"+name+"</td>";
        }
        tableString += "</tr>";

        for(lecture1 in show.timetable){
            var lecture = show.timetable[lecture1][0];
            var teacherAlloted = subject.find({shortname: lecture, department: deptt}).fetch();
            if(teacherAlloted.length){
                var code = teacherAlloted[0].teacher;
                console.log(code);
            }
        }

        $('.timetable').html(tableString);
    }
});
