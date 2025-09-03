import {useOverlay} from "#ui/composables/useOverlay";

export function useUI() {
    const overlay = useOverlay()

    async function showModal<Type>(component: Component, props: Record<string, Type> = {}) {
        const modal = overlay.create(component, {
            props: props
        })
        modal.open()
        return modal
    }


    return {
        overlay,
        showModal,
    }
}
