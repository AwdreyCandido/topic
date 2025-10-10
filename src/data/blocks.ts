import { Block } from "./models/types";

export const blocks: Block[] = [
  {
    id: 1,
    type: "paragraph",
    element: "p",
    position: 0,
    content: [
      {
        type: "text",
        text: "this is a simple paragraph",
        style: "",
        attributes: [{ type: "bold" }, { type: "italic" }, { type: "strike" }],
      },
    ],
  },
  {
    id: 2,
    type: "heading",
    element: "h1",
    position: 1,
    content: [
      {
        type: "text",
        text: "this is a test heading",
        style: "",
        attributes: [{ type: "bold" }],
      },
    ],
  },
  {
    id: 3,
    type: "subheading",
    element: "h2",
    position: 2,
    content: [
      {
        type: "text",
        text: "this is a subheading",
        style: "",
        attributes: [],
      },
    ],
  },
  {
    id: 4,
    type: "quote",
    element: "blockquote",
    position: 3,
    content: [
      {
        type: "text",
        text: "this is a quote block",
        style: "",
        attributes: [],
      },
    ],
  },
  {
    id: 5,
    type: "unordered-list",
    element: "ul",
    position: 4,
    content: [
      {
        element: "li",
        type: "list-item",
        text: "first list item",
        style: "",
        attributes: [],
      },
      {
        element: "li",
        type: "list-item",
        text: "second list item",
        style: "",
        attributes: [],
      },
    ],
  },
  {
    id: 6,
    type: "ordered-list",
    element: "ol",
    position: 5,
    content: [
      {
        type: "list-item",
        element: "li",
        text: "step one",
        style: "",
        attributes: [],
      },
      {
        type: "list-item",
        element: "li",
        text: "step two",
        style: "",
        attributes: [],
      },
    ],
  },
  {
    id: 7,
    type: "code",
    element: "pre",
    position: 6,
    content: [
      {
        type: "text",
        text: "console.log('Hello world');",
        style: "",
        attributes: [],
      },
    ],
  },
  // {
  //   id: 8,
  //   type: "image",
  //   element: "img",
  //   position: 7,
  //   content: [
  //     {
  //       type: "image",
  //       text: "",
  //       style: "",
  //       attributes: [],
  //     },
  //   ],
  // },
  // {
  //   id: 9,
  //   type: "divider",
  //   element: "hr",
  //   position: 8,
  //   content: [],
  // },
];
