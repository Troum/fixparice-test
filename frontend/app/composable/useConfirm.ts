import {useUI} from "~/composable/useUI";
import Confirmation from "~/components/ConfirmationModalComponent.vue"
import type {ConfirmParams} from "~/interfaces/ConfirmInterface";

const params = ref<ConfirmParams>({
    title: 'Title',
    message: 'Description',
    label: 'Confirm',
    action: () => {},
})
const { showModal } = useUI()
export const useConfirm = () => {

    async function confirm (title: string, message: string, label: string, action: Function) {
        params.value = { title, message, label, action }
        await showModal(Confirmation, params as any)
    }


    function confirmDelete(
        title: string = 'Удалить запись?',
        description: string = 'Вы действительно хотите удалить запись?',
        confirmText: string = 'Удалить',
        onConfirm: () => Promise<void>,
        successMessage: string = 'Запись удалена успешно',
        errorMessage: string = 'Не удалось удалить запись'
    ) {
        const toast = useToast()

        confirm(
            title,
            description,
            confirmText,
            async () => {
                try {
                    await onConfirm()
                    toast.add({
                        title: 'Успех',
                        description: successMessage,
                        color: 'success'
                    })
                } catch (error) {
                    toast.add({
                        title: 'Ошибка',
                        description: errorMessage,
                        color: 'error'
                    })
                }
            }
        ).then()
    }

    return {
        confirm,
        confirmDelete,
        params,
    }
}
