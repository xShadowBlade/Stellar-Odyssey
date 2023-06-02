Game.classes.currencyLayer = class {
    constructor(array) { //syntax ex. [{name: "a", properties: {boost: ""}}, {}]
        for (let x of array) {
            //console.log(x); debug
            if (!x["name"] || !x["properties"]) {break;}
            if (x["name"] == "currencies") {
                this.currencies = x["properties"];
                delete(this[x["name"]]["name"]);
                delete(this[x["name"]]["properties"]);
                continue;
            }
            if (x["name"] == "upgrades" || x["name"] == "upgs") {
                this.upgrades = x["properties"];
                delete(this[x["name"]]["name"]);
                delete(this[x["name"]]["properties"]);
                continue;
            }   
        }
    }  
    static methods = { //more like defaults but too late
        currencies: function() {
            return([
            // {
            //     name: "updateDisplay",
            //     value: function() {
            //         let displayType;
            //         let formatType;
            //         let outlineType;
            //         if (this.staticPointer().functionArgs.updateDisplay) {
            //             displayType = this.staticPointer().functionArgs.updateDisplay[0]; 
            //             formatType = this.staticPointer().functionArgs.updateDisplay[1];
            //             outlineType = this.staticPointer().functionArgs.updateDisplay[2];
            //         }
                    
            //         let outline;
            //         switch(outlineType) { 
            //             case 1:
            //             default:
            //                 outline = (a, b) => `${a}: ${b} ${this.value.formatGain(this.boost.calculate())}`;
            //             break;
            //         }

            //         let firstValue;
            //         switch(displayType) { 
            //             case 1:
            //             default:
            //                 firstValue = this.staticPointer().displayName;
            //             break;
            //         }

            //         let secondValue;
            //         switch(formatType) { 
            //             case "eV":
            //             case "ev":
            //                 secondValue = Game.format.eV(this.value);
            //             break;
            //             case 1:
            //             default:
            //                 secondValue = this.value.format();
            //             break;
            //         }
            //         this.staticPointer().display.innerHTML = outline(firstValue, secondValue);
            //     }
            // },
            {
                name: "boost",
                value: new Game.classes.boost(1),
            },
            {
                name: "value",
                value: E(),
            },
            // {
            //     name: "gain",
            //     value: function(dt) {
            //         this.value = this.value.plus(this.boost.calculate().times(dt.div(1000)));
            //     },
            // }
            ])
        },
        upgrades: function(costCurrencyPointer) {
            return([
            {
                name: "buy",
                value: function(amount) { //wip, need to account for cost scaling in check
                    if(this.cost.times(amount).lessThanOrEqualTo(this.costCurrencyPointer().value) && this.level.plus(amount).lessThan(this.mxLvl)) { //make sure you have enough currency and you are not buying more than max
                        this.costCurrencyPointer().value = this.costCurrencyPointer().value.minus(this.cost); //subtract currency
                        this.costCurrencyPointer().updateDisplay();
                        this.level = this.level.plus(amount); //increase level
                        
                        switch(this.costScalingType) {
                            case "plus":
                            case "add":
                                this.cost = this.cost.plus(E(this.costScaling).times(amount));
                            break;
                            
                            // case "sub":
                            // case "subtract":
                            // case "minus":
                            //    this.cost = this.cost.plus(this.costScaling.times(amount));
                            // break;
                            
                            case "mul":
                            case "multiply":
                                this.cost = this.cost.times(E(this.costScaling).pow(amount));
                            break;
                        }
                        this.updateDisplay();
                        this.effect();
                        return this.level;
                    } else {
                        return 0;
                    }
                }
            },
            {
                name: "buyMax",
                value: function() {

                }
            },
            {
                name: "updateDisplay",
                value: function() {
                    this.display.innerHTML = `${this.displayName} [${this.level.toString()}/${this.mxLvl.toString()}] (${this.cost.round().toString()})`;
                }
            },
            {
                name: "costCurrencyPointer",
                value: Function(`return ${costCurrencyPointer}`)
            },
            {
                name: "level",
                value: E()
            },
            {
                name: "effectMult",
                value: E("1")
            }
            ])
        },
        static: function() {
            return([
            {
                name: "updateDisplay",
                value: function() {
                    let displayType;
                    let formatType;
                    let outlineType;
                    if (this.functionArgs.updateDisplay) {
                        displayType = this.functionArgs.updateDisplay[0]; 
                        formatType = this.functionArgs.updateDisplay[1];
                        outlineType = this.functionArgs.updateDisplay[2];
                    }
                    
                    let outline;
                    switch(outlineType) { 
                        case 1:
                        default:
                            outline = (a, b) => `${a}: ${b} ${this.value.formatGain(this.boost.calculate())}`;
                        break;
                    }

                    let firstValue;
                    switch(displayType) { 
                        case 1:
                        default:
                            firstValue = this.displayName;
                        break;
                    }

                    let secondValue;
                    switch(formatType) { 
                        case "eV":
                        case "ev":
                            secondValue = Game.format.eV(this.value);
                        break;
                        case 1:
                        default:
                            secondValue = this.value.format();
                        break;
                    }
                    this.display.innerHTML = outline(firstValue, secondValue);
                }
            },
            {
                name: "gain",
                value: function(dt) {
                    let type;
                    if (this.functionArgs.gain) {
                        type = this.functionArgs.updateDisplay[0]; 
                    }
                    this.dataPointer().value = this.value.plus(this.boost.calculate().times(dt / 1000));
                },
            }
            ])
        }
    }
    init(dataCurrencyPointer) { //only call on static instance
        Object.values(dataCurrencyPointer.currencies).forEach((item) => {
            // item.boost.baseEffect = item.staticPointer().functionArgs.boost ? item.staticPointer().functionArgs.boost : 1;
            addLoopFunction(item.displayName, (dt) => {
                item.gain(dt)
                item.updateDisplay();
            }); 

        })
    }
}