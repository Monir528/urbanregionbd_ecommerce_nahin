"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface TextAreaProps {
    value: string;
    onChange: (html: string) => void;
}

const TextArea = ({ value, onChange }: TextAreaProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const lastHtml = useRef(value);
    const isInternalChange = useRef(false);
    const editorStateRef = useRef(editorState);

    // Update ref on editor state change
    useEffect(() => {
        editorStateRef.current = editorState;
    }, [editorState]);

    // Initial mount effect
    useEffect(() => {
        let isMountedFlag = true;
        setIsMounted(true);
        const blocksFromHtml = htmlToDraft(value || '');
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        // Only set state if still mounted
        setTimeout(() => {
            if (isMountedFlag) {
                setEditorState(EditorState.createWithContent(contentState));
                lastHtml.current = value;
            }
        }, 0);
        return () => {
            isMountedFlag = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle external value changes
    useEffect(() => {
        if (!isMounted || isInternalChange.current) return;

        // Get current state from ref instead of state
        const currentContent = editorStateRef.current.getCurrentContent();
        const currentHtml = draftToHtml(convertToRaw(currentContent));

        if (currentHtml === value) return;

        const blocksFromHtml = htmlToDraft(value || '');
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

        // Only update if content is actually different
        if (contentState !== currentContent) {
            const newEditorState = EditorState.push(
                editorStateRef.current,
                contentState,
                'change-block-data'
            );
            setEditorState(newEditorState);
        }
    }, [value, isMounted]); // Removed editorState from dependencies

    const handleEditorChange = useCallback((newEditorState: EditorState) => {
        const contentState = newEditorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const html = draftToHtml(rawContentState);

        if (html !== lastHtml.current) {
            isInternalChange.current = true;
            lastHtml.current = html;
            onChange(html);
            requestAnimationFrame(() => {
                isInternalChange.current = false;
            });
        }

        setEditorState(newEditorState);
    }, [onChange]);

    if (!isMounted) {
        return (
            <textarea
                className="w-full p-2 min-h-[200px] border rounded-md"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        );
    }

    return (
        <div className="my-8">
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="border rounded-md"
                editorClassName="p-2 min-h-[200px] text-black bg-white"
                toolbarClassName="border-b text-black"
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign',
                        'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
                    inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
                }}
            />
        </div>
    );
};

export default TextArea;