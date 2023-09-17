import style from "./style.module.css";

function BigLoader() {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "172px",
        width: "100%",
        zIndex: "1",
        backgroundColor: "rgba(240,242,245,255)",
      }}
    >
      <div style={{ width: "30px", height: "30px" }} className={style.loader}></div>
    </div>
  );
}

export default BigLoader;
