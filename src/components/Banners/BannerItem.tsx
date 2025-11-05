import type { Satellite, Radio, Layers, Compass, Wifi, Zap, Award, Navigation, LucideIcon } from 'lucide-react';
interface BannerItemProps{
    icon: LucideIcon | React.ComponentType<{ className?: string; strokeWidth?: number }>;
    title: string;
    subtitle: string;
}

const BannerItem: React.FC<BannerItemProps> = ({ icon: Icon, title, subtitle }) => {
  return (
    <div className="shrink-0 mx-6 group cursor-default">
      <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105 group-hover:shadow-xl min-w-[280px]">
        <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
          <Icon className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-lg">{title}</span>
          {subtitle && (
            <span className="text-white/80 text-sm">{subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
};
export default BannerItem