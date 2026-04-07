'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.469 2.028 7.768L0 32l8.469-2.004A15.942 15.942 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 01-6.771-1.849l-.485-.288-5.028 1.189 1.216-4.894-.317-.502A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.874c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.631-.199-.897.199-.265.398-1.029 1.294-1.261 1.56-.232.265-.465.298-.863.1-.398-.2-1.681-.619-3.202-1.977-1.183-1.056-1.981-2.36-2.213-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.199-.232.265-.398.398-.664.133-.265.066-.497-.033-.697-.1-.199-.897-2.163-1.229-2.96-.324-.778-.653-.672-.897-.685l-.764-.013c-.265 0-.697.1-1.062.497-.365.398-1.394 1.362-1.394 3.322s1.427 3.854 1.626 4.12c.199.265 2.808 4.287 6.803 6.014.951.41 1.693.655 2.271.839.954.304 1.823.261 2.51.158.765-.114 2.354-.962 2.686-1.891.332-.93.332-1.727.232-1.891-.099-.166-.365-.265-.763-.464z" />
    </svg>
  );
}

const WHATSAPP_NUMBER = '8801751704061';
const BUSINESS_NAME = 'PrintCraft';
const REPLY_TIME = 'Typically replies within minutes';
const INITIAL_MESSAGE = 'Have a question? please whatsapp us';

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [inputMsg, setInputMsg] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      inputMsg.trim()
        ? inputMsg.trim()
        : `Hi ${BUSINESS_NAME}! I'd like to know more about your products.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  if (!visible) return null;

  return (
    <>
      {/* ── Popup chat window (always mounted for enter/exit animation) ── */}
      <div
        className={`fixed bottom-24 right-5 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl flex flex-col 
        transition-all duration-300 ease-in-out origin-bottom-right
        ${open
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-6 pointer-events-none'
          }`}
        role="dialog"
        aria-label="WhatsApp chat"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5" style={{ backgroundColor: '#075e54' }}>
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0 ring-2 ring-white/30"
            style={{ backgroundColor: '#25d366' }}
          >
            PC
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight">{BUSINESS_NAME}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
              <p className="text-green-200 text-xs">{REPLY_TIME}</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat body */}
        <div
          className="px-4 py-5"
          style={{
            backgroundColor: '#e5ddd5',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cg opacity='.06' fill='%23000'%3E%3Ccircle cx='40' cy='40' r='28'/%3E%3Ccircle cx='140' cy='70' r='18'/%3E%3Ccircle cx='250' cy='35' r='22'/%3E%3Crect x='10' y='140' width='55' height='38' rx='8'/%3E%3Crect x='180' y='190' width='70' height='45' rx='8'/%3E%3Ccircle cx='60' cy='260' r='20'/%3E%3Ccircle cx='270' cy='240' r='30'/%3E%3C/g%3E%3C/svg%3E")`,
            minHeight: '140px',
          }}
        >
          <div className="flex justify-start">
            <div
              className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm text-sm text-gray-800 leading-relaxed"
              style={{ backgroundColor: '#ffffff' }}
            >
              {INITIAL_MESSAGE}
              <p className="text-right text-[10px] text-gray-400 mt-1">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-100 border-t border-gray-200">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && openWhatsApp()}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-green-400"
            aria-label="Message"
          />
        </div>

        {/* WhatsApp Us button */}
        <button
          onClick={openWhatsApp}
          className="flex items-center justify-center gap-2.5 py-3.5 text-white font-semibold text-sm hover:opacity-90 active:opacity-80 transition-opacity"
          style={{ backgroundColor: '#25d366' }}
        >
          <WhatsAppIcon className="w-5 h-5" />
          WhatsApp Us
        </button>

        {/* Footer */}
        <div className="flex items-center justify-center gap-1.5 py-2 bg-white text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span>Online</span>
          <span>|</span>
          <a href="#" className="hover:text-gray-600 transition-colors">Privacy policy</a>
        </div>
      </div>

      {/* ── Floating bubble (unchanged) ───────────────────────────── */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{ backgroundColor: '#25d366' }}
        aria-label={open ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
        aria-expanded={open}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <WhatsAppIcon className="w-7 h-7 text-white" />
        )}
        {!open && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ backgroundColor: '#25d366' }}
          />
        )}
      </button>
    </>
  );
}