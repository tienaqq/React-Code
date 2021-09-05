import Compressor from "compressorjs";
import ImageResize from "quill-image-resize-module-react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import firebase from "services/firebase";
import { v4 as uuidv4 } from "uuid";
import React from "react";

Quill.register("modules/imageResize", ImageResize);

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  fileCompress = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        file: "File",
        quality: 0.5,
        maxWidth: 800,
        success(file) {
          return resolve({
            success: true,
            file: file,
          });
        },
        error(err) {
          return resolve({
            success: false,
            message: err.message,
          });
        },
      });
    });
  };

  quillImageCallback = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      const compressState = await this.fileCompress(file);
      if (compressState.success) {
        const fileName = uuidv4();
        let storage = firebase.storage().ref();
        storage
          .child("Flashcards/" + fileName)
          .put(compressState.file)
          .then(async (snapshot) => {
            const downloadUrl = await storage
              .child("Flashcards/" + fileName)
              .getDownloadURL();
            let quill = this.quill.getEditor();
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "image", downloadUrl);
          });
      }
    };
  };

  modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
        ["bold", "italic", "underline", { color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["image", "link", "blockquote", "code-block"],
        ["clean"],
      ],
      handlers: {
        image: () => this.quillImageCallback(),
      },
    },
    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
  ];

  render() {
    return (
      <ReactQuill
        ref={(el) => {
          this.quill = el;
        }}
        value={this.props.content ? this.props.content : ""}
        onChange={(content) => {
          this.props.setContent(content ? content : "");
        }}
        modules={this.modules}
        formats={this.formats}
        theme="snow"
        placeholder="Write something amazing..."
      />
    );
  }
}

export default TextEditor;
