const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  positive = true,
}) => {
  return (
    <div
      data-aos="fade-up"
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#170b08]"
    >
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {value}
          </h3>

          <p
            className={`mt-2 text-xs font-medium ${
              positive ? "text-green-600" : "text-red-500"
            }`}
          >
            {change}
          </p>
        </div>

        <div className="rounded-xl bg-[#e59a38]/15 p-3 text-[#e59a38]">
          <Icon size={22} />
        </div>

      </div>
    </div>
  );
};

export default StatCard;