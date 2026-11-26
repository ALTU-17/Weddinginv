/** Small helpers for the shared SVG sprite in /public/img/sprite.svg */
export const Sprite = ({ id, className, viewBox, style }: { id: string; className?: string; viewBox: string; style?: React.CSSProperties }) => (
  <svg className={className} viewBox={viewBox} style={style} aria-hidden="true">
    <use href={`/img/sprite.svg#${id}`} />
  </svg>
);
export const Divider = ({ className = "" }: { className?: string }) => <Sprite id="divider" className={`divider ${className}`} viewBox="0 0 300 30" />;
export const Corners = ({ cls = "" }: { cls?: string }) => (
  <>
    <Sprite id="corner" viewBox="0 0 60 60" className={`corner tl ${cls}`} />
    <Sprite id="corner" viewBox="0 0 60 60" className={`corner tr ${cls}`} style={{ transform: "scaleX(-1)" }} />
    <Sprite id="corner" viewBox="0 0 60 60" className={`corner bl ${cls}`} style={{ transform: "scaleY(-1)" }} />
    <Sprite id="corner" viewBox="0 0 60 60" className={`corner br ${cls}`} style={{ transform: "scale(-1)" }} />
  </>
);
