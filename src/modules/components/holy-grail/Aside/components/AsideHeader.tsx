import { useAsideStore } from "../../../../stores/useAsideStore";


export const AsideHeader: React.FC<{ visible: boolean }> = ({ visible }) => {
  const toggleAside = useAsideStore((state) => state.toggleAside);
  return (
    <div>
      {visible && (
        <button onClick={toggleAside}>
         x
        </button>
      )}
      <span>Kapta</span>
    </div>
  );
};
