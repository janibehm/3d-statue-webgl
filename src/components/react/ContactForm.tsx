import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Nimen täyty olla vähintään kaksi merkkiä")
    .max(50, "Nimen täyty olla enintään 50 merkkiä")
    .required("Nimi on pakollinen"),
  email: Yup.string()
    .email("Lisää sähköposti oikeassa muodossa")
    .required("Sähköposti on pakollinen"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters")
    .required("Viesti on pakollinen"),
  phone: Yup.string(),
  privacy: Yup.boolean()
    .oneOf([true], "Hyväksyn tietosuojakäytännön ja minuun voi olla yhteydessä")
    .required(),
});

export default function ContactForm() {
  return (
    <div className="min-h-[calc(100vh-260px)] flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Ota Yhteyttä</h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            message: "",
            privacy: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nimi
                </label>
                <Field
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Nimesi"
                />
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Sähköposti <span className="text-red-500">*</span>
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="esimerkki@sähköposti.com"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Puhelinnumero
                </label>
                <Field
                  name="phone"
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="+358 40 123 4567"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Viestisi meille
                </label>
                <Field
                  name="message"
                  as="textarea"
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Viestisi meille..."
                />
                {errors.message && touched.message && (
                  <div className="text-red-500 text-sm mt-1">{errors.message}</div>
                )}
              </div>

              <div className="flex items-start space-x-2">
                <Field type="checkbox" name="privacy" className="mt-1" />
                <label htmlFor="privacy" className="text-sm">
                  Hyväksyn{" "}
                  <a
                    href="/privacy-policy"
                    className="underline hover:text-gray-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    tietosuojakäytännön
                  </a>
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.privacy && touched.privacy && (
                <div className="text-red-500 text-sm">{errors.privacy}</div>
              )}

              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                Lähetä
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
