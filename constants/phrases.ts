const shuffledItems : string[] = shuffleArray([
    "Looks like you're all caught up! Add a task to get started.",
    "Your list is empty, time to make some plans!",
    "Nothing to do... for now! Start adding tasks.",
    "No tasks yet, but there's plenty to do. What's next?",
    "Your to-do list is empty, let's fill it up!",
    "Great, you've got a fresh start! Add a task to begin.",
    "All clear for now. Ready to tackle something?",
    "Time to set some goals! What's on your mind?",
    "The list is blank, let's change that. Add your first task!",
    "It's a clean slate, what's next on your to-do list?",
    "No tasks yet, but the possibilities are endless!"
])

export function NoItems(index:number) : string {
    return shuffledItems[index % shuffledItems.length]
}

function shuffleArray(array:string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}