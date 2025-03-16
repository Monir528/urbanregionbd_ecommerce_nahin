/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// Polyfill for findDOMNode to address React 18 compatibility
if (typeof window !== 'undefined') {
  window.ReactDOM = window.ReactDOM || {};
  window.ReactDOM.findDOMNode = (component) => {
    return component || null;
  };
}

const TextArea = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(() => {
    const blocksFromHtml = htmlToDraft(value || '');
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    return EditorState.createWithContent(contentState);
  });

  const handleEditorChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
    const html = draftToHtml(newEditorState.getCurrentContent());
    if (html !== value) { // Only call onChange if the HTML has changed
      onChange(html);
    }
  }, [value, onChange]);

  return (
      <div className="my-8">
        <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            wrapperClassName="border rounded-md"
            editorClassName="p-2 min-h-[200px] text-black bg-white"
            toolbarClassName="border-b text-black"
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
              inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
            }}
        />
      </div>
  );
};

export default TextArea;