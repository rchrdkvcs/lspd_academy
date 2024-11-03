function filterOfficersByRoleId(roleId: string, officers: any[]) {
  return officers.filter((officer) =>
    officer.roles.some((role: { id: string; name: string }) => role.id === roleId)
  )
}

function hasRole(roles: any[], roleId: string) {
  return roles.some((role) => role.id === roleId)
}

function getRank(roles: any[]) {
  if (roles.some((role) => role.id === '1288588180509167626')) {
    return 'Chief Of Police'
  } else if (roles.some((role) => role.id === '965280713932947487')) {
    return 'Commandant'
  } else if (roles.some((role) => role.id === '1291470554921959598')) {
    return 'Commandant Adj.'
  } else if (roles.some((role) => role.id === '965280713932947486')) {
    return 'Capitaine'
  } else if (roles.some((role) => role.id === '965280713886797830')) {
    return 'Lieutenant II'
  } else if (roles.some((role) => role.id === '965280713916166214')) {
    return 'Lieutenant I'
  } else if (roles.some((role) => role.id === '1239562623473942548')) {
    return 'Sergent II'
  } else if (roles.some((role) => role.id === '965280713916166213')) {
    return 'Sergent I'
  } else if (roles.some((role) => role.id === '1239562620739129366')) {
    return 'Officier III'
  } else if (roles.some((role) => role.id === '1239562619891744810')) {
    return 'Officier II'
  } else if (roles.some((role) => role.id === '965280713916166212')) {
    return 'Officier I'
  } else if (roles.some((role) => role.id === '965280713916166211')) {
    return 'Rookie'
  } else {
    return ''
  }
}

export { filterOfficersByRoleId, getRank, hasRole }
