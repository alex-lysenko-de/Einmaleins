/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['"Fredoka One"', 'cursive'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        bg:      '#0d1117',
        surface: '#161b22',
        surface2:'#21262d',
        accent:  '#ff6b35',
        accent2: '#ffd166',
        green:   '#06d6a0',
        red:     '#ef476f',
        purple:  '#7c3aed',
        muted:   '#7d8590',
      },
      keyframes: {
        floatUD: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        bounceIn: {
          '0%':   { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '70%':  { transform: 'scale(1.15) rotate(5deg)' },
          '100%': { transform: 'scale(1) rotate(0)', opacity: '1' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0) rotate(0)' },
          '20%':     { transform: 'translateX(-8px) rotate(-5deg)' },
          '40%':     { transform: 'translateX(8px) rotate(5deg)' },
          '60%':     { transform: 'translateX(-5px) rotate(-3deg)' },
          '80%':     { transform: 'translateX(5px) rotate(3deg)' },
        },
        correctPulse: {
          '0%':   { transform: 'scale(1)' },
          '40%':  { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
        wrongShake: {
          '0%,100%': { transform: 'translateX(0)' },
          '25%':     { transform: 'translateX(-6px)' },
          '75%':     { transform: 'translateX(6px)' },
        },
        confettiFall: {
          '0%':   { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        flyArc: {
          '0%':   { opacity: '1', transform: 'translate(0,0) scale(1) rotate(0deg)' },
          '80%':  { opacity: '1', transform: 'translate(calc(var(--dx)*0.85),calc(var(--dy)*0.85)) scale(1.1) rotate(var(--rot,200deg))' },
          '100%': { opacity: '0', transform: 'translate(var(--dx),var(--dy)) scale(1.3) rotate(var(--rot,360deg))' },
        },
        splatFly: {
          '0%':   { opacity: '1', transform: 'translate(0,0) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(var(--fx),var(--fy)) scale(0.2)' },
        },
        examApplePop: {
          'from': { transform: 'scale(0)', opacity: '0' },
          'to':   { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'float-ud':      'floatUD 3s ease-in-out infinite',
        'float-ud-rev':  'floatUD 3s ease-in-out infinite reverse',
        'bounce-in':     'bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        'shake':         'shake 0.4s ease-out',
        'correct-pulse': 'correctPulse 0.45s ease-out',
        'wrong-shake':   'wrongShake 0.45s ease-out',
        'confetti-fall': 'confettiFall linear forwards',
        'fly-arc':       'flyArc var(--dur,0.5s) cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        'splat-fly':     'splatFly var(--sd,0.45s) ease-out forwards',
        'exam-apple-pop':'examApplePop 0.2s ease both',
      },
    },
  },
  plugins: [],
}
