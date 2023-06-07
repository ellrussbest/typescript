import { useState } from "react";

// transform -> transpiling, build -> bundling
import { /*transform, */ build, initialize } from "esbuild-wasm";
import { useEffectOnce } from "../hooks/useEffectOnce-hook";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";

export default function App() {
  const [input, setInput] = useState("");

  const [code, setCode] = useState("");

  // Initialize the esbuild-wasm
  useEffectOnce(async () => {
    try {
      await initialize({
        wasmURL: "https://unpkg.com/esbuild-wasm@0.17.19/esbuild.wasm",
        worker: true,
      });
    } catch (error) {
      console.error(error);
    }
  });

  //   // transform -> for tranpiling
  //   const onClick = async () => {
  //     const result = await transform(input, {
  //       loader: "jsx",
  //       target: "es2015",
  //     });
  //     setCode(result.code);
  //   };

  // build -> for bundling
  const onClick = async () => {
    try {
      const result = await build({
        entryPoints: ["index.js"],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        define: {
          "process.env.NODE_ENV": "'production'",
          global: "window",
        },
      });
      if (result) setCode(result.outputFiles[0].text);
      else throw new Error("Error");
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>

      <pre>{code}</pre>
    </div>
  );
}
