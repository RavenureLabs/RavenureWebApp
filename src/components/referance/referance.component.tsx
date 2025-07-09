import { ReferanceType } from "@/src/models/referance.model";
import { ArrowRight } from "lucide-react";

export default function ReferanceComponent({referance}: {referance: ReferanceType}) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative">
          <img src={referance.imageUrl} alt="Ravenure" className="h-20 w-auto object-contain mb-6 transform hover:scale-110 transition-transform duration-300" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">{referance.name}</h3>
            <p className="text-sm text-gray-400">{referance.url}</p>
          </div>
          <a
            href={referance.url}
            target="_blank"
            className="absolute bottom-4 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:bg-white/10 hover:translate-x-3"
          >
            <ArrowRight size={18} />
          </a>
        </div>
    )
}