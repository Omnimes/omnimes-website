import { Skeleton } from "@/components/ui/Skeleton"
import { CardSkeleton } from "@/components/dashboard/CardSkeleton"
import { DashboardShell } from "@/components/dashboard/Shell"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <Skeleton className="h-8 w-3/5" />
      <Skeleton className="h-4 w-2/5" />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
