var testcases = JSON.stringify({
    "Chemicals": [
        {
            "name": "Butane",
            "Category": "Flammable",
            "UNnumber": "UN-1969",
            "Division": "2.1",
            "color": "",
            "desc": "Very Flammable"
    },
        {
            "name": "Isobetmutl",
            "Category": "Corrosive",
            "UNnumber": "UN-2529",
            "Division": "3",
            "color": "",
            "desc": "Very Corrosive"
    },
        {
            "name": "Ammonium-Nitrate",
            "Category": "Oxidizer",
            "UNnumber": "UN-2067",
            "Division": "5.1",
            "color": "yellow",
            "desc": "Very Oxidizing"
    },
        {
            "name": "Dichlordiethlyether",
            "Category": "BadStuff",
            "UNnumber": "UN-1916",
            "Division": "6.1",
            "color": "red",
            "desc": "Very Dangerous"
    }
  ]
});


function addMaterialToTruck(i, color, name, un_num, description, category, division) {
    var chem =         
        '<a id="chemitem' + 
        i +
        '" class="entry ' + 
        color + 
        '" role="button" data-toggle="collapse" href="#item' + 
        i + '" aria-expanded="false" aria-controls="item' + 
        i + '"><p class="un-num">' +
        un_num +
        '<span class="pull-right">';
    if (un_num == "UN-2067") {
        chem = chem + '<i class="fa fa-exclamation-triangle warning" aria-hidden="true"></i>';
    } 
    else if (un_num == "UN-1916") {
       chem = chem + '<i class="fa fa-exclamation-triangle alert" aria-hidden="true"></i>';   
    }
    chem = chem + '<i class="fa fa-chevron-down" aria-hidden="true"></i></span></p><p class="small">' + 
        name + 
        '</p></a>' +
        '<div class="collapse" id="item' + 
        i + '"><div class="well">' +
        '<div class="info"><p class="category"><strong>Category:</strong> ' + 
        category + '</p><p class="category"><strong>Division:</strong> ' + 
        division +'</p><p class="category"><strong>Description:</strong> ' + 
        description +
        '</p><a href="content-page.html" class="fullInfo">View All Info</a></div>';
    if (un_num == "UN-2067" || un_num == "UN-1916") {
        chem = chem + '<a role="button" data-toggle="collapse" href="#item'+ 
            i +
            '" aria-expanded="false" aria-controls="item' + 
            i +
            '" data-toggle="collapse"><p class="circle"><i class="fa fa-circle-thin  fa-2x" aria-hidden="true"></i><span class="resolve">MARK ISSUE RESOLVED</span></p></a>';
    }
    chem = chem + '<a role="button" id="removeitem' +
                i +
                '" data-toggle="collapse" href="#item'+ 
                i +
                '" aria-expanded="false" aria-controls="item' + 
                i + 
                '" data-toggle="collapse"><p class="circle"><i class="fa fa-circle-thin  fa-2x" aria-hidden="true"></i><span class="resolve">REMOVE ITEM</span></p></a></div></div>';

    $('#chemlocation').append(chem);
}

$(document).ready(function () {
    var count = 1;
    var json = JSON.parse(testcases);
    var availabletestchemicals = [];
    for (var i = 0; i < 4; i++) {
        availabletestchemicals.push(json.Chemicals[i].UNnumber + ' - ' + json.Chemicals[i].name);
    }
    $('#exampleInputAmount').autocomplete({
        source: availabletestchemicals,
        select: function (event, ui) {
            //alert(json.Chemicals);
            $.each(json.Chemicals, function (i, v) {
                //alert(ui.item.value);
                if (v.UNnumber == ui.item.value.substring(0, 7)) {
                    addMaterialToTruck(count, v.color, v.name, v.UNnumber, v.desc, v.Category, v.Division);
                    $('#removeitem' + count).click(function() {
                        $('#chemitem' + count).remove();
                        $('#item' + count).remove();
                    }); 
                    count++;

                    if (ui.item.value.substring(0, 7) == "UN-1969") {
                        $('#flam2').removeClass('hidden');
                    } else if (ui.item.value.substring(0, 7) == "UN-2529") {
                        $('#dang').removeClass('hidden');
                    } else if (ui.item.value.substring(0, 7) == "UN-2067") {
                        $('#flam3').removeClass('hidden');
                    } else if (ui.item.value.substring(0, 7) == "UN-1916") {
                        $('#oxdiz').removeClass('hidden');
                    }
                }
            });
            $(this).value('');
        }
    });
    



});
