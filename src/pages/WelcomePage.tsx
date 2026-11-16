import { Icon } from '../components/Icon'
import banner from "../assets/banner.png"
type WelcomePageProps = {
  onStart: () => void
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <main className="welcome-screen">
      <div className="welcome-art" aria-hidden="true">
        <img src={banner} alt={banner} className='h-[100%] w-[100%]' />
        {/* <div className="art-ring ring-one" />
        <div className="art-ring ring-two" />
        <div className="art-check"><Icon name="check" size={54} /></div>
        <div className="art-sparkle sparkle-one">✳</div>
        <div className="art-sparkle sparkle-two">✳</div> */}
      </div>
      <div className="welcome-copy">
        <span className="brand-mark"><Icon name="check" size={15} /></span>
        <p className="eyebrow">A LITTLE MORE CLARITY</p>
        <h1>Manage what<br />you want to do.</h1>
        <p className="welcome-description">The best way to manage what you have to do, and never forget your plans.</p>
        <button className="primary-button welcome-button" onClick={onStart}>Get started <span>→</span></button>
        <span className="welcome-footnote">Make room for what matters.</span>
      </div>
    </main>
  )
}
