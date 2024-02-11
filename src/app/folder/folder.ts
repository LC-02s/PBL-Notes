import { createSlice } from "@reduxjs/toolkit"

export type ColorChip = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'none';
export type FolderDetail = { index: Number, colorChip: ColorChip, length: Number };
export type FolderData = { [key: string] : FolderDetail } | {};

interface FolderState {
    activeFolder: String,
    data: FolderData,
    dataLength: Number,
}

const initialData = JSON.parse(localStorage.getItem('folder') ?? '{ "asdf": {"index": "0", "colorChip": "red", "length": "0"} }');

const initialState: FolderState = {
    activeFolder: '',
    data: initialData,
    dataLength: Object.keys(initialData).length,
}

const folder = createSlice({
    name: 'folder',
    initialState,
    reducers: {
        setActiveFolder: (state, { payload }) => {
            state.activeFolder = payload || '';
        },
        addFolder: (state, { payload }) => {
            const { dataLength } = state;
            const newFolder:FolderDetail = { index: dataLength, colorChip: payload?.color ?? 'none', length: 0 };
            Object.assign(state.data, { [payload.id]: newFolder });
            state.dataLength = Number(dataLength) + 1;
            localStorage.setItem('folder', JSON.stringify(state.data));
        },
    }
});

export const { setActiveFolder, addFolder } = folder.actions;

export default folder.reducer;