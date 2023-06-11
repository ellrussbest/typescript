import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

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
            const doc = document.querySelector("#root");
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>'
            console.error(error);
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
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <iframe
      ref={iframe}
      sandbox="allow-scripts"
      srcDoc={html}
      title="iframe to render user's code execution result"
    />
  );
};

export default Preview;