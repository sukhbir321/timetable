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
        
        var show = timetable.find({department: deptt, year: year}).fetch();
        console.log(show);
    }
});
