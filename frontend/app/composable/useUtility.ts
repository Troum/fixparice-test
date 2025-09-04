export const useUtility = () => {
    const isString = (value: unknown) => {
        return typeof value === "string";
    }

    const validateTiptapContent = (value: any): boolean => {
        if (isString(value)) {
            return value.trim().length > 0
        }
        if (typeof value === 'object' && value !== null) {

            if (value.type === 'doc' && Array.isArray(value.content)) {

                return value.content.some((node: any) => {
                    if (node.type === 'paragraph' && node.content) {
                        return node.content.some((textNode: any) => textNode.text && textNode.text.trim().length > 0)
                    }
                    return node.type !== 'paragraph'
                })
            }
            return false
        }
        return false
    }

    return {
        isString,
        validateTiptapContent
    }
}
