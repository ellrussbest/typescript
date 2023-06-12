import "./preview.css";
import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const html = `
  <html>
    <head>
      <style> html { background-color: #f8f8ff; } </style>
    </head>

    <body>
      <div id="root"> </div>
      <script>
        const handleError = (error) => {
              const doc = document.querySelector("#root");
              root.innerHTML = '<div style="color: red; text-align: center;"><h4>Runtime Error</h4>' + error + '</div>'
              console.error(error);
        };

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error)
        })

        window.addEventListener('message', (event) => {
          try{
            if(event.data instanceof Error) throw event.data.message
            eval(event.data)
          }catch(error) {
            handleError(error)
          }
        }, false)
      </script>
    </body>
  </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // reset the iframe, before execution of the whole button click operation
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        title="iframe to render user's code execution result"
      />
    </div>
  );
};

export default Preview;
