import * as Yup from "yup";

const postsFormData = (CategoryList: any, TagsList: any) => {
  const postsFormArray = [
    {
      label: "Post Details",
      formInputType: "section",
      xs: 12,
      sm: 12,
      lg: 12,
      xl: 12,
    },
    {
      id: "title",
      name: "title",
      label: "Post Title",
      placeholder: "Enter Post Title",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      id: "description",
      name: "description",
      label: "Post Description",
      placeholder: "Enter Post Description",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      id: "slug",
      name: "slug",
      label: "Post Slug",
      placeholder: "Enter Post Slug",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      name: "featuredImage",
      label: "Featured Image",
      placeholder: "Select Featured Image",
      formInputType: "imageSelector",
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
      fullWidth: true,
    },
    {
      name: "content",
      label: "Post Content",
      formInputType: "textEditor",
      xs: 12,
      sm: 12,
      lg: 12,
      xl: 12,
    },
    {
      name: "categories",
      label: "Categories",
      placeholder: "Enter Categories",
      formInputType: "select",
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
      menuArray: CategoryList,
      fullWidth: true,
      multiple: true,
    },
    {
      name: "tags",
      label: "Tags",
      formInputType: "select",
      placeholder: "Enter Tags",
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
      menuArray: TagsList,
      fullWidth: true,
      multiple: true,
    },
    {
      id: "excerpt",
      name: "excerpt",
      label: "Excerpt",
      placeholder: "Enter Excerpt",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      name: "visibility",
      label: "visibility",
      placeholder: "Enter visibility",
      formInputType: "select",
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
      menuArray: [
        {
          name: "public",
        },
        {
          name: "private",
        },
      ],
      fullWidth: true,
      multiple: false,
    },
    {
      id: "featured",
      name: "featured",
      label: "featured",
      formInputType: "checkboxGroup",
      CheckboxOptions: [
        { name: "featuredHome", label: "Feature on Home" },
        { name: "featuredEditorPick", label: "Feature as editor pick" },
      ],
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      label: "Seo Settings",
      formInputType: "section",
      xs: 12,
      sm: 12,
      lg: 12,
      xl: 12,
    },
    {
      id: "focusKeyword",
      name: "focusKeyword",
      label: "Focus Keyword",
      placeholder: "Enter Focus Keyword",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      id: "seoTitle",
      name: "seoTitle",
      label: "SeoTitle",
      placeholder: "Enter Seo Title",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      id: "metaDescription",
      name: "metaDescription",
      label: "Meta Description",
      placeholder: "Enter Meta Description",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      id: "canonicalUrl",
      name: "canonicalUrl",
      label: "Canonical Url",
      placeholder: "Enter Canonical Url",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
  ];

  const postsInitialValues = {
    title: "",
    content: "<p>Enter Post Content 👋</p>",
    categories: [],
    tags: [],
    slug: "",
    description: "",
    featuredImage: "",
    featuredHome: false,
    featuredEditorPick: false,
  };

  const postsValidationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    featuredImage: Yup.string().required("Featured Image is required"),
    content: Yup.string().required("Content is required"),
    categories: Yup.array().required("Categories is required"),
    tags: Yup.array().required("Tags is required"),
    slug: Yup.string().required("Slug is required"),
    description: Yup.string().required("Description is required"),
    excerpt: Yup.string().required("Excerpt is required"),
    visibility: Yup.string().required("Visibility is required"),
    focusKeyword: Yup.string().required("Focus Keyword is required"),
    seoTitle: Yup.string().required("Seo Title is required"),
    metaDescription: Yup.string().required("Meta Description is required"),
  });
  return { postsFormArray, postsInitialValues, postsValidationSchema };
};

export default postsFormData;
