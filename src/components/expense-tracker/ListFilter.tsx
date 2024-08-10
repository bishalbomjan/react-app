import { categories } from "./categories";
interface Props {
  onSelectCategory: (category: string) => void;
}
const ListFilter = ({ onSelectCategory }: Props) => {
  return (
    <>
      <select
        className="form-select mb-3"
        onChange={(event) => onSelectCategory(event.target.value)}
      >
        <option value="">All Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
};

export default ListFilter;