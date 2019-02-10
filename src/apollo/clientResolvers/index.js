import { helloWorldResolvers } from "./helloWorldResolvers"

export function createResolvers() {
    return {
        ...helloWorldResolvers,
    }
}
