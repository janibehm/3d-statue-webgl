import { jsx, jsxs } from 'react/jsx-runtime';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function ContactForm({ translations }) {
  const validationSchema = Yup.object({
    name: Yup.string().min(2, translations.validation.name.min).max(50, translations.validation.name.max).required(translations.validation.name.required),
    email: Yup.string().email(translations.validation.email.format).required(translations.validation.email.required),
    message: Yup.string().min(10, translations.validation.message.min).max(500, translations.validation.message.max).required(translations.validation.message.required),
    phone: Yup.string(),
    privacy: Yup.boolean().oneOf([true], translations.validation.privacy.required).required()
  });
  return /* @__PURE__ */ jsx("div", { className: "min-h-[calc(100vh-260px)] flex items-center justify-center bg-white", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md p-8 bg-white shadow-lg rounded-lg", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6 text-center", children: translations.contact.title }),
    /* @__PURE__ */ jsx(
      Formik,
      {
        initialValues: {
          name: "",
          email: "",
          phone: "",
          message: "",
          privacy: false
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        },
        children: ({ errors, touched }) => /* @__PURE__ */ jsxs(Form, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium mb-1", children: translations.form.name }),
            /* @__PURE__ */ jsx(
              Field,
              {
                name: "name",
                className: "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black",
                placeholder: translations.form.name
              }
            ),
            errors.name && touched.name && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "email", className: "block text-sm font-medium mb-1", children: [
              translations.form.email,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Field,
              {
                name: "email",
                type: "email",
                className: "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black",
                placeholder: translations.form.email
              }
            ),
            errors.email && touched.email && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "block text-sm font-medium mb-1", children: translations.form.phone }),
            /* @__PURE__ */ jsx(
              Field,
              {
                name: "phone",
                type: "tel",
                className: "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black",
                placeholder: translations.form.phone
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block text-sm font-medium mb-1", children: translations.form.message }),
            /* @__PURE__ */ jsx(
              Field,
              {
                name: "message",
                as: "textarea",
                rows: 5,
                className: "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black",
                placeholder: translations.form.message
              }
            ),
            errors.message && touched.message && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.message })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-2", children: [
            /* @__PURE__ */ jsx(Field, { type: "checkbox", name: "privacy", className: "mt-1" }),
            /* @__PURE__ */ jsxs("label", { htmlFor: "privacy", className: "text-sm", children: [
              translations.form.privacy,
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/privacy-policy",
                  className: "underline hover:text-gray-600",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  children: translations.form.privacyLink
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] })
          ] }),
          errors.privacy && touched.privacy && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm", children: errors.privacy }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800 transition-colors",
              children: translations.form.submit
            }
          )
        ] })
      }
    )
  ] }) });
}

export { ContactForm as C };
