// src/components/debug/ColorTest.tsx

export default function ColorTest() {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-8 bg-bg text-fg">
        <div className="bg-primary text-surface p-4 rounded">primary</div>
        <div className="bg-primary-hover text-surface p-4 rounded">primary-hover</div>
        <div className="bg-primary-active text-surface p-4 rounded">primary-active</div>
        <div className="bg-primary-subtle text-primary p-4 rounded">primary-subtle</div>
  
        <div className="bg-success text-surface p-4 rounded">success</div>
        <div className="bg-warning text-surface p-4 rounded">warning</div>
        <div className="bg-danger text-surface p-4 rounded">danger</div>
  
        <div className="bg-surface text-muted p-4 rounded border border-border">
          surface + border + muted
        </div>
        <div className="bg-highlight text-fg p-4 rounded">highlight</div>
        <div className="bg-zinc-200 text-fg p-4 rounded">zinc-200</div>
      </div>
    )
  }
  
