// types.ts
interface Instructor {
  discordId: string
  serial: number
  fullName: string
  roles: string[]
}

interface Rookie {
  discordId: string
  serial: number
  fullName: string
}

interface Assignment {
  rk1: string | null
  rk2: string | null
  rk3: string | null
}

type Position = keyof Assignment

interface FormAssignment extends Assignment {
  toDiscordId: string
}
