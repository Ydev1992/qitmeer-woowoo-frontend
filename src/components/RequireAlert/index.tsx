import { useTranslation } from "react-i18next";

const RequireAlert = ({
  className = "",
  value,
  text,
}: {
  className?: string;
  value?: any;
  text?: string;
}) => {
  const { t } = useTranslation();
  return !value ? (
    <div className={`${className} mt-1 text-xs text-danger font-semibold`}>*{t(text as any)}</div>
  ) : (
    <div />
  );
};

export default RequireAlert;
