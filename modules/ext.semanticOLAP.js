/**
 * Annotator Extension Main Script
 * Author: DominikMartin, BenjaminHosenfeld
 */
//mw.notify( $('<span>Hallo ' + mw.user.getName() + ',<br>Sie können Annotator nun benutzen indem Sie auf '+mw.msg('annotate-button-text')+' klicken...</span>') );

// flag representing the status of annotator mode


(function() {
    
    appendSpinner();

   // $('#main').hide();
    $("#checkboxCategory").select2({
        placeholder: "Select a Category"
    });
    $("#checkboxProperty").select2({
        placeholder: "Select a Property"
    });


    $('#submit-btn').click(function() {
        //Check
        if ($('#checkboxCategory > :checked').length >= 1 && $('#checkboxProperty > :checked').length >= 1) {
            //Alles gut
            appendSpinner();
            loadSelection();
        } else {
            //Warnung
            sweetAlert(mw.msg('so-error-message-title'), mw.msg('so-error-message-body'), "error");
        }

    });

    api.getAllCategories(function(categories) {
        $('#checkboxCategory').empty();
        categories.forEach(function(category, idx, categories) {
            var label = category.title.replace("Category:", "");
            $('#checkboxCategory').append('<option value="' + label + '">' + label + "</option>");
            var m = ("#checkboxCategory");


        });


    });

    api.getAllProperties(function(properties) {
        properties.forEach(function(property, idx, properties) {
            var label = property.title.replace("Property:", "");
            $('#checkboxProperty').append('<option value="' + label + '">' + label + "</option>");
            if (idx == properties.length - 1) {
                $('.annotator-loading').hide();
            }

        });

    });

    $('#selectData-btn').click(function() {
        $('#main').fadeOut(0);
        $('#splashscreen').show();
    });


}());

function getQuery() {
    var request = '';
    var k = 0;
    $("#checkboxCategory > :checked").each(function() {
        if (k != 0) {
            request += ' OR '
        }
        request += '[[Category:' + $(this).val() + ']]';
        k++;
    });

    $("#checkboxProperty > :checked").each(function() {
        request += '|?' + $(this).val();
    });

    return request;
}

function getDataTypes(printrequests) {
    var type = {};
    $.each(printrequests, function(index, value) {
        if (index == 0) {
            type['Wiki Page'] = value.typeid;
        } else {
            type[value.label] = value.typeid;
        }
    });
    return type;
}

function loadSelection() {
    var query = getQuery();
    var data = [];
    var types;
    var url = mw.config.get('wgScriptPath') + '/api.php?action=ask&query=' + query + '&format=json';
    $.getJSON(url, function(json) {
            types = getDataTypes(json.query.printrequests);
            //Prerpare Data
            $.each(json.query.results, function(key, results) {
                var line = [];
                //key ist main
                line.push(key);
                $.each(results.printouts, function(keyPrintout, printouts) {
                    //Nehme mal "nur" erstes
                    if (printouts.length > 0) {
                        //if text or code then
                        switch (types[keyPrintout]) {
                            case '_txt':
                            	//Text
                                line.push(printouts[0]);
                                break;
                            case '_cod':
                            	//Code
                                line.push(printouts[0]);
                                break;
                            case '_wpg':
                                line.push(printouts[0].fulltext);
                                break;
                            case '_anu':
                            	//AnnotationURI
                                line.push(printouts[0]);
                                break;
                            case '_boo':
                                //Boolean
                                if (printouts[0] == 't') {
                                	line.push('True');
                                } else if (printouts[0] == 'f') {
                                	line.push('False');
                                } else {
                                	line.push(printouts[0]);
                                }
                                break;
                            case '_dat':
                                line.push(printouts[0]);
                                break;
                            case '_ema':
                                //Email
                                line.push(printouts[0]);
                                break;
                            case '_eid':
                                //Extermal Identifier
                                line.push(printouts[0]);
                                break;
                            case '_geo':
                                line.push();
                                break;
                            case '_mlt_rec':
                            	//Monolingual Text
                                line.push(printouts[0].Text.item[0] + '@' + printouts[0]['Language code'].item[0]);
                                break;
                            case '_num':
                            	//Number
                                line.push(printouts[0]);
                                break;
                            case '_qty':
                            	//Quantity
                                line.push(printouts[0].value);
                                types[keyPrintout + '_unit'] = printouts[0].unit;
                                break;
                            case '_rec':
                            	//Record is not supported
                            	line.push('');
                                break;
                            case '_tel':
                                //Telephonenumber
                                line.push(printouts[0]);
                                break;
                            case '_tem':
                                //Temperature
                                line.push(printouts[0]);
                                break;
                            case '_ref_rec':
                                //Reference is not supported
                            	line.push('');
                                break;
                            case '_uri':
                                //URL
                                line.push(printouts[0]);
                                break;
                        }
                    } else if (printouts.length == 0) {
                    	if (types[keyPrintout] == '_num' || types[keyPrintout] == '_qty') {
                    		line.push(0);
                    	} else {
                    		line.push('');
                    	}
                        
                    }

                });
                data.push(line);
            });
        })
        .done(function() {
            /* Start Pivot Table if loading successfully */
            console.log("Loading Data Completed.");
            if (data.length == 0) {
            	sweetAlert(mw.msg('so-noResults-message-title'), mw.msg('so-noResults-message-body') + '</br></br>' + query, "error");
            } else {
            	var config = setUpConfig(types, data);
            	initPivotTable(config)
            }
            
        })
        .fail(function() {
            console.log("Error: Loading Data Failed.");
        })




}

function setUpConfig(types, data) {
    fields = [];
    var i = 0;
    $.each(types, function(index, value) {
        if (index.indexOf('_unit') == -1) {
            var obj = {};
            obj['name'] = i;
            obj['caption'] = index;

            if (value == '_qty') {
                var dataSettings = {};
                dataSettings['aggregateFunc'] = 'sum';
                dataSettings['formatFunc'] = function(value) {
                    return value ? Number(value).toFixed(0) + ' ' + types[index + '_unit'] : '';
                }
                obj['dataSettings'] = dataSettings;
            } else {
                obj['sort'] = { order: 'asc' };
            }
            i++;
            fields.push(obj);
        }

    });

    var config = {
        dataSource: data,
        dataHeadersLocation: 'columns',
        theme: 'blue',
        toolbar: {
            visible: true
        },
        grandTotal: {
            rowsvisible: true,
            columnsvisible: true
        },
        subTotal: {
            visible: true,
            collapsed: true
        },
        width: 11100,
        height: 6450
    };
    config['fields'] = fields;

    return config;
}

function initPivotTable(config) {
    //Zerstöre rr und baue neu auf
    $('#rr').remove();
    var elem = $(document.createElement('div'))[0];
    elem.style.padding = '7px';
    elem.id = 'rr';
    $('#main').append(elem);

    var pgridwidget = new orb.pgridwidget(config);
    pgridwidget.render(elem);

    $('#splashscreen').fadeOut(0);
    $('#main').show();
    $('.annotator-loading').hide();
}

function appendSpinner() {
    $('body').append('<div class="annotator-loading"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>');
}