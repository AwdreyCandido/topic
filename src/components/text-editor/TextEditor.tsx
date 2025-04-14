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
      type: "paragraph",
      content: "First line",
      element: "p",
    },
    {
      type: "paragraph",
      content: "13/04/2025",
      element: "p",
    },
    {
      type: "paragraph",
      content: "14/04/2025",
      element: "p",
    },
    {
      type: "paragraph",
      content: "15/04/2025",
      element: "p",
    },
  ]);

  const lineRefs = useRef<(HTMLElement | null)[]>([]);

  function handleEditContent(index: number, cntn?: string) {
    const text = lineRefs.current[index]?.textContent;
    console.log(text);

    const line = content[index];
    const edited = { ...line, content: text };
    const newContent = content[index] = edited

    setContent(newContent)

  }

  function handleAddLine(e: React.KeyboardEvent, key: string) {
    if (key === "Enter") {
      e.preventDefault();

      if (selectedLine >= 0) {

        setContent((prev) => {
          const newContent = [...prev];
          newContent.splice(selectedLine + 1, 0, {
            type: "paragraph",
            content: "awdrey",
            element: "p",
          });
          return newContent;
        });

        return;
      }
    }
  }

  function handleCopy(e: React.ClipboardEvent) {
    e.preventDefault();
    const selection = window.getSelection();
    if (selection) {
      const plainText = selection.toString();
      e.clipboardData.setData("text/plain", plainText);
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
      <div
        onCopy={handleCopy}
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
            <Element
              key={index}
              className="min-h-[2.2rem] bg-slate-50 my-1"
              ref={(el) => (lineRefs.current[index] = el)}
              onClick={() => setSelectedLine(index)}
            >
              {item.content}
            </Element>
          );
        })}
      </div>
      <div className="flex gap-8">
        <button title="Lalala">Lalala</button>
        <button onClick={() => console.log(content)} title="Print">
          Print
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
