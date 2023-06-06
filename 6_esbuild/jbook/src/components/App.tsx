import { useState } from "react";

// transform -> transpiling, build -> bundling
import { transform, build, initialize } from "esbuild-wasm";
import { useEffectOnce } from "../hooks/useEffectOnce-hook";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";

export default function App() {
  const [input, setInput] = useState("");

  const [code, setCode] = useState("");

  // Initialize the esbuild-wasm
  useEffectOnce(async () => {
    initialize({
      wasmURL: "/esbuild.wasm",
      worker: true,
    });
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
    const result = await build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: {
        "process.env.NODE_ENV": "'production'",
        global: "window",
      },
    });
    setCode(result.outputFiles[0].text);
    // console.log(result);
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
