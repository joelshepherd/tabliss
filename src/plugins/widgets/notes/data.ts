interface Note {
  contents: string;
}

export interface Data {
  notes: Note[];
}

export const defaultData: Data = {
  notes: [{ contents: "" }],
};
