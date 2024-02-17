export type ColorChip = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'none';

export type SortType = 'create' | 'update' | 'title';
export type SortedAt = 'desc' | 'asc';

export type FolderSortType = { type: SortType, sortedAt: SortedAt };

export type Folder = { 
  id: number, name: string, color: ColorChip, sort: FolderSortType 
};

export type FolderList = Folder[];
