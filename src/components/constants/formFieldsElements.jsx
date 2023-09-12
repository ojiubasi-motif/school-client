export const createSchoolForm = [
    {
      name: "title",
      type: "text",
      placeholder: "Enter fullname of School",
      label: "Title",
      required: true,
      pattern: "^[^s].+[^s]$",
      errorMessage: "Title must not be empty",
    },
  ];

  export const createClassFields = [
    {
      name: "school",
      type: "text",
      // placeholder: "Select a Batch",
      label: "School",
      // errorMessage: "Select a batch",
      required:true,
      // "aria-label": "Default select example",
    },
    {
      name: "title",
      type: "text",
      placeholder: "Enter the class title",
      label: "Title",
      required: true,
      pattern: "^[A-Za-z0-9]{1,30}$",
      errorMessage: "Title must not be empty",
    },
    {
      name: "head",
      type: "select",
      placeholder: "--select--",
      label: "Head Teacher",
      // required: true,
      // errorMessage: "select one module",
      // "aria-label": "Default select example",
    },
    {
      name: "subjects",
      type: "checkbox",
      // placeholder: "Select a Module",
      label: "Subjects",
      // required: true,
      // errorMessage: "select one module",
      // "aria-label": "Default select example",
    },
  ];