const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const bundleOutputDir = './wwwroot/dist';
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const getConfig = (env) => {
    const isDevBuild = !(env && env.prod);
    const isDebug = !!(env && env.debug);
    const devToolconfig = 'eval-source-map' // https://webpack.js.org/configuration/devtool/

    const babelDevLoader = [
        {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                cacheCompression: false,
                plugins: [
                    [
                        "@babel/plugin-proposal-decorators",
                        {
                            legacy: true
                        }
                    ]
                ],
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            targets: {
                                esmodules: true
                            }
                        }
                    ],
                    "@babel/preset-react",
                    "@babel/preset-typescript"
                ]
            },
        }
    ]
    const tsDevLoader = [
        {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                cacheCompression: false,
            },
        },
        {
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                happyPackMode: true,
            },
        },
    ]
    //
    const useLoader = babelDevLoader  //tsDevLoader
    const _distRef = new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./wwwroot/dist/vendor-manifest.json')
    })
    const _srcPath = new webpack.SourceMapDevToolPlugin({
        filename: '[file].map', // Remove this line if you prefer inline source maps
        moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]'), // Point sourcemap entries to the original file locations on disk                
    })
    const plugins = [
        // new CheckerPlugin(),
        _distRef
    ].concat(isDevBuild ? [
        // Plugins that apply in development builds only
        _srcPath
    ] : new MiniCssExtractPlugin({ filename: 'site.css', chunkFilename: "[id].[contenthash].css" })
    )

    return [{
        mode: isDevBuild ? 'development' : 'production',
        stats: { modules: false },
        entry: { 'main': './ClientApp/boot.tsx' },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                'react-dom': '@hot-loader/react-dom',
                '@dev/repositories': path.join(__dirname, './ClientApp/repositories'),
                '@dev/screen': path.join(__dirname, './ClientApp/screens'),
                '@dev/services': path.join(__dirname, './ClientApp/services'),
                '@dev/context': path.join(__dirname, './ClientApp/context'),
                '@dev/interfaces': path.join(__dirname, './ClientApp/interfaces'),
                '@dev/enums': path.join(__dirname, './ClientApp/enums'),
                '@dev/components': path.join(__dirname, './ClientApp/components'),
                '@dev/bpmComponents': path.join(__dirname, './ClientApp/BPMComponents'),
                '@dev/stores': path.join(__dirname, './ClientApp/stores'),

                '@dev/env': path.join(__dirname, './ClientApp/utils/env.ts'),
                '@dev/formatHelpers': path.join(__dirname, './ClientApp/utils/FormatHelpers.tsx'),
                '@dev/_utils': path.join(__dirname, './ClientApp/utils/_utils.tsx'),
                '@dev/consts': path.join(__dirname, './ClientApp/utils/Constants.ts'),
            }
        },
        devtool: isDevBuild ? devToolconfig : false,
        output: {
            path: path.join(__dirname, bundleOutputDir),
            // filename: '[name].js',
            filename: isDevBuild ? '[name].js' : '[name].js?v=[contenthash]',
            publicPath: '/dist/'
        },
        module: {
            rules: [
                { test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=25000' },
                { test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.wav$|\.mp3$/, use: 'file-loader?name=[name].[ext]' }, // <-- retain original file name 
                {
                    test: /\.tsx?$/,
                    include: /ClientApp/,
                    use: useLoader,
                },
                {
                    test: /\.s?[ac]ss$/,
                    use: isDevBuild
                        ? [
                            'style-loader',
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    sourceMap: true,
                                },
                            },
                        ]
                        : [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader"]
                },
            ]
        },
        plugins,
        optimization: {
            minimizer: isDevBuild ? [] : [
                new OptimizeCssAssetsPlugin({}),
                new TerserPlugin({
                    parallel: true,
                    extractComments: false,
                    // terserOptions: {
                    //     format: {
                    //         comments: false,
                    //     },
                    //     compress: {
                    //         drop_console: true,
                    //     },
                    // },
                }),
            ],
        }
    }];
};
module.exports = (env) => smp.wrap(getConfig(env));
