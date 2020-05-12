let data = {
  id: "410ca2c5-635b-4dd8-9b42-e64396fb6831",
  name: "A",
  job: "总经理",
  line: "董事长",
  position: 1,
  level: "高",
  children: [
    {
      id: "67efeeda-9877-4210-8b87-35e3585c342e",
    },
    {
      id: "65d64128-e9fc-423e-a42d-3ace33a90b34",
      name: "AA",
      job: "成本负责人",
      line: "成本",
      position: -1,
      level: "中",
      children: [
        {
          id: "8808deb8-ce49-4798-b491-c515bee7cc82",
          name: "AAA",
          job: "成本小弟",
          line: "成本",
          position: 3,
          level: "低",
        },
      ],
    },
    {
      id: "e341848a-d1e8-4f8c-bdb9-d137c6b0ef66",
      name: "AB",
      job: "营销总",
      line: "营销",
      position: 3,
      level: "高",
    },
    {
      id: "52cc887c-dcda-4d83-831f-98f841dcfb96",
      name: "AC",
      job: "财务负责人",
      line: "财务",
      position: 3,
      level: "中",
      children: [
        {
          id: "c76b19d8-8b17-49d9-a27d-cc18342fdb8b",
          name: "ACA",
          job: "区域负责人",
          line: "财务",
          position: 3,
          level: "中",
        },
        {
          id: "3b00d583-bfe0-43c6-aea6-930948b58c2c",
          name: "ACB",
          job: "区域负责人",
          line: "财务",
          position: -3,
          level: "中",
          children: [
            {
              id: "284d4b7b-16dd-46cd-9e19-c22913b3cca5",
              name: "ACBA",
              job: "助理",
              line: "财务",
              position: 0,
              level: "中",
            },
          ],
        },
      ],
    },
  ],
};
export default data;
