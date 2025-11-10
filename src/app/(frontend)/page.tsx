async function getPages() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pages?limit=10`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch pages')
  return res.json()
}

export default async function Home() {
  const data = await getPages()
  const pages = data?.docs ?? []
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Pages</h1>
      <ul className="space-y-2">
        {pages.map((p: any) => (
          <li key={p.id} className="rounded border p-3">
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-gray-500">/{p.slug}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}