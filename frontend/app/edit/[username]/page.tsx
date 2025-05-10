// app/edit/[username]/page.tsx
import EditProfileClient from './EditProfileClient'
import { backendUrl } from '@/lib/utils'

export default async function Page({ params }: { params: { username: string } }) {
  const token = localStorage.getItem("token")

  const res = await fetch(`${backendUrl}/verify-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token || "",
    },
    body: JSON.stringify({ username: params.username }),
  })

  if (!res.ok) {
    return <p>Unauthorized</p>
  }

  return <EditProfileClient currUsername={params.username} />
}
