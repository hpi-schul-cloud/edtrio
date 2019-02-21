import { helloWorldResolvers } from "./helloWorldResolvers"
import { lessonResolvers } from "./lesson"

export function createResolvers() {
    return {
        ...lessonResolvers,
    }
}
