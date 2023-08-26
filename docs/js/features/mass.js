Game["data"].mass = new Game.classes.currencyLayer([
    {
        name: "currencies",
        properties: new Game.classes.obb([
        {
            name: "quarks",
            properties: {
            }
        },
    ], Game.classes.currencyLayer.methods.currencies())
    },
    {
        name: "upgrades",
        properties: new Game.classes.obb([
        {
            name: "quarks",
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
                    name: "capacity",
                    properties: {
                        costScaling: "25",
                        costScalingType: "multiply",
                        cost: E("25"),
                        mxLvl: E("20"),
                        effect: function() {
                            
                        }
                    }
                },
                {
                    name: "regeneration",
                    properties: {
                        costScaling: "10",
                        costScalingType: "multiply",
                        cost: E("100"),
                        mxLvl: E("20"),
                        effect: function() {
                            
                        }
                    }
                },
                {
                    name: "speed",
                    properties: {
                        costScaling: "1000",
                        costScalingType: "multiply",
                        cost: E("1000"),
                        mxLvl: E("20"),
                        effect: function() {
                            
                        }
                    }
                }
            ], Game.classes.currencyLayer.methods.upgrades("Game.data.points.currencies.points"))
        },
        ])
    },
]);