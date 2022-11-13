export const none = `  
@keyframes none {
  }`;

export const slideInFromTop = `  
@keyframes slideInFromTop {
    0% {
      transform: translateY(-100%);
    }
    50%{
      transform: translateY(8%);
    }
    65%{
      transform: translateY(-4%);
    }
    80%{
      transform: translateY(4%);
    }
    95%{
      transform: translateY(-2%);
    }			
    100% {
      transform: translateY(0%);
    }		
  }`;

export const zoomInFromBottom = `
@keyframes zoomInFromBottom {
  0% {
    transform: scale(0.5, 0.5) translateY(100%);
  }
  100% {
    transform: scale(1, 1) translateY(0%);
  }
}
`;

export const leftToRight = `
@keyframes leftToRight {
  0% {
    transform: translateX(-100%);
  }
		
  100% {
    transform: translateX(0%);
  }		
}
`;

export const rightToLeft = `
@keyframes rightToLeft {
  0% {
    transform: translateX(100%);
  }
		
  100% {
    transform: translateX(0%);
  }		
}
`;
