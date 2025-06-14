function updateMaxRows(){
    var maxRows = document.getElementById('max_rows').value;
    document.getElementById('clg_options').rows = maxRows;
    document.getElementById('web_options').rows = maxRows;
    // document.getElementById('input_container').style.height = 120+maxRows*20 + 'px';
}
function fillTable(){
    var optionsText = document.getElementById('web_options').value;
    var clg_options = document.getElementById('clg_options').value.split('\n');
    var rows = optionsText.split('\n')
    var table = document.getElementById('table');
    var table2 = document.getElementById('table2');
    var table_innerHTML = '<thead><tr><th>In 1</th><th>College</th><th>Branch</th><th>In 2</th><th>Difference</th></tr></thead><tbody>';
    var table2_innerHTML = '<thead><tr><th>In 1</th><th>College</th><th>Branch</th><th>In 2</th></tr></thead><tbody>';
    console.log('filling table');
    var clg = 'Unknown';
    var webOpt = {};
    for(var ci in clg_options){
        var row = clg_options[ci];
        var cols;
        if(row.indexOf('\t') != -1){
            cols = row.split('\t');
        }else{
            cols = row.split(',');
        }
        if(cols.length == 2){
            if(!cols[0]){
                cols[0] = clg;
            }else{
                clg = cols[0];
            }
            var clg = cols[0];
            var brn = cols[1];
            if(webOpt[clg] == undefined){
                webOpt[clg] = {};
            }
            if(webOpt[clg][brn] == undefined){
                webOpt[clg][brn] = ['-','-'];
            }
            webOpt[clg][brn][0] = parseInt(ci)+1;
        }else{
            console.log(ci,'missed ci',row);
        }
    }

    for(var ri in rows){
        var row = rows[ri];
        var cols;
        if(row.indexOf('\t') != -1){
            cols = row.split('\t');
        }else{
            cols = row.split(',');
        }
        if(cols.length == 2){
            if(!cols[0]){
                cols[0] = clg;
            }else{
                clg = cols[0];
            }
            var brn = cols[1];
            if(webOpt[clg] == undefined){
                webOpt[clg] = {};
            }
            if(webOpt[clg][brn] == undefined){
                webOpt[clg][brn] = ['-','-'];
            }
            webOpt[clg][brn][1] = parseInt(ri)+1;
            var pos = webOpt[clg][brn][0];
            var pos1 = webOpt[clg][brn][1];
            var pdiff = (pos-pos1);
            // pdiff = Math.round(pdiff*100);
            table_innerHTML += '<tr><td>'+pos1+'</td><td>'+clg+'</td><td>'+brn+'</td><td>'+pos+'</td><td>'+pdiff+'</td></tr>';
        }else{
            console.log(ri,'missed',row);
        }
    }
    table_innerHTML += '</tbody>';

    for(clg in webOpt){
        var clgInfo = webOpt[clg];
        for(var brn in clgInfo){
            var pos = clgInfo[brn];
            if(pos[1] == '-' ){//pos[0] == '-' || 
                table2_innerHTML += '<tr><td>'+pos[1]+'</td><td>'+clg+'</td><td>'+brn+'</td><td>'+pos[0]+'</td></tr>';
            }
            console.log(clg,brn,clgInfo[brn]);
        }
    }
    table2_innerHTML += '</tbody>';
    table.innerHTML = table_innerHTML;
    table2.innerHTML = table2_innerHTML;
    const el = document.querySelector('#table2.sortable th:nth-child(4)')
    if(el){
        el.click();
        el.click();
    }
}
fillTable()
