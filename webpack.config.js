const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const HOT_TEMPLATE_FILENAME = path.resolve(__dirname, "webpack/index.html");
const INPUT_FILENAME = path.resolve(__dirname, "source/main.ts");
const OUTPUT_FILENAME = "hearts.js";
const OUTPUT_PATH = path.resolve(__dirname, "dist");

const isDevelopment = (mode) => mode === "development";

const createCssIdFormat = (mode) => {
    let format = "h-[hash:base64:5]";

    if (isDevelopment(mode)) {
        format = "[path][name]__[local]--[hash:base64:5]";
    }

    return format;
};

module.exports = (env, argv) => {
    const mode = argv.mode;

    return {
        entry: INPUT_FILENAME,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                transpileOnly: isDevelopment(mode)
                            }
                        }
                    ]
                },
                {
                    test: /\.m\.scss$/,
                    use: [
                        { loader: "style-loader" },
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    mode: "local",
                                    localIdentName: createCssIdFormat(mode)
                                },
                                sourceMap: isDevelopment(mode)
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: isDevelopment(mode)
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".js"]
        },
        output: {
            filename: OUTPUT_FILENAME,
            path: OUTPUT_PATH,
            library: "Hearts"
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: false,
                template: HOT_TEMPLATE_FILENAME
            })
        ],
        devServer: {
            contentBase: OUTPUT_PATH,
            hot: true,
            open: true
        }
    };
};
