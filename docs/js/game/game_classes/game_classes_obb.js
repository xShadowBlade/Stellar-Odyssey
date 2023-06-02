Game.classes.obb = class {
    constructor(array, methods) { //syntax ex. [{name: "a", properties: {boost: ""}}, {}]
        for (let x of array) {
            //console.log(x); debug
            
            if (!x["name"] || !x["properties"]) {break;}
            this[x["name"]] = x["properties"];
            ///console.log(x, x["name"], x["properties"]); debug
            if (methods != undefined) {
                for (let y of methods) {
                    if (!y["name"] || !y["value"]) {break;}
                    //console.log([y, y["name"], y["value"]]); debug
                    if (!this[x["name"]][y["name"]]) this[x["name"]][y["name"]] = y["value"];
                    //delete(this[y["name"]]["name"]);
                    //delete(this[y["name"]]["value"]);
                }
            }
            delete(this[x["name"]]["name"]);
            delete(this[x["name"]]["properties"]);

            
        }
        
    };
}