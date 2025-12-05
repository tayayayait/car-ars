import React, { useEffect, useState } from 'react';
import { getMyVehicles, getLogs } from '../services/mockStore';
import { Vehicle, CallLog } from '../types';
import { Car, Clock, CheckCircle2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [logs, setLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded User ID for demo
  const DEMO_USER_ID = 'u1';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [v, l] = await Promise.all([
        getMyVehicles(DEMO_USER_ID),
        getLogs()
      ]);
      setVehicles(v);
      setLogs(l);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getStatusInfo = (status: CallLog['callStatus']) => {
    switch(status) {
      case 'connected': return { label: '연결 성공', style: 'text-green-700 bg-green-100 ring-green-600/20' };
      case 'failed': return { label: '연결 실패', style: 'text-red-700 bg-red-100 ring-red-600/20' };
      case 'not_found': return { label: '정보 없음', style: 'text-orange-700 bg-orange-100 ring-orange-600/20' };
      case 'busy': return { label: '통화 중', style: 'text-yellow-700 bg-yellow-100 ring-yellow-600/20' };
      default: return { label: '알 수 없음', style: 'text-slate-700 bg-slate-100 ring-slate-600/20' };
    }
  };

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleString('ko-KR', { 
      month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
  };

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-slate-500 font-medium animate-pulse">데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">내 대시보드</h1>

      {/* Vehicles Section */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-slate-700 mb-5 flex items-center gap-2">
          <Car className="w-5 h-5 text-brand-600" /> 등록된 차량
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles.map(v => (
            <div key={v.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Car className="w-24 h-24 text-brand-900" />
              </div>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">PLATE NUMBER</span>
                  <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-bold tracking-wide">활성화됨</span>
                </div>
                <div className="text-4xl font-mono font-bold text-slate-800 mb-2 tracking-widest">{v.plateNumberLast4}</div>
                <div className="text-lg text-slate-600 font-semibold">{v.modelName}</div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                등록일: {new Date(v.createdAt).toLocaleDateString('ko-KR')}
              </div>
            </div>
          ))}
          {vehicles.length === 0 && (
            <div className="col-span-full py-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 font-medium">등록된 차량이 없습니다.</p>
              <button className="mt-4 text-brand-600 font-bold hover:underline">차량 등록하기 &rarr;</button>
            </div>
          )}
        </div>
      </section>

      {/* Logs Section */}
      <section>
        <h2 className="text-lg font-bold text-slate-700 mb-5 flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-600" /> 최근 안심콜 기록
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {logs.length === 0 ? (
            <div className="p-12 text-center text-slate-500 font-medium">아직 통화 기록이 없습니다.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">시간</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">차량 번호</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">발신자 (암호화)</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">연결 상태</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">알림 발송</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map(log => {
                    const status = getStatusInfo(log.callStatus);
                    return (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">{formatTime(log.timestamp)}</td>
                        <td className="px-6 py-4 font-mono font-bold text-slate-800">{log.vehiclePlate}</td>
                        <td className="px-6 py-4 text-slate-500 font-mono text-xs bg-slate-100 rounded-lg w-fit px-2 py-1 mx-6 inline-block text-center select-all">{log.callerPhoneHash}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${status.style}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {log.smsSent ? (
                            <span className="flex items-center gap-1.5 text-brand-600 text-xs font-bold">
                              <CheckCircle2 className="w-4 h-4" /> 발송됨
                            </span>
                          ) : (
                            <span className="text-slate-300 text-xs font-medium px-2">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};