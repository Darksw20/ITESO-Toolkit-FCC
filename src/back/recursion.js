export default (postParams) => {
    var result = {};
    result.case1 = case1(postParams)
    result.status = 200
    return result;
}

function case1(data){
    let dataSub = fact(data.inf);
    let res = fact(data.sup) - dataSub;
    return {res: res}
}

function fact (n) { 
    if (n == 0){ 
        return 1; 
    }
    return n * fact (n-1); 
}