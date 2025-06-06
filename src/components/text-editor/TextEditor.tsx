import { JSX, useEffect, useRef, useState } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaUndo,
  FaRedo,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
import styles from "./TextEditor.module.css";

const TextEditor = () => {
  const [selectedLine, setSelectedLine] = useState<any>(0);
  const [content, setContent] = useState<any>([
    {
      id: 1,
      type: "paragraph",
      content: "First line",
      element: "p",
    },
    {
      id: 2,
      type: "heading",
      content: "Second line",
      element: "h1",
    },
    {
      id: 3,
      type: "paragraph",
      content: "Third line",
      element: "p",
    },
    {
      id: 4,
      type: "paragraph",
      content: "Fourth line",
      element: "p",
    },
    {
      id: 5,
      type: "small",
      content: "Fourth line",
      element: "small",
    },
  ]);

  const lineRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    lineRefs.current = lineRefs.current.slice(0, content.length);
  }, [content.length]);

  function handleSelectRow(index: number) {
    // console.log(index);
    setSelectedLine(index);
  }

  function handleEditContent(index: number, cntn?: string) {
    const text = lineRefs.current[index]?.innerText;
    console.log(text);

    const updatedLine = { ...content[index], content: text };
    const updatedContent = [...content];

    updatedContent[index] = updatedLine;
    console.log(content, updatedContent);
    setContent(updatedContent);
  }

  function handleAddLine(e: React.KeyboardEvent, key: string) {
    const nextLine = selectedLine + 1;

    console.log({ currentLine: selectedLine, nextLine });

    if (key === "Enter") {
      e.preventDefault();

      if (selectedLine >= 0) {
        setContent((prev) => {
          const newContent = [...prev];
          newContent.splice(nextLine, 0, {
            id: newContent.length,
            type: "paragraph",
            content: "",
            element: "p",
          });

          console.log(newContent);
          return newContent;
        });

        return;
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();

    const html = e.clipboardData.getData("text/html");
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    console.log(doc);

    const parsed = doc.querySelectorAll("[data-block-id]");
    if (parsed.length > 0) {
      parsed.forEach((el) => {
        const blockId = el.getAttribute("data-block-id");
        const blockType = el.getAttribute("data-content-type");
        const blockElement = el.getAttribute("data-content-element");
        const blockContent = el.innerHTML;

        const newBlock = {
          id: content.length + 1,
          type: blockType,
          content: blockContent,
          element: blockElement,
        };

        console.log(newBlock);
      });
    } else {

      const text = e.clipboardData.getData("text/plain");
      const selection = window.getSelection()?.getRangeAt(0);
      const el = selection?.startContainer.parentElement;

      if (el) {
        const blockId = el.getAttribute("data-block-id");
        const blockType = el.getAttribute("data-content-type");
        const blockElement = el.getAttribute("data-content-element");
        const blockContent = text;

        const newBlock = {
          id: content.length + 1,
          type: blockType,
          content: blockContent,
          element: blockElement,
        };

        console.log(newBlock);
      }
    }
  }


  return (
    <div className={styles.editorContainer}>
      <div className={styles.actionBar}>
        <select id="fontSize">
          <option value="h1">Heading</option>
          <option value="h2">Subheading</option>
          <option value="p">Text</option>
        </select>
        <select id="fontSize">
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
        </select>
        <button title="Bold">
          <FaBold />
        </button>
        <button title="Italic">
          <FaItalic />
        </button>
        <button title="Underline">
          <FaUnderline />
        </button>
        <span className="mx-2 border-l border-gray-300 h-5" />
        <button title="Bullet List">
          <MdFormatListBulleted />
        </button>
        <button title="Numbered List">
          <MdFormatListNumbered />
        </button>
        <span className="mx-2 border-l border-gray-300 h-5" />
        <button title="Align Left">
          <FaAlignLeft />
        </button>
        <button title="Center">
          <FaAlignCenter />
        </button>
        <button title="Align Right">
          <FaAlignRight />
        </button>
        <span className="mx-2 border-l border-gray-300 h-5" />
        <button title="Undo">
          <FaUndo />
        </button>
        <button title="Redo">
          <FaRedo />
        </button>
      </div>
      <div>
        <div
          onPaste={handlePaste}
          onKeyDown={(e) => handleAddLine(e, e.key)}
          contentEditable="true"
          suppressContentEditableWarning
          onInput={(e) => handleEditContent(selectedLine)}
          role="textbox"
          className={styles.editor}
        >
          {content.map((item, index) => {
            const Element = item.element as keyof JSX.IntrinsicElements;
            const isLast = index == content.lenght - 1 ? 0 : 1;

            return (
              <div key={index} data-block-type="outer-block">
                <div data-block-type="container-block">
                  <div
                    data-block-type="content-block"
                    data-content-type={item.type}
                    data-content-element={item.element}
                  >
                    <Element
                      className="min-h-[2.2rem] bg-blue-300 my-1"
                      ref={(el) => (lineRefs.current[index] = el)}
                      onClick={() => handleSelectRow(index)}
                      data-block-id={item.id}
                      data-content-type={item.type}
                      data-content-element={item.element}
                    >
                      {item.content}
                    </Element>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-8">
        <button
          className="px-8 py-3 bg-slate-400 rounded-xl"
          onClick={() => console.log(content)}
          title="Print"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
