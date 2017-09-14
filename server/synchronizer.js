//////////  counterInit(<id>, <exp>); dropCounter(<id>, <exp>); removeCounter(<id>); callCount(<id>, <callback>, ~ <exp>)
///////// Короче сначала делаете counterInit('asd',3); Затем на несколько асинхронных вызовов ставите callCount('asd', function(id){console.log('Этот колбэк вызовится только на третий раз. (значение вашего <exp>)')})
///////////////////////////////////////////////////////////
function ValInObjArr( objArray, subj, inkey, sensetive ) {
  var sens = ( ( typeof inkey ) === "boolean" ) ? inkey : false;
  var found = false;
  var result = {};
  if ( objArray.length > 0 ) {

    objArray.forEach( function ( obj, ind ) {
      if ( !sens && inkey ) {
        var sub1 = sensetive ? obj[ inkey ] : obj[ inkey ].toLowerCase();
        var sub2 = sensetive ? subj : subj.toLowerCase();
        if ( sub1 == sub2 ) {
          found = true;
          result = ind;
        }
      } else {
        for ( var key in obj ) {
          if ( obj.hasOwnProperty( key ) ) {
            console.log( obj[ key ] )
            var sub1 = sens ? obj[ key ] : obj[ key ].toString().toLowerCase();
            var sub2 = sens ? subj : subj.toString().toLowerCase();
            if ( sub1 == sub2 ) {
              found = true;
              result = ind;
            }
          }
        }
      }
    } )
  }
  if ( found ) {
    return result;
  } else {
    return false;
  }

}
var counters = []

function counterInit(id, exp) {
  var r = ValInObjArr(counters, id, 'id', true);
  var v = (r.toString()==="false") ? false : true;
  if(v){
    console.log('ID',id,'is Already in use.')
  }else{
    counters.push({id:id, counter:0, expected: exp})
    console.log('ID',id,'Successfully created!')
  }
}
function dropCounter(id, exp) {
  var r = ValInObjArr(counters, id, 'id', true);
  var v = (r.toString()==="false") ? false : true;
  // console.log((r!=false) ? false:true,'<>',(r!=false),'v',v,'r',r)
  if(v){
    counters[r].counter = 0;
    counters[r].expected = exp ? exp : counters[r].expected;
    console.log('ID',id,'was reseted.')
  }else{
    console.log('ID',id,'Not created yet. Is this ID Norm?')
  }
}
function removeCounter(id) {
  var r = ValInObjArr(counters, id, 'id', true);
  var v = (r.toString()==="false") ? false : true;
  if(v){
    var removed = counters.splice(r,1);
    console.log('ID ', removed, 'was removed.')
  }else{
    console.log('ID',id,' not exist')
  }
}

function callCount(id, callback, exp){
  var r = ValInObjArr(counters, id, 'id', true);
  var v = (r.toString()==="false") ? false : true;
  if(v){
    // console.log('asd',(r.toString()==="false"),(r>-1),v,r);
    counters[r].counter++
    if(counters[r].expected == counters[r].counter){
      counters[r].counter = 0;
      callback(id);
    }
  }else{
    if(exp){
      counters.push({id:id, counter:0, expected: exp})
      console.log('Warning! ID',id,'is not created yet. \nBut i`ll create new for you. ', '(ID is '+id+', exp '+exp+')','\nBut next time use counterInit(<id>, <exp>) function.')
      counters[counters.length-1].counter++
    } else {
      console.log('Error! ID not found.','Use counterInit(<id>, <exp>) function.', 'Or pass <expected count> as 4th arguent to create or check ID key')
    }
  }
}
////////////////////////////////////////////////
module.exports.callCount = callCount;
module.exports.removeCounter = removeCounter;
module.exports.dropCounter = dropCounter;
module.exports.counterInit = counterInit;
///////////////////////////////////////////////
