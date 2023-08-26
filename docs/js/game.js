const Game = {
    classes: {},
    data: {},
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
// function addLoopFunction(name, func) {Game["functions"].loop[name] = func}
// function addStartFunction(name, func) {Game["functions"].start[name] = func}
// addStartFunction("master", () => {
    // console.log("window.onload");
    // let loadingStart = Date.now();
    // Game["data"] = {
    // playtime: { //in milliseconds
    //     tActive: E(),
    //     tPassive: E(),
    //     timewarp: E(),
    //     active: E(),
    //     passive: E(),
    //     points: E(),
    //     timeLastPlayed: E(),
    //     boost: new Game.classes.boost("1"),
    // },
    // }
    // mass: new Game.classes.currencyLayer([
    //     {
    //         name: "currencies",
    //         properties: new Game.classes.obb([
    //         {
    //             name: "quarks",
    //             properties: {
    //             }
    //         },
    //     ], Game.classes.currencyLayer.methods.currencies())
    //     },
    //     {
    //         name: "upgrades",
    //         properties: new Game.classes.obb([
    //         {
    //             name: "points",
    //             properties: new Game.classes.obb([ //upgName, upgCostScaling, upgCostScalingType, upgCost, upgMxLvl, upgEffect)
    //                 {
    //                     name: "value",
    //                     properties: {
    //                         displayName: "Value",
    //                         display: document.getElementById("button-up-gain"),
    //                         costScaling: "3",
    //                         costScalingType: "multiply",
    //                         cost: E("10"),
    //                         mxLvl: E("1000"),
    //                         description: Function("return `Increases value by ${this.effectMult.toString()}x`"),
    //                         effect: function() {
                                
    //                         }
    //                     }
    //                 },
    //                 {
    //                     name: "speed",
    //                     properties: {
    //                         costScaling: "25",
    //                         costScalingType: "multiply",
    //                         cost: E("25"),
    //                         mxLvl: E("20"),
    //                         effect: function() {
                                
    //                         }
    //                     }
    //                 },
    //             ], Game.classes.currencyLayer.methods.upgrades("Game.data.points.currencies.points"))
    //         },
    //         {
    //             name: "superPoints",
    //             properties: new Game.classes.obb([ //upgName, upgCostScaling, upgCostScalingType, upgCost, upgMxLvl, upgEffect)
    //                 {
    //                     name: "pointsBoost1",
    //                     properties: {
    //                         costScaling: "3",
    //                         costScalingType: "multiply",
    //                         cost: E("50"),
    //                         mxLvl: E("1000"),
    //                         effect: function() {
                                
    //                         }
    //                     }
    //                 },
    //                 {
    //                     name: "workOnThisItsImportant",
    //                     properties: {
    //                         costScaling: "25",
    //                         costScalingType: "multiply",
    //                         cost: E("25"),
    //                         mxLvl: E("20"),
    //                         effect: function() {
                                
    //                         }
    //                     }
    //                 },
    //             ], Game.classes.currencyLayer.methods.upgrades("Game.data.points.currencies.superPoints"))
    //         }
    //         ])
    //     },
    // ]),
    // console.log(`Loading complete: Took ${Date.now() - loadingStart}ms`);
    // document.getElementById("content").style.display = "block";
// });