export default (postParams) => {
    var result = {};
    result.allElements = allElements(postParams)
    result.subElements = subElements(postParams)
    result.cyclic = cyclic(postParams)
    result.repeated = repeated(postParams)
    result.status = 200
    return result;
}
function allElements(data){
    if(data.Poblation != 0){
        let formula = data.Poblation+"!"
        let res = fact(Number(data.Poblation))
        return {formula: formula, res: res};
    }else{ return {}}
}
function subElements(data){
    if(data.Poblation != 0){
        let formula = data.Poblation+"!/("+data.Poblation+"-"+data.Sample+")!"
        let res = fact(Number(data.Poblation))/fact(Number(data.Poblation)-Number(data.Sample))
        return {formula: formula, res: res};
    }else{return {}}
}
function cyclic(data){
    if(data.Poblation != 0){
        let formula = "("+data.Poblation+"-1)!"
        let res = fact(Number(data.Poblation)-1)
        return {formula: formula, res: res};
    }else{return {}}
}
function repeated(data){
    if(data.Poblation != 0){
        let n = data.Word.length;
        let formula = data.Poblation+"!/(";
        let rep = findRepeat(data.Word)
        let preFac = 1; 
        rep.forEach(element=>{
            preFac = fact(element.times) * preFac
            formula += element.times+"!*";
        })
        let res = fact(n) / (preFac);
        formula = formula.substring(0,formula.length - 1);
        formula += ")"
        return {formula: formula, res: res, hash: rep};
    }else{
        return {}
    }
}

function fact (n) { 
    if(n < 0){ return 0;}
    if (n == 0){ 
        return 1; 
    }
    return n * fact (n-1); 
}

function findRepeat(str) {
  const arr = str.split('');
  const hash = new Map();
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (hash.get(arr[i]) === undefined) {
      hash.set(arr[i], 1);
    } else {
      var value = hash.get(arr[i]);
      if (value) {
        value++;
        hash.set(arr[i], value);
      }
    }
  }
  hash.forEach((v, k) => {
    if (v>1)
      result.push({letter: k, times: v});
  });
  return result;
}