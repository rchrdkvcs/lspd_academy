import { Member } from '~/types/members'

export default function getOfcByRank(members: Member[]) {
  const rookies = members.filter((member) =>
    member.roles.some((role) => role.id === '965280713916166211')
  )

  const ofcs1 = members.filter((member) =>
    member.roles.some((role) => role.id === '965280713916166212')
  )

  const ofcs2 = members.filter((member) =>
    member.roles.some((role) => role.id === '1239562619891744810')
  )

  const ofcs3 = members.filter((member) =>
    member.roles.some((role) => role.id === '1239562620739129366')
  )

  const slos = members.filter((member) =>
    member.roles.some((role) => role.id === '1289309467078426718')
  )

  const sgts1 = members.filter((member) =>
    member.roles.some((role) => role.id === '965280713916166213')
  )

  const sgts2 = members.filter((member) =>
    member.roles.some((role) => role.id === '1239562623473942548')
  )

  const ltns1 = members.filter((member) =>
    member.roles.some((role) => role.id === '965280713916166214')
  )

  const ltns2 = members.filter((member) =>
    member.roles.some((role) => role.id === '965280713886797830')
  )

  const cpts = members.filter((member) =>
    member.roles.some((role) => role.id === '965280713932947486')
  )

  const cmdsAdj = members.filter((member) =>
    member.roles.some((role) => role.id === '1291470554921959598')
  )

  const cmds = members.filter((member) =>
    member.roles.some((role) => role.id === '965280713932947487')
  )

  const cops = members.filter((member) =>
    member.roles.some((role) => role.id === '1288588180509167626')
  )

  return {
    rookies,
    ofcs1,
    ofcs2,
    ofcs3,
    slos,
    sgts1,
    sgts2,
    ltns1,
    ltns2,
    cpts,
    cmds,
    cmdsAdj,
    cops,
  }
}
