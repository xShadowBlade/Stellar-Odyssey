/**
 * PixiJS Background Cover/Contain Script
 * Returns an object with the following properties:
 * - container: PixiJS Container
 * - doResize: Resize callback function
 *
 * @param {object} bgSize - An object with x and y representing the width and height of the background. Example: {x: 1280, y: 720}
 * @param {PIXI.Sprite} inputSprite - Pixi Sprite containing a loaded image or other asset. Make sure you preload assets into this sprite.
 * @param {string} type - A string, either "cover" or "contain".
 * @param {object} [forceSize] - Optional object containing the width and height of the source sprite, example: {x: 1280, y: 720}
 * @returns {object} - An object with container and doResize properties.
 */
function background(bgSize, inputSprite, type, forceSize) {
    var sprite = inputSprite;
    var bgContainer = new PIXI.Container();
    var mask = new PIXI.Graphics().beginFill(0x8bc5ff).drawRect(0,0, bgSize.x, bgSize.y).endFill();
    bgContainer.mask = mask;
    bgContainer.addChild(mask);
    bgContainer.addChild(sprite);
    
    function resize() {
        var sp = {x:sprite.width,y:sprite.height};
        if(forceSize) sp = forceSize;
        var winratio = bgSize.x/bgSize.y;
        var spratio = sp.x/sp.y;
        var scale = 1;
        var pos = new PIXI.Point(0,0);
        if(type == 'cover' ? (winratio > spratio) : (winratio < spratio)) {
            //photo is wider than background
            scale = bgSize.x/sp.x;
            pos.y = -((sp.y*scale)-bgSize.y)/2
        } else {
            //photo is taller than background
            scale = bgSize.y/sp.y;
            pos.x = -((sp.x*scale)-bgSize.x)/2
        }

        sprite.scale = new PIXI.Point(scale,scale);
        sprite.position = pos;
    }
    
    resize();

    return {
        container: bgContainer,
        doResize: resize
    }
}
const bgURL = "https://st.depositphotos.com/2228340/2414/i/600/depositphotos_24140635-stock-photo-seamless-starfield.jpg";
(function () {   
    var slide = background({x: Game.PIXI.app.screen.width, y: Game.PIXI.app.screen.height}, PIXI.Sprite.from(bgURL),'cover');        
    Game.PIXI.app.stage.addChild(slide.container);
    // force resize: slide.doResize();
})();