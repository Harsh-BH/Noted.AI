import React from "react";

export function DecorativeSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      width="600"
      height="600"
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g opacity="0.2">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M300 500C411.046 500 500 411.046 500 300C500 188.954 411.046 100 300 100C188.954 100 100 188.954 100 300C100 411.046 188.954 500 300 500ZM300 400C355.228 400 400 355.228 400 300C400 244.772 355.228 200 300 200C244.772 200 200 244.772 200 300C200 355.228 244.772 400 300 400Z"
          fill="currentColor"
        />
        <path
          d="M350 50C350 77.6142 327.614 100 300 100C272.386 100 250 77.6142 250 50C250 22.3858 272.386 0 300 0C327.614 0 350 22.3858 350 50Z"
          fill="currentColor"
        />
        <path
          d="M450 150C477.614 150 500 127.614 500 100C500 72.3858 477.614 50 450 50C422.386 50 400 72.3858 400 100C400 127.614 422.386 150 450 150Z"
          fill="currentColor"
        />
        <path
          d="M550 300C550 327.614 527.614 350 500 350C472.386 350 450 327.614 450 300C450 272.386 472.386 250 500 250C527.614 250 550 272.386 550 300Z"
          fill="currentColor"
        />
        <path
          d="M350 550C377.614 550 400 527.614 400 500C400 472.386 377.614 450 350 450C322.386 450 300 472.386 300 500C300 527.614 322.386 550 350 550Z"
          fill="currentColor"
        />
        <path
          d="M150 450C177.614 450 200 427.614 200 400C200 372.386 177.614 350 150 350C122.386 350 100 372.386 100 400C100 427.614 122.386 450 150 450Z"
          fill="currentColor"
        />
        <path
          d="M50 300C77.6142 300 100 277.614 100 250C100 222.386 77.6142 200 50 200C22.3858 200 0 222.386 0 250C0 277.614 22.3858 300 50 300Z"
          fill="currentColor"
        />
        <path
          d="M150 150C177.614 150 200 127.614 200 100C200 72.3858 177.614 50 150 50C122.386 50 100 72.3858 100 100C100 127.614 122.386 150 150 150Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g opacity="0.05">
        <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="40" x2="400" y2="40" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="60" x2="400" y2="60" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="80" x2="400" y2="80" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="120" x2="400" y2="120" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="140" x2="400" y2="140" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="160" x2="400" y2="160" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="180" x2="400" y2="180" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="220" x2="400" y2="220" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="240" x2="400" y2="240" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="260" x2="400" y2="260" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="280" x2="400" y2="280" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="300" x2="400" y2="300" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="320" x2="400" y2="320" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="340" x2="400" y2="340" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="360" x2="400" y2="360" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="380" x2="400" y2="380" stroke="currentColor" strokeWidth="0.5" />
        
        <line y1="0" x1="20" y2="400" x2="20" stroke="currentColor" strokeWidth="1" />
        <line y1="0" x1="40" y2="400" x2="40" stroke="currentColor" strokeWidth="0.5" />
        <line y1="0" x1="60" y2="400" x2="60" stroke="currentColor" strokeWidth="0.5" />
        <line y1="0" x1="80" y2="400" x2="80" stroke="currentColor" strokeWidth="0.5" />
        <line y1="0" x1="100" y2="400" x2="100" stroke="currentColor" strokeWidth="1" />
        <line y1="0" x1="120" y2="400" x2="120" stroke="currentColor" strokeWidth="0.5" />
        <line y1="0" x1="140" y2="400" x2="140" stroke="currentColor" strokeWidth="0.5" />
        <line y1="0" x1="160" y2="400" x2="160" stroke="currentColor" strokeWidth="0.5" />
        <line y1="0" x1="180" y2="400" x2="180" stroke="currentColor" strokeWidth="1" />
        <line y1="0" x1="200" y2="400" x2="200" stroke="currentColor" strokeWidth="0.5" />
        <line y1="0" x1="220" y2="400" x2="220" stroke="currentColor" strokeWidth="0.5" />
        <line y1="0" x1="240" y2="400" x2="240" stroke="currentColor" strokeWidth="0.5" />
        <line y1="0" x1="260" y2="400" x2="260" stroke="currentColor" strokeWidth="1" />
        <line y1="0" x1="280" y2="400" x2="280" stroke="currentColor" strokeWidth="0.5" />
        <line y1="0" x1="300" y2="400" x2="300" stroke="currentColor" strokeWidth="0.5" />
        <line y1="0" x1="320" y2="400" x2="320" stroke="currentColor" strokeWidth="0.5" />
        <line y1="0" x1="340" y2="400" x2="340" stroke="currentColor" strokeWidth="1" />
        <line y1="0" x1="360" y2="400" x2="360" stroke="currentColor" strokeWidth="0.5" />
        <line y1="0" x1="380" y2="400" x2="380" stroke="currentColor" strokeWidth="0.5" />
      </g>
    </svg>
  );
}
