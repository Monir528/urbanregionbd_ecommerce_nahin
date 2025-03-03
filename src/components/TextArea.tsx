/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextArea = ({setDescription, description}) => {

  const modules = {
    toolbar: [
      [{header: [1, 2, 3, 4, 5, 6, false]}],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        {list: "ordered"},
        {list: "bullet"},
        {indent: "-1"},
        {index: "+1"}
      ]
    ],
  };

  return (
    <div className="my-8">
      <ReactQuill
        modules={modules}
        theme="snow"
        value={description}
        onChange={setDescription}
        className="w-full h-32 md:h-40 lg:h-56"
      />
    </div>
  );
};

export default TextArea;
