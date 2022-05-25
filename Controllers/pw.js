
// Javascript program to print all
// possible strings of length k

// The method that prints all
// possible strings of length k.
// It is mainly a wrapper over
// recursive function printAllKLengthRec()
function printAllKLength(set,k)
{
    let n = set.length;
    printAllKLengthRec(set, "", n, k);
}
	
// The main recursive method
// to print all possible
// strings of length k
function printAllKLengthRec(set,prefix,n,k)
{ 
        
    // Base case: k is 0,
    // print prefix
    if (k == 0)
    {
		
    }
	
    // One by one add all characters
    // from set and recursively
    // call for k equals to k-1
    for (let i = 0; i < n; ++i)
    {
	
        // Next character of input added
        let newPrefix = prefix + set[i];
			
        // k is decreased, because
        // we have added a new character
        if(k == 0){
            break;
        }
        printAllKLengthRec(set, newPrefix,
            n, k - 1);

            
    }
}
	
	
	

let i = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
let set1=i.split(",");
console.log(set1);
k = 5;
console.log(printAllKLength(set1, k));
	
// This code is contributed by avanitrachhadiya2155

