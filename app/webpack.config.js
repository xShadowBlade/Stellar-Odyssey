const path = require("path");
const { EsbuildPlugin } = require("esbuild-loader");
const webpack = require("webpack");
// in case you run into any typescript error when configuring `devServer`
require("webpack-dev-server");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");

module.exports = (env, argv) => {
    console.log("Args:", argv);
    const mode = argv.mode;
    return {
        entry: "./src/index.ts", // Entry point of your application
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js", // Output bundle file name
        },
        // devtool: mode === "development" ? "source-map" : "none",
        resolve: {
            extensions: [".css", ".tsx", ".ts", ".js", "..."],
        },
        // watch: true,
        // watchOptions: {
        //     ignored: "**/node_modules",
        // },
        module: {
            rules: [
            // Use esbuild to compile JavaScript & TypeScript
                {
                // Match `.js`, `.jsx`, `.ts` or `.tsx` files
                    test: /\.[jt]sx?$/,
                    exclude: /node_modules/,
                    loader: "esbuild-loader",
                    options: {
                    // JavaScript version to compile to
                        target: "es2015",
                        tsconfig: "./tsconfig.json",
                    },
                },
                // {
                //     test: /\.(ts|tsx)$/,
                //     use: "ts-loader",
                //     exclude: /node_modules/,
                // },
                {
                    test: /\.css$/i,
                    use: ["css-loader"],
                },
            ],
        },
        optimization: {
            minimizer: [
                new EsbuildPlugin({
                    target: "es2015", // Syntax to transpile to (see options below for possible values)
                }),
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html", // Use this HTML file as a template
            }),
            new webpack.DefinePlugin({
                // "%PUBLIC_URL%": JSON.stringify(mode === "production" ? "../public/" : "./"),
                MODE: JSON.stringify(mode),
            }),
            mode === "production" ? new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }) : null,
            // new EsbuildPlugin({
            //     options: {
            //         define: {
            //             // "%PUBLIC_URL%": JSON.stringify(mode === "production" ? "../public/" : "./"),
            //             MODE: JSON.stringify(mode),
            //         },
            //     },
            // }),
            new HtmlReplaceWebpackPlugin([
                {
                    pattern: "%PUBLIC_URL%",
                    replacement: mode === "production" ? "../public/" : "./",
                },
            ]),
        ],
    };
};