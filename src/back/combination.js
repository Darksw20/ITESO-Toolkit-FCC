export default (postParams) => {
    var result = {};
    result.case1 = case1(postParams)
    result.case2 = case2(postParams)
    result.case3 = case3(postParams)
    result.status = 200
    return result;
}

function fact (n) { 
    if(n < 0){ return 0;}
    if (n == 0){ 
        return 1; 
    }
    return n * fact (n-1); 
}
function case1(data){
    var formula = data.Poblation+"!/("+data.Sample+"!("+data.Poblation+"-"+data.Sample+")!)";
    let firstFact = fact(Number(data.Poblation));
    let sub = fact(Number(data.Poblation)-Number(data.Sample));
    var res = (firstFact)/(fact(Number(data.Sample))*(sub));
    return {formula: formula, res: res};
}
function case2(data){
    let formula = "("+data.Poblation+"*"+(Number(data.Poblation)-1)+"*("+data.Poblation+"-"+data.Sample+"+1))/"+data.Sample+"!";
    let parent = Number(data.Poblation)-Number(data.Sample)+1;
    let res = (Number(data.Poblation)*(Number(data.Poblation)-1)*(parent))/(fact(data.Sample));
    return {formula: formula, res: res};
}
function case3(data){
    let formula =  data.Poblation+"!/(("+data.Sample+")!("+(Number(data.Poblation))+"-"+data.Sample+")!";
    let formula2 = data.Poblation+"!/((("+data.Poblation+"-"+data.Sample+")-"+data.Sample+")!("+data.Poblation+"-"+data.Sample+")!))";
    return {formula: formula, formula2: formula2};

}