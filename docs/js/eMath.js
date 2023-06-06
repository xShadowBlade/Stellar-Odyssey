const eMath = {
    version: "etherealArithmetic Indev 0.4a",
    changeLogs: {
        indev: {
            "0.4": "Added changelogs, random() quantity, scuffed median",
            "0.4a": "Added quick sort, moved onload to init"
        }
    },
    number: class {
        constructor(layers, base, e) {
            //if (typeof(name) != "string") {throw("endlessNum: Invalid variable type for operation [new Number(name)]")}
            if (typeof(layers) != "number" && layers != undefined) {throw("TypeError: {endlessNum} Invalid variable type for operation [new Number(layers)]")}
            if (typeof(base) != "number" && layers != undefined) {throw("TypeError: {endlessNum} Invalid variable type for operation [new Number(base)]")}
            if (typeof(e) != "number" && layers != undefined) {throw("TypeError: {endlessNum} Invalid variable type for operation [new Number(e)]")}
            this.layers = layers > 1 ? layers + 1: 1;
            this.base = base != undefined ? base : 0;
            this.e = e != undefined ? e : 0;
            if (layers > 1) {
                for (i = 0; i < layers; i++) {
                    this[`e${i + 1}`] = 0; 
                }
            }
        }
        display() {return(eMath.settings[0] == 0 ? `${this.base}e${eMath.settings[1] == 0 ? "+" : ""}${this.e}` : `${this.base * Math.pow(10, this.e % 3)}e${eMath.settings[1] == 0 ? "+" : ""}${(this.e - this.e % 3)}`)}
        convertBase() {
            if (this.base >= 10) {
                this.e += this.base.toString().length - 1;
                this.base /= Math.pow(10, this.base.toString().length - 1);
            }
            
            if (this.base < 1) {
                this.e -= this.base.toString().length - 1;
                this.base *= (this.base.toString().length - 1) * 10;
            }
            
        }
        static max_safe = 21;
        add(number, type) {
            if(typeof(type) == "number" && typeof(number) == "object" && type == 1){

                if (number.e - this.e <= 0 - eMath.number.max_safe) {} else if (number.e - this.e > eMath.number.max_safe) {

                    this.base = number.base;
                    this.e = number.e;
                } else {
                    if (number.e >= this.e) { //number is bigger
                        let control = number.e - this.e;
                        this.base = number.base + this.base / Math.pow(10, control);
                        this.e = number.e;
                        this.convertBase();
                    } else if (number.e <= this.e) { //this is bigger
                        let control = this.e - number.e;
                        this.base += number.base / Math.pow(10, control);
                        this.convertBase();
                    }
                }
            } else {
                this.base += number;
                this.convertBase();
            }
        }
        subtract(number, type) {
            if(typeof(type) == "number" && typeof(number) == "object" && type == 1){

                if (number.e - this.e <= 0 - eMath.number.max_safe) {} else if (number.e - this.e > eMath.number.max_safe) {

                    this.base = 0 - number.base;
                    this.e = 0 - number.e;
                } else {
                    if (number.e >= this.e) { //number is bigger
                        let control = number.e - this.e;
                        this.base = number.base - this.base / Math.pow(10, control);
                        this.e = number.e;
                        console.log(this.base, this.e);

                        this.convertBase();
                    } else if (number.e <= this.e) { //this is bigger
                        let control = this.e - number.e;
                        this.base -= number.base / Math.pow(10, control);
                        console.log(this.base, this.e);
                        
                        this.convertBase();
                    }
                }
            } else {
                this.base += number;
                this.convertBase();
            }
        }
        
        multiply(number, type) {
            if(typeof(type) == "number" && typeof(number) == "object" && type == 1){
                this.base *= number.base;
                this.e += number.e;
                this.convertBase();
            } else {
                this.base *= number;;
                this.convertBase()
            }
        }
    },
    settings: [
        0, //notation: 0 = scientific; 1 = engineering
        0, //display: 0 = (+); 1 = ()
    ],
    equation: {
        solve: function(eq) {
            eq = this.parse(eq);
        },
        parse: function(eq) {
            let output;
            eq.forEachAdvanced(function(char) {
                console.log(char.value);
                switch (char.value) {
                    case "=":
                        
                        output = eq.split(char.index);
                        return;
                    break;
                }
            });
            return output;
        },
    },
    time: function(funct, rep) {
        let timeStart = new Date();
        for (i = 0; i < (rep ? rep : 1); i++) {
            funct();
        }
        timeTaken = Date.now() - timeStart;
        console.log(`Function complete: Took ${timeTaken}ms`);
        return(timeTaken);
    },
    // syncTime: function(func) {
    //     return new Promise(func => setTimeout(func, this.time(func)))
    // },
    random: (min, max, round) => !(round != undefined && !round) ? Math.round((Math.random() *  (max > min ? max - min : min - max)) + (max > min ? min: max)): (Math.random() *  (max > min ? max - min : min - max)) + (max > min ? min: max), //rounds by default, can disable
    string: (times, type) => {
        const stUpperBound = 35;
        const upperBound = 50;
        const errors = [
            {
                type: "TypeError",
                value: typeof(times) != "number",
                display: `${times} is not a number`
            },
            {
                type: "Error",
                value: times < 1,
                display: `${times} is less than 1`
            },
            {
                type: "Error",
                value: times % 1 != 0,
                display: `${times} is not an integer`
            },
            {
                type: "Error",
                value: times > stUpperBound && !type,
                display: `${times} exceeds the maximum call size of ${stUpperBound}`
            },
            {
                type: "Error",
                value: times > upperBound && type,
                display: `${times} exceeds the maximum call size of ${upperBound}`
            },
        ]
        for (let x of errors) {
            if (x.value) {
               throw(`${x.type}: ${x.display}`); 
            }
        }
        let output = Math.random() * 1232311;
        for (i = 0; i < times; i++) {
            output = btoa(output) + btoa(btoa(Math.random()));
        }
        return type ? output.length: output;
    },
    trueString: length => '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'.random(length),
    decimalFunctions: [
    {   
        name: "random",
        value: (min, max, qty, round) => {
            min = E(min);
            max = E(max);
            if (qty) {
                let out = [];
                for (i = 0; i < qty; i++) {
                    let output = E();
                    output = output.plus(max > min ? min : max).plus(max > min ? (max.minus(min).times(Math.random())) : (min.minus(max).times(Math.random())));
                    output = !(round != undefined && !round) ? output.round() : output;
                    out.push(output);
                }
                return out;
            } else {
                let output = E();
                output = output.plus(max > min ? min : max).plus(max > min ? (max.minus(min).times(Math.random())) : (min.minus(max).times(Math.random())));
                output = !(round != undefined && !round) ? output.round() : output;
                return output;
            }
        }
    },
    {   
        name: "mean",
        value: (array) => {
            let sum = new Decimal();
            let total = 0;
            for (let x of array) {
                total++;
                sum = sum.plus(x);
            }
            return(sum.divide(total));
        }, 
    },
    {
        name: "median", //bugs
        value: (array, sort = Decimal.sort, mean = Decimal.mean) => !array.length % 2 ? sort(array)[Math.floor(array.length / 2)] : mean([sort(array)[array.length], sort(array)[array.length - 1]])
    },
    {
        name: "mode", //also bugs
        value: (array) => {
            const stor = [{value: E(Infinity), frequency: 0}];
            let stor2 = [];
            let output = [];
            for (let x of array) { //add all values of array into storage
                x = E(x);
                for (let y of stor) {
                    console.log(y.value, x)
                    if (y.value.neq(x)) {
                        stor.push({
                            value: x,
                            frequency: 1,
                        });
                        break;
                    } else {y.frequency++; break}
                }
            }
            console.log(stor) //debug
            for (let x of stor) {stor2.push(x.frequency);} //make frequency array
            console.log(stor2) //debug
            stor2 = eMath.decimal.sort(stor2)[stor2.length - 1]; //sort frequency array
            console.log(stor) //debug
            for (let x of stor) {
                console.log(x)
                if (x.frequency == stor2) {
                    output.push(x.value);
                }
            }
            return output;
        }
    },
    

    {
        name: "sort", //default sort
        value: (array) => eMath.decimal.qtSort(array)
    },
    {
        name: "bbSort", //bubble sort
        value: (array) => {
            for(let i = 0; i < array.length; i++){
    
                // Last i elements are already in place 
                for(let j = 0; j < ( array.length - i -1 ); j++){
                   
                    // Checking if the item at present iteration
                    // is greater than the next iteration
                    if(E(array[j]).gt(E(array[j+1]))){
                        
                        // If the condition is true then swap them
                        let temp = array[j];
                        array[j] = array[j + 1];
                        array[j+1] = temp;
                    }
                }
            }
            return array;
        }
    },
    {
        name: "qtSort", //quick sort lr ptr
        value: (array) => {
            if (array.length < 2) {
              return array;
            }
            let pivot = E(array[Math.floor(Math.random() * array.length)]);
            let left = [];
            let right = [];
            let equal = [];
          
            for (let val of array) {
                val = E(val);
                if (val.lt(pivot)) {
                    left.push(val);
                } else if (val.gt(pivot)) {
                    right.push(val);
                } else {
                    equal.push(val);
                }
            }
            return [
              ...eMath.decimal.qtSort(left),
              ...equal,
              ...eMath.decimal.qtSort(right)
            ];
          }
    },
    
        /*
        How currencies above this work:
        (e^1000) = kiloverse (layer 1)
        (e^e^1000) = megaverse (layer 2)

        layer x = (e^...x...e^1000)
        */
        // logNum: class {
        //     constructor() {
        //         this.layer = new Decimal();
        //         this.mag0 = new Decimal(); //"lower number"
        //         this.mantissa = new Decimal(); //"upper number decimal"
        //         this.mag = new Decimal(); //"upper number tier/whole number"
        //     }
        //     static upperBoundLayer = new Decimal("(e^1000)1");
        //     update() {
        //         if (this.mag0.greaterThan(eMath.decimal.logNum.upperBoundLayer)) { //if is greater than e^1000
        //             this.mag = this.mag.plus("1");
        //             this.mag0 = new Decimal("0");
        //         }
        //         if (this.mag.greaterThan(eMath.decimal.logNum.upperBoundLayer)) { //if is greater than e^1000
        //             this.layer = this.mag.plus("1");
        //             this.mag = new Decimal("0");
        //         }
        //         this.mantissa = this.mag0.log(10).divide(eMath.decimal.logNum.upperBoundLayer);
        //     }
        //     toString() {
        //         return(`${this.layer.equals(0) ? "" : `L${this.layer.toString()}`}[${this.mag.toString()}{${this.mantissa.toString()}}]`);
        //     }
        // },
    ],
    encrypt: function (string, key) {
        let output = "";
        let x = 0;
        string.forEach(function(char) {
            if (x > key.length - 1) {
                x = 0;
            }
            output += (char + key[x]);
            x++;
        });
        output = btoa(output);
        return output;
    },
    decrypt: function (string) {
        let output = atob(string);
        let x2 = 1;
        string.forEach(function(char) {
            if(x2 == 1) {
                output += char;
                x2 = 0;
            } else {
                x2++
            }
        })
        return output;
    }
}
{ // String Prototypes
String.prototype.forEach = function(callbackfn) {
    for(i = 0; i < this.length; i++) {
        callbackfn(this[i]);
    }
}
String.prototype.forEachAdvanced = function(callbackfn, start, end) {
    for(i = (start < 0 ? 0 : start); i < (end > this.length ? this.length : (end < start ? this.length: end)); i++) {
        callbackfn({
            value: this[i],
            index: i,
        });
    }
}
String.prototype.toNumber = function() {
    let output = "";
    for(i = 0; i < this.length; i++) {
        output += this.charCodeAt(i).toString();
    }
    return output;
}
String.prototype.toArray = function() {
    let output = [];
    this.forEach(function(char) {
        output.push(char);
    });
    return output;
}
String.prototype.before = function(index) {
    let output = "";
    this.forEachAdvanced(function(char) {
        output += char.value;
    }, 0, index);
    return output;
}
String.prototype.after = function(index) {
    let output = "";
    this.forEachAdvanced(function(char) {
        output += char.value;
    }, index, -1);
    return output;
}
String.prototype.customSplit = function(index) {
    let output = [];
    output.push(this.before(index));
    output.push(this.after(index));
    return output;
}
String.prototype.random = function(qty) {
    let output = "";
    if(qty > 0){for (i = 0; i < qty; i++) {
        output += this.charAt(eMath.random(0, this.length));
    }} else {output = this.charAt(eMath.random(0, this.length))}
    return output;
}
}
// {
Array.prototype.random = function(qty) {
    let output = "";
    if(qty > 0){for (i = 0; i < qty; i++) {
        output += this[eMath.random(0, this.length)];
    }} else {output = this[eMath.random(0, this.length)]}
    return output;
}

eMath.getFast = function(object, id) { // search by convert to string, fast but omits document and class data
    object = JSON.stringify(object);
    const length = id.toString().replace(/\\/g, "").length;
    const searchIndex = object.search(id);
    let output = "";
    let offset = length + 2
    let unclosedQdb = 0; // ""
    let unclosedQsb = 0; // ''
    let unclosedQib = 0; // ``
    let unclosedB = 0; // []
    let unclosedCB = 0; // {}

    function check() {
        const read = object[searchIndex + offset];
        if (object[searchIndex + offset - 1] != "\\") {
            switch(read) {
                case "\"":
                    if (unclosedQdb == 0) { 
                        unclosedQdb = 1;
                    } else {
                        unclosedQdb = 0;
                    }
                break;
                case "\'":
                    if (unclosedQsb == 0) { 
                        unclosedQsb = 1;
                    } else {
                        unclosedQsb = 0;
                    }
                break;
                case "\`":
                    if (unclosedQib == 0) { 
                        unclosedQib = 1;
                    } else {
                        unclosedQib = 0;
                    }
                break;

                case "\[":
                    unclosedB++;
                break;
                case "\]":
                    unclosedB--;
                break;
                case "\{":
                    unclosedCB++;
                break;
                case "\}":
                    unclosedCB--;
                break;
            }
        }
        output += read;
        offset++;
    }
    check();
    while (unclosedQdb + unclosedQsb + unclosedQib + unclosedB + unclosedCB != 0) {
        check()
    }
    return JSON.parse(output);
};
// Object.prototype.getFast = function(id) { return Object.getF(this, id) };

eMath.get = function (object, id) { // recursive search
    try {
        for (let i = 0; i < Object.keys(object).length; i++) {
            if (Object.keys(object)[i] == "sign") break;
            if (Object.keys(object)[i] == id) {
                return object[Object.keys(object)[i]];
            } else if (typeof object[Object.keys(object)[i]] == "object") {
                let output = Object.get(object[Object.keys(object)[i]], id);
                if (output != null) return output;
            } else {
                continue;
            }
        }
        return null;
    } catch {
        return null;
    }
}
// Object.prototype.get = function (id) { return Object.get(this, id) }
// //Types
// String.prototype.isString = true;
// Decimal.prototype.isDecimal = true;
// Object.prototype.isObject = true;
// Array.prototype.isArray = true;
// Array.prototype.isObject = false; //this because all arrays are objects but not all objects are arrays for some reason
// }
eMath.decimal = {};
for (let x of eMath.decimalFunctions) {
    Decimal[x["name"]] = x["value"];
    eMath.decimal[x["name"]] = x["value"];
}
function E(x){return new Decimal(x)};

const TS = x => new Date(x != undefined ? x : new Date());

const VER = 0.0306
const EINF = Decimal.dInf

// Math.lerp = function (value1, value2, amount) {
// 	amount = amount < 0 ? 0 : amount;
// 	amount = amount > 1 ? 1 : amount;
// 	return value1 + (value2 - value1) * amount;
// };

Decimal.prototype.clone = function() {
    return this;
}

Decimal.prototype.modular=Decimal.prototype.mod=function (other){
    other=E(other);
    if (other.eq(0)) return E(0);
    if (this.sign*other.sign==-1) return this.abs().mod(other.abs()).neg();
    if (this.sign==-1) return this.abs().mod(other.abs());
    return this.sub(this.div(other).floor().mul(other));
};

Decimal.prototype.softcap = function (start, power, mode) {
    var x = this.clone()
    if (x.gte(start)) {
        if ([0, "pow"].includes(mode)) x = x.div(start).pow(power).mul(start)
        if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start)
        if ([2, "exp"].includes(mode)) x = expMult(x.div(start), power).mul(start)
    }
    return x
}

function scale(x, s, p, mode, rev=false) {
    s = E(s)
    p = E(p)
    if (x.gte(s)) {
        if ([0, "pow"].includes(mode)) x = rev ? x.mul(s.pow(p.sub(1))).root(p) : x.pow(p).div(s.pow(p.sub(1)))
        if ([1, "exp"].includes(mode)) x = rev ? x.div(s).max(1).log(p).add(s) : Decimal.pow(p,x.sub(s)).mul(s)
    }
    return x
}

Decimal.prototype.toRoman = function() {
    let num = this.clone();
    if (num.gte(5000)) return num;
    num = num.toNumber();

    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

Decimal.prototype.scale = function (s, p, mode, rev=false) {
    s = E(s)
    p = E(p)
    var x = this.clone()
    if (x.gte(s)) {
        if ([0, "pow"].includes(mode)) x = rev ? x.mul(s.pow(p.sub(1))).root(p) : x.pow(p).div(s.pow(p.sub(1)))
        if ([1, "exp"].includes(mode)) x = rev ? x.div(s).max(1).log(p).add(s) : Decimal.pow(p,x.sub(s)).mul(s)
    }
    return x
}

Decimal.prototype.format = function (acc=2, max=9) { return format(this.clone(), acc, max) }

Decimal.prototype.formatST = function (acc=2, max=9, type="st") { return format(this.clone(), acc, max, type) }

Decimal.prototype.formatGain = function (gain, mass=false) { return formatGain(this.clone(), gain, mass) }
