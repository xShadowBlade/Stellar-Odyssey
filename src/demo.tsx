/**
 * @file Declares the react component for the game mvp
 */
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { E } from "emath.js";
import type { UpgradeStatic } from "emath.js";

import Game from "./game";
import { quarks, mass } from "./features/quarks";
import { atoms, cosmicCell, genesisReset } from "./features/atom";
import type { SCurrency } from "./lib/singularity";

interface SCurrencyDisplayProps {
    currency: SCurrency;
    renderCount: number;
    gainFn?: false | (() => void);
}

/**
 * Currency display component
 * @param props - props
 * @returns The currency display component
 */
const SCurrencyDisplay: React.FC<SCurrencyDisplayProps> = (props) => {
    const currency = props.currency.currency;
    const currencyStatic = currency.static;
    const [value, setValue] = useState(currencyStatic.value);
    useEffect(() => {
        setValue(currencyStatic.value);
    }, [props.renderCount]);

    const renderUpgrades = (): JSX.Element => {
        const upgradesEntries = Object.entries(currencyStatic.upgrades) as unknown as [string, UpgradeStatic][];
        return (<>
            {upgradesEntries.map(([key, upgrade]) => {
                const upgCalc = currencyStatic.calculateUpgrade(key);
                return (<>
                    <div key={key}>
                        <h3>{upgrade.name}</h3>
                        <p>
                            {upgrade.description}
                        </p>
                        <p>
                            Level: {upgrade.level.format()}
                        </p>
                        Next upgrade cost: {upgrade.cost(upgrade.level.add(upgCalc[0])).add(upgCalc[1]).format()} {props.currency.config.display.plural}
                        <br />
                        <button
                            onClick={() => {
                                currencyStatic.buyUpgrade(key);
                            }}
                        >
                            Buy {upgCalc[0].format()} Upgrades for {upgCalc[1].format()} {props.currency.config.display.plural}
                        </button>
                    </div>
                    <br />
                </>);
            })}
        </>);
    };

    return (
        <div>
            <h2>{props.currency.config.display.name}</h2>
            <p>
                {props.currency.config.display.description}
            </p>
            <p>
                {value.format()} {props.currency.config.ticker ? value.formatGain(currencyStatic.boost.calculate()) : `(${E.formats.formatMult(currencyStatic.boost.calculate())})`}
            </p>
            {props.gainFn !== false && <button onClick={() => { props.gainFn ? props.gainFn() : currencyStatic.gain(); }}>Gain</button>}
            <br />
            <br />
            {renderUpgrades()}
        </div>
    );

}

/**
 * @returns The game component
 */
function GameApp (): JSX.Element {
    // const [time, setTime] = useState(0);
    const [renderCount, setRenderCount] = useState(0);
    useEffect(() => {
        Game.eventManager.setEvent("render", "interval", 0, () => {
            setRenderCount((prevCount) => prevCount + 1);
        });

        Game.keyManager.addKey({
            id: "gainQuarks",
            key: "g",
            onDownContinuous: () => {
                quarks.currency.static.gain();
            },
        });

        return (): void => {
            Game.eventManager.removeEvent("render");
        };
    }, []);
    return (
        <div>
            <hr />
            <h1>Stellar Odyssey</h1>
            Mass level: {mass.level.current.format()} (Req: {mass.level.nextRequirement.format()})
            <p>This is just a test for gameplay. Complete overhaul coming soon.</p>
            <br />
            <button onClick={() => { Game.dataManager.resetData(true); }}>Reset Data</button>
            <br />
            <hr />
            <SCurrencyDisplay
                renderCount={renderCount}
                currency={quarks}
                // gainFn={false}
            />
            <hr />
            <SCurrencyDisplay
                renderCount={renderCount}
                currency={atoms}
                gainFn={() => {
                    console.log("Genesis reset");
                    genesisReset.reset();
                }}
            />
            <SCurrencyDisplay
                renderCount={renderCount}
                currency={cosmicCell}
                gainFn={false}
            />
            <hr />
        </div>
    );
}

const gameLayer = createRoot(document.getElementById("root") ?? document.createElement("div"));
gameLayer.render(<GameApp />);
