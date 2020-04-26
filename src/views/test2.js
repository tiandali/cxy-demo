export const chartdata = {
  nodes: [
    {
      title: '土豆',
      img: '',
    },
    {
      title: '菠萝',
      img: '',
    },
    {
      title: '淀粉',
      img: '',
    },
  ],
  links: [
    {
      source: "土豆",
      target: "菠萝",
      rel: "rel1"
    },
    {
      source: "菠萝",
      target: "土豆",
      rel: "rel2"
    },
    {
      source: "土豆",
      target: "淀粉",
      rel: "rel3"
    },
    {
      source: "淀粉",
      target: "土豆",
      rel: "rel4"
    },
    {
      source: "菠萝",
      target: "淀粉",
      rel: "rel5"
    },
  ]
}
