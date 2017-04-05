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
            var subj = subject.find({name:val}).fetch();
            if(subj.length){
                timetabl.monday[i] = {subject: val, teacher:subj[0].teacher};
                i++;
            }
        });


        var tuesdays = $(".tuesday select");
        var i=0;
        tuesdays.each(function(){ 
            var val = $(this).val();
            var subj = subject.find({name:val}).fetch();
            if(subj.length){
                timetabl.tuesday[i] = {subject: val, teacher:subj[0].teacher};
                i++;
            }
        });


        var wednesdays = $(".wednesday select");
        var i=0;
        wednesdays.each(function(){ 
            var val = $(this).val();
            var subj = subject.find({name:val}).fetch();
            if(subj.length){
                timetabl.wednesday[i] = {subject: val, teacher:subj[0].teacher};
                i++;
            }
        });

        var thursdays = $(".thrusday select");
        var i=0;
        thursdays.each(function(){ 
            var val = $(this).val();
            var subj = subject.find({name:val}).fetch();
            if(subj.length){
                timetabl.thrusday[i] = {subject: val, teacher:subj[0].teacher};
                i++;
            }

        });


        var fridays = $(".friday select");
        var i=0;
        fridays.each(function(){ 
            var val = $(this).val();
            var subj = subject.find({name:val}).fetch();
            if(subj.length){
                timetabl.friday[i] = {subject: val, teacher:subj[0].teacher};
                i++;
            }

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
            tableString += "<th>"+name+"</th>";
        }
        tableString += "</tr><tr><td colspan=75%>Monday</td></tr><tr>";

        var lectures = show.timetable.monday;
        for(k=0; k<lectures.length; k++){
            for(l=0; l<teachers.length; l++){
                if(lectures[k].teacher == teachers[l].shortname){
                    tableString += "<td>"+lectures[k].subject+"</td>";
                }else{
                    tableString += "<td>--</td>";
                }
            }
            tableString += "</tr><tr>"
        }
        tableString += "</tr><tr><td colspan=75%>Tuesday</td></tr><tr>";

        var lectures = show.timetable.tuesday;
        for(k=0; k<lectures.length; k++){
            for(l=0; l<teachers.length; l++){
                if(lectures[k].teacher == teachers[l].shortname){
                    tableString += "<td>"+lectures[k].subject+"</td>";
                }else{
                    tableString += "<td>--</td>";
                }
            }
            tableString += "</tr><tr>"
        }
        tableString += "</tr><tr><td colspan=75%>Wednesday</td></tr><tr>";

        var lectures = show.timetable.wednesday;
        for(k=0; k<lectures.length; k++){
            for(l=0; l<teachers.length; l++){
                if(lectures[k].teacher == teachers[l].shortname){
                    tableString += "<td>"+lectures[k].subject+"</td>";
                }else{
                    tableString += "<td>--</td>";
                }
            }
            tableString += "</tr><tr>"
        }
        tableString += "</tr><tr><td colspan=75%>Thrusday</td></tr><tr>";

        var lectures = show.timetable.thrusday;
        for(k=0; k<lectures.length; k++){
            for(l=0; l<teachers.length; l++){
                if(lectures[k].teacher == teachers[l].shortname){
                    tableString += "<td>"+lectures[k].subject+"</td>";
                }else{
                    tableString += "<td>--</td>";
                }
            }
            tableString += "</tr><tr>"
        }
        tableString += "</tr><tr><td colspan=75%>Friday</td></tr><tr>";

        var lectures = show.timetable.friday;
        for(k=0; k<lectures.length; k++){
            for(l=0; l<teachers.length; l++){
                if(lectures[k].teacher == teachers[l].shortname){
                    tableString += "<td>"+lectures[k].subject+"</td>";
                }else{
                    tableString += "<td>--</td>";
                }
            }
            tableString += "</tr><tr>"
        }
        tableString += "</tr>";


        $('.timetable').html(tableString);
    }
});
