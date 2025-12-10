export type Undo = {
    title: string,
    action: () => void
} | null