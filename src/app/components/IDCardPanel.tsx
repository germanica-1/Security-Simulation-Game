import { CreditCard, CheckCircle, XCircle, QrCode } from "lucide-react";

interface IDCardPanelProps {
  card: {
    name: string;
    age: number;
    idNumber: string;
    status: "Valid" | "Expired";
    purpose: string;
    issueDate: string;
    expiryDate: string;
    avatar: string;
  };
}

export function IDCardPanel({ card }: IDCardPanelProps) {

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-cyan-500/20 p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-500/20">
        <CreditCard className="w-6 h-6 text-cyan-400" />
        <div>
          <h2 className="text-xl font-semibold text-white">ID Verification</h2>
          <p className="text-xs text-cyan-400/70">Document Scanner</p>
        </div>
      </div>

      {/* ID Card */}
      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-700 rounded-xl p-6 border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/10 mb-4">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xs text-cyan-400/70 uppercase tracking-widest">Security ID</h3>
            <p className="text-2xl font-bold text-white mt-1">ACCESS CARD</p>
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-600/30 text-cyan-200 border border-cyan-500/20">
            ID STATUS
          </div>
        </div>

        {/* Photo placeholder and info */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="col-span-1">
            <div className="aspect-square rounded-lg overflow-hidden border border-cyan-500/20">
              <img
                src={card.avatar}
                alt={card.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="col-span-2 space-y-3">
            <div>
              <p className="text-xs text-cyan-400/70 uppercase tracking-wider mb-1">Full Name</p>
              <p className="text-lg font-semibold text-white">{card.name}</p>
            </div>
            <div>
              <p className="text-xs text-cyan-400/70 uppercase tracking-wider mb-1">Purpose</p>
              <p className="text-base text-white">{card.purpose}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-cyan-400/70 uppercase tracking-wider mb-1">Age</p>
                <p className="text-base font-semibold text-white">{card.age}</p>
              </div>
              <div>
                <p className="text-xs text-cyan-400/70 uppercase tracking-wider mb-1">ID Number</p>
                <p className="text-base font-mono text-white">{card.idNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-cyan-500/10">
          <div>
            <p className="text-xs text-cyan-400/70 uppercase tracking-wider mb-1">Issued</p>
            <p className="text-sm text-white">{card.issueDate}</p>
          </div>
          <div>
            <p className="text-xs text-cyan-400/70 uppercase tracking-wider mb-1">Expires</p>
            <p className="text-sm text-white">
              {card.expiryDate}
            </p>
          </div>
        </div>

        {/* Barcode and QR */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-12 bg-white/90 rounded flex items-center justify-center px-2">
              <div className="flex gap-[2px]">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[2px] bg-black"
                    style={{ height: `${Math.random() * 30 + 10}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="ml-4">
            <div className="w-20 h-20 bg-white rounded flex items-center justify-center">
              <QrCode className="w-16 h-16 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="flex items-center gap-3 p-4 rounded-lg border border-cyan-500/20 bg-slate-800/50">
        <QrCode className="w-5 h-5 text-cyan-400" />
        <div>
          <p className="text-sm font-semibold text-cyan-300">
            Awaiting Verification
          </p>
          <p className="text-xs text-white/70">
            Analyze the document details carefully
          </p>
        </div>
      </div>
    </div>
  );
}
