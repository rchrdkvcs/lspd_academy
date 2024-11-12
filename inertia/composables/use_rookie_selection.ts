import { Ref } from 'vue'

export function useRookieSelection(
  allRookies: Rookie[],
  localAssignments: Ref<Record<string, Assignment>>
) {
  const getRookieOptions = (instructeurId: string, position: Position): Rookie[] => {
    const currentAssignments = localAssignments.value[instructeurId] || {
      rk1: null,
      rk2: null,
      rk3: null,
    }

    const assignedRookies = new Set<string>()
    Object.values(localAssignments.value).forEach((assignment) => {
      Object.entries(assignment).forEach(([pos, rookieId]) => {
        if (rookieId && rookieId !== currentAssignments[pos as Position]) {
          assignedRookies.add(rookieId)
        }
      })
    })

    return allRookies
      .filter(
        (rookie) =>
          !assignedRookies.has(rookie.discordId) ||
          rookie.discordId === currentAssignments[position]
      )
      .sort((a, b) => a.serial - b.serial)
  }

  const getSelectedValue = (instructeurId: string, position: Position): string => {
    return localAssignments.value[instructeurId]?.[position] || ''
  }

  return {
    getRookieOptions,
    getSelectedValue,
  }
}
