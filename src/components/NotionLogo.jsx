/**
 * Logo oficial de Notion como SVG inline.
 * @param {number} size - tamaño en px (default 28)
 * @param {string} color - color de fill (default 'currentColor')
 */
export default function NotionLogo({ size = 28, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Notion"
    >
      <path
        d="M10 17H9V9.5L14.2182 17.3273C14.687 18.0305 15.5474 18.3632 16.3674 18.1582L16.6213 18.0947C16.8439 18.039 17 17.839 17 17.6096V7C17 7 18 7 18 6H15C14 6 14 7 14 7H15V13L10.1496 6.20938C10.0557 6.07798 9.90425 6 9.74277 6H7C6 6 6 7 6 7H7V17C7 17 6 17 6 18H9C10 18 10 17 10 17Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z"
        fill={color}
      />
    </svg>
  )
}
