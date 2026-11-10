export default function Shell({ children, className = '' }) {
  return (
    <div className={`mx-auto max-w-[max(1240px,60vw)] px-5 sm:px-8 lg:px-11 ${className}`}>
      {children}
    </div>
  )
}