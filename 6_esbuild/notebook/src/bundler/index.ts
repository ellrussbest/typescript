import { /*transform, */ build, initialize } from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
// transform -> transpiling, build -> bundling


let init: null | void = null;


const bundle = async (rawCode: string) => {
    if (init === null) {
        // Initialize the esbuild-wasm
        try {
            init = await initialize({
                wasmURL: "https://unpkg.com/esbuild-wasm@0.17.19/esbuild.wasm",
                worker: true,
            });
        } catch (error) {
            console.error(error);
        }

        //   // transform -> for tranpiling
        //   const onClick = async () => {
        //     const result = await transform(input, {
        //       loader: "jsx",
        //       target: "es2015",
        //     });
        //     setCode(result.code);
        //   };

        // build -> for bundling
    }

    try {
        const result = await build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
            define: {
                "process.env.NODE_ENV": "'production'",
                global: "window",
            },
        });

        if (result) return result.outputFiles[0].text;
        else throw new Error(result)
    } catch (error: any) {
        return error
    }

}

export default bundle;