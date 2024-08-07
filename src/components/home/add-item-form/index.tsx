"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

type AddItemType = {
  name: string;
  quantity: string;
  category: string;
};

export default function AddItemForm({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) {
  console.log("user id", userId);

  const addItem = async (item: AddItemType) => {
    await addDoc(collection(db, "inventory"), {
      ...item,
      user_id: userId,
    });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        quantity: "",
        category: "food",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        quantity: Yup.number().required("Required"),
        category: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        addItem(values);
        setSubmitting(false);
        resetForm();
        onClose();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="name">Item Name</label>
            <Field
              name="name"
              type="text"
              className="py-2 px-4 outline-none rounded-lg border border-gray-500 mb-0"
            />
            <span className="text-xs text-red-600">
              <ErrorMessage name="name" />
            </span>
          </div>

          <div className="grid gap-2">
            <label htmlFor="quantity">Quantity</label>
            <Field
              name="quantity"
              type="number"
              className="py-2 px-4 outline-none rounded-lg border border-gray-500"
            />
            <span className="text-xs text-red-600">
              <ErrorMessage name="quantity" />
            </span>
          </div>

          <div className="grid gap-2">
            <label htmlFor="category">Category</label>
            <Field
              name="category"
              as="select"
              className="py-2 px-4 outline-none rounded-lg border border-gray-500"
            >
              <option value="food">Food</option>
              <option value="utensil">Utensil</option>
              <option value="drink">Drink</option>
              <option value="others">Others</option>
            </Field>
            <span className="text-xs text-red-600">
              <ErrorMessage name="category" />
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
