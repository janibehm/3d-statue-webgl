import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import type { FormikErrors, FormikTouched } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import ContactFormSuccess from "./ContactFormSuccess";

interface ContactFormProps {
  translations: {
    contact: {
      thankYou: string;
      successMessage: string;
      sendAnother: string;
    };
    form: {
      name: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
      privacy: string;
      privacyLink: string;
      consultation: string;
    };
    validation: {
      name: {
        min: string;
        max: string;
        required: string;
      };
      email: {
        format: string;
        required: string;
      };
      message: {
        min: string;
        max: string;
        required: string;
      };
      privacy: {
        required: string;
      };
    };
  };
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
  consultation?: boolean;
}

// Add this CSS at the top of your file or in your global styles
const styles = {
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
};

export default function ContactForm({ translations }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, translations.validation.name.min)
      .max(50, translations.validation.name.max)
      .required(translations.validation.name.required),
    email: Yup.string()
      .email(translations.validation.email.format)
      .required(translations.validation.email.required),
    message: Yup.string()
      .min(10, translations.validation.message.min)
      .max(500, translations.validation.message.max)
      .required(translations.validation.message.required),
    phone: Yup.string(),
    privacy: Yup.boolean().oneOf([true], translations.validation.privacy.required).required(),
  });

  return (
    <div className={clsx("min-h-[calc(100vh-260px)] relative", "bg-black/95")}>
      {isSubmitted ? (
        <ContactFormSuccess onReset={() => setIsSubmitted(false)} translations={translations} />
      ) : (
        <div className="relative z-10 w-full h-full flex items-center justify-center pb-20">
          <div className="w-full max-w-md p-8">
            <Formik
              initialValues={{
                name: "",
                email: "",
                phone: "",
                message: "",
                privacy: false,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  console.log("Form submitted!");
                  console.log("Form values:", values);

                  // Add your actual form submission logic here
                  // await submitForm(values);

                  setIsSubmitted(true); // Direct state update
                } catch (error) {
                  console.error("Submission error:", error);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                errors,
                touched,
                isSubmitting,
              }: {
                errors: FormikErrors<FormValues>;
                touched: FormikTouched<FormValues>;
                isSubmitting: boolean;
              }) => (
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-white">
                      {translations.form.name} <span className="text-red-400">*</span>
                    </label>
                    <Field
                      name="name"
                      className="w-full p-2 border border-gray-600 rounded bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder={translations.form.name}
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-400 text-sm mt-1">{errors.name}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">
                      {translations.form.email} <span className="text-red-400">*</span>
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full p-2 border border-gray-600 rounded bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder={translations.form.email}
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-400 text-sm mt-1">{errors.email}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1 text-white">
                      {translations.form.phone}
                    </label>
                    <Field
                      name="phone"
                      type="tel"
                      className="w-full p-2 border border-gray-600 rounded bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder={translations.form.phone}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Field type="checkbox" name="consultation" className="mt-1" />
                    <label htmlFor="consultation" className="text-sm text-white">
                      {translations.form.consultation}
                    </label>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1 text-white">
                      {translations.form.message} <span className="text-red-400">*</span>
                    </label>
                    <Field
                      name="message"
                      as="textarea"
                      rows={5}
                      className="w-full p-2 border border-gray-600 rounded bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder={translations.form.message}
                    />
                    {errors.message && touched.message && (
                      <div className="text-red-400 text-sm mt-1">{errors.message}</div>
                    )}
                  </div>

                  <div className="flex items-start space-x-2">
                    <Field type="checkbox" name="privacy" className="mt-1" />
                    <label htmlFor="privacy" className="text-sm text-white">
                      {translations.form.privacy}{" "}
                      <a
                        href="/privacy-policy"
                        className="underline hover:text-gray-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {translations.form.privacyLink}
                      </a>
                      <span className="text-red-400">*</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={clsx(
                      "w-full py-2 px-4 rounded transition-colors",
                      "bg-white text-black",
                      "hover:bg-gray-200",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                    )}
                  >
                    {isSubmitting ? "Sending..." : translations.form.submit}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}
