import type { Project } from "@/data/portfolio";

type ProjectArtworkProps = {
  project: Pick<Project, "name" | "theme">;
};

export function ProjectArtwork({ project }: ProjectArtworkProps) {
  if (project.theme === "forma") {
    return (
      <div className="artwork-shell artwork-forma" aria-hidden="true">
        <div className="artwork-window-bar"><i /><i /><i /><span>forma / overview</span></div>
        <div className="forma-layout">
          <div className="artwork-rail"><b>f.</b><span>⌂</span><span>◷</span><span>◫</span></div>
          <div className="forma-content">
            <div className="artwork-eyebrow">SAMPLE DATA · OVERVIEW</div>
            <div className="forma-title">Good morning, team<span>↗</span></div>
            <div className="forma-metrics">
              <div><small>ACTIVE USERS</small><strong>12,408</strong><em>↗ &nbsp; 8.2%</em></div>
              <div><small>CONVERSION</small><strong>4.86%</strong><em>↗ &nbsp; 1.4%</em></div>
            </div>
            <div className="forma-chart-head"><b>Engagement</b><small>Last 7 days　⌄</small></div>
            <svg viewBox="0 0 540 128" className="forma-chart" role="img" aria-label={`${project.name} weekly engagement chart`}>
              <path d="M0 95H540M0 62H540M0 29H540" className="chart-grid" />
              <path d="M4 91C42 89 51 64 90 71s43 21 79 5 42-36 81-30 50 36 88 27 39-37 77-30 49 24 84 2 31-19 37-20" className="chart-line" />
              <path d="M4 91C42 89 51 64 90 71s43 21 79 5 42-36 81-30 50 36 88 27 39-37 77-30 49 24 84 2 31-19 37-20v66H4Z" className="chart-fill" />
            </svg>
            <div className="chart-labels"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div>
          </div>
        </div>
      </div>
    );
  }

  if (project.theme === "fieldnotes") {
    return (
      <div className="artwork-shell artwork-fieldnotes" aria-hidden="true">
        <div className="fieldnotes-top"><strong>fieldnotes<span>.</span></strong><span>ISSUE Nº 08　　ABOUT　　☰</span></div>
        <div className="fieldnotes-cover">
          <div className="fieldnotes-index">A JOURNAL FOR THE CURIOUS　·　SPRING EDITION</div>
          <div className="fieldnotes-title">The shape<br />of a quieter<br /><i>day.</i></div>
          <div className="fieldnotes-bottom"><span>A study in noticing</span><span>12 min read　↗</span></div>
          <svg className="fieldnotes-sun" viewBox="0 0 240 240"><circle cx="120" cy="120" r="86"/><path d="M34 120h172M120 34v172M59 59l122 122M181 59 59 181"/></svg>
        </div>
      </div>
    );
  }

  return (
    <div className="artwork-shell artwork-mono" aria-hidden="true">
      <div className="mono-side"><b>mono</b><span>Foundations</span><span>Components</span><span>Patterns</span><small>VERSION 1.4</small></div>
      <div className="mono-content">
        <div className="mono-heading"><div><small>COMPONENTS / ACTIONS</small><h3>Buttons</h3></div><span>⌕　⌘ K</span></div>
        <p className="mono-description">Clear actions, carefully considered.</p>
        <div className="mono-demo"><small>PRIMARY</small><button tabIndex={-1}>Continue <b>→</b></button><button className="mono-secondary" tabIndex={-1}>Learn more</button></div>
        <div className="mono-demo mono-demo-row"><small>COLOUR TOKENS</small><div className="mono-swatches"><i /><i /><i /><i /><i /></div></div>
      </div>
    </div>
  );
}
