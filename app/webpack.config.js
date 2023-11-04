const path = require("path");
const ReplacePlugin = require("webpack-plugin-replace");
// in case you run into any typescript error when configuring `devServer`
require("webpack-dev-server");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: "./src/index.ts", // Entry point of your application
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js", // Output bundle file name
    },
    devtool: "source-map",
    resolve: {
        extensions: [".css", ".tsx", ".ts", ".js", "..."],
    },
    watch: true,
    watchOptions: {
        ignored: "**/node_modules",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", // Use Babel for .js and .jsx files
                },
            },
            {
                test: /\.(ts|tsx)$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html", // Use this HTML file as a template
        }),
        new ReplacePlugin({
            exclude: [
                /node_modules/,
                filepath => filepath.includes("ignore"),
            ],
            patterns: [
                {
                    regex: /import {([^}]+)} from "emath.js";/g,
                    value: "import eMath, {$1} from \"emath.js\";",
                },
                {
                    regex: /E\((.*?)\)/g,
                    value: "eMath.E($1)",
                },
                {
                    regex: /E\.(\w+)/g,
                    value: "eMath.E.$1",
                },
                {
                    regex: /new boost/g,
                    value: "eMath.classes.boost($1)",
                },
                {
                    regex: /new currency/g,
                    value: "eMath.classes.currency($1)",
                },
                {
                    regex: /new currencyStatic/g,
                    value: "eMath.classes.currencyStatic($1)",
                },
                {
                    regex: /new attribute/g,
                    value: "eMath.classes.attribute($1)",
                },
                {
                    regex: /new grid/g,
                    value: "eMath.classes.grid($1)",
                },
                {
                    regex: /new gridCell/g,
                    value: "eMath.classes.gridCell($1)",
                },
                {
                    regex: /new EString/g,
                    value: "eMath.classes.EString($1)",
                },
                {
                    regex: /new EArray/g,
                    value: "eMath.classes.EArray($1)",
                },
                {
                    regex: /new EObject/g,
                    value: "eMath.classes.EObject($1)",
                },
                {
                    regex: /new obb/g,
                    value: "eMath.classes.obb($1)",
                },
            ],
        }),
    ],
};

module.exports = config;
