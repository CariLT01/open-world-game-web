const path = require("path");
const WebpackBar = require("webpackbar");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

// Shared logic (loaders, etc)
const commonRules = [
    {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    },
];

// 1. Client Configuration (Browser)
const clientConfig = {
    mode: "development",
    target: "web", // Default
    entry: "./client/src/Main.tsx",
    output: {
        filename: "client.bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: { extensions: [".ts", ".js", ".tsx"] },
    module: {
        rules: [
            ...commonRules,
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require("@tailwindcss/postcss")],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/inline', // This forces the image to embed as a DataURL
            },
            {
                test: /\.(gltf|glb)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]'
                }
            },
        ],
    },
    plugins: [new WebpackBar({ name: "Client", color: "#faad14" })],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        client: {
            overlay: {
                errors: true,   // Keep this on (you want to know if code breaks)
                warnings: false, // Turn this off to hide that TypeScript warning
            },
        },
        compress: true,
        port: 3000,
        hot: true, // Enables Hot Module Replacement
        open: true, // Automatically opens the browser
        historyApiFallback: true, // Essential for React Router
    },
};

// 2. Server Configuration (Node.js)
const serverConfig = {
    mode: "development",
    target: "node", // <--- CRITICAL: Tells webpack to use Node's require()
    entry: "./server/src/Main.ts",
    output: {
        filename: "server.bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: { extensions: [".ts", ".js"] },
    // This tells webpack NOT to bundle things in node_modules for the server
    // It prevents the "WebSocketServer is not a constructor" error
    externals: [nodeExternals()],
    module: {
        rules: commonRules,
    },
    plugins: [new WebpackBar({ name: "Server", color: "#1890ff" })],
};

module.exports = [clientConfig, serverConfig];
