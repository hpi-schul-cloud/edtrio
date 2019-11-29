export const splice = (array, start, deleteCount, ...item) => {
	const newArrayWithAddedSectinstate = [...array]
            newArrayWithAddedSectinstate.splice(start, deleteCount, ...item)
            return newArrayWithAddedSectinstate
}