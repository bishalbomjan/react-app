import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
const Form = () => {
  const schema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    age: z
      .number({ invalid_type_error: "Age field is required" })
      .min(18, { message: "Age must be at least 18" })
      .max(36, { message: "age must not be more than 36" }),
  });
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onHandleSubmit = (data: FieldValues) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="form-control"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            {...register("age", { valueAsNumber: true })}
            type="number"
            id="age"
            className="form-control"
          />
          {errors.age && <p className="text-danger">{errors.age.message}</p>}
        </div>
        <button disabled={!isValid} className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
