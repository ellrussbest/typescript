import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance(
    // configuration object e.g name of the database we want to create
    {
        name: 'filecache'
    }
);

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {

            build.onLoad({ filter: /(^index\.js$)/ }, () => {
                return {
                    loader: 'jsx',
                    contents: inputCode,
                };
            })

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                // check to see if we have already fetched this file
                // and if it is in the cache
                // check the type, it will affect the return statment, we can use esbuild return types
                // spoiler alert!!!
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

                // if it is cached/memoed, return it immediately
                if (cachedResult) {
                    return cachedResult;
                }
            })

            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);


                const escaped = data.replace(/\n/g, '')
                    .replace(/"/g, '\\"') // escape double quotes
                    .replace(/'/g, "\\'") // escape single quotes

                const contents =
                    `
                        const style = document.createElement('style');
                        style.innerText = '${escaped}';
                        document.head.appendChild(style);
                    `
                // store response in cache
                // check the return statement
                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,

                    // this was our holy grail
                    // this will be sent to our next on resolve, if the first on resolve does not equate to index.js
                    // the url function will give us back a response that equates to the parent/root directory of the fetched file
                    // because it takes us back to the root directory, we can either choose to use (. or ./) as the first parameter
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                // cache result before returning it
                fileCache.setItem(args.path, result)

                return result;
            })


            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);

                // store response in cache
                // check the return statement
                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,

                    // this was our holy grail
                    // this will be sent to our next on resolve, if the first on resolve does not equate to index.js
                    // the url function will give us back a response that equates to the parent/root directory of the fetched file
                    // because it takes us back to the root directory, we can either choose to use (. or ./) as the first parameter
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                // cache result before returning it
                fileCache.setItem(args.path, result)

                return result;
            });
        }
    }
}