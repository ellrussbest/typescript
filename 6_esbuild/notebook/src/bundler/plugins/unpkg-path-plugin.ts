import * as esbuild from 'esbuild-wasm';


// // Immediately invoked function for test purposes
// (async () => {
//     await fileCache.setItem('color', 'red');

//     const color = await fileCache.getItem('color')
//     console.log(color)
// })()

export const unpkgPathPlugin = () => {

    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {

            // with this approach, you'll write multiple Resolves
            // Each filter will resolve a specific path
            // Handle root entry file of 'index.js'
            build.onResolve({ filter: /(^index\.js$)/ }, () => {
                return { path: 'index.js', namespace: 'a' }
            })

            // Handle relative paths in a module
            build.onResolve({ filter: /^\.+\// }, async (args: any) => {
                return {
                    namespace: 'a',

                    // this will either append to the resolve url e.g. args.path = ./utils
                    // go to the root folder e.g. args.path = ./
                    // or go back two folders away e.g. args.path = ../
                    path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
                }
            })

            // Handle main file of a module
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                }
            });

            // // with this approach, your filter will be based on every file
            // // then you'll use if statement to resolve each available case
            // build.onResolve({ filter: /.*/ }, async (args: any) => {
            //     if (args.path === "index.js") {
            //         return { path: args.path, namespace: 'a' };
            //     }

            //     if (args.path.includes('./') || args.path.includes('../')) {
            //         return {
            //             namespace: 'a',

            //             // this will either append to the resolve url e.g. args.path = ./utils
            //             // go to the root folder e.g. args.path = ./
            //             // or go back two folders away e.g. args.path = ../
            //             path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
            //         }
            //     }

            //     return {
            //         namespace: 'a',
            //         path: `https://unpkg.com/${args.path}`
            //     }
            // });


        },
    };
};