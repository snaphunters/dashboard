const config = {
  toolbar: {
    items: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "superscript",
      "subscript",
      "link",
      "highlight",
      "fontFamily",
      "fontSize",
      "fontBackgroundColor",
      "fontColor"
    ]
  },
  blockToolbar: [
    "heading",
    "blockQuote",
    "numberedList",
    "bulletedList",
    "imageUpload",
    "mediaEmbed",
    "insertTable",
    "alignment",
    "indent",
    "outdent",
    "undo",
    "redo",
    "horizontalLine"
  ],
  image: {
    toolbar: [
      "imageTextAlternative",
      "|",
      "imageStyle:full",
      "imageStyle:alignLeft",
      "imageStyle:alignCenter",
      "imageStyle:alignRight"
    ],
    styles: ["full", "alignLeft", "alignCenter", "alignRight"]
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableCellProperties",
      "tableProperties"
    ]
  },

  mediaEmbed: {
    extraProviders: {
      name: "allow-all",
      url: /.*/,
      html: match =>
        `<video controls width="100%"><source src=${match} /></video>`
    }
  }
};

export default config;
