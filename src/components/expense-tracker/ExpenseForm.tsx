import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "./categories";

const schema = z.object({
  description: z.string().min(3).max(33),
  amount: z
    .number({ invalid_type_error: "Amount is required field" })
    .min(0.01, { message: "minimum amount is 1 cent" })
    .max(100_000, { message: "maximum amount is 100000" }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});
type ExpenseFormData = z.infer<typeof schema>;
interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}
const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <div className="mb">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            type="text"
            id="descritpion"
            className="form-control"
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="text"
            id="amount"
            className="form-control"
          />
          {errors.amount && <p>{errors.amount.message}</p>}
        </div>
        <div className="mb-3">
          <select
            {...register("category")}
            id="category"
            className="form-select"
          >
            <option value=""></option>
            <option value="">All Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>
        <button className="btn btn-danger mb-3">Submmit</button>
      </form>
    </>
  );
};

export default ExpenseForm;
