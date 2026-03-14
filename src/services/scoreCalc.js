/**
 * Score calculation as per spec (score.txt)
 * Score_i = round( 100 × S × (0.6 + 0.4 × D) )
 */
const TMAX = 30
const TMIN = 2

export function calcScore({ a, b, Tanswer }) {
  const t = Math.max(TMIN, Math.min(TMAX, Tanswer))
  const S = (Math.log(TMAX) - Math.log(t)) / (Math.log(TMAX) - Math.log(TMIN))
  const D = Math.log(a * b + 1) / Math.log(82)
  return Math.round(100 * S * (0.6 + 0.4 * D))
}
