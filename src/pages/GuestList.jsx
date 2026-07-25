import { useState } from 'react'
import PageTransition from '../components/layout/PageTransition'
import { Badge, Button, Card, PageHeader, SearchBox, Table } from '../components/ui'
import { recentCheckIns } from '../mock/data'

const columns = [
  { key: 'id', label: 'Guest ID' },
  { key: 'guest', label: 'Guest' },
  { key: 'room', label: 'Room' },
  {
    key: 'type',
    label: 'Type',
    render: (r) => <Badge tone={r.type === 'Suite' ? 'primary' : 'neutral'}>{r.type}</Badge>,
  },
  { key: 'time', label: 'Checked In', align: 'right' },
  {
    key: 'status',
    label: 'Status',
    align: 'center',
    render: () => <Badge tone="success">Active</Badge>,
  },
]

export default function GuestList() {
  const [query, setQuery] = useState('')
  const rows = recentCheckIns.filter(
    (r) =>
      r.guest.toLowerCase().includes(query.toLowerCase()) ||
      r.id.toLowerCase().includes(query.toLowerCase()) ||
      r.room.includes(query),
  )

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Guest List"
          subtitle="All current and recent guests"
          actions={<Button>+ Add Guest</Button>}
        />
        <Card className="p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Search by name, ID, or room…"
              className="sm:max-w-xs"
            />
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Badge tone="primary">{rows.length} guests</Badge>
            </div>
          </div>
          <Table columns={columns} rows={rows} />
        </Card>
      </div>
    </PageTransition>
  )
}
