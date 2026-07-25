import { FiArrowRight } from 'react-icons/fi'
import PageTransition from '../components/layout/PageTransition'
import {
  Card,
  EmptyState,
  PageHeader,
  SectionTitle,
  Skeleton,
  SkeletonTable,
} from '../components/ui'

// Shared shell for the Phase 1 "empty" pages — heading + placeholder content.
export default function PlaceholderPage({ title, subtitle, description }) {
  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader title={title} subtitle={subtitle} />
        <Card className="p-6">
          <SectionTitle title="Overview" />
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </Card>
        <Card className="p-6">
          <SectionTitle
            title="Recent activity"
            action={
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 dark:text-primary-300">
                View all <FiArrowRight size={12} />
              </span>
            }
          />
          <div className="mt-4">
            <SkeletonTable rows={4} />
          </div>
        </Card>
        <EmptyState
          title="Coming in a later phase"
          description="This module is part of the foundation shell. Functional forms and workflows will be added in Phase 2."
        />
      </div>
    </PageTransition>
  )
}
