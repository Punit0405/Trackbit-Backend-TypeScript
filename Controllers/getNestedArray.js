let arr = [[],[{},{}],[[],[]]];
let simplearr=[];
for(let i=0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
        arrIterat(arr[i]);
    }else{
        simplearr.push(arr[i]);    }
}function arrIterat(array){
    for(let i=0;i<array.length;i++){
        if(!Array.isArray(array[i])){
            simplearr.push(array[i])
        }else{
            arrIterat(array[i])
        }
    }

}
simplearr=simplearr.filter((element)=>{
    if(element){
        return element
    }
})


console.log(simplearr.length);