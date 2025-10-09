import { Block } from "./models/types";

export const blocks: Block[] = [
  {
    id: 1,
    type: "paragraph",
    element: "p",
    position: 0, // to make it draggable
    content: [
      {
        type: "text",
        text: "this is a simple paragraph",
        style: "",
        attributes: [
          {
            type: "bold",
          },
          {
            type: "italic",
          },
          {
            type: "strike",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    type: "heading",
    element: "h1",
    position: 1, // to make it draggable
    content: [
      {
        type: "text",
        text: "this is a test heading",
        style: "",
        attributes: [
          {
            type: "bold",
          },
        ],
      },
    ],
  },
];
