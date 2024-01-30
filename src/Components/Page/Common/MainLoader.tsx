
const MainLoader = () => {
  return (
    <div style={styles.mainLoader}>
        <div className="spinner-border text-success" style={styles.mainText}></div>
    </div>
  )
}

export default MainLoader;

const styles = {
    mainLoader:{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    } as React.CSSProperties,
    mainText:{
        width: "4rem",
        height: "4rem"
    } as React.CSSProperties
}