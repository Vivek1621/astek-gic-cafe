import * as Yup from "yup";

export const cafeValidationSchema = Yup.object({
  name: Yup.string()
    .min(6, "Name should be a minimum of 6 characters")
    .max(10, "Name should be a maximum of 10 characters")
    .required("Name is required"),
  description: Yup.string()
    .max(256, "Description should be a maximum of 256 characters")
    .required("Description is required"),
    logo: Yup.mixed().nullable().test("fileSize", "File Size is too large", value => !value || (value && value.size <= 2 * 1024 * 1024))
    .test("fileType", "Unsupported File Format", value => !value || (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))),
  location: Yup.string()
    .required("Location is required")
});

export const EmployeeValidationSchema = Yup.object({
    name: Yup.string()
      .min(6, "Name should be a minimum of 6 characters")
      .max(10, "Name should be a maximum of 10 characters")
      .required("Name is required"),
      email_address: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
      phone_number: Yup.string()
      .matches(/^[89]\d{7}$/, "Enter a valid SG phone number (starts with 8 or 9 and has 8 digits)")
      .required("Phone number is required"),
    gender: Yup.string()
      .required("Gender is required"),
      cafe_id: Yup.string()
  });