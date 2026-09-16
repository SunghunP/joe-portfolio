export default function Shell({ children, className = '' }) {
  return (
    <div className={`mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-11 ${className}`}>
      {children}
    </div>
  )
}