import { API } from "../../types";

export type SubLink = {
  id: string;
  name: string;
  url: string;
  icon?: string;
};

export type LinkCollection = {
  id: string;
  name: string;
  url?: string;
  icon?: string;
  sublinks: SubLink[];
};

export type Data = {
  columns: number;
  collections: LinkCollection[];
  visible: boolean;
  linkOpenStyle: boolean;
};

export type Props = API<Data>;

export const defaultData: Data = {
  columns: 1,
  collections: [
    {
      id: "1",
      name: "Example Collection",
      icon: "folder",
      sublinks: [
        {
          id: "1-1",
          name: "GitHub",
          url: "https://github.com",
          icon: "brand-github",
        },
        {
          id: "1-2",
          name: "Tabliss",
          url: "https://tabliss.io",
        },
      ],
    },
  ],
  visible: true,
  linkOpenStyle: false,
};
