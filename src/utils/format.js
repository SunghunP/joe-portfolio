// $26,529
export const money = (n) => `$${Math.round(n).toLocaleString()}`

// $26.5K
export const thousands = (n) => `$${(n / 1000).toFixed(1)}K`

// 9 → 9a, 12 → 12p, 15 → 3p
export const hourLabel = (h) => (h === 12 ? '12p' : h > 12 ? `${h - 12}p` : `${h}a`)
