import { useEffect, useRef, useState } from 'react'

function Reveal({
  as: Tag = 'div',
  className = '',
  children,
  delay = 0,
  threshold = 0.18,
  variant = 'up',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [threshold])

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant}${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
