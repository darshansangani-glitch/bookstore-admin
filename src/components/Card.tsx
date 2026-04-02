import { ReactNode } from "react";

interface prop {
  item: {
    iconColor: string;
    bgColor: string;
    icon: ReactNode;
    text: string;
    name: string;
    number: number;
    trend?: string;
  };
  loading?: boolean;
}

export const Card: React.FC<prop> = ({ item, loading }) => {
  return (
    <div
      className="flex items-center gap-4 p-5 rounded-2xl shadow-sm border min-w-55 flex-1"
      style={{
        backgroundColor: item.bgColor,
        borderColor: `${item.iconColor}40`,
      }}
    >
      <div
        className="flex items-center justify-center w-14 h-14 rounded-full text-2xl shrink-0"
        style={{
          backgroundColor: `${item.iconColor}20`,
          color: item.iconColor,
        }}
      >
        {item.icon}
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium text-gray-500 truncate">
          {item.text}
        </span>
        {loading ? (
          <div
            className="mt-1 h-8 w-16 rounded-md animate-pulse"
            style={{ backgroundColor: `${item.iconColor}30` }}
          />
        ) : (
          <span
            className="text-3xl font-bold leading-tight"
            style={{ color: item.iconColor }}
          >
            {item.number.toLocaleString()}
          </span>
        )}
        <span className="text-xs mt-1" style={{ color: item.iconColor }}>
          {item.trend ?? "+5% since last month"}
        </span>
      </div>
    </div>
  );
};
