const Game = {
    classes: {},
    functions: {
        start: {},
        startF: () => Object.values(Game.functions.start).forEach((item) => item()),
        loop: {},
        loopF: (dt) => Object.values(Game.functions.loop).forEach((item) => item(dt)),
    
        timewarp: t => Game["data"].playtime.timewarp = E(t),
    },
    static: {},
    settings: {
        framerate: 30,
        c2: false, //whether or not to display the "c^2" on formating eV
    },
    features: {}
}
function addLoopFunction(name, func) {Game["functions"].loop[name] = func}
function addStartFunction(name, func) {Game["functions"].start[name] = func}
addStartFunction("master", () => {
    console.log("window.onload");
    let loadingStart = Date.now();
    Game["data"] = {
    playtime: { //in milliseconds
        tActive: E(),
        tPassive: E(),
        timewarp: E(),
        active: E(),
        passive: E(),
        points: E(),
        timeLastPlayed: E(),
        boost: new Game.classes.boost("1"),
    },
    
    mass: new Game.classes.currencyLayer([
        {
            name: "currencies",
            properties: new Game.classes.obb([
            {
                name: "quarks",
                properties: {
                }
            },
            {
                name: "atoms",
                properties: {
                    boostValue: function() {return this.value.times(1.5).plus(1)},
                }
            },
            {
                name: "particles",
                properties: {
                    boostValue: function() {return this.value.times(1.2).plus(1)},
                }
            },
            {
                name: "molecules",
                properties: {
                    boostValue: function() {return this.value.plus(1)},
                }
            },
            //big gap here
            {
                name: "moons",
                properties: {
                    displayName: "Moons",
                    boostValue: function() {return this.value.log(1.05).plus(1)},
                }
            },
            {
                name: "planets",
                properties: {
                    displayName: "Planets",
                    boostValue: function() {return this.value.log(1.1).plus(1)},
                }
            },
            { //constellation
                name: "stars",
                properties: {
                    displayName: "Stars",
                    boostValue: function() {return this.value.log(1.2).plus(1)},
                }
            },
            {
                name: "nebulae",
                properties: {
                    displayName: "Nebulae",
                    boostValue: function() {return this.value.log(1.2).plus(1)},
                }
            },
            {
                name: "galaxies",
                properties: {
                    displayName: "Galaxies",
                    boostValue: function() {return this.value.log(1.2).plus(1)},
                }
            },
            {
                name: "universes",
                properties: {
                    displayName: "Universes",
                    boostValue: function() {return this.value.log(1.2).plus(1)},
                }
            },
            /*
            How currencies above this work:
            (e^1000) = kiloverse (layer 1)
            (e^e^1000) = megaverse (layer 2)

            layer x = (e^...x...e^1000)
            */

        ], Game.classes.currencyLayer.methods.currencies())
        },
        {
            name: "upgrades",
            properties: new Game.classes.obb([
            {
                name: "points",
                properties: new Game.classes.obb([ //upgName, upgCostScaling, upgCostScalingType, upgCost, upgMxLvl, upgEffect)
                    {
                        name: "value",
                        properties: {
                            displayName: "Value",
                            display: document.getElementById("button-up-gain"),
                            costScaling: "3",
                            costScalingType: "multiply",
                            cost: E("10"),
                            mxLvl: E("1000"),
                            description: Function("return `Increases value by ${this.effectMult.toString()}x`"),
                            effect: function() {
                                
                            }
                        }
                    },
                    {
                        name: "speed",
                        properties: {
                            costScaling: "25",
                            costScalingType: "multiply",
                            cost: E("25"),
                            mxLvl: E("20"),
                            effect: function() {
                                
                            }
                        }
                    },
                ], Game.classes.currencyLayer.methods.upgrades("Game.data.points.currencies.points"))
            },
            {
                name: "superPoints",
                properties: new Game.classes.obb([ //upgName, upgCostScaling, upgCostScalingType, upgCost, upgMxLvl, upgEffect)
                    {
                        name: "pointsBoost1",
                        properties: {
                            costScaling: "3",
                            costScalingType: "multiply",
                            cost: E("50"),
                            mxLvl: E("1000"),
                            effect: function() {
                                
                            }
                        }
                    },
                    {
                        name: "workOnThisItsImportant",
                        properties: {
                            costScaling: "25",
                            costScalingType: "multiply",
                            cost: E("25"),
                            mxLvl: E("20"),
                            effect: function() {
                                
                            }
                        }
                    },
                ], Game.classes.currencyLayer.methods.upgrades("Game.data.points.currencies.superPoints"))
            }
            ])
        },
    ]),
    life: new Game.classes.currencyLayer([
        {
            name: "currencies",
            properties: new Game.classes.obb([
                {
                    name: "DNA",
                    properties: {
                        displayName: "DNA",
                        value: E(),
                        boost: () => Game.data.currencies.points.points,
                        boostValue: function() {return this.value.log(1.2).plus(1)},
                    }
                },
            ], Game.classes.currencyLayer.methods.currencies())
        },
        {
            name: "upgrades",
            properties: new Game.classes.obb([
                {
                    name: "dna",
                    properties: new Game.classes.obb([ //upgName, upgCostScaling, upgCostScalingType, upgCost, upgMxLvl, upgEffect)
                        {
                            name: "pointsBoost1",
                            properties: {
                                costScaling: "3",
                                costScalingType: "multiply",
                                cost: E("50"),
                                mxLvl: E("1000"),
                                effect: function() {
                                    
                                }
                            }
                        },
                        {
                            name: "workOnThisItsImportant",
                            properties: {
                                costScaling: "25",
                                costScalingType: "multiply",
                                cost: E("25"),
                                mxLvl: E("20"),
                                effect: function() {
                                    
                                }
                            }
                        },
                    ], Game.classes.currencyLayer.methods.upgrades("Game.data.life.currencies.dna"))
                }
            ], Game.classes.currencyLayer.methods.currencies())
        }
    ]),
    cellBuilder: {
        area: new custom.html.grid(new Game.classes.grid(5, 5), "50px", "50px", "grid-container", document.body),
        id: {
            "0": class { //cytoplasm
                constructor() {
                    this.tier = 0;
                    this.id = 0;
                    this.name = "Cytoplasm";
                    this.effect = E();
                    this.src = function() {return "Art/cell_builder/0_0.png"}
                    this.description = function() {return `Increases transportation by ${this.effect} compounding`}
                }
            },
            "1": class { //nucleus
                constructor(tier) {
                    this.tier = tier;
                    this.id = 1;
                    this.name = "Nucleus";
                    this.effect = E();
                    this.src = function() {return `Art/cell_builder/1_${this.tier}.png`}
                    this.description = function() {return `Increases control by ${this.effect}. Also increases nearby organelles effect by ${this.effect.divide(100).round()}%`}
                }
                updateEffect() {
                    this.effect = E("1.25").pow(this.tier + 2).pow(Math.pow(this.tier + 2, 0.9)).sqrt().times(this.tier).sqrt().round();
                }
            },
            "2": class { //cell membrane
                constructor(tier) {
                    this.tier = tier;
                    this.id = 2;
                    this.name = "Cell Membrane";
                    this.effect = E();
                    this.src = function() {return `Art/cell_builder/2_${this.tier}.png`}
                    this.description = function() {return `Increases transportation by ${this.effect} compounding`}
                }
            },
        },
        // id: new Game.classes.obb([
        //     {
        //         name: "1",
        //         properties: {
        //             name: "Nucleus",
        //             description: function () {
        //                 return `Increases control by ${this.effect}. Also increases nearby organelles effect by ${this.effect.divide(100).round()}%`;
        //             }
        //         }
        //     },
        //     {
        //         name: "2",
        //         properties: {
        //             name: "Cytoplasm", //low effectiveness
        //             description: function () {
        //                 return `Increases transportation by ${this.effect} compounding`;
        //             }
        //         }
        //     },
        //     {
        //         name: "2",
        //         properties: {
        //             name: "Cell Membrane",
        //             description: function () {
        //                 return `Increases transportation by ${this.effect} compounding`;
        //             }
        //         }
        //     },
        // ], [
        //     {
        //         name: "effectMultiplier",
        //         value: E()
        //     },
        //     {
        //         name: "effect",
        //         value: E()
        //     },
        // ])
    },
    };
    // console.log(`Loading complete: Took ${Date.now() - loadingStart}ms`);
    // document.getElementById("content").style.display = "block";
});