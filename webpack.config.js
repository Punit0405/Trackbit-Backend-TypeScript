var path= require("path");

module.exports = {
    entry: ["./index.ts"],
    mode: "production",
  
    output: {
        filename: "TrackBit.api.js",
        path: path.resolve(__dirname,"Tb-backend")
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader",exclude: /node_modules/,},
            { test: /\.json/, loader: "json-loader", exclude:/node_modules/,}
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js",".json"]
    },
    target: "node",
    node: {
        __dirname: true
    },
  
};