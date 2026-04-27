import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { Link } from "react-router-dom";

const blogPosts = [
 {
  id: 1,
  title: "The Science of Freeze-Drying: Why It's Superior to Dehydration",
  excerpt: "Discover how freeze-drying preserves 97% of nutrients compared to traditional drying methods.",
  image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=500&fit=crop",
  date: "April 12, 2026",
  author: "Dr. Elena Frost",
  category: "Science"
 },
 {
  id: 2,
  title: "5 Creative Ways to Use Fruit Powder in Your Baking",
  excerpt: "From natural food coloring to intense flavor boosts, learn how to level up your desserts.",
  image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=500&fit=crop",
  date: "April 10, 2026",
  author: "Chef Marcus",
  category: "Recipes"
 },
 {
  id: 3,
  title: "Smoothie Hacks for a High-Performance Morning",
  excerpt: "Quick, nutrient-dense combinations to fuel your body and mind for the day ahead.",
  image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&h=500&fit=crop",
  date: "April 08, 2026",
  author: "Sarah Jenkins",
  category: "Wellness"
 }
];

export default function Blog() {
 return (
  <div className="min-h-screen bg-black">
   <Header />

   <PageHero
    tag="Our Blog"
    title="Field Notes &"
    highlight="Fruit Wisdom"
    description="Insights into the world of freeze-dried nutrition, creative recipes, and tips for a vibrant, healthy lifestyle."
    image="https://images.unsplash.com/photo-1490818387583-1baba5e6382b?w=1600&h=600&fit=crop"
   />

   <section className="py-24 bg-black">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
     <div className="flex flex-col lg:flex-row gap-12">
      {/* Main Content */}
      <div className="lg:w-2/3">
       <div className="grid grid-cols-1 gap-12">
        {blogPosts.map((post, i) => (
         <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="group"
         >
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-8 shadow-md">
           <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
           />
            <div className="absolute top-6 left-6">
            <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md text-[#D4AF37] text-xs font-bold uppercase tracking-wider rounded-full border border-white/20 shadow-sm">
             {post.category}
            </span>
           </div>
          </div>
           <div className="flex items-center gap-6 text-sm text-white/50 mb-4">
           <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            {post.date}
           </div>
           <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#D4AF37]" />
            {post.author}
           </div>
          </div>
           <h2 className="font-serif text-3xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">
           {post.title}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
           {post.excerpt}
          </p>
           <Link
           to={`/blog/${post.id}`}
           className="inline-flex items-center gap-2 text-[#D4AF37] font-bold hover:gap-3 transition-all"
          >
           Read Full Article
           <ArrowRight className="w-4 h-4" />
          </Link>
         </motion.article>
        ))}
       </div>
      </div>

      {/* Sidebar */}
      <aside className="lg:w-1/3">
       <div className="sticky top-32 space-y-12">
         {/* Search */}
        <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
         <h3 className="font-serif text-xl font-bold text-white mb-6">Search</h3>
         <div className="relative">
          <input
           type="text"
           placeholder="Search articles..."
           className="w-full pl-12 pr-4 py-3 bg-black border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-white"
          />
          <Search className="w-5 h-5 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
         </div>
        </div>

         {/* Categories */}
        <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
         <h3 className="font-serif text-xl font-bold text-white mb-6">Categories</h3>
         <div className="space-y-4">
          {["Science", "Recipes", "Wellness", "Sustainability", "Community"].map(cat => (
           <button
            key={cat}
            className="flex items-center justify-between w-full group text-white/70 hover:text-[#D4AF37] transition-colors"
           >
            <span className="font-medium">{cat}</span>
            <span className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-[#D4AF37] group-hover:text-black flex items-center justify-center text-xs transition-colors">
             {(Math.random() * 10).toFixed(0)}
            </span>
           </button>
          ))}
         </div>
        </div>

         {/* Newsletter */}
        <div className="p-8 bg-gradient-to-br from-[#1a1a1a] to-black rounded-3xl text-white border border-white/10">
         <h3 className="font-serif text-xl font-bold mb-4">Stay Inspired</h3>
         <p className="text-white/60 text-sm mb-6">
          Get fresh recipes and fruit wisdom delivered to your inbox.
         </p>
         <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <input
           type="email"
           placeholder="Email address"
           className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-white"
          />
          <button className="w-full py-3 bg-[#D4AF37] hover:bg-[#BF953F] text-black font-bold rounded-xl transition-colors">
           Subscribe
          </button>
         </form>
        </div>
       </div>
      </aside>
     </div>
    </div>
   </section>

   <Footer />
  </div>
 );
}
