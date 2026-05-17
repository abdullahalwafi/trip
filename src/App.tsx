/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TreePine, 
  MessagesSquare, 
  Sun, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Train, 
  Coffee, 
  Palmtree, 
  Flame, 
  Wallet,
  Download,
  X,
  Calendar,
  CircleDollarSign
} from "lucide-react";

const APP_NAME = "Kabur Sebentar";

interface ItineraryItem {
  time: string;
  activity: string;
}

interface BudgetDetail {
  label: string;
  amount: string;
}

interface DestinationData {
  id: string;
  name: string;
  category: string;
  image: string;
  priceEstimate: string;
  itinerary: {
    day1: ItineraryItem[];
    day2: ItineraryItem[];
  };
  budget: BudgetDetail[];
  total: string;
  secureFund: string;
}

const CILETUH_DATA: DestinationData = {
  id: "ciletuh",
  name: "Ciletuh",
  category: "Adventure",
  image: "https://images.unsplash.com/photo-1623947477521-482f3775ae70?auto=format&fit=crop&q=80&w=2000",
  priceEstimate: "505k",
  itinerary: {
    day1: [
      { time: "10.00", activity: "Stasiun Sukabumi" },
      { time: "10.30", activity: "Berangkat menuju Ciletuh" },
      { time: "14.00", activity: "Check-in Balekambang Cottage" },
      { time: "14.30", activity: "Curug Sodong & Cikanteh" },
      { time: "16.30", activity: "Sunset Bukit Soca" },
      { time: "18.00", activity: "Makan malam & Istirahat" }
    ],
    day2: [
      { time: "06.00", activity: "Sunrise Pantai Balekambang" },
      { time: "07.30", activity: "Sarapan & Check-out" },
      { time: "10.00", activity: "Pantai Karang Gantungan" },
      { time: "11.30", activity: "Pesisir Pelabuhanratu" },
      { time: "14.30", activity: "Seafood Pelabuhanratu" },
      { time: "18.30", activity: "Standby Stasiun Sukabumi" }
    ]
  },
  budget: [
    { label: "Transportasi (Bensin/Parkir/Sharing)", amount: "Rp170.000" },
    { label: "Penginapan (Sharing Cost)", amount: "Rp125.000" },
    { label: "Tiket Wisata & Retribusi", amount: "Rp35.000" },
    { label: "Konsumsi & Seafood", amount: "Rp175.000" }
  ],
  total: "±Rp505.000",
  secureFund: "Rp800k – Rp1jt"
};

const MERAK_DATA: DestinationData = {
  id: "merak",
  name: "Merak",
  category: "Slow Living",
  image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=2000",
  priceEstimate: "310k",
  itinerary: {
    day1: [
      { time: "05.00", activity: "Berangkat dari Pocin (KRL)" },
      { time: "06.00", activity: "KA Lokal menuju Merak" },
      { time: "10.00", activity: "Menyebrang perahu ke pulau" },
      { time: "11.00", activity: "Check-in / Setup Camping" },
      { time: "13.00", activity: "Snorkeling & Main Air" },
      { time: "19.00", activity: "Dinner & Barbeque" }
    ],
    day2: [
      { time: "06.00", activity: "Sunrise & Beach Walk" },
      { time: "07.00", activity: "Sarapan & Coffee" },
      { time: "10.00", activity: "Kembali ke Merak" },
      { time: "13.00", activity: "KA Lokal + KRL Pulang" },
      { time: "17.00", activity: "Tiba di Depok/Jakarta" },
      { time: "Free", activity: "Istirahat Total" }
    ]
  },
  budget: [
    { label: "Transport Rel & Angkot (PP)", amount: "±Rp40.000" },
    { label: "Penyeberangan & Retribusi Pulau", amount: "±Rp50.000" },
    { label: "Aktivitas & Sewa Alat", amount: "±Rp75.000" },
    { label: "Logistik, Kuliner & BBQ", amount: "±Rp145.000" }
  ],
  total: "±Rp310.000",
  secureFund: "Rp500k – Rp650k"
};

const BANDUNG_DATA: DestinationData = {
  id: "bandung",
  name: "Bandung",
  category: "City Escape",
  image: "https://images.unsplash.com/photo-1625934149635-c081224f2f45?auto=format&fit=crop&q=80&w=2000",
  priceEstimate: "650k",
  itinerary: {
    day1: [
      { time: "05.00", activity: "KA Pangrango (Bogor-SMI)" },
      { time: "08.30", activity: "KA Siliwangi (SMI-Cipatat)" },
      { time: "11.30", activity: "Lanjut Padalarang & Bandung" },
      { time: "14.30", activity: "Check-in Hotel Area Braga" },
      { time: "15.00", activity: "Explore Braga & Asia Afrika" },
      { time: "19.00", activity: "Kuliner Malam (Cuanki/Sate)" }
    ],
    day2: [
      { time: "07.00", activity: "Sarapan Kupat Tahu Gempol" },
      { time: "10.00", activity: "Berburu Oleh-oleh (Pasar Cihapit)" },
      { time: "13.30", activity: "Commuter Line ke Padalarang" },
      { time: "16.00", activity: "KA Siliwangi (Cipatat-SMI)" },
      { time: "19.30", activity: "KA Pangrango ke Bogor" },
      { time: "21.30", activity: "Tiba di Bogor Paledang" }
    ]
  },
  budget: [
    { label: "Transportasi Estafet Kereta (PP)", amount: "±Rp170.000" },
    { label: "Penginapan (Hotel/Hostel)", amount: "±Rp200.000" },
    { label: "Kuliner & Local Food", amount: "±Rp230.000" },
    { label: "Transport Lokal & Ojol", amount: "±Rp50.000" }
  ],
  total: "±Rp650.000",
  secureFund: "Rp750k – Rp900k"
};

const DESTINATIONS: Record<string, DestinationData> = {
  ciletuh: CILETUH_DATA,
  merak: MERAK_DATA,
  bandung: BANDUNG_DATA
};

const DestinationModal = ({ data, onClose }: { data: DestinationData, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
  >
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
    
    <motion.div 
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-card rounded-[2.5rem] shadow-2xl"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-4 relative h-64 lg:h-auto">
          <img src={data.image} alt={data.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 lg:from-transparent to-transparent lg:to-black/40" />
          <div className="absolute bottom-8 left-8 lg:top-12 lg:left-12 space-y-2">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{data.category}</span>
            <h2 className="font-serif text-4xl lg:text-5xl">{data.name}</h2>
          </div>
        </div>

        <div className="lg:col-span-8 p-8 lg:p-14 space-y-12">
          <section className="space-y-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Calendar className="w-5 h-5 text-on-surface-variant" />
              <h3 className="font-serif text-2xl">Rencana Perjalanan</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-xs">01</span>
                  Hari 1 (Sabtu)
                </h4>
                <div className="space-y-5 border-l border-white/10 ml-4 pl-6">
                  {data.itinerary.day1.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-white/30 group-hover:bg-white transition-colors" />
                      <span className="text-[10px] font-mono text-outline block mb-1">{item.time}</span>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{item.activity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-xs">02</span>
                  Hari 2 (Minggu)
                </h4>
                <div className="space-y-5 border-l border-white/10 ml-4 pl-6">
                  {data.itinerary.day2.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-white/30 group-hover:bg-white transition-colors" />
                      <span className="text-[10px] font-mono text-outline block mb-1">{item.time}</span>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{item.activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8 bg-white/[0.02] p-8 lg:p-10 rounded-[2rem] border border-white/5">
            <div className="flex items-center gap-3">
              <CircleDollarSign className="w-5 h-5 text-on-surface-variant" />
              <h3 className="font-serif text-sm font-bold text-outline uppercase tracking-[0.2em]">Estimasi Biaya</h3>
            </div>

            <div className="space-y-4">
              {data.budget.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                  <span className="text-sm text-on-surface-variant">{item.label}</span>
                  <span className="font-mono text-sm font-medium">{item.amount}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Total Estimasi</span>
                <p className="text-3xl font-serif">{data.total}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl space-y-1 border border-white/10 text-center md:text-right">
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Dana Aman (Safe Fund)</span>
                <p className="text-lg font-bold text-white">{data.secureFund}</p>
                <p className="text-[10px] text-outline-variant italic">Untuk kebutuhan mendesak & jaga-jaga</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Navbar = () => (
// ...
  <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto z-50 rounded-full glass-card px-8 py-4 shadow-2xl">
    <div className="flex justify-between items-center gap-12">
      <div className="font-serif text-xl font-bold tracking-tight">{APP_NAME}</div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-on-surface-variant">
        <a href="#why" className="hover:text-white transition-colors">The Why</a>
        <a href="#destinations" className="hover:text-white transition-colors">Destinations</a>
        <a href="#itinerary" className="hover:text-white transition-colors">Itinerary</a>
        <a href="#budget" className="hover:text-white transition-colors">Budget</a>
      </div>
      <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform cursor-pointer">
        Plan Your Escape
      </button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070" 
        alt="Mountain road" 
        className="w-full h-full object-cover scale-110 brightness-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-surface"></div>
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-10 text-center max-w-4xl px-6 space-y-8"
    >
      <h1 className="font-serif text-5xl md:text-8xl leading-tight tracking-tight text-glow">
        Kadang kita cuma butuh pergi sebentar.
      </h1>
      <p className="font-sans text-lg md:text-xl text-on-surface-variant italic opacity-90 max-w-2xl mx-auto">
        “Bukan untuk lari, tapi untuk mengingat rasanya hidup dengan tenang.”
      </p>
      
      <div className="pt-12 flex flex-col md:flex-row items-center justify-center gap-6">
        <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform cursor-pointer">
          Lihat Rencana Perjalanan
        </button>
        <button className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all cursor-pointer">
          Kenapa Harus Pergi?
        </button>
      </div>
    </motion.div>
  </section>
);

const WhySection = () => (
  <section id="why" className="py-24 max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-12">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-outline">The Philosophy</span>
          <h2 className="font-serif text-4xl md:text-5xl">Diam sebentar di antara bisingnya dunia.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: <TreePine />, title: "Escape Rutinitas", desc: "Melepas penat dari tumpukan email dan deadline yang seolah tak berujung." },
            { icon: <MessagesSquare />, title: "Quality Time", desc: "Ngobrol tanpa buru-buru, benar-benar hadir untuk orang yang berarti." },
            { icon: <Sun />, title: "Momen Tenang", desc: "Menikmati transisi langit dari jingga sunset hingga gelap bertabur bintang." },
            { icon: <Sparkles />, title: "Memori Berkesan", desc: "Membangun cerita baru yang kelak akan kita ingat dengan senyum hangat." }
          ].map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="space-y-3 group"
            >
              <div className="w-10 h-10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="relative rounded-3xl overflow-hidden aspect-[4/5] glass-card shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070" 
          alt="Peaceful view" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
          <p className="font-serif text-2xl md:text-3xl italic leading-relaxed">
            “Bukan soal jauh atau mewahnya perjalanan. Kadang yang dicari cuma rasa tenang.”
          </p>
        </div>
      </div>
    </div>
  </section>
);

const DestinationCard = ({ id, image, category, name, price, onClick }: { id: string, image: string, category: string, name: string, price: string, onClick: (id: string) => void }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    onClick={() => onClick(id)}
    className="group relative glass-card rounded-[2rem] overflow-hidden h-[500px] cursor-pointer"
  >
    <img 
      src={image} 
      alt={name} 
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-8 w-full space-y-4">
      <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block">
        {category}
      </span>
      <h3 className="font-serif text-3xl">{name}</h3>
      <div className="flex justify-between items-center border-t border-white/10 pt-4">
        <span className="text-sm text-on-surface-variant">Estimasi ±{price}</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
      </div>
    </div>
  </motion.div>
);

const Destinations = ({ onSelect }: { onSelect: (id: string) => void }) => (
  <section id="destinations" className="py-24 bg-surface-container-lowest">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 space-y-4">
        <h2 className="font-serif text-4xl md:text-5xl">Destinasi Kabur</h2>
        <p className="text-on-surface-variant">Pilih pelarian yang paling cocok dengan jiwamu saat ini.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <DestinationCard 
          id="ciletuh"
          image="https://travelspromo.com/wp-content/uploads/2019/05/Kawasan-Wisata-Geopark-Cileteh-hartono-hartono.jpg"
          category="Adventure"
          name="Ciletuh"
          price="505k"
          onClick={onSelect}
        />
        <DestinationCard 
          id="merak"
          image="https://i.ytimg.com/vi/FeobcW1M1GE/maxresdefault.jpg"
          category="Slow Living"
          name="Merak"
          price="310k"
          onClick={onSelect}
        />
        <DestinationCard 
          id="bandung"
          image="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkSg3lY3cNZdwCshUngZfGK9r49pGYHbYuY8UKnYRVaIh3Y3HE4jfOG_V8zKr0AYs-xYmh2eDdMWSIKXbjG9peUqMmO_k04ozEMHeMC7IpLjYQFK80fT7F7edeE4TpMQULMxpIuI3aqp-P/s3195/quote+pidi+baiq+tentang+bandung.jpg"
          category="City Escape"
          name="Bandung"
          price="650k"
          onClick={onSelect}
        />
      </div>
    </div>
  </section>
);

const RoadmapItem = ({ icon, time, title, desc }: { icon: ReactNode, time: string, title: string, desc: string }) => (
  <div className="flex flex-col md:flex-row items-center gap-8 mb-24 last:mb-0 relative">
    <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center shrink-0 z-10 border border-white/20">
      {icon}
    </div>
    <div className="glass-card p-10 rounded-[2rem] flex-grow group hover:bg-white/[0.05] transition-colors shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-xl">{title}</h4>
        <span className="text-sm font-mono text-on-surface-variant">{time}</span>
      </div>
      <p className="text-on-surface-variant leading-relaxed">{desc}</p>
    </div>
  </div>
);

const Roadmap = () => (
  <section id="itinerary" className="py-24 relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-6 relative">
      {/* Timeline Line */}
      <div className="hidden md:block absolute left-12 top-48 bottom-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2"></div>
      
      <div className="text-center mb-24">
        <h2 className="font-serif text-4xl md:text-5xl mb-4">The Roadmap</h2>
        <p className="text-on-surface-variant italic">Sebuah rangkaian momen yang telah kami susun untukmu.</p>
      </div>
      
      <div className="space-y-4">
        <RoadmapItem 
          icon={<Train className="text-white w-5 h-5"/>}
          time="06:00 - 09:00"
          title="The Arrival"
          desc="Perjalanan dimulai. Entah itu dengan kereta yang melaju membelah sawah atau motor yang menantang angin pagi. Nikmati prosesnya."
        />
        <RoadmapItem 
          icon={<Coffee className="text-white w-5 h-5"/>}
          time="09:30 - 11:00"
          title="Morning Fuel"
          desc="Singgah sejenak untuk kopi hangat dan sarapan lokal. Biarkan aroma kopi membangunkan indramu secara perlahan."
        />
        <RoadmapItem 
          icon={<Palmtree className="text-white w-5 h-5"/>}
          time="13:00 - 16:00"
          title="Into the Blue"
          desc="Waktunya menyentuh pasir atau menyusuri bukit. Biarkan matamu istirahat dari layar dan melihat cakrawala yang luas."
        />
        <RoadmapItem 
          icon={<Flame className="text-white w-5 h-5"/>}
          time="19:00 - Finish"
          title="The Unwinding"
          desc="Api unggun kecil, obrolan tanpa gawai, dan langit malam yang jernih. Di sini, waktu seolah berhenti berdetak."
        />
      </div>
    </div>
  </section>
);

const ProgressItem = ({ label, percentage }: { label: string, percentage: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-on-surface-variant">{label}</span>
      <span className="text-white font-bold">{percentage}%</span>
    </div>
    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="h-full bg-white"
      />
    </div>
  </div>
);

const Budget = () => (
  <section id="budget" className="py-24 bg-surface-container">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">Financial Transparency.</h2>
          <p className="text-on-surface-variant text-lg">
            Kami percaya perencanaan yang tenang dimulai dari kejelasan biaya. Tidak ada biaya tersembunyi, hanya kenangan yang tak ternilai.
          </p>
          
          <div className="space-y-8">
            <ProgressItem label="Transportasi (Bensin/Parkir)" percentage={34} />
            <ProgressItem label="Penginapan (Sharing Cost)" percentage={25} />
            <ProgressItem label="Konsumsi & Seafood" percentage={35} />
            <ProgressItem label="Tiket & Retribusi Wisata" percentage={6} />
          </div>
        </div>
        
        <div className="p-12 glass-card rounded-[2.5rem] border-white/5 space-y-10 shadow-2xl">
          <div className="flex items-center gap-4">
            <Wallet className="w-8 h-8 text-white" />
            <h3 className="font-bold text-2xl tracking-widest uppercase">Budget Dashboard</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-end py-6 border-b border-white/5">
              <span className="text-on-surface-variant">Total Estimasi</span>
              <div className="text-right">
                <span className="block text-3xl font-bold">Rp 505.000</span>
                <span className="text-xs text-outline font-medium tracking-wider">/ PAX</span>
              </div>
            </div>
            
            <div className="py-6 border-b border-white/5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-outline">Benefit Terjamin</span>
              <p className="text-sm text-on-surface leading-loose">
                Rundown rapi, Transportasi beres, Kenangan abadi
              </p>
            </div>
            
            <div className="py-6 italic text-white opacity-80 text-sm">
              “Bisa dikondisikan sesuai gaya mainmu”
            </div>
          </div>
          
          <button className="w-full bg-white text-black py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform cursor-pointer">
            <Download className="w-5 h-5" />
            Download Breakdown Lengkap (PDF)
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 border-t border-white/5 bg-surface">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="font-serif text-3xl font-bold">{APP_NAME}</div>
        
        <div className="flex flex-wrap justify-center gap-10 text-sm font-medium text-on-surface-variant">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Journal</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        
        <div className="text-xs text-outline font-medium tracking-wider">
          © 2024 {APP_NAME}. THE ART OF THE ESCAPE.
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedDestId(id);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setSelectedDestId(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="min-h-screen relative selection:bg-white selection:text-black overflow-x-hidden">
      <div className="grain" />
      <Navbar />
      
      <main>
        <Hero />
        <WhySection />
        <Destinations onSelect={handleSelect} />
        <Roadmap />
        <Budget />
        
        <section className="relative h-screen flex items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2070" 
              alt="Starry sky" 
              className="w-full h-full object-cover brightness-[0.3]"
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative z-10 px-6 space-y-12"
          >
            <div className="space-y-6">
              <h2 className="font-serif text-4xl md:text-7xl leading-tight">
                Mungkin nanti kita bakal lupa detail harinya.
              </h2>
              <p className="font-serif text-2xl md:text-3xl italic text-white opacity-80">
                Tapi kemungkinan besar, kita bakal inget rasanya.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <button className="bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl cursor-pointer">
                Gas Berangkat
              </button>
              <a href="#" className="text-white border-b border-white/30 pb-1 hover:border-white transition-all cursor-pointer">
                Lihat Lagi Dari Awal
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <AnimatePresence>
        {selectedDestId && DESTINATIONS[selectedDestId] && (
          <DestinationModal 
            data={DESTINATIONS[selectedDestId]} 
            onClose={handleClose} 
          />
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}
