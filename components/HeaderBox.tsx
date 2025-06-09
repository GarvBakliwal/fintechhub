import { useGlobalStore } from "@/store/globalStore";

const HeaderBox = ({ type = "title", title = "Welcome", subtext = "Access and manage your account and transactions efficiently." }) => {
  const user = useGlobalStore((state) => state.user);

  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === "greeting" && user && (
          <span className="text-bankGradient">
            &nbsp;{user.firstName || "Guest"}
          </span>
        )}
      </h1>
      {subtext && <p className="header-box-subtext">{subtext}</p>}
    </div>
  );
};

export default HeaderBox;