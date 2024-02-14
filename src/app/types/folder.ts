export type ColorChip = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'none';

export type SortType = { 
  type: 'create' | 'update' | 'title',  
  sorted: 'desc' | 'asc' 
};

export type Folder = { 
  id: string, name: string, color: ColorChip, sort: SortType 
};

export type FolderList = Folder[];
