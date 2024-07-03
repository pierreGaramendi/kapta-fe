import { MultipleContainers } from "./Multiplecontainer/MultipleContainers";

export const SortablePage = () => {
  const fullList = {
    A: ["A1", "A2"],
    B: ["B1", "B2"],
    C: ["C1"],
    D: ["D1", "D2"],
  };
  const onlyListIds = ["A", "B", "C", "D"];
  const onlyList = [
    { _id: "A", name: "Backlog" },
    { _id: "B", name: "Todo" },
    { _id: "C", name: "In Progress" },
    { _id: "D", name: "Done" },
  ];

  const onlyCards = [
    { _idList: "A", name: "Backlog" },
    { _idList: "B", name: "Todo" },
    { _idList: "C", name: "In Progress" },
    { _idList: "D", name: "Done" },
  ];
  return <MultipleContainers fullList={fullList} onlyList={onlyList} onlyListIds={onlyListIds} />;
};
