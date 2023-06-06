import axios from 'axios';
import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log('onResolve', args);

                if (args.path === "index.js") {
                    return { path: args.path, namespace: 'a' };
                }

                if (args.path.includes('./') || args.path.includes('../')) {
                    return {
                        namespace: 'a',

                        // this will either append to the resolve url e.g. args.path = ./utils
                        // go to the root folder e.g. args.path = ./
                        // or go back two folders away e.g. args.path = ../
                        path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
                    }
                }

                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                }
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);

                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: `
              import React, {useState} from 'react';

              console.log(React);
            `,
                    };
                }

                const { data, request } = await axios.get(args.path);

                return {
                    loader: 'jsx',
                    contents: data,

                    // this was our holy grail
                    // this will be sent to our next on resolve, if the first on resolve does not equate to index.js
                    // the url function will give us back a response that equates to the parent/root directory of the fetched file
                    // because it takes us back to the root directory, we can either choose to use (. or ./) as the first parameter
                    resolveDir: new URL('./', request.responseURL).pathname
                }
            });
        },
    };
};