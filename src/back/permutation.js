export default (postParams) => {
    var result = {};
    result.allElements = allElements()
    result.subElements = subElements()
    result.cyclic = cyclic()
    result.repeated = repeated()
    result.status = 200
    return result;
}
function allElements(){
    return "";
}
function subElements(){
    return "";
}
function cyclic(){
    return "";
}
function repeated(){
    return "";
}