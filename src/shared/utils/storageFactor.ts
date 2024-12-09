import localforage from 'localforage'

export default function storageFactor<T>({ key }: { key: string }) {
  return {
    async getInitialData() {
      return localforage
        .getItem(key)
        .then((value) => (typeof value === 'string' && value ? value : '[]'))
        .then<T[]>(JSON.parse)
    },
    async saveData(data: T[]) {
      return localforage.setItem(key, JSON.stringify(data))
    },
  }
}
