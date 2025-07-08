import { ReferanceType } from "@/src/models/referance.model";

export default function ReferanceComponent({referance}: {referance: ReferanceType}) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition">
          <img src={referance.imageUrl} alt="Mythonia" className="w-16 h-16 object-contain mb-4" />
          <h3 className="text-xl font-semibold text-white">{referance.name}</h3>
        </div>
    )
}