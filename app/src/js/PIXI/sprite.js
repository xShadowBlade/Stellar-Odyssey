/* eslint-disable react/prop-types */
/**
 * @file js/PIXI/sprite.js
 * @description
 * This JavaScript file defines the `Game.classes.sprite` class, which represents a game sprite
 * created from a PIXI.Sprite. It provides functionality for managing sprite properties, collision
 * detection, and rendering offset by the camera.
 */

import React, { useEffect } from "react";
import { Sprite as PixiSprite } from "@pixi/react";
import * as PIXI from "pixi.js";
import Intersects from "./pixi-intersects";

class Sprite extends React.Component {
    /**
     * Constructs a new game sprite.
     *
     * @param {PIXI.Sprite} spr - The PIXI sprite to create the game sprite from.
     * @param {string} [collisionShape] - The type of collision shape to use for the sprite.
     * Default: "Rectangle"
     * Allowed values: "Circle", "Polygon", "Rectangle", "Shape", "Line".
     */
    constructor (props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
        };
        this.spriteRef = React.createRef();
        this.intersects = new Intersects[props.collisionShape](this.spriteRef);
    }

    componentDidMount () {
        const { app, camera } = this.props;

        // Offset by camera
        app.ticker.add(() => {
            const { x, y } = this.state;
            this.spriteRef.current.x = x - camera.x;
            this.spriteRef.current.y = y - camera.y;
        });
    }
    /**
     * Checks if this sprite collides with another sprite.
     *
     * @param {Game.classes.sprite} other - The other sprite to check for collision with.
     * @returns {boolean} True if a collision occurs, otherwise false.
     */
    collides (other) {
        return this.intersects[`collides${other.collisionShape}`](other.intersects);
    }

    /**
     * Removes the sprite.
     *
     * @param {array|object} parent - The parent array or object from which to remove the sprite.
     */
    remove (parent) {
        this.setState({ x: Infinity, y: Infinity }); // Buggy collision detection
        this.spriteRef.current.parent.removeChild(this.spriteRef.current);

        if (Array.isArray(parent)) {
            const index = parent.indexOf(this);
            if (index !== -1) {
                parent.splice(index, 1);
            }
        } else if (typeof parent === "object") {
            delete this;
        }
    }

    render () {
        const { x, y } = this.state;
        const { sprite, collisionShape } = this.props;

        return (
            <PixiSprite
                ref = { this.spriteRef }
                texture = { PIXI.Texture.from(sprite.texture) } // Adjust this based on your sprite setup
                x = { x }
                y = { y }
                anchor = { 0.5 } // Adjust the anchor point based on your sprite setup
            />
        );
    }
}

export default Sprite;


// import { app } from ".././index.js";
// import Intersects from "./pixi-intersects.js";

// class Sprite {
//     /**
//      * Constructs a new game sprite.
//      *
//      * @param {PIXI.Sprite} spr - The PIXI sprite to create the game sprite from.
//      * @param {string} [collisionShape] - The type of collision shape to use for the sprite.
//      * Default: "Rectangle"
//      * Allowed values: "Circle", "Polygon", "Rectangle", "Shape", "Line".
//      */
//     constructor (spr, collisionShape = "Rectangle") {
//         this.sprite = app.stage.addChild(spr);
//         this.x = this.sprite.x; // absolute position
//         this.y = this.sprite.y;
//         this.collisionShape = collisionShape;
//         this.intersects = new Intersects[this.collisionShape](this.sprite);

//         // Offset by camera
//         app.ticker.add(this.tickerFn, this);
//     }

//     tickerFn () {
//         this.sprite.x = this.x - Game.camera.x;
//         this.sprite.y = this.y - Game.camera.y;
//     }

//     /**
//      * Checks if this sprite collides with another sprite.
//      *
//      * @param {Game.classes.sprite} other - The other sprite to check for collision with.
//      * @returns {boolean} True if a collision occurs, otherwise false.
//      */
//     collides (other) {
//         return this.intersects[`collides${other.collisionShape}`](other.intersects);
//     }

//     /**
//      * Removes the sprite.
//      *
//      * @param {array|object} parent - The parent array or object from which to remove the sprite.
//      */
//     remove (parent) {
//         this.x = this.y = Infinity; // buggy collision detection
//         this.sprite.parent.removeChild(this.sprite);
//         if (Array.isArray(parent)) {
//             const index = parent.indexOf(this);
//             if (index !== -1) {
//                 parent.splice(index, 1);
//             }

//         } else if (typeof parent === "object") {
//             delete this;
//         }

//     }
// }

// export default Sprite;