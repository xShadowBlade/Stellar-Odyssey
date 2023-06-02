const d_ID = (id) => document.getElementById(id);
const isElem = (elem) => elem.innerHTML ? true : false;
const parseArg = (arg, properties, caseSensitive, def) => {
    caseSensitive = caseSensitive != undefined ? caseSensitive : true;
    if (arg.isObject) {
        if (properties.isArray) {
            for (let x of Object.keys(arg)) {
                for (let y of properties) {
                    if (!caseSensitive) {if (x.toLowerCase() == y.toLowerCase()) {return arg[x]}} else if (x == y) {return arg[x]}
                }
            }
        } else if (properties.isString) {
            for (let x of Object.keys(arg)) {
                if (!caseSensitive) {if (x.toLowerCase() == properties.toLowerCase()) {return arg[x]}} else if (x == properties) {return arg[x]}
            }
        }
        if (def) {return def} else {return}
    } else if (arg.isArray) { //work on this its important
        if (properties.isArray) {
            for (i = 0; i < arg.length; i++) {
                for (let y of properties) {
                    if (!caseSensitive) {if (arg[i].name.toLowerCase() == y.toLowerCase()) {return arg[i].value}} else if (arg[i].name == y) {return arg[i].value}
                }
            }
        } else if (properties.isString) {
            for (i = 0; i < arg.length; i++) {
                if (!caseSensitive) {if (arg[i].name.toLowerCase() == properties.toLowerCase()) {return arg[i].value}} else if (arg[i].name == properties) {return arg[i].value}
            }
        }
        if (def) {return def} else {return}
    } else if (def) {return def} else {return}
}
Object.prototype.parse = function(properties, caseSensitive, def) {
    return parseArg(this, properties, caseSensitive, def);
};
//Array.prototype.parse = (properties, caseSensitive, def) => parseArg(this, properties, caseSensitive, def);
const custom = {
    html: {
        initElem: function(_elem, type, parent) {
            let elem = parseArg(_elem, ["elem", "element"], false)
            if (elem.isString) {
                if (d_ID(elem)) {elem = d_ID(elem);} else {elem = document.createElement(type); parent.appendChild(elem); elem.id = parseArg(_elem, ["elem", "element"], false)} 
            } else if (isElem(elem)) {} else {
                return;
            }
            return elem;
        },
        // createMenuOverlay: function(id) { //unfinished
        //     const main = document.createElement("div");
        //     document.body.appendChild(main);
        //     main.id = id;
        //     main.className = "overlayMenu";
        //     main.onclick = custom.html.createMenuOverlayOnClick;

        //     return main;
        // },
        //     createMenuOverlayOnClick: function() { //unfinished

        //     },
        modal: class {
            constructor(modalDiv, modalContent, btnOpen, spanClose, parent) { 
                /*ex: 
                    const test123 = new custom.html.modal({
                        element: "insert id here",
                        className: "",
                        content: "",
                    },
                    {
                        element: "a",
                        className: "",
                        content: "<div>abcdefghijklmnopqrstuvwxyz</div>"
                    })
                */
                this.modalDiv = custom.html.initElem(modalDiv, "div", parent);
                this.modalDiv.className = parseArg(modalDiv, ["class", "className"], false, "modal");
                this.modalDiv.innerHTML = parseArg(modalDiv, ["innerHTML", "content"], false);

                this.modalContent = custom.html.initElem(modalContent, "div", this.modalDiv);
                this.modalContent.className = parseArg(modalContent, ["class", "className"], false, "modal-content");
                this.modalContent.innerHTML = parseArg(modalContent, ["innerHTML", "content"], false);

                this.btnOpen = custom.html.initElem(btnOpen, "button", parent);
                this.btnOpen.className = parseArg(btnOpen, ["class", "className"], false);
                this.btnOpen.innerHTML = parseArg(btnOpen, ["innerHTML", "content"], false);
                this.btnOpen.addEventListener("click", parseArg(btnOpen, ["onclick", "click"], false, function() {
                    console.log(d_ID(parseArg(modalDiv, ["elem", "element"], false)), parseArg(modalDiv, ["elem", "element"], false));
                    d_ID(parseArg(modalDiv, ["elem", "element"], false)).style.display = "block";
                })); //prob bugged

                this.spanClose = custom.html.initElem(spanClose, "span", this.modalContent);
                this.spanClose.className = parseArg(spanClose, ["class", "className"], false, "close");
                this.spanClose.innerHTML = parseArg(spanClose, ["innerHTML", "content"], false, "&times;");
                this.spanClose.addEventListener("click", parseArg(btnOpen, ["onclick", "click"], false, function() {
                    console.log(d_ID(parseArg(modalDiv, ["elem", "element"], false)), parseArg(modalDiv, ["elem", "element"], false));
                    d_ID(parseArg(modalDiv, ["elem", "element"], false)).style.display = "none";
                })); //prob bugged
            }
            static default = [

            ]
        },
        grid: class {
            constructor(grid, gridSizeX, gridSizeY, containerClassName, parent) {
                this.grid = grid;
                this.gridElement = document.createElement("div");
                parent.appendChild(this.gridElement);
                this.gridElement.style.gridColumnEnd = grid.x_size;
                this.gridElement.style.gridRowEnd = grid.y_size;
                /*grid-column-start: 1;
                grid-column-end: 16;
                grid-template-columns: auto auto auto;

                grid-row-start: 1;
                grid-row-end: 32;*/
                let templateX = "";
                let templateY = "";
                for (i = 0; i < grid.x_size; i++) {
                    templateX += `${gridSizeX} `;
                }
                for (i = 0; i < grid.y_size; i++) {
                    templateY += `${gridSizeY} `;
                }
                this.gridElement.style.gridTemplateColumns = templateX;
                this.gridElement.style.gridTemplateRows = templateY;
                

                this.gridElement.className = containerClassName;
                for (let x of this.grid.all()) {
                    x["element"] = document.createElement("div");
                    this.gridElement.appendChild(x["element"]);
                    // x["element"].className = "";
                    // x["element"].style.gridArea = "";
                    x["element"].style.height = gridSizeY;
                    x["element"].style.width = gridSizeX;
                }
                
            }
            increaseX() {

            }
            increaseY() {

            }
        }
    },
}