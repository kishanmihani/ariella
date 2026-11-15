import type { Screen } from '../types/task'
import { Icon } from './Icon'

type AppNavigationProps = {
  screen: Screen
  pendingCount: number
  onNavigate: (screen: Screen) => void
  onCreate: () => void
}

export function AppNavigation({ screen, pendingCount, onNavigate, onCreate }: AppNavigationProps) {
  return (
    <>
      <aside className="sidebar">
        <button className="brand" onClick={() => onNavigate('home')}>
          <span className="brand-mark"><Icon name="check" size={15} /></span> daybook
        </button>
        <span className="nav-label">MENU</span>
        <nav className="side-nav">
          <button className={screen === 'home' ? 'selected' : ''} onClick={() => onNavigate('home')}><Icon name="home" /> Overview</button>
          <button className={screen === 'tasks' ? 'selected' : ''} onClick={() => onNavigate('tasks')}><Icon name="list" /> My tasks <span className="nav-count">{pendingCount}</span></button>
        </nav>
        <span className="nav-label tools-label">YOUR SPACE</span>
        <nav className="side-nav">
          <button className={screen === 'notifications' ? 'selected' : ''} onClick={() => onNavigate('notifications')}><Icon name="bell" /> Notifications</button>
          <button className={screen === 'settings' ? 'selected' : ''} onClick={() => onNavigate('settings')}><Icon name="settings" /> Settings</button>
        </nav>
        <div className="sidebar-note">
          <span><Icon name="sparkle" size={18} /></span>
          <strong>Small steps,<br />big progress.</strong>
          <p>You’re doing better than you think.</p>
        </div>
        <button className="profile-button" onClick={() => onNavigate('settings')}>
          <span className="avatar">A</span>
          <span><strong>Alex Morgan</strong><small>Personal space</small></span>
          <span className="profile-dots">···</span>
        </button>
      </aside>
      <nav className="mobile-nav" aria-label="Main navigation">
        <button className={screen === 'home' ? 'selected' : ''} onClick={() => onNavigate('home')}><Icon name="home" /><span>Home</span></button>
        <button className={screen === 'tasks' ? 'selected' : ''} onClick={() => onNavigate('tasks')}><Icon name="list" /><span>Tasks</span></button>
        <button className="mobile-add" aria-label="Create task" onClick={onCreate}><Icon name="plus" size={24} /></button>
        <button className={screen === 'notifications' ? 'selected' : ''} onClick={() => onNavigate('notifications')}><Icon name="bell" /><span>Updates</span></button>
        <button className={screen === 'settings' ? 'selected' : ''} onClick={() => onNavigate('settings')}><Icon name="settings" /><span>Settings</span></button>
      </nav>
    </>
  )
}
