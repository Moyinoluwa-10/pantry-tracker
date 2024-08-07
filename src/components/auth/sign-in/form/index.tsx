"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().min(6).required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("user", JSON.stringify(user));
            setSubmitting(false);
            router.push("/");
          })
          .catch((error) => {
            console.log(error);
            if (error.code === "auth/invalid-credential") {
              alert("Email or password is invalid");
            } else {
              alert("An error occurred, please try again");
            }
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="email">Email Address</label>
            <Field
              name="email"
              type="email"
              className="py-2 px-4 outline-none rounded-lg border border-gray-500 mb-0"
            />
            <span className="text-xs text-red-600">
              <ErrorMessage name="email" />
            </span>
          </div>

          <div className="grid gap-2">
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type="password"
              className="py-2 px-4 outline-none rounded-lg border border-gray-500"
            />
            <span className="text-xs text-red-600">
              <ErrorMessage name="password" />
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="py-2 px-4 w-full bg-blue-600 rounded-xl text-white"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
