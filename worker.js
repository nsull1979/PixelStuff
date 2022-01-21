var index;
var workingArray = [];
self.onmessage = (event)=> {
    if(event.data.first){
        index = event.data.index;
        self.postMessage(event.data);
    } else {
        if(event.data.index === index){
            workingArray = event.data.partial;
            DoThing();
            self.postMessage({index: index, partial: workingArray});
        }
    }
 
}

function DoThing(){
    //do the thing
}