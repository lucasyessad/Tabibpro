// ============================================================
// MedGest Pro — Portail Patient — Messagerie avec Darija
// Le patient peut écrire en darija algérien
// L'IA détecte et propose une reformulation en français médical
// ============================================================

'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Bot, RefreshCw, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  contenu: string;
  expediteur: 'patient' | 'medecin' | 'systeme';
  dateEnvoi: Date;
  traductionFr?: string;
  symptomesExtraits?: string[];
  langueDetectee?: string;
  enAttenteSync?: boolean;
}

interface DarijaProposal {
  original: string;
  traductionFr: string;
  symptomesExtraits: string[];
  accepted: boolean | null;
}

export default function MessagriePage() {
  const t = useTranslations('Patient.Messagerie');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [darijaProposal, setDarijaProposal] = useState<DarijaProposal | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const analyzeMessage = async (text: string) => {
    // Détection simple de darija côté client avant d'appeler l'API
    const darijaPatterns = [
      /\b(rani|3andi|wach|kifach|bezzaf|marid|sda3|wja3|shkhana)\b/i,
      /\b(ma9dartch|mabghatsh|tabti|karchi|rasi)\b/i,
    ];
    const isDarija = darijaPatterns.some((p) => p.test(text));

    if (!isDarija || isOffline) return;

    setIsAnalyzing(true);
    try {
      // TODO: Appel API réel
      // Simulation pour demo
      await new Promise((r) => setTimeout(r, 800));
      setDarijaProposal({
        original: text,
        traductionFr: 'J\'ai mal au ventre depuis 2 jours, je n\'arrive pas à dormir.',
        symptomesExtraits: ['Douleurs abdominales', 'Durée: 2 jours', 'Insomnie'],
        accepted: null,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const messageToSend = darijaProposal?.accepted === true
      ? darijaProposal.traductionFr
      : inputText;

    const newMessage: Message = {
      id: Date.now().toString(),
      contenu: messageToSend,
      expediteur: 'patient',
      dateEnvoi: new Date(),
      langueDetectee: darijaProposal ? 'darija_latin' : 'francais',
      enAttenteSync: isOffline,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    setDarijaProposal(null);
  };

  const handleInputChange = (value: string) => {
    setInputText(value);
    if (value.length > 10) {
      analyzeMessage(value);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-3">
        <h1 className="font-semibold">{t('title')}</h1>
        <p className="text-xs text-muted-foreground">{t('subtitle')}</p>
        {isOffline && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-600">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            {t('offline_queue')}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-8">
            <p>{t('empty_state')}</p>
            <p className="mt-2 text-xs">{t('darija_hint')}</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex',
              message.expediteur === 'patient' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-xs rounded-2xl px-4 py-2.5 text-sm',
                message.expediteur === 'patient'
                  ? 'rounded-br-none bg-primary-600 text-white'
                  : 'rounded-bl-none bg-card border border-border text-foreground'
              )}
            >
              <p>{message.contenu}</p>
              <div className="flex items-center gap-1 mt-1 opacity-70 text-xs">
                <span>
                  {new Intl.DateTimeFormat('fr-DZ', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Africa/Algiers',
                  }).format(message.dateEnvoi)}
                </span>
                {message.enAttenteSync && (
                  <span title={t('pending_sync')}>⏳</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Proposition de reformulation darija */}
      {darijaProposal && darijaProposal.accepted === null && (
        <div className="mx-4 mb-2 rounded-xl border border-primary-200 bg-primary-50 p-3">
          <div className="flex items-start gap-2">
            <Bot className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-primary-700 mb-1">
                {t('darija_detected')}
              </p>
              <p className="text-sm text-primary-900 rounded-lg bg-white/70 px-3 py-2">
                {darijaProposal.traductionFr}
              </p>
              {darijaProposal.symptomesExtraits.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {darijaProposal.symptomesExtraits.map((s, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setDarijaProposal((p) => p ? { ...p, accepted: true } : null)}
                  className="flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-1.5 text-xs text-white hover:bg-primary-700 transition-colors"
                >
                  <Check className="h-3 w-3" />
                  {t('accept_translation')}
                </button>
                <button
                  onClick={() => setDarijaProposal((p) => p ? { ...p, accepted: false } : null)}
                  className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                  <X className="h-3 w-3" />
                  {t('keep_original')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zone de saisie */}
      <div className="border-t border-border bg-card p-3">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 pe-10 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring max-h-28 min-h-[44px]"
              placeholder={t('placeholder')}
              rows={1}
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            {isAnalyzing && (
              <RefreshCw className="absolute end-3 bottom-3 h-4 w-4 text-muted-foreground animate-spin" />
            )}
          </div>
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
              inputText.trim()
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
            aria-label={t('send')}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">
          {t('darija_support_hint')}
        </p>
      </div>
    </div>
  );
}
