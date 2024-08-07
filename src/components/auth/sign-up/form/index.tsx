"use client";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { redirect } from "next/navigation";

export default function SignUpForm() {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().min(6).required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values);
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            localStorage.setItem("user", JSON.parse(JSON.stringify(user)));

            setSubmitting(false);
            resetForm();
            redirect("/");
          })
          .catch((error) => {
            console.log(error);
            if (error.code === "auth/email-already-in-use") {
              alert("Email already in use, try login in");
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
