import { Link } from './types';

export function addLink() {
  return {
    type: 'ADD_LINK',
  } as const;
}

export function updateLink(index: number, link: Link) {
  return {
    type: 'UPDATE_LINK',
    data: { index, link },
  } as const;
}

export function removeLink(index: number) {
  return {
    type: 'REMOVE_LINK',
    data: { index },
  } as const;
}

export function reorderLink(index: number, to: number) {
  return {
    type: 'REORDER_LINK',
    data: { index, to },
  } as const;
}

export type Action =
  | ReturnType<typeof addLink>
  | ReturnType<typeof updateLink>
  | ReturnType<typeof removeLink>
  | ReturnType<typeof reorderLink>;
