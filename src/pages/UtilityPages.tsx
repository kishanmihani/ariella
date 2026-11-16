import { Icon } from '../components/Icon'
import { PageHeader } from '../components/PageHeader'

type UtilityPageProps = {
  onHome: () => void
  onWelcome: () => void
}

export function NotificationsPage({ onHome }: UtilityPageProps) {
  return (
    <main className="page-content subpage">
      <PageHeader title="Notifications" subtitle="A gentle nudge when it matters." />
      <section className="notification-card">
        <span className="notification-icon"><Icon name="bell" size={20} /></span>
        <div><strong>You’re all caught up</strong><p>We’ll let you know when something needs your attention.</p></div>
      </section>
      <button className="secondary-button" onClick={onHome}>Back to your day</button>
    </main>
  )
}

export function SettingsPage({ onWelcome }: UtilityPageProps) {
  return (
    <main className="page-content subpage">
      <PageHeader title="Settings" subtitle="Make your space feel like yours." />
      <section className="settings-card">
        <div className="settings-profile">
          <span className="avatar large">A</span>
          <div><strong>Alex Morgan</strong><span>Personal workspace</span></div>
        </div>
        <div className="settings-row">
          <div><strong>Daily reminders</strong><span>A little nudge to stay on track</span></div>
          <label className="toggle"><input type="checkbox" defaultChecked /><span /></label>
        </div>
        <div className="settings-row">
          <div><strong>Week starts on</strong><span>Monday</span></div>
          <Icon name="arrow" />
        </div>
      </section>
      <button className="secondary-button" onClick={onWelcome}>Show welcome screen</button>
    </main>
  )
}
