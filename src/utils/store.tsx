const cards: Array<{ id: string; title: string }> = [
  {
    id: "card-1",
    title: "Learning how to cook",
  },
  {
    id: "card-2",
    title: "Making sandwich",
  },
  {
    id: "card-3",
    title: "Taking the trash out",
  },
];

type GenericObject = { [key: string]: any }

const data: GenericObject = {
  lists: {
    "list-1": {
      id: "list-1",
      title: "Todo",
      cards,
    },

    "list-2": {
      id: "list-2",
      title: "Doing",
      cards: [],
    },
  },
  listIds: ["list-1", "list-2"],
};

export default data;
