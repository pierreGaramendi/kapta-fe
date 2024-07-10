import { useAsideStore } from "./modules/stores/useAsideStore";
import { Aside } from "./modules/components/holy-grail/Aside/Aside";
import Topbar from "./modules/components/holy-grail/topbar/Topbar";
import Main from "./modules/components/holy-grail/Main";
import '@mantine/core/styles.css';

function App() {
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
