import Image from "next/image";
import { cn } from "./../lib/utils";

import { topCategoryStyles } from "@/constants";
import { CategoryProps } from "@/types";

const Category = ({ category }: CategoryProps) => {
  // Extract styles based on the category name or use default styles
  const {
    bg,
    circleBg,
    text: { main, count },
    progress: { bg: progressBg, indicator },
    icon,
  } = topCategoryStyles[category.name as keyof typeof topCategoryStyles] ||
    topCategoryStyles.default;

  // Calculate progress (percentage of total)
  const percent = category.totalCount
    ? Math.round((category.count / category.totalCount) * 100)
    : 0;

  return (
    <div className={cn("flex items-center gap-3 p-2 rounded-lg min-h-[40px] text-[13px] bg-white", bg)}>
      {/* Icon */}
      <figure className={cn("flex-center size-8 rounded-full", circleBg)}>
        <Image src={icon} width={16} height={16} alt={category.name} />
      </figure>
      {/* Details */}
      <div className="flex flex-col flex-1">
        <span className={cn("font-medium", main)}>{category.name}</span>
        {/* Progress bar */}
        <div className={cn("w-full h-1 rounded-full mt-1", progressBg)}>
          <div
            className={cn("h-1 rounded-full", indicator)}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      {/* Count */}
      <span className={cn("ml-2 font-semibold", count)}>{category.count}</span>
    </div>
  );
};

export default Category;