import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createJobTypeAction } from "../redux/actions/jobTypeAction";
import axios from "axios";

const validationSchema = yup.object({
  jobTypeName: yup.string("Enter a Category").required("Category is required"),
});

const EditCategory = ({ data, setOpen, jobTypeLoadAction }) => {
  const { user } = useSelector((state) => state.userProfile);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      user: user && user._id,
      jobTypeName: data?.jobTypeName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const res = await axios.put(`/api/type/update/${data?._id}`, {
          jobTypeName: values.jobTypeName,
        });
        dispatch(jobTypeLoadAction());
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
      actions.resetForm();
    },
  });

  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 4,
        }}
      >
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className=" border-style"
          style={{ width: "500px", padding: "30px" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
              Update Category
            </Typography>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="jobTypeName"
              label="category"
              name="jobTypeName"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="category name"
              value={formik.values.jobTypeName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.jobTypeName && Boolean(formik.errors.jobTypeName)
              }
              helperText={
                formik.touched.jobTypeName && formik.errors.jobTypeName
              }
            />

            <Button fullWidth variant="contained" type="submit">
              Update category
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditCategory;
