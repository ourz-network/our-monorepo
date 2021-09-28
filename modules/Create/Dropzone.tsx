/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = (props) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const arrayBuffer = reader.result;
        // console.log("arrayBuffer", arrayBuffer);
      };

      setFiles(
        acceptedFiles.map((File) =>
          Object.assign(File, {
            prevw: URL.createObjectURL(File),
            blob: reader.result,
          })
        )
      );
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: "image/*, video/*, audio/*, text/plain",
    onDrop: { onDrop },
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const thumbs = files.map((file) => (
    <div className="box-border inline-flex p-5" key={file.name}>
      <div className="flex overflow-hidden min-w-0 h-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Preview of your uploaded file"
          src={file.preview}
          className="block w-auto h-full"
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div
      {...getRootProps({
        className: "dropzone p-12 bg-yellow-400 cursor-pointer",
      })}
    >
      <input name="cryptomedia" {...getInputProps()} />
      <p>
        Drag &lsquo;n&rsquo; drop some files here, or <u>click to select files</u>.
      </p>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
      </aside>
      <aside className="flex flex-row mt-5 wrap">{thumbs}</aside>
    </div>
  );
};

export default Dropzone;
