import { useForm } from '@inertiajs/vue3'
import { computed, ref } from 'vue'

export function useAssignments(initialAssignments: Record<string, Assignment>) {
  const localAssignments = ref<Record<string, Assignment>>({ ...initialAssignments })
  const modifiedInstructors = ref(new Set<string>())

  const form = useForm<{
    assignments: Record<string, FormAssignment>
  }>({
    assignments: {},
  })

  const hasModifications = computed(() => modifiedInstructors.value.size > 0)

  const updateAssignment = (
    instructeurId: string,
    rookieId: string | null,
    position: Position
  ): void => {
    if (!localAssignments.value[instructeurId]) {
      localAssignments.value[instructeurId] = { rk1: null, rk2: null, rk3: null }
    }
    localAssignments.value[instructeurId][position] = rookieId === '' ? null : rookieId
    modifiedInstructors.value.add(instructeurId)
  }

  const handleSubmit = async () => {
    const formData: Record<string, FormAssignment> = {}
    modifiedInstructors.value.forEach((instructeurId) => {
      formData[instructeurId] = {
        toDiscordId: instructeurId,
        ...localAssignments.value[instructeurId],
      }
    })

    form.assignments = formData
    await form.post('/create-pto', {
      preserveScroll: true,
      onSuccess: () => {
        modifiedInstructors.value.clear()
      },
    })
  }

  return {
    localAssignments,
    modifiedInstructors,
    hasModifications,
    updateAssignment,
    handleSubmit,
  }
}
