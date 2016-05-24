var heading = new Array();
    heading[0] = "JobID"
    heading[1] = "Company"
    heading[2] = "Skill Requirement"
    heading[3] = "Position"
    heading[4] = "Description"
    heading[5] = "Status"

var mockExecDAG = new Array();
mockExecDAG[0] = new Array("1", "Google", "C, Phython, java", "Software Engineer", "85.81", "Completed");
mockExecDAG[1] = new Array("2", "Facebbok", "java", "Software Engineer", "85.81", "Running");
mockExecDAG[2] = new Array("3", "Linkedin",  "java", "R & D", "85.81", "Running");
mockExecDAG[3] = new Array("4", "Amazon", "java", "Project Manager", "85.81", "Waiting");
mockExecDAG[4] = new Array("5", "Microsoft", "C#", "T & D", "85.81", "Waiting");
mockExecDAG[5] = new Array("6", "Tweeter", "Phython", "Frontend Engineer", "85.81", "Waiting");
mockExecDAG[6] = new Array("7", "Nicta", "java", "Frontend Engineer", "85.81", "Waiting");
mockExecDAG[7] = new Array("8", "Data61", "java", "R & D", "85.81", "Waiting");

var executionTag = "";

    $('#ajax-btn').click(function(){
        clear("task-table");
        addTableWithButton("task-table", heading, mockExecDAG, "#")
//        ajaxSend("/service/execDAG/?executionTag=" + executionTag, "get", executionTag, "admin", null, function(d){
//            addTableWithButton("task-table", heading, mockExecDAG)
//        });
    });



    function addTableWithButton(tableId, headings, table_data, baseUrl) {

        var table = document.getElementById(tableId)

        //Create TABLE headings
        var tableHead = document.createElement('thead')
        table.appendChild(tableHead);
        var tr = document.createElement('TR');
        tableHead.appendChild(tr);
        for (i = 0; i < headings.length; i++) {
            var th = document.createElement('TH')
    //      th.width = '75';
            th.appendChild(document.createTextNode(headings[i]));
            tr.appendChild(th);

        }
        //create operation heading
        var oth = document.createElement('TH')
        oth.appendChild(document.createTextNode("Operations"));
        tr.appendChild(oth);

        //TABLE Body
        var tableBody = document.createElement('tbody')
        table.appendChild(tableBody);

        for (i = 0; i < table_data.length; i++) {
            var tr = document.createElement('tr');
            tableBody.appendChild(tr);
            for (j = 0; j < table_data[i].length; j++) {
                var td = document.createElement('td')
                td.appendChild(document.createTextNode(table_data[i][j]));
                tr.appendChild(td)
            }
            //add buttons/operations in each row
            var btd = document.createElement('td');
            var submit =  document.createElement('button');
            submit.appendChild(document.createTextNode("View Job Info"));
            submit.setAttribute('type', 'button');
            submit.setAttribute('class', 'btn btn-info');
            submit.setAttribute('onclick', 'onView("' + table_data[i] + '");' );

            var update =  document.createElement('button');
            update.setAttribute('onclick', 'onUpdate("' + table_data[i] + '");' );
            update.appendChild(document.createTextNode("Apply"));
            update.setAttribute('class', 'btn btn-primary');

            var del =  document.createElement('button');
            del.setAttribute('class', 'btn btn-danger');
            del.appendChild(document.createTextNode("Cancel"));

            btd.appendChild(submit);
            btd.appendChild(update);
            btd.appendChild(del);
            tr.appendChild(btd)
        }
    }

function onView(d){
 alert(d[0])
 window.location.href="./job-profile.html"
}



function onUpdate(d) {
  alert(d[0])
  window.location.href = "http://google.com.au/?gws_rd=" + d[1];


}