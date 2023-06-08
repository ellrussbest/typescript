import { useRef, useState } from "react";

// transform -> transpiling, build -> bundling
import { /*transform, */ build, initialize } from "esbuild-wasm";
import { useEffectOnce } from "../hooks/useEffectOnce-hook";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";

export default function App() {
  const [input, setInput] = useState("");

  const [code, setCode] = useState("");
  const iframe = useRef<any>();

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

      // if (result) setCode(result.outputFiles[0].text);
      if (result)
        iframe.current.contentWindow.postMessage(
          result.outputFiles[0].text,
          "*"
        );
      else throw new Error("Error");
    } catch (error) {
      console.error(error);
    }
  };

  const html = `
  <html>
    <head>
    </head>

    <body>
      <div id="root"> </div>
      <script>
        window.addEventListener('message', (event) => {
          try{
            eval(event.data)
          }catch(error) {
            const doc = document.getElementById("root")
            console.log(doc)
          }
        }, false)
      </script>
    </body>
  </html>
  `;

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

      {/* This will disable communication between the parent and the child*/}
      <iframe
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        title="iframe to render user's code execution result"
      />
    </div>
  );
}
