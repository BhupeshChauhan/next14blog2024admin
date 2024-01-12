import { Typography } from "@mui/material";
import Link from "next/link";

export default function CategoryLabel({ categories, nomargin = false }: any) {
  return (
    <div className="flex gap-3">
      {categories?.length &&
        categories.slice(0).map((category: any, index: any) => (
          <Link href={`/category/${category?.slug}`} key={index}>
            <Typography>{category?.name}</Typography>
          </Link>
        ))}
    </div>
  );
}
