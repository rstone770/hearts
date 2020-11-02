const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HOT_TEMPLATE_FILENAME = path.resolve(__dirname, "webpack/index.html");
const INPUT_FILENAME = path.resolve(__dirname, "source/main.ts");
const OUTPUT_FILE = "hearts";
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

    const plugins = () => {
        const results = [
            new MiniCssExtractPlugin({
                filename: `${OUTPUT_FILE}.css`
            })
        ];

        if (isDevelopment(mode)) {
            results.push(
                new HtmlWebpackPlugin({
                    inject: false,
                    template: HOT_TEMPLATE_FILENAME
                })
            );
        }

        return results;
    };

    const mscss = () => {
        const results = [];

        if (isDevelopment(mode)) {
            results.push({ loader: "style-loader" });
        } else {
            results.push({ loader: MiniCssExtractPlugin.loader });
        }

        results.push(
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
        );

        return results;
    };

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
                    use: mscss()
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".js"],
            plugins: [new TsconfigPathsPlugin()]
        },
        output: {
            filename: `${OUTPUT_FILE}.js`,
            path: OUTPUT_PATH,
            library: "Hearts"
        },
        plugins: plugins(),
        devServer: {
            contentBase: OUTPUT_PATH,
            injectClient: false, // webpack-dev-server /w webpack 5 broke library exports.
            open: true
        }
    };
};
