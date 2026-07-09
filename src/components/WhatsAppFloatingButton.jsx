const WHATSAPP_NUMBER = '971501013603';
const WHATSAPP_MESSAGE = encodeURIComponent('Hello Tournwa, I would like to know more.');

export const WhatsAppFloatingButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Tournwa on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-background md:bottom-7 md:right-7"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-7 w-7 flex-shrink-0"
        fill="currentColor"
      >
        <path d="M19.11 17.24c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.17.19-.33.21-.61.07-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.87-2.1-.23-.55-.46-.47-.64-.48h-.54c-.19 0-.49.07-.75.35-.26.28-.99.97-.99 2.36 0 1.39 1.01 2.74 1.15 2.93.14.19 1.99 3.04 4.82 4.26.67.29 1.2.46 1.61.59.68.22 1.29.19 1.78.12.54-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33Z" />
        <path d="M16.01 3C8.83 3 3 8.72 3 15.76c0 2.4.68 4.64 1.86 6.56L3.65 29l6.87-1.78A13.18 13.18 0 0 0 16.01 28C23.18 28 29 22.28 29 15.24 29 8.2 23.18 3 16.01 3Zm0 22.83c-1.84 0-3.54-.52-4.99-1.41l-.36-.22-4.08 1.06.72-3.98-.24-.39a10.35 10.35 0 0 1-1.6-5.13c0-5.83 4.73-10.58 10.55-10.58 5.82 0 10.55 4.23 10.55 10.06 0 5.83-4.73 10.59-10.55 10.59Z" />
      </svg>
    </a>
  );
};
