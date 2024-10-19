export interface Member {
  id: string
  username: string
  displayName: string
  fullName: string
  serial: string
  roles: Role[]
}

export interface Role {
  color: 0
  id: string
  name: string
}
