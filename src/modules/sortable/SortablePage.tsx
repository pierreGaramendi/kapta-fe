import { MultipleContainers } from "./Multiplecontainer/MultipleContainers";

export const SortablePage = () => {
  const fullList = {
    A: ["A1", "A2"],
    B: ["B1", "B2"],
    C: [],
    D: [],
  };
  const onlyListIds = ["A", "B", "C", "D"];
  const onlyList = [
    { _id: "A", name: "Backlog" },
    { _id: "B", name: "Todo" },
    { _id: "C", name: "In Progress" },
    { _id: "D", name: "Done" },
  ];

  const onlyCards = [
    {
      _idList: "A",
      _idCard: "A1",
      name: "Desarrollar componentes de la interfaz de usuario para la página de productos con React",
    },
    { _idList: "A", _idCard: "A2", name: "Realizar pruebas de usabilidad en la interfaz de usuario con un grupo de usuarios" },
    { _idList: "A", _idCard: "B1", name: "Realizar análisis de vulnerabilidades con OWASP ZAP en el proceso de pago" },
    { _idList: "A", _idCard: "B2", name: "Validar que todos los requisitos funcionales estén cumplidos" },
  ];
  return <MultipleContainers fullList={fullList} onlyList={onlyList} onlyListIds={onlyListIds} onlyCards={onlyCards} />;
};
