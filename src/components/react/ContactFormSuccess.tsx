import clsx from "clsx";

interface ContactFormSuccessProps {
  onReset: () => void;
  translations: {
    contact: {
      thankYou: string;
      successMessage: string;
      sendAnother: string;
    };
  };
}

export default function ContactFormSuccess({ onReset, translations }: ContactFormSuccessProps) {
  return (
    <div className="min-h-[calc(100vh-260px)] relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/light_rays.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/85 to-black/60" />
     
      {/* Corner light effects */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.02)_0%,_transparent_20%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.03)_0%,_transparent_20%)]" />
 
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className={clsx("w-full max-w-md p-8", "text-center text-white", "animate-fade-in")}>
          <h2 className="text-3xl font-bold mb-4">{translations.contact.thankYou}</h2>
          <p className="mb-6">{translations.contact.successMessage}</p>
          <button
            onClick={onReset}
            className={clsx(
              "py-2 px-4 bg-white text-black rounded",
              "hover:bg-gray-200 transition-colors",
            )}
          >
            {translations.contact.sendAnother}
          </button>
        </div>
      </div>
    </div>
  );
}