import { categories } from "@/data/categories";
import CategoryCard from "./category-card";

export default function Categories() {
  return (
    <section
      aria-label="Directory highlights"
      className="border-y border-border bg-gray-50 px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}
