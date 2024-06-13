import { useEffect } from "react";
import { initializeDB } from "./modules/indexdb/initializeDB";
import { useAsideStore } from "./modules/stores/useAsideStore";
import { Aside } from "./modules/components/holy-grail/Aside/Aside";
import Topbar from "./modules/components/holy-grail/topbar/Topbar";
import Main from "./modules/components/holy-grail/Main";

function App() {
  useEffect(() => {
    initializeDB();
  }, []);

  const asideVisible = useAsideStore((state) => state.asideVisible);

  return (
    <div className={`app ${asideVisible ? "aside-visible" : ""}`}>
      <Aside visible={asideVisible} />
      <div className="recipient">
        <Topbar />
        <Main></Main>
      </div>
    </div>
  );
}

export default App;
