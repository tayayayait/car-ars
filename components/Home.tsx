import React, { useState } from 'react';
import { Lock, PhoneIncoming, MessageSquare, CheckCircle, ChevronRight, ShieldCheck } from 'lucide-react';
import { registerVehicle } from '../services/mockStore';

interface HomeProps {
  onRegisterSuccess: () => void;
}

export const Home: React.FC<HomeProps> = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    plate4: '',
    phone: '',
    model: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'intro' | 'form' | 'success'>('intro');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerVehicle(formData.phone, formData.plate4, formData.model);
      setStep('success');
    } catch (error) {
      console.error(error);
      alert('등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'plate4') {
      if (value.length > 4 || (!/^\d*$/.test(value))) return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto mt-20 px-4 text-center animate-fade-in">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-3">등록 완료!</h2>
        <p className="text-slate-600 mb-10 text-lg leading-relaxed">
          <strong>{formData.model} ({formData.plate4})</strong> 차량이 안전하게 등록되었습니다.<br/>
          이제 개인번호 노출 걱정 없이 주차하세요.
        </p>
        <button 
          onClick={onRegisterSuccess}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg py-4 px-6 rounded-xl transition-all shadow-xl shadow-brand-200 hover:-translate-y-1"
        >
          대시보드로 이동
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-slate-50 via-white to-brand-50 pt-20 pb-24 px-4 text-center overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-200/20 rounded-full blur-3xl -z-10" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wide mb-6 shadow-sm animate-slide-up" style={{animationDelay: '0.1s'}}>
          <ShieldCheck className="w-3 h-3" /> Privacy First Parking
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight animate-slide-up" style={{animationDelay: '0.2s'}}>
          이중주차, <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-500">개인정보 걱정 없이.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 animate-slide-up" style={{animationDelay: '0.3s'}}>
          SafeCall은 차량 번호 4자리만으로 차주와 연결해주는 안심 주차 서비스입니다.
          <br className="hidden md:inline" /> 더 이상 소중한 개인 전화번호를 차에 남겨두지 마세요.
        </p>
        
        {step === 'intro' && (
          <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
            <button 
              onClick={() => setStep('form')}
              className="group bg-brand-600 hover:bg-brand-700 text-white text-xl font-bold py-4 px-10 rounded-2xl shadow-xl shadow-brand-300 transition-all hover:-translate-y-1 flex items-center gap-2 mx-auto"
            >
              무료 안심 번호 만들기
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-4 text-sm text-slate-500">1분이면 등록 완료 • 평생 무료</p>
          </div>
        )}
      </div>

      {/* Registration Form */}
      {step === 'form' && (
        <div className="w-full max-w-lg px-4 -mt-16 mb-20 relative z-10 animate-fade-in">
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">차량 등록하기</h3>
            <p className="text-slate-500 mb-8">차량 번호와 연락처를 입력하여 안심번호를 생성하세요.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">차량 번호 (뒤 4자리)</label>
                <div className="relative">
                  <input
                    type="text"
                    name="plate4"
                    value={formData.plate4}
                    onChange={handleInputChange}
                    placeholder="1234"
                    required
                    className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-center text-3xl font-bold tracking-[0.5em] text-slate-800 placeholder:tracking-normal placeholder:text-slate-300"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-xs text-slate-400 font-medium">
                    NUMBER
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">휴대폰 번호</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="010-0000-0000"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium"
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> 번호는 절대 노출되지 않습니다.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">차종</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="예: 현대 소나타"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white font-bold text-lg py-4 px-6 rounded-xl transition-colors flex justify-center items-center shadow-lg shadow-brand-200"
              >
                {loading ? (
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  '안심 번호 등록하기'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Value Props */}
      {step === 'intro' && (
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 pb-20">
          <FeatureCard 
            icon={<Lock className="w-7 h-7" />}
            color="blue"
            title="완벽한 프라이버시"
            desc="개인 번호 대신 안심번호로 연결됩니다. ARS 시스템이 안전하게 중계합니다."
          />
          <FeatureCard 
            icon={<PhoneIncoming className="w-7 h-7" />}
            color="indigo"
            title="즉각적인 연결"
            desc="전화를 거는 사람은 차량 번호 4자리만 누르면 즉시 차주와 연결됩니다."
          />
          <FeatureCard 
            icon={<MessageSquare className="w-7 h-7" />}
            color="emerald"
            title="바이럴 안전 확산"
            desc="통화 후에는 상대방에게도 안심 주차 서비스를 추천하여 안전을 확산시킵니다."
          />
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, color, title, desc }: { icon: React.ReactNode, color: string, title: string, desc: string }) => {
  const colorStyles: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
  };

  return (
    <div className="p-8 bg-white rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
      <div className={`w-14 h-14 ${colorStyles[color]} rounded-2xl flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm md:text-base">{desc}</p>
    </div>
  );
};