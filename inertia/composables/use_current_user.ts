import User from '#models/user'
import { usePage } from '@inertiajs/vue3'

export function useCurrentUser() {
  return usePage().props.currentUser as User
}
